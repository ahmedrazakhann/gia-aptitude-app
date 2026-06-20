import React from 'react';
import { TestResult } from '../lib/types';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';

interface ResultsScreenProps {
  result: TestResult;
  onClose: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onClose }) => {
  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      <Card className="text-center">
        <CardBody className="py-12">
          <h2 className="text-3xl font-bold mb-2 capitalize">{result.module} Test Complete</h2>
          <div className="text-gray-500 mb-8">Score Summary</div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700/50">
              <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                {Math.max(0, result.correctAnswers - result.wrongAnswers.length)}
              </div>
              <div className="text-sm font-bold text-yellow-700 dark:text-yellow-500 uppercase tracking-wider">Score</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{result.correctAnswers}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Correct</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-1">{result.totalQuestions}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Attempted</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{result.accuracy.toFixed(1)}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{(result.averageResponseTime / 1000).toFixed(1)}s</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Avg Time/Q</div>
            </div>
          </div>
          
          <div className="mt-10">
            <Button onClick={onClose} className="px-8 py-3 text-lg">Back to Dashboard</Button>
          </div>
        </CardBody>
      </Card>
      
      {result.wrongAnswers.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Review Mistakes</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {result.wrongAnswers.map((wrong, idx) => (
                <div key={idx} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                  <div className="font-medium mb-3 text-lg">
                    {wrong.question.metadata?.promptStr || "Question content unavailable"}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-100 dark:border-red-900/50">
                      <span className="text-xs text-red-600 dark:text-red-400 uppercase font-bold tracking-wider block mb-1">Your Answer</span>
                      <span className="text-red-800 dark:text-red-200">{wrong.userAnswer}</span>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-100 dark:border-green-900/50">
                      <span className="text-xs text-green-600 dark:text-green-400 uppercase font-bold tracking-wider block mb-1">Correct Answer</span>
                      <span className="text-green-800 dark:text-green-200">{wrong.correctAnswer}</span>
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
