'use client';

import React, { useState, useEffect } from 'react';
import { TestResult } from '../lib/types';
import { getResults, clearResults } from '../lib/storage';
import { Card, CardBody } from './ui/Card';
import { Button } from './ui/Button';
import { Play, RotateCcw, AlertTriangle, FileText, CheckCircle2, Clock } from 'lucide-react';

interface DashboardProps {
  onStartTest: (testId: string, durationSeconds: number) => void;
}

const AVAILABLE_TESTS = [
  { 
    id: 'aptitude-test-1', 
    name: 'Aptitude Test 1', 
    desc: 'Official practice set for the Thomas International GIA assessment.',
    durationSeconds: 1200 
  },
  { id: 'apt2-number', name: 'Aptitude Test 2 - Number Speed', desc: 'Target: 30 items in 3 minutes. Pick number furthest from middle.', durationSeconds: 180 },
  { id: 'apt2-reasoning', name: 'Aptitude Test 2 - Reasoning', desc: 'Target: 20 items in 2 minutes. Convert statement to ordering.', durationSeconds: 120 },
  { id: 'apt2-perceptual', name: 'Aptitude Test 2 - Perceptual Speed', desc: 'Target: 15 items in 75 seconds. Count identical pairs.', durationSeconds: 75 },
  { id: 'apt2-word', name: 'Aptitude Test 2 - Word Meaning', desc: 'Target: 15 items in 75 seconds. Pick odd word out.', durationSeconds: 75 }
];

export const Dashboard: React.FC<DashboardProps> = ({ onStartTest }) => {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    setResults(getResults());
    // Enforce light theme globally to maintain the "white background with blue accents" professional look
    document.documentElement.classList.remove('dark');
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all test history?')) {
      clearResults();
      setResults([]);
    }
  };

  const getScore = (r: TestResult) => Math.max(0, r.correctAnswers - r.wrongAnswers.length);

  const totalTests = results.length;
  const overallAcc = totalTests > 0 
    ? results.reduce((acc, r) => acc + r.accuracy, 0) / totalTests 
    : 0;

  return (
    <div className="max-w-6xl mx-auto w-full pb-12 font-sans text-slate-900 bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 py-8 px-6 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
              General Intelligence Assessment
            </h1>
            <p className="text-slate-500 mt-1 text-sm uppercase tracking-wider font-medium">Practice Platform</p>
          </div>
        </div>
      </div>

      <div className="px-6">
        {totalTests > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-slate-700">
              <CheckCircle2 className="w-5 h-5 mr-2 text-slate-500" />
              Readiness Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-slate-200 shadow-sm rounded-none">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl font-light text-slate-800 mb-2">{totalTests}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Tests Completed</div>
                </CardBody>
              </Card>
              <Card className="border-slate-200 shadow-sm rounded-none">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl font-light text-slate-800 mb-2">{overallAcc.toFixed(1)}%</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Avg Accuracy</div>
                </CardBody>
              </Card>
              <Card className="border-slate-200 shadow-sm rounded-none">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl font-light text-slate-800 mb-2">
                    {overallAcc > 85 ? 'High' : overallAcc > 65 ? 'Moderate' : 'Needs Review'}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Performance Level</div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-6 flex items-center text-slate-700">
            <FileText className="w-5 h-5 mr-2 text-slate-500" />
            Available Assessments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AVAILABLE_TESTS.map((test) => {
              const testResults = results.filter(r => r.testId === test.id);
              const bestScore = testResults.length > 0 
                ? Math.max(...testResults.map(r => getScore(r))) 
                : null;

              return (
                <Card key={test.id} className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-none">
                  <CardBody className="flex-grow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-slate-800">{test.name}</h3>
                      {bestScore !== null && (
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 font-medium rounded-sm border border-slate-200">
                          Best: {bestScore}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed min-h-[40px]">{test.desc}</p>
                    
                    <div className="flex items-center text-xs text-slate-500 mb-6 font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.durationSeconds / 60} Minutes Duration
                    </div>
                  </CardBody>
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                    <Button 
                      onClick={() => onStartTest(test.id, test.durationSeconds)} 
                      className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-none flex justify-center items-center py-2.5"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Begin Assessment
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {results.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center text-slate-700">
                <RotateCcw className="w-5 h-5 mr-2 text-slate-500" />
                Assessment History
              </h2>
              <Button 
                variant="danger" 
                onClick={handleClearHistory} 
                className="text-sm px-4 py-2 flex items-center rounded-none bg-white border border-red-200 text-red-600 hover:bg-red-50"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            </div>
            <div className="bg-white shadow-sm border border-slate-200 rounded-none overflow-hidden">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold text-xs">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Assessment</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Accuracy</th>
                    <th className="px-6 py-4">Avg Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...results].reverse().map(r => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-500">{new Date(r.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{AVAILABLE_TESTS.find(t => t.id === r.testId)?.name || 'Unknown'}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{getScore(r)}</td>
                      <td className="px-6 py-4 text-slate-600">{r.accuracy.toFixed(1)}%</td>
                      <td className="px-6 py-4 text-slate-500">{(r.averageResponseTime / 1000).toFixed(1)}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
