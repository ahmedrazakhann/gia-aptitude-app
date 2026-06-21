export type ModuleType = 'reasoning' | 'perceptual' | 'number' | 'word' | 'spatial' | 'mixed';

export interface Question {
  id: string;
  module: ModuleType;
  prompt: React.ReactNode;
  options: string[];
  correctAnswer: string;
  metadata?: any;
}

export interface TestResult {
  id: string;
  timestamp: number;
  testId?: string;
  module: ModuleType;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number; // percentage 0-100
  averageResponseTime: number; // in milliseconds
  wrongAnswers: {
    question: Omit<Question, 'prompt'> & { promptStr?: string };
    userAnswer: string;
    correctAnswer: string;
    timeTaken: number;
  }[];
}

export interface AppState {
  results: TestResult[];
  theme: 'light' | 'dark';
}
