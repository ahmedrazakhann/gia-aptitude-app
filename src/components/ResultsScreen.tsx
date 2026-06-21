import React from 'react';
import { TestResult } from '../lib/types';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';
import { CheckCircle2, XCircle, Clock, Percent, Target } from 'lucide-react';

interface ResultsScreenProps {
  result: TestResult;
  onClose: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onClose }) => {
  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 pb-12">
      <Card className="text-center border-slate-200 shadow-sm rounded-none">
        <CardBody className="py-12">
          <h2 className="text-3xl font-semibold mb-2 text-slate-800">Assessment Complete</h2>
          <div className="text-slate-500 mb-10 text-sm uppercase tracking-widest font-medium">Score Summary</div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-slate-50 p-6 border border-slate-200 flex flex-col items-center">
              <Target className="w-6 h-6 text-slate-400 mb-3" />
              <div className="text-4xl font-light text-slate-800 mb-1">
                {Math.max(0, result.correctAnswers - result.wrongAnswers.length)}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Final Score</div>
            </div>
            
            <div className="bg-slate-50 p-6 border border-slate-200 flex flex-col items-center">
              <CheckCircle2 className="w-6 h-6 text-slate-400 mb-3" />
              <div className="text-3xl font-light text-slate-800 mb-1">{result.correctAnswers}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Correct</div>
            </div>
            
            <div className="bg-slate-50 p-6 border border-slate-200 flex flex-col items-center">
              <div className="text-slate-400 mb-3 font-mono font-bold text-lg">Q</div>
              <div className="text-3xl font-light text-slate-800 mb-1">{result.attemptedQuestions ?? result.totalQuestions} / {result.totalQuestions}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attempted</div>
            </div>
            
            <div className="bg-slate-50 p-6 border border-slate-200 flex flex-col items-center">
              <Percent className="w-6 h-6 text-slate-400 mb-3" />
              <div className="text-3xl font-light text-slate-800 mb-1">{result.accuracy.toFixed(1)}%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Accuracy</div>
            </div>
            
            <div className="bg-slate-50 p-6 border border-slate-200 flex flex-col items-center">
              <Clock className="w-6 h-6 text-slate-400 mb-3" />
              <div className="text-3xl font-light text-slate-800 mb-1">{(result.averageResponseTime / 1000).toFixed(1)}s</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Time/Q</div>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 flex flex-col items-center">
              <Clock className="w-6 h-6 text-slate-400 mb-3" />
              <div className="text-3xl font-light text-slate-800 mb-1">
                {(() => {
                  const totalSec = result.totalTimeTaken 
                    ? result.totalTimeTaken / 1000 
                    : (result.averageResponseTime * result.totalQuestions) / 1000;
                  return totalSec > 60 
                    ? `${Math.floor(totalSec / 60)}m ${Math.round(totalSec % 60)}s`
                    : `${totalSec.toFixed(1)}s`;
                })()}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Time</div>
            </div>
          </div>
          
          <div className="mt-12">
            <Button onClick={onClose} className="px-10 py-3 text-sm uppercase tracking-widest font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-none">
              Return to Dashboard
            </Button>
          </div>
        </CardBody>
      </Card>
      
      {result.wrongAnswers.length > 0 && (
        <Card className="border-slate-200 shadow-sm rounded-none mt-8">
          <CardHeader className="border-b border-slate-100 bg-slate-50 py-4 px-6">
            <h3 className="text-lg font-semibold text-slate-800">Review Mistakes</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-8">
              {result.wrongAnswers.map((wrong, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                  <div className="font-medium mb-4 text-slate-800 leading-relaxed">
                    {wrong.question.metadata?.promptStr || "Question content unavailable"}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 border border-red-200 flex items-start">
                      <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider block mb-1">Your Answer</span>
                        <span className="text-slate-800">{wrong.userAnswer || 'No Answer'}</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 border border-green-200 flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider block mb-1">Correct Answer</span>
                        <span className="text-slate-800">{wrong.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
