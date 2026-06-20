import { TestResult, AppState } from './types';

const STORAGE_KEY = 'gia_practice_app_state';

const defaultState: AppState = {
  results: [],
  theme: 'light',
};

export const loadState = (): AppState => {
  if (typeof window === 'undefined') return defaultState;
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved) as AppState;
    } catch (e) {
      console.error('Failed to parse app state', e);
    }
  }
  return defaultState;
};

export const saveState = (state: AppState) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const addResult = (result: TestResult) => {
  const state = loadState();
  state.results.push(result);
  saveState(state);
};

export const getResults = () => loadState().results;

export const clearResults = () => {
  const state = loadState();
  state.results = [];
  saveState(state);
};

export const setTheme = (theme: 'light' | 'dark') => {
  const state = loadState();
  state.theme = theme;
  saveState(state);
};

export const getTheme = () => loadState().theme;
