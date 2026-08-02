// src/data/questionRegistry.js
import { questions as webSecurityQuestions } from './WebSecurityQuestions.js';
import { questions as javascriptQuestions } from './JavaScriptQuestions.js';
import { questions as reactQuestions } from './ReactQuestions.js';

export const questionRegistry = {
  // Map by question file name
  'WebSecurityQuestions.js': webSecurityQuestions,
  'JavaScriptQuestions.js': javascriptQuestions,
  'ReactQuestions.js': reactQuestions,
};

export const getQuestionsForQuiz = (questionFile) => {
  if (!questionFile) return null;
  const questions = questionRegistry[questionFile];
  return questions || null;
};