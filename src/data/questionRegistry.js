// src/data/questionRegistry.js
import { questions as fullstackDeploymentQuestions } from './questions.js';
import { questions as gitQuestions } from './gitQuestions.js';
import { questions as githubQuestions } from './githubQuestions.js';
import { questions as reactQuestions } from './reactQuestions.js';
import { questions as javascriptQuestions } from './javascriptQuestions.js';
import { questions as typescriptQuestions } from './typescriptQuestions.js';
import { questions as nodeQuestions } from './nodeQuestions.js';
import { questions as expressQuestions } from './expressQuestions.js';
import { questions as mongodbQuestions } from './mongodbQuestions.js';
import { questions as postgresQuestions } from './postgresQuestions.js';
import { questions as supabaseQuestions } from './supabaseQuestions.js';
import { questions as vercelQuestions } from './vercelQuestions.js';
import { questions as renderQuestions } from './renderQuestions.js';
import { questions as oauthQuestions } from './oauthQuestions.js';
import { questions as apiQuestions } from './apiQuestions.js';
import { questions as authenticationQuestions } from './authenticationQuestions.js';
import { questions as htmlQuestions } from './htmlQuestions.js';
import { questions as cssQuestions } from './cssQuestions.js';
import { questions as tailwindQuestions } from './tailwindQuestions.js';
import { questions as deploymentQuestions } from './deploymentQuestions.js';
import { questions as securityQuestions } from './securityQuestions.js';
import { questions as nextjsQuestions } from './nextjsQuestions.js';

// Comprehensive registry for all 22 quizzes
export const questionRegistry = {
  // ===== EXACT FILE NAME MATCHES =====
  'questions.js': fullstackDeploymentQuestions,
  'gitQuestions.js': gitQuestions,
  'githubQuestions.js': githubQuestions,
  'reactQuestions.js': reactQuestions,
  'javascriptQuestions.js': javascriptQuestions,
  'typescriptQuestions.js': typescriptQuestions,
  'nodeQuestions.js': nodeQuestions,
  'expressQuestions.js': expressQuestions,
  'mongodbQuestions.js': mongodbQuestions,
  'postgresQuestions.js': postgresQuestions,
  'supabaseQuestions.js': supabaseQuestions,
  'vercelQuestions.js': vercelQuestions,
  'renderQuestions.js': renderQuestions,
  'oauthQuestions.js': oauthQuestions,
  'apiQuestions.js': apiQuestions,
  'authenticationQuestions.js': authenticationQuestions,
  'htmlQuestions.js': htmlQuestions,
  'cssQuestions.js': cssQuestions,
  'tailwindQuestions.js': tailwindQuestions,
  'deploymentQuestions.js': deploymentQuestions,
  'securityQuestions.js': securityQuestions,
  'nextjsQuestions.js': nextjsQuestions,

  // ===== QUIZ TITLE MATCHES =====
  'Full Stack Deployment': fullstackDeploymentQuestions,
  'Git': gitQuestions,
  'GitHub': githubQuestions,
  'React': reactQuestions,
  'JavaScript': javascriptQuestions,
  'TypeScript': typescriptQuestions,
  'Node.js': nodeQuestions,
  'Express.js': expressQuestions,
  'MongoDB': mongodbQuestions,
  'PostgreSQL': postgresQuestions,
  'Supabase': supabaseQuestions,
  'Vercel': vercelQuestions,
  'Render': renderQuestions,
  'OAuth 2.0': oauthQuestions,
  'REST APIs': apiQuestions,
  'Authentication': authenticationQuestions,
  'HTML5': htmlQuestions,
  'CSS3': cssQuestions,
  'Tailwind CSS': tailwindQuestions,
  'Deployment': deploymentQuestions,
  'Web Security': securityQuestions,
  'Next.js': nextjsQuestions,

  // ===== QUIZ ID MATCHES =====
  'fullstack-deployment': fullstackDeploymentQuestions,
  'git': gitQuestions,
  'github': githubQuestions,
  'react': reactQuestions,
  'javascript': javascriptQuestions,
  'typescript': typescriptQuestions,
  'nodejs': nodeQuestions,
  'express': expressQuestions,
  'mongodb': mongodbQuestions,
  'postgresql': postgresQuestions,
  'supabase': supabaseQuestions,
  'vercel': vercelQuestions,
  'render': renderQuestions,
  'oauth': oauthQuestions,
  'restapis': apiQuestions,
  'authentication': authenticationQuestions,
  'html5': htmlQuestions,
  'css3': cssQuestions,
  'tailwind': tailwindQuestions,
  'deployment': deploymentQuestions,
  'websecurity': securityQuestions,
  'nextjs': nextjsQuestions,

  // ===== ALTERNATIVE NAMING VARIATIONS =====
  'Fullstack Deployment': fullstackDeploymentQuestions,
  'Full Stack': fullstackDeploymentQuestions,
  'React.js': reactQuestions,
  'Node': nodeQuestions,
  'Express': expressQuestions,
  'Postgres': postgresQuestions,
  'PostgreSQL Questions': postgresQuestions,
  'OAuth': oauthQuestions,
  'REST API': apiQuestions,
  'Rest APIs': apiQuestions,
  'Auth': authenticationQuestions,
  'Authentication Questions': authenticationQuestions,
  'HTML': htmlQuestions,
  'CSS': cssQuestions,
  'Tailwind': tailwindQuestions,
  'Web Security Questions': securityQuestions,
  'Security': securityQuestions,
  'Next': nextjsQuestions,
  'NextJS': nextjsQuestions,
};

