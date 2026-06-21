'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ModuleType, Question, TestResult } from '../lib/types';
import { generateQuestion } from '../lib/generators';
import { Button } from './ui/Button';
import { Card, CardBody, CardHeader } from './ui/Card';

interface TestRunnerProps {
  module: ModuleType;
  durationSeconds: number; // e.g., 120
  onComplete: (result: TestResult) => void;
  onCancel: () => void;
}

export const TestRunner: React.FC<TestRunnerProps> = ({ module, durationSeconds, onComplete, onCancel }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  const [answers, setAnswers] = useState<{
    question: Question;
    userAnswer: string;
    timeTaken: number;
  }[]>([]);

  useEffect(() => {
    // Generate first question
    setCurrentQuestion(generateQuestion(module));
    setStartedAt(Date.now());
    setQuestionStartTime(Date.now());
  }, [module]);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const isFinishedRef = useRef(false);

  const finishTest = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    const finalAnswers = answersRef.current;
    let correct = 0;
    const wrongAnswers: TestResult['wrongAnswers'] = [];
    
    let totalTime = 0;

    finalAnswers.forEach(ans => {
      totalTime += ans.timeTaken;
      if (ans.userAnswer === ans.question.correctAnswer) {
        correct++;
      } else {
        wrongAnswers.push({
          question: ans.question,
          userAnswer: ans.userAnswer,
          correctAnswer: ans.question.correctAnswer,
          timeTaken: ans.timeTaken
        });
      }
    });

    const total = finalAnswers.length;
    const result: TestResult = {
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      module,
      totalQuestions: total,
      correctAnswers: correct,
      accuracy: total > 0 ? (correct / total) * 100 : 0,
      averageResponseTime: total > 0 ? totalTime / total : 0,
      wrongAnswers
    };

    onComplete(result);
  };

  const handleAnswer = (answer: string) => {
    const timeTaken = Date.now() - questionStartTime;
    if (currentQuestion) {
      setAnswers(prev => [...prev, {
        question: currentQuestion,
        userAnswer: answer,
        timeTaken
      }]);
      
      setCurrentQuestion(generateQuestion(module));
      setQuestionStartTime(Date.now());
    }
  };

  if (!currentQuestion) return <div className="text-center p-12">Loading...</div>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize">{module} Test</h2>
        <div className="text-xl font-mono bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow border border-gray-100 dark:border-gray-700">
          <span className={timeLeft <= 10 ? 'text-red-500 font-bold animate-pulse' : ''}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardBody className="p-8">
          <div className="text-xl font-medium mb-12 text-center min-h-[120px] flex flex-col items-center justify-center whitespace-pre-wrap">
            {typeof currentQuestion.prompt === 'string' && currentQuestion.prompt.includes('<') ? (
               <div dangerouslySetInnerHTML={{__html: currentQuestion.prompt}} />
            ) : currentQuestion.prompt}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((opt, i) => (
              <Button 
                key={i} 
                onClick={() => handleAnswer(opt)}
                variant="secondary"
                className="py-6 text-lg hover:-translate-y-1 transform transition"
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>Questions answered: {answers.length}</div>
        <Button variant="danger" onClick={finishTest} className="px-4 py-1 text-sm">
          End Early & Score
        </Button>
      </div>
    </div>
  );
};
