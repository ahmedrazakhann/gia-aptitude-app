'use client';

import React, { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { TestRunner } from '@/components/TestRunner';
import { ResultsScreen } from '@/components/ResultsScreen';
import { ModuleType, TestResult } from '@/lib/types';
import { addResult } from '@/lib/storage';

type AppState = 'dashboard' | 'running' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('dashboard');
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [timerDuration, setTimerDuration] = useState<number>(1200);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);

  const handleStartTest = (testId: string, durationSeconds: number) => {
    setActiveTestId(testId);
    setTimerDuration(durationSeconds);
    setAppState('running');
  };

  const handleTestComplete = (result: TestResult) => {
    addResult(result);
    setLastResult(result);
    setAppState('results');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
    setActiveTestId(null);
    setLastResult(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="flex justify-center min-h-screen">
        {appState === 'dashboard' && (
          <Dashboard onStartTest={handleStartTest} />
        )}
        
        {appState === 'running' && activeTestId && (
          <TestRunner 
            testId={activeTestId} 
            durationSeconds={timerDuration}
            onComplete={handleTestComplete}
            onCancel={handleBackToDashboard}
          />
        )}
        
        {appState === 'results' && lastResult && (
          <ResultsScreen 
            result={lastResult} 
            onClose={handleBackToDashboard} 
          />
        )}
      </div>
    </main>
  );
}
