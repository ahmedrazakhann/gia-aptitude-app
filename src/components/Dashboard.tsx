'use client';

import React, { useState, useEffect } from 'react';
import { ModuleType, TestResult } from '../lib/types';
import { getResults, getTheme, setTheme as saveThemeToStorage, clearResults } from '../lib/storage';
import { Card, CardBody, CardHeader } from './ui/Card';
import { Button } from './ui/Button';

interface DashboardProps {
  onStartTest: (module: ModuleType, durationSeconds: number) => void;
}

const MODULES: { id: ModuleType; name: string; desc: string }[] = [
  { id: 'reasoning', name: 'Reasoning', desc: 'Logic and statement comparisons' },
  { id: 'perceptual', name: 'Perceptual Speed', desc: 'Identify matching letter pairs quickly' },
  { id: 'number', name: 'Number Speed', desc: 'Quick mental math and value comparisons' },
  { id: 'word', name: 'Word Meaning', desc: 'Identify the odd word out of synonyms' },
  { id: 'spatial', name: 'Spatial Visualization', desc: 'Mental rotation and mirror images' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onStartTest }) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [timer, setTimer] = useState<number>(120);

  useEffect(() => {
    setResults(getResults());
    
    // Theme setup
    const savedTheme = getTheme();
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveThemeToStorage(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getScore = (r: TestResult) => Math.max(0, r.correctAnswers - r.wrongAnswers.length);

  const getModuleStats = (moduleId: ModuleType) => {
    const modResults = results.filter(r => r.module === moduleId);
    if (modResults.length === 0) return null;
    
    const last = modResults[modResults.length - 1];
    const best = [...modResults].sort((a, b) => getScore(b) - getScore(a))[0];
    const avgAcc = modResults.reduce((acc, r) => acc + r.accuracy, 0) / modResults.length;
    
    return { last, best, avgAcc };
  };

  const moduleStats = MODULES.map(m => ({ ...m, stats: getModuleStats(m.id) }));
  
  // Weak areas
  const weakAreas = moduleStats
    .filter(m => m.stats !== null)
    .sort((a, b) => (a.stats?.avgAcc || 0) - (b.stats?.avgAcc || 0))
    .slice(0, 2);

  const totalTests = results.length;
  const overallAcc = totalTests > 0 
    ? results.reduce((acc, r) => acc + r.accuracy, 0) / totalTests 
    : 0;

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all test history?')) {
      clearResults();
      setResults([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GIA Practice Pro
          </h1>
          <p className="text-gray-500 mt-2">Master the Thomas International assessment</p>
        </div>
        <Button onClick={toggleTheme} variant="secondary" className="rounded-full px-4">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </Button>
      </div>

      {totalTests > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2">
            <CardBody className="flex flex-col justify-center h-full">
              <h3 className="text-xl font-bold mb-4">Readiness Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{totalTests}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Tests Run</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{overallAcc.toFixed(1)}%</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Avg Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">
                    {overallAcc > 85 ? 'Excellent' : overallAcc > 65 ? 'Good' : 'Needs Work'}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Status</div>
                </div>
              </div>
            </CardBody>
          </Card>

          {weakAreas.length > 0 && (
            <Card className="border-red-200 dark:border-red-900/50">
              <CardBody>
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center">
                  <span className="mr-2">⚠️</span> Focus Areas
                </h3>
                <ul className="space-y-3">
                  {weakAreas.map(w => (
                    <li key={w.id} className="flex justify-between items-center bg-red-50 dark:bg-red-900/10 p-2 rounded">
                      <span className="font-medium">{w.name}</span>
                      <span className="text-red-600 font-bold">{w.stats?.avgAcc.toFixed(1)}%</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <label className="font-medium">Timer Duration:</label>
          <select 
            value={timer} 
            onChange={(e) => setTimer(Number(e.target.value))}
            className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md py-2 pl-3 pr-8 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={60}>1 Minute (Fast)</option>
            <option value={120}>2 Minutes (Standard)</option>
            <option value={180}>3 Minutes (Extended)</option>
            <option value={300}>5 Minutes (Marathon)</option>
          </select>
        </div>
        
        <Button 
          onClick={() => onStartTest('mixed', timer * 5)} 
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg"
        >
          🚀 Full Mixed Mock Test ({(timer * 5) / 60}m)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moduleStats.map((mod) => (
          <Card key={mod.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
            <CardBody className="flex-grow">
              <h3 className="text-xl font-bold mb-1">{mod.name}</h3>
              <p className="text-gray-500 text-sm mb-4 h-10">{mod.desc}</p>
              
              {mod.stats ? (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Best Score</div>
                    <div className="font-bold text-green-600">{getScore(mod.stats.best)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last Score</div>
                    <div className="font-bold text-blue-600">{getScore(mod.stats.last)}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 text-sm text-center text-gray-400 italic">
                  Not attempted yet
                </div>
              )}
            </CardBody>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
              <Button onClick={() => onStartTest(mod.id, timer)} className="w-full">
                Practice Module
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {results.length > 0 && (
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Test History</h2>
            <Button variant="danger" onClick={handleClearHistory} className="text-sm px-3 py-1">
              Clear History
            </Button>
          </div>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 text-gray-500 uppercase tracking-wider font-medium">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Accuracy</th>
                  <th className="px-6 py-4">Avg Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {[...results].reverse().map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500">{new Date(r.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4 font-medium capitalize">{r.module}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{getScore(r)}</td>
                    <td className="px-6 py-4">{r.accuracy.toFixed(1)}%</td>
                    <td className="px-6 py-4">{(r.averageResponseTime / 1000).toFixed(1)}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
