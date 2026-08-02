export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'React Installation',
    difficulty: 'easy',
    question: 'How do you create a new React app?',
    options: [
      'A. npx create-react-app my-app',
      'B. npm create-react-app my-app',
      'C. npx create-react my-app',
      'D. npm create-react my-app'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'React Installation',
    difficulty: 'easy',
    question: 'What is the command to start a React development server?',
    options: [
      'A. npm start',
      'B. npm run dev',
      'C. npm run start',
      'D. npm serve'
    ],
    correctAnswer: 'A'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'React Installation',
    difficulty: 'easy',
    question: 'What is the command to build a React app for production?',
    options: [
      'A. npm run build',
      'B. npm build',
      'C. npm run prod',
      'D. npm production'
    ],
    correctAnswer: 'A'
  },
  {
    id: 4,
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
    id: 5,
    type: 'multiple-choice',
    objective: 'React Components',
    difficulty: 'easy',
    question: 'What are the two types of React components?',
    options: [
      'A. Functional and Class',
      'B. Stateful and Stateless',
      'C. Presentational and Container',
      'D. Smart and Dumb'
    ],
    correctAnswer: 'A'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'React Functional Components',
    difficulty: 'easy',
    question: 'What is a functional component in React?',
    options: [
      'A. A JavaScript function that returns JSX',
      'B. A JavaScript class that extends Component',
      'C. A function that returns HTML',
      'D. A class that returns JSX'
    ],
    correctAnswer: 'A'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'React Class Components',
    difficulty: 'easy',
    question: 'What is a class component in React?',
    options: [
      'A. A JavaScript class that extends React.Component',
      'B. A JavaScript function that returns JSX',
      'C. A class that returns HTML',
      'D. A function that returns HTML'
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'React Props',
    difficulty: 'easy',
    question: 'What are props in React?',
    options: [
      'A. Read-only data passed from parent to child',
      'B. Mutable data passed from parent to child',
      'C. Internal component state',
      'D. Data stored in the database'
    ],
    correctAnswer: 'A'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'React Props',
    difficulty: 'easy',
    question: 'How do you pass props to a child component?',
    options: [
      'A. <Child propName="value" />',
      'B. <Child {propName: "value"} />',
      'C. <Child props={propName: "value"} />',
      'D. <Child value="propName" />'
    ],
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'React State',
    difficulty: 'easy',
    question: 'What is state in React?',
    options: [
      'A. Data that can change over time within a component',
      'B. Data that is passed from parent to child',
      'C. Data that is stored in the database',
      'D. Data that never changes'
    ],
    correctAnswer: 'A'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'React useState Hook',
    difficulty: 'easy',
    question: 'Which hook is used to manage state in functional components?',
    options: [
      'A. useState',
      'B. useEffect',
      'C. useContext',
      'D. useReducer'
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'React useState Hook',
    difficulty: 'easy',
    question: 'What is the syntax for useState?',
    options: [
      'A. const [state, setState] = useState(initialValue)',
      'B. const [state, setState] = useState({})',
      'C. const state = useState(initialValue)',
      'D. const [state] = useState(initialValue)'
    ],
    correctAnswer: 'A'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'React Props vs State',
    difficulty: 'medium',
    question: 'What is the difference between props and state?',
    options: [
      'A. Props are read-only, state is mutable',
      'B. State is read-only, props are mutable',
      'C. Both are mutable',
      'D. Both are read-only'
    ],
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'React Event Handling',
    difficulty: 'medium',
    question: 'How do you handle events in React?',
    options: [
      'A. Using camelCase event handlers',
      'B. Using lowercase event handlers',
      'C. Using inline event handlers',
      'D. Using addEventListener'
    ],
    correctAnswer: 'A'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'React Event Handling',
    difficulty: 'medium',
    question: 'What is the correct way to handle a click event in React?',
    options: [
      'A. onClick={handleClick}',
      'B. onclick={handleClick}',
      'C. onClick={handleClick()}',
      'D. onclick={handleClick()}'
    ],
    correctAnswer: 'A'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'React JSX',
    difficulty: 'easy',
    question: 'What is JSX?',
    options: [
      'A. A JavaScript extension that allows writing HTML-like syntax in JavaScript',
      'B. A separate templating language',
      'C. A CSS preprocessor',
      'D. A database query language'
    ],
    correctAnswer: 'A'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'React JSX Rules',
    difficulty: 'medium',
    question: 'What is a rule of JSX?',
    options: [
      'A. Components must return a single parent element',
      'B. Components can return multiple elements',
      'C. JSX must be written in uppercase',
      'D. JSX cannot include JavaScript expressions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'React Fragments',
    difficulty: 'medium',
    question: 'What is the purpose of React Fragments?',
    options: [
      'A. To group elements without adding extra nodes to the DOM',
      'B. To create fragments of code',
      'C. To split components into smaller pieces',
      'D. To manage state across multiple components'
    ],
    correctAnswer: 'A'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'React Conditional Rendering',
    difficulty: 'medium',
    question: 'How do you conditionally render in React?',
    options: [
      'A. Using ternary operators',
      'B. Using if statements',
      'C. Using logical && operator',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'React Lists and Keys',
    difficulty: 'medium',
    question: 'Why are keys important when rendering lists?',
    options: [
      'A. They help React identify which items have changed',
      'B. They are used for styling',
      'C. They improve performance',
      'D. They are required for list rendering'
    ],
    correctAnswer: 'A'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'React Keys',
    difficulty: 'medium',
    question: 'What should be used as the key prop?',
    options: [
      'A. A unique identifier',
      'B. The array index',
      'C. The item value',
      'D. A random number'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'React Forms',
    difficulty: 'medium',
    question: 'What is a controlled component in React?',
    options: [
      'A. A component whose form data is controlled by React state',
      'B. A component that is controlled by the browser',
      'C. A component that cannot be changed',
      'D. A component that uses refs'
    ],
    correctAnswer: 'A'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'React Forms',
    difficulty: 'medium',
    question: 'What is an uncontrolled component in React?',
    options: [
      'A. A component that maintains its own internal state',
      'B. A component that is controlled by React state',
      'C. A component that cannot be changed',
      'D. A component that uses refs only'
    ],
    correctAnswer: 'A'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'React Refs',
    difficulty: 'medium',
    question: 'What is the purpose of refs in React?',
    options: [
      'A. To directly access DOM elements',
      'B. To manage component state',
      'C. To pass data between components',
      'D. To handle routing'
    ],
    correctAnswer: 'A'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'React useEffect Hook',
    difficulty: 'medium',
    question: 'What is the purpose of useEffect?',
    options: [
      'A. To perform side effects in functional components',
      'B. To manage state',
      'C. To create context',
      'D. To optimize performance'
    ],
    correctAnswer: 'A'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'React useEffect Dependencies',
    difficulty: 'medium',
    question: 'What does the dependency array in useEffect control?',
    options: [
      'A. When the effect runs',
      'B. The order of execution',
      'C. The priority of the effect',
      'D. The memory usage of the effect'
    ],
    correctAnswer: 'A'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'React Context API',
    difficulty: 'medium',
    question: 'What is the Context API used for?',
    options: [
      'A. To share data across the component tree without prop drilling',
      'B. To manage component state',
      'C. To handle routing',
      'D. To style components'
    ],
    correctAnswer: 'A'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'React useContext Hook',
    difficulty: 'medium',
    question: 'What is the syntax for useContext?',
    options: [
      'A. const value = useContext(MyContext)',
      'B. const value = use(MyContext)',
      'C. const value = context(MyContext)',
      'D. const value = MyContext.use()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'React useReducer Hook',
    difficulty: 'advanced',
    question: 'When should you use useReducer instead of useState?',
    options: [
      'A. When state logic is complex',
      'B. When state depends on previous state',
      'C. When you have multiple sub-values',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'React useCallback Hook',
    difficulty: 'advanced',
    question: 'What is the purpose of useCallback?',
    options: [
      'A. To memoize functions',
      'B. To memoize values',
      'C. To handle side effects',
      'D. To manage state'
    ],
    correctAnswer: 'A'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'React useMemo Hook',
    difficulty: 'advanced',
    question: 'What is the purpose of useMemo?',
    options: [
      'A. To memoize expensive calculations',
      'B. To memoize functions',
      'C. To handle side effects',
      'D. To manage state'
    ],
    correctAnswer: 'A'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'React Custom Hooks',
    difficulty: 'advanced',
    question: 'What is a custom hook?',
    options: [
      'A. A reusable function that uses React hooks',
      'B. A built-in React hook',
      'C. A hook for class components',
      'D. A hook that modifies the DOM'
    ],
    correctAnswer: 'A'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'React Router',
    difficulty: 'advanced',
    question: 'What is React Router used for?',
    options: [
      'A. Client-side routing',
      'B. Server-side routing',
      'C. State management',
      'D. API calls'
    ],
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'React Router Components',
    difficulty: 'advanced',
    question: 'Which component is used to define routes in React Router?',
    options: [
      'A. Route',
      'B. Link',
      'C. BrowserRouter',
      'D. Switch'
    ],
    correctAnswer: 'A'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'React Router Link',
    difficulty: 'advanced',
    question: 'What is the purpose of the Link component?',
    options: [
      'A. To navigate between routes',
      'B. To define routes',
      'C. To handle route parameters',
      'D. To redirect users'
    ],
    correctAnswer: 'A'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'React Hooks Rules',
    difficulty: 'medium',
    question: 'What is a rule of React Hooks?',
    options: [
      'A. Hooks must be called at the top level',
      'B. Hooks can be called inside loops',
      'C. Hooks can be called inside conditions',
      'D. Hooks can be called inside nested functions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'React State Immutability',
    difficulty: 'medium',
    question: 'Why should state be treated as immutable?',
    options: [
      'A. To ensure predictable updates',
      'B. To improve performance',
      'C. To reduce memory usage',
      'D. To improve readability'
    ],
    correctAnswer: 'A'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'React Lifecycle Methods',
    difficulty: 'medium',
    question: 'What is the purpose of componentDidMount?',
    options: [
      'A. To run code after the component is mounted',
      'B. To run code before the component is mounted',
      'C. To run code before the component is updated',
      'D. To run code after the component is unmounted'
    ],
    correctAnswer: 'A'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'React Lifecycle Methods',
    difficulty: 'medium',
    question: 'What is the purpose of componentWillUnmount?',
    options: [
      'A. To clean up before the component is unmounted',
      'B. To clean up after the component is mounted',
      'C. To clean up before the component is updated',
      'D. To clean up after the component is updated'
    ],
    correctAnswer: 'A'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'React Error Boundaries',
    difficulty: 'advanced',
    question: 'What is an Error Boundary?',
    options: [
      'A. A component that catches JavaScript errors in its child tree',
      'B. A component that prevents errors',
      'C. A component that validates props',
      'D. A component that limits access'
    ],
    correctAnswer: 'A'
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'React Lazy Loading',
    difficulty: 'advanced',
    question: 'What is React.lazy used for?',
    options: [
      'A. To lazy load components',
      'B. To lazy load data',
      'C. To lazy load styles',
      'D. To lazy load assets'
    ],
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'React Suspense',
    difficulty: 'advanced',
    question: 'What is React Suspense used for?',
    options: [
      'A. To handle loading states',
      'B. To handle error states',
      'C. To manage state',
      'D. To optimize performance'
    ],
    correctAnswer: 'A'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'React Portals',
    difficulty: 'advanced',
    question: 'What is the purpose of React Portals?',
    options: [
      'A. To render children into a different part of the DOM',
      'B. To render children outside the DOM',
      'C. To render children on the server',
      'D. To render children in a virtual DOM'
    ],
    correctAnswer: 'A'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'React Strict Mode',
    difficulty: 'medium',
    question: 'What is React Strict Mode used for?',
    options: [
      'A. To highlight potential problems',
      'B. To enforce strict coding standards',
      'C. To optimize performance',
      'D. To manage state'
    ],
    correctAnswer: 'A'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'React PropTypes',
    difficulty: 'medium',
    question: 'What is the purpose of PropTypes?',
    options: [
      'A. To validate props types',
      'B. To optimize performance',
      'C. To handle state',
      'D. To handle routing'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'React Code Splitting',
    difficulty: 'advanced',
    question: 'What is code splitting in React?',
    options: [
      'A. Splitting the bundle into smaller chunks',
      'B. Splitting components into smaller pieces',
      'C. Splitting state across components',
      'D. Splitting code into files'
    ],
    correctAnswer: 'A'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'React Performance',
    difficulty: 'advanced',
    question: 'What is a performance optimization in React?',
    options: [
      'A. Using React.memo',
      'B. Using useMemo',
      'C. Using useCallback',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'React React.memo',
    difficulty: 'advanced',
    question: 'What is the purpose of React.memo?',
    options: [
      'A. To memoize component rendering',
      'B. To memoize functions',
      'C. To memoize values',
      'D. To handle side effects'
    ],
    correctAnswer: 'A'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'React Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a React best practice?',
    options: [
      'A. Keep components small and focused',
      'B. Use functional components with hooks',
      'C. Use proper prop types or TypeScript',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'React Future',
    difficulty: 'advanced',
    question: 'What is a trend in React development?',
    options: [
      'A. Server Components',
      'B. Server Actions',
      'C. React 19 features',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  }
];

export default questions;