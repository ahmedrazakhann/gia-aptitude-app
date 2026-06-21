import { questions as drillA } from '../drill-a/questions';
import { questions as drillB } from '../drill-b/questions';
import { questions as drillC } from '../drill-c/questions';
import { questions as drillD } from '../drill-d/questions';
import { Question } from '../../lib/types';

export const questions: Question[] = [
  ...drillA,
  ...drillB,
  ...drillC,
  ...drillD
];
