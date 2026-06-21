'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TestResult, Question } from '../lib/types';
import { Button } from './ui/Button';
import { TESTS_DATA } from '../tests/index';

interface TestRunnerProps {
  testId: string; 
  durationSeconds: number; 
  onComplete: (result: TestResult) => void;
  onCancel: () => void;
}

export const TestRunner: React.FC<TestRunnerProps> = ({ testId, durationSeconds, onComplete, onCancel }) => {
  const testData = TESTS_DATA[testId];
  const questions = testData?.questions || [];
  const metadata = testData?.metadata || { title: 'Unknown Test' };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [questionTimeElapsed, setQuestionTimeElapsed] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, { answer: string; timeTaken: number }>>({});
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  const isFinishedRef = useRef(false);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setQuestionTimeElapsed(0);
  }, [currentIndex]);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setQuestionTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const userAnswersRef = useRef(userAnswers);
  useEffect(() => {
    userAnswersRef.current = userAnswers;
  }, [userAnswers]);

  const finishTest = (overrideAnswers?: Record<string, { answer: string; timeTaken: number }>) => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    const finalAnswers = overrideAnswers || userAnswersRef.current;
    let correct = 0;
    const wrongAnswers: TestResult['wrongAnswers'] = [];
    let totalTime = 0;
    let attempted = 0;

    questions.forEach(q => {
      const ans = finalAnswers[q.id];
      if (ans) {
        attempted++;
        totalTime += ans.timeTaken;
        if (ans.answer === q.correctAnswer) {
          correct++;
        } else {
          wrongAnswers.push({
            question: q,
            userAnswer: ans.answer,
            correctAnswer: q.correctAnswer,
            timeTaken: ans.timeTaken
          });
        }
      } else {
        // Unanswered
        wrongAnswers.push({
          question: q,
          userAnswer: '',
          correctAnswer: q.correctAnswer,
          timeTaken: 0
        });
      }
    });

    const total = questions.length;
    const result: TestResult = {
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      module: 'mixed', // Legacy compat
      testId,
      totalQuestions: total,
      attemptedQuestions: attempted,
      correctAnswers: correct,
      accuracy: total > 0 ? (correct / total) * 100 : 0,
      averageResponseTime: attempted > 0 ? totalTime / attempted : 0,
      totalTimeTaken: totalTime,
      wrongAnswers
    };

    onComplete(result);
  };

  const handleSelectAnswer = (answer: string) => {
    const timeTaken = Date.now() - questionStartTime;
    const currentQuestion = questions[currentIndex];
    
    const newAnswers = {
      ...userAnswers,
      [currentQuestion.id]: { answer, timeTaken }
    };
    
    setUserAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return <div className="text-center p-12">Loading...</div>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeLow = timeLeft <= 60; 
  const isQuestionOverTime = questionTimeElapsed > 4;

  const currentAnswer = userAnswers[currentQuestion.id]?.answer;
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col font-sans text-slate-900 overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{metadata.title}</h1>
          <div className="text-sm text-slate-500 font-medium">Question {currentIndex + 1} of {questions.length}</div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className={`text-2xl font-mono font-bold px-4 py-2 rounded border transition-colors ${
            isQuestionOverTime || isTimeLow 
              ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
              : 'bg-slate-50 text-slate-700 border-slate-200'
          }`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <Button variant="secondary" onClick={onCancel} className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border-0">
            Leave (Unscored)
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5">
        <div 
          className="bg-slate-800 h-1.5 transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-4xl flex-grow flex flex-col">
          
          <div className="bg-white rounded-none border border-slate-200 p-10 mb-8 flex-grow flex flex-col justify-center min-h-[400px]">
            <div className="text-2xl font-medium mb-12 text-center whitespace-pre-wrap text-slate-800 leading-relaxed">
              {typeof currentQuestion.prompt === 'string' && currentQuestion.prompt.includes('<') ? (
                 <div dangerouslySetInnerHTML={{__html: currentQuestion.prompt}} />
              ) : currentQuestion.prompt}
            </div>
            
            <div className={`grid gap-4 max-w-3xl mx-auto w-full mt-8 ${
              currentQuestion.options.length === 5 ? 'grid-cols-5' : 
              currentQuestion.options.length === 3 ? 'grid-cols-3' : 
              currentQuestion.options.length === 4 ? 'grid-cols-2 sm:grid-cols-4' :
              'grid-cols-2'
            }`}>
              {currentQuestion.options.map((opt, i) => {
                return (
                  <button 
                    key={i} 
                    onClick={() => handleSelectAnswer(opt)}
                    className="py-6 px-4 text-lg rounded-none border-2 transition-all duration-200 outline-none border-slate-200 bg-white text-slate-700 hover:border-slate-800 hover:bg-slate-50 hover:text-slate-900 focus:border-slate-800 focus:bg-slate-50 cursor-pointer"
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
