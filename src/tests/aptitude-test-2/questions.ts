import { questions as drillA } from '../apt2-number/questions';
import { questions as drillB } from '../apt2-reasoning/questions';
import { questions as drillC } from '../apt2-perceptual/questions';
import { questions as drillD } from '../apt2-word/questions';
import { Question } from '../../lib/types';

export const questions: Question[] = [
  ...drillA,
  ...drillB,
  ...drillC,
  ...drillD
];