/**
 * Get questions for a quiz with flexible matching
 * @param {string} questionFile - The question file name
 * @param {string} quizTitle - The quiz title
 * @param {string} quizId - The quiz ID
 * @returns {Array|null} - Array of questions or null
 */
export const getQuestionsForQuiz = (questionFile, quizTitle, quizId) => {
  console.log('🔍 Looking for questions:', { questionFile, quizTitle, quizId });
  
  // Strategy 1: Try exact file name match
  if (questionFile && questionRegistry[questionFile]) {
    console.log('✅ Found by file name:', questionFile);
    return questionRegistry[questionFile];
  }
  
  // Strategy 2: Try by quiz ID
  if (quizId && questionRegistry[quizId]) {
    console.log('✅ Found by quiz ID:', quizId);
    return questionRegistry[quizId];
  }
  
  // Strategy 3: Try by quiz title
  if (quizTitle) {
    // Exact match
    if (questionRegistry[quizTitle]) {
      console.log('✅ Found by exact title match:', quizTitle);
      return questionRegistry[quizTitle];
    }
    
    // Partial match (case insensitive)
    const titleLower = quizTitle.toLowerCase();
    const key = Object.keys(questionRegistry).find(k => 
      k.toLowerCase() === titleLower ||
      k.toLowerCase().includes(titleLower) ||
      titleLower.includes(k.toLowerCase())
    );
    if (key) {
      console.log('✅ Found by partial title match:', key);
      return questionRegistry[key];
    }
  }
  
  // Strategy 4: Try by question file without extension
  if (questionFile) {
    const fileName = questionFile.replace('.js', '');
    if (questionRegistry[fileName]) {
      console.log('✅ Found by file name without extension:', fileName);
      return questionRegistry[fileName];
    }
  }
  
  console.warn('❌ No questions found for:', { questionFile, quizTitle, quizId });
  return null;
};

/**
 * Get available question files for debugging
 */
export const getAvailableQuestionFiles = () => {
  return Object.keys(questionRegistry);
};

/**
 * Check if a quiz has questions available
 */
export const hasQuestionsForQuiz = (questionFile, quizTitle) => {
  const questions = getQuestionsForQuiz(questionFile, quizTitle);
  return questions !== null && questions.length > 0;
};

/**
 * Get all quiz titles that have questions available
 */
export const getAvailableQuizTitles = () => {
  const titles = [
    'Full Stack Deployment',
    'Git',
    'GitHub',
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'Supabase',
    'Vercel',
    'Render',
    'OAuth 2.0',
    'REST APIs',
    'Authentication',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Deployment',
    'Web Security',
    'Next.js'
  ];
  return titles;
};