export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'React Fundamentals',
    difficulty: 'easy',
    question: 'What is React?',
    options: [
      'A. A JavaScript library for building user interfaces',
      'B. A programming language',
      'C. A database management system',
      'D. A styling framework'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'React Components',
    difficulty: 'easy',
    question: 'What is a React component?',
    options: [
      'A. A reusable piece of UI',
      'B. A database table',
      'C. A styling module',
      'D. A configuration file'
    ],
    correctAnswer: 'A'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'React Hooks',
    difficulty: 'medium',
    question: 'Which hook is used to manage state in functional components?',
    options: [
      'A. useEffect',
      'B. useState',
      'C. useContext',
      'D. useReducer'
    ],
    correctAnswer: 'B'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'React Props and State',
    difficulty: 'medium',
    question: 'What is the difference between props and state in React?',
    options: [
      'A. Props are read-only, state is mutable',
      'B. State is read-only, props are mutable',
      'C. Both are mutable',
      'D. Both are read-only'
    ],
    correctAnswer: 'A'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'React Best Practices',
    difficulty: 'advanced',
    question: 'What is a best practice for React components?',
    options: [
      'A. Keep components small and focused',
      'B. Use functional components with hooks',
      'C. Use proper prop types or TypeScript',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  }
];

export default questions;