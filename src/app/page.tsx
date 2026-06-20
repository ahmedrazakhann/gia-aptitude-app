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
  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);
  const [timerDuration, setTimerDuration] = useState<number>(120);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);

  const handleStartTest = (module: ModuleType, durationSeconds: number) => {
    setActiveModule(module);
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
    setActiveModule(null);
    setLastResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center min-h-screen">
        {appState === 'dashboard' && (
          <Dashboard onStartTest={handleStartTest} />
        )}
        
        {appState === 'running' && activeModule && (
          <TestRunner 
            module={activeModule} 
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
