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
    correctAnswer: 'B' // Moved from A to B
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
    correctAnswer: 'C' // Moved from A to C
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
    correctAnswer: 'D' // Moved from B to D
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
    correctAnswer: 'A' // Kept as A
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
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'React JSX',
    difficulty: 'easy',
    question: 'What is JSX in React?',
    options: [
      'A. A syntax extension that allows writing HTML in JavaScript',
      'B. A JavaScript framework',
      'C. A styling language',
      'D. A database query language'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'React Virtual DOM',
    difficulty: 'medium',
    question: 'What is the Virtual DOM in React?',
    options: [
      'A. A lightweight copy of the real DOM used for performance optimization',
      'B. A virtual browser',
      'C. A database representation',
      'D. A server-side rendering tool'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'React Lifecycle',
    difficulty: 'advanced',
    question: 'Which method is called when a component is mounted in React class components?',
    options: [
      'A. componentDidMount',
      'B. componentWillMount',
      'C. componentDidUpdate',
      'D. componentWillUpdate'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'React Hooks',
    difficulty: 'medium',
    question: 'Which hook is used to perform side effects in React?',
    options: [
      'A. useEffect',
      'B. useState',
      'C. useContext',
      'D. useReducer'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'React Hooks',
    difficulty: 'medium',
    question: 'Which hook is used to access context in React?',
    options: [
      'A. useContext',
      'B. useState',
      'C. useEffect',
      'D. useReducer'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'React Hooks',
    difficulty: 'advanced',
    question: 'Which hook is used for complex state logic in React?',
    options: [
      'A. useReducer',
      'B. useState',
      'C. useEffect',
      'D. useContext'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'React Hooks',
    difficulty: 'advanced',
    question: 'Which hook is used to memoize expensive calculations in React?',
    options: [
      'A. useMemo',
      'B. useCallback',
      'C. useContext',
      'D. useReducer'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'React Hooks',
    difficulty: 'advanced',
    question: 'Which hook is used to memoize functions in React?',
    options: [
      'A. useCallback',
      'B. useMemo',
      'C. useContext',
      'D. useReducer'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'React State Management',
    difficulty: 'medium',
    question: 'What is the purpose of useState in React?',
    options: [
      'A. To add state to functional components',
      'B. To add lifecycle methods',
      'C. To create components',
      'D. To render components'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'React State Management',
    difficulty: 'medium',
    question: 'What is the purpose of useContext in React?',
    options: [
      'A. To access context without nesting consumers',
      'B. To manage global state',
      'C. To create providers',
      'D. To update state'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'React State Management',
    difficulty: 'advanced',
    question: 'What is Redux?',
    options: [
      'A. A predictable state container for JavaScript apps',
      'B. A React hook',
      'C. A database',
      'D. A framework'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'React State Management',
    difficulty: 'advanced',
    question: 'What is the purpose of Redux in React?',
    options: [
      'A. To manage global state',
      'B. To manage local state',
      'C. To manage component lifecycle',
      'D. To manage routing'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'React Routing',
    difficulty: 'medium',
    question: 'What is React Router used for?',
    options: [
      'A. To handle navigation in React apps',
      'B. To manage state',
      'C. To handle API calls',
      'D. To style components'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'React Routing',
    difficulty: 'medium',
    question: 'What is a Route in React Router?',
    options: [
      'A. A component that renders a UI when the URL matches',
      'B. A navigation link',
      'C. A state container',
      'D. A styling component'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'React Routing',
    difficulty: 'advanced',
    question: 'What is a Link in React Router?',
    options: [
      'A. A component that creates a hyperlink for navigation',
      'B. A route component',
      'C. A state container',
      'D. A styling component'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'React Forms',
    difficulty: 'medium',
    question: 'What is a controlled component in React forms?',
    options: [
      'A. A form element controlled by React state',
      'B. A form element controlled by the DOM',
      'C. A form element controlled by props',
      'D. A form element controlled by context'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'React Forms',
    difficulty: 'medium',
    question: 'What is an uncontrolled component in React forms?',
    options: [
      'A. A form element controlled by the DOM',
      'B. A form element controlled by React state',
      'C. A form element controlled by props',
      'D. A form element controlled by context'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'React Forms',
    difficulty: 'advanced',
    question: 'What is the purpose of form libraries like Formik in React?',
    options: [
      'A. To simplify form handling and validation',
      'B. To style forms',
      'C. To connect to databases',
      'D. To handle API calls'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'React Performance',
    difficulty: 'advanced',
    question: 'What is React.memo used for?',
    options: [
      'A. To memoize components and prevent unnecessary re-renders',
      'B. To memoize functions',
      'C. To memoize state',
      'D. To memoize props'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'React Performance',
    difficulty: 'advanced',
    question: 'What is useMemo used for in React?',
    options: [
      'A. To memoize expensive calculations',
      'B. To memoize components',
      'C. To memoize functions',
      'D. To memoize state'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'React Performance',
    difficulty: 'advanced',
    question: 'What is useCallback used for in React?',
    options: [
      'A. To memoize functions',
      'B. To memoize components',
      'C. To memoize calculations',
      'D. To memoize state'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'React Testing',
    difficulty: 'advanced',
    question: 'What is Jest used for in React?',
    options: [
      'A. Testing React components',
      'B. Styling React components',
      'C. Routing React components',
      'D. State management'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'React Testing',
    difficulty: 'advanced',
    question: 'What is React Testing Library used for?',
    options: [
      'A. Testing React components in a user-centric way',
      'B. Styling React components',
      'C. Routing React components',
      'D. State management'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'React Styling',
    difficulty: 'medium',
    question: 'What is CSS-in-JS in React?',
    options: [
      'A. Writing CSS within JavaScript files',
      'B. Writing CSS in separate files',
      'C. Writing CSS in HTML',
      'D. Writing CSS in XML'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'React Styling',
    difficulty: 'medium',
    question: 'What is Styled Components in React?',
    options: [
      'A. A library for styling React components with CSS-in-JS',
      'B. A library for routing',
      'C. A library for state management',
      'D. A library for testing'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'React Styling',
    difficulty: 'medium',
    question: 'What is Tailwind CSS in React?',
    options: [
      'A. A utility-first CSS framework',
      'B. A component library',
      'C. A state management library',
      'D. A testing library'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'React Deployment',
    difficulty: 'advanced',
    question: 'How do you deploy a React app?',
    options: [
      'A. Using Vercel',
      'B. Using Netlify',
      'C. Using AWS',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'React Deployment',
    difficulty: 'advanced',
    question: 'What is the recommended platform for deploying React apps?',
    options: [
      'A. Vercel',
      'B. Netlify',
      'C. AWS',
      'D. Heroku'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'React Environment Variables',
    difficulty: 'medium',
    question: 'How do you access environment variables in React?',
    options: [
      'A. Using process.env',
      'B. Using .env file',
      'C. Using config file',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'React Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in React?',
    options: [
      'A. Sanitize user input to prevent XSS',
      'B. Use HTTPS',
      'C. Use environment variables for secrets',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'React API Integration',
    difficulty: 'medium',
    question: 'How do you make API calls in React?',
    options: [
      'A. Using fetch',
      'B. Using axios',
      'C. Using useEffect and useState',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'React Error Handling',
    difficulty: 'advanced',
    question: 'What is an Error Boundary in React?',
    options: [
      'A. A component that catches JavaScript errors in its child component tree',
      'B. A error handling library',
      'C. A error logging tool',
      'D. A error styling component'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'React Error Handling',
    difficulty: 'advanced',
    question: 'How do you create an Error Boundary in React?',
    options: [
      'A. Using componentDidCatch and getDerivedStateFromError',
      'B. Using useState',
      'C. Using useEffect',
      'D. Using useContext'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'React Suspense',
    difficulty: 'advanced',
    question: 'What is Suspense in React?',
    options: [
      'A. A component that displays fallback content while waiting for data',
      'B. A state management tool',
      'C. A routing component',
      'D. A styling component'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'React Suspense',
    difficulty: 'advanced',
    question: 'What is the purpose of React Suspense?',
    options: [
      'A. To handle asynchronous data loading',
      'B. To manage state',
      'C. To handle routing',
      'D. To style components'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'React Server Components',
    difficulty: 'advanced',
    question: 'What are React Server Components?',
    options: [
      'A. Components that render on the server',
      'B. Components that render on the client',
      'C. Components that render in the database',
      'D. Components that render in the browser'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'React Server Components',
    difficulty: 'advanced',
    question: 'What is the benefit of React Server Components?',
    options: [
      'A. Improved performance and SEO',
      'B. Better styling',
      'C. Easier state management',
      'D. Faster routing'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'React Next.js',
    difficulty: 'advanced',
    question: 'What is Next.js?',
    options: [
      'A. A React framework for production',
      'B. A React library',
      'C. A database system',
      'D. A design tool'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'React Next.js',
    difficulty: 'advanced',
    question: 'What features does Next.js provide?',
    options: [
      'A. Server-side rendering',
      'B. Static site generation',
      'C. API routes',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'React Code Splitting',
    difficulty: 'advanced',
    question: 'What is code splitting in React?',
    options: [
      'A. Splitting the code into smaller chunks for lazy loading',
      'B. Splitting components into smaller parts',
      'C. Splitting state into smaller parts',
      'D. Splitting styles into smaller parts'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'React Lazy Loading',
    difficulty: 'advanced',
    question: 'How do you implement lazy loading in React?',
    options: [
      'A. Using React.lazy and Suspense',
      'B. Using useState',
      'C. Using useEffect',
      'D. Using useContext'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'React Portals',
    difficulty: 'advanced',
    question: 'What is React Portals used for?',
    options: [
      'A. Rendering children outside the DOM hierarchy',
      'B. Routing',
      'C. State management',
      'D. Styling'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'React Reconciliation',
    difficulty: 'advanced',
    question: 'What is reconciliation in React?',
    options: [
      'A. The process of updating the DOM to match the virtual DOM',
      'B. The process of managing state',
      'C. The process of routing',
      'D. The process of styling'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'React Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a React best practice?',
    options: [
      'A. Use functional components with hooks',
      'B. Use PropTypes or TypeScript',
      'C. Keep components small and focused',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'React Future',
    difficulty: 'advanced',
    question: 'What is a trend in React development?',
    options: [
      'A. React Server Components',
      'B. Concurrent Mode',
      'C. Suspense',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  }
];

export default questions;