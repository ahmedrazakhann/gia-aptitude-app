import { Question } from '../lib/types';
import { questions as test1Questions } from './aptitude-test-1/questions';
import { metadata as test1Metadata } from './aptitude-test-1/metadata';

import { questions as apt2NumQuestions } from './apt2-number/questions';
import { metadata as apt2NumMetadata } from './apt2-number/metadata';

import { questions as apt2ReaQuestions } from './apt2-reasoning/questions';
import { metadata as apt2ReaMetadata } from './apt2-reasoning/metadata';

import { questions as apt2PercQuestions } from './apt2-perceptual/questions';
import { metadata as apt2PercMetadata } from './apt2-perceptual/metadata';

import { questions as apt2WordQuestions } from './apt2-word/questions';
import { metadata as apt2WordMetadata } from './apt2-word/metadata';

export const TESTS_DATA: Record<string, { questions: Question[], metadata: any }> = {
  'aptitude-test-1': { questions: test1Questions, metadata: test1Metadata },
  'apt2-number': { questions: apt2NumQuestions, metadata: apt2NumMetadata },
  'apt2-reasoning': { questions: apt2ReaQuestions, metadata: apt2ReaMetadata },
  'apt2-perceptual': { questions: apt2PercQuestions, metadata: apt2PercMetadata },
  'apt2-word': { questions: apt2WordQuestions, metadata: apt2WordMetadata },
};
