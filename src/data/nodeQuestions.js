export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Node.js Fundamentals',
    difficulty: 'easy',
    question: 'What is Node.js?',
    options: [
      'A. A JavaScript runtime built on Chrome\'s V8 engine',
      'B. A frontend framework',
      'C. A database management system',
      'D. A CSS preprocessor'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Node.js Modules',
    difficulty: 'easy',
    question: 'Which of the following is a core module in Node.js?',
    options: [
      'A. fs',
      'B. react',
      'C. angular',
      'D. vue'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Node.js Modules',
    difficulty: 'easy',
    question: 'How do you import a module in Node.js?',
    options: [
      'A. require(\'module\')',
      'B. import module from \'module\'',
      'C. include(\'module\')',
      'D. load(\'module\')'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Node.js Event Loop',
    difficulty: 'medium',
    question: 'What is the event loop in Node.js?',
    options: [
      'A. A mechanism that handles asynchronous operations by managing the call stack and task queue',
      'B. A loop that runs forever',
      'C. A way to handle events',
      'D. A performance optimization tool'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Node.js Callbacks',
    difficulty: 'medium',
    question: 'What is a callback in Node.js?',
    options: [
      'A. A function passed as an argument to another function to be executed later',
      'B. A function that is called back after execution',
      'C. A function that returns a value',
      'D. A function that is called recursively'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Node.js Promises',
    difficulty: 'medium',
    question: 'What is a Promise in Node.js?',
    options: [
      'A. An object representing the eventual completion or failure of an asynchronous operation',
      'B. A synchronous operation result',
      'C. A function that returns a value immediately',
      'D. A way to handle errors'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Node.js Async/Await',
    difficulty: 'medium',
    question: 'What does the async keyword do in Node.js?',
    options: [
      'A. It defines an asynchronous function that returns a Promise',
      'B. It makes a function run faster',
      'C. It ensures a function runs synchronously',
      'D. It optimizes function performance'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Node.js Error Handling',
    difficulty: 'medium',
    question: 'What is the best practice for handling errors in Node.js?',
    options: [
      'A. Using try-catch blocks with async/await',
      'B. Using error-first callbacks',
      'C. Using promises with .catch()',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Node.js File System',
    difficulty: 'medium',
    question: 'Which module is used to work with the file system in Node.js?',
    options: [
      'A. fs',
      'B. path',
      'C. os',
      'D. http'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Node.js Path Module',
    difficulty: 'medium',
    question: 'What is the purpose of the path module in Node.js?',
    options: [
      'A. To work with file and directory paths',
      'B. To create HTTP servers',
      'C. To manage operating system information',
      'D. To handle file streams'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Node.js OS Module',
    difficulty: 'medium',
    question: 'What is the purpose of the os module in Node.js?',
    options: [
      'A. To provide operating system-related utility methods and properties',
      'B. To create HTTP servers',
      'C. To manage file system operations',
      'D. To handle path operations'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Node.js HTTP Module',
    difficulty: 'medium',
    question: 'How do you create an HTTP server in Node.js?',
    options: [
      'A. Using the http.createServer() method',
      'B. Using the http.Server() constructor',
      'C. Using the http.listen() method',
      'D. Using the http.start() method'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Node.js Event Emitter',
    difficulty: 'medium',
    question: 'What is the EventEmitter in Node.js?',
    options: [
      'A. A class that allows objects to emit and listen to events',
      'B. A class that handles HTTP requests',
      'C. A class that manages file operations',
      'D. A class that handles database connections'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Node.js Buffer',
    difficulty: 'medium',
    question: 'What is a Buffer in Node.js?',
    options: [
      'A. A global class for handling binary data',
      'B. A type of array',
      'C. A type of string',
      'D. A type of object'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Node.js Streams',
    difficulty: 'advanced',
    question: 'What is a stream in Node.js?',
    options: [
      'A. A continuous flow of data that can be processed piece by piece',
      'B. A type of buffer',
      'C. A type of array',
      'D. A type of event'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Node.js Stream Types',
    difficulty: 'advanced',
    question: 'Which of the following is NOT a type of stream in Node.js?',
    options: [
      'A. Transform',
      'B. Readable',
      'C. Writable',
      'D. Processable'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Node.js Cluster',
    difficulty: 'advanced',
    question: 'What is the purpose of the cluster module in Node.js?',
    options: [
      'A. To enable multiple Node.js instances to handle incoming connections',
      'B. To manage database connections',
      'C. To handle file operations',
      'D. To manage HTTP requests'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Node.js Child Process',
    difficulty: 'advanced',
    question: 'What is the purpose of the child_process module in Node.js?',
    options: [
      'A. To create and manage child processes',
      'B. To manage child components',
      'C. To handle child routes',
      'D. To manage child events'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Node.js Worker Threads',
    difficulty: 'advanced',
    question: 'What is the purpose of worker threads in Node.js?',
    options: [
      'A. To enable multi-threading in Node.js applications',
      'B. To manage worker processes',
      'C. To handle worker events',
      'D. To manage worker data'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Node.js Environment Variables',
    difficulty: 'medium',
    question: 'How do you access environment variables in Node.js?',
    options: [
      'A. Using process.env',
      'B. Using require(\'env\')',
      'C. Using import env from \'env\'',
      'D. Using process.env.VARIABLE'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Node.js Process Object',
    difficulty: 'medium',
    question: 'What is the process object in Node.js?',
    options: [
      'A. A global object that provides information about the current Node.js process',
      'B. A module for managing processes',
      'C. A class for creating processes',
      'D. A function for handling processes'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Node.js Package Management',
    difficulty: 'easy',
    question: 'What is the purpose of npm in Node.js?',
    options: [
      'A. To manage packages and dependencies for Node.js projects',
      'B. To run Node.js applications',
      'C. To debug Node.js applications',
      'D. To test Node.js applications'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Node.js Package.json',
    difficulty: 'easy',
    question: 'What is the purpose of the package.json file in Node.js?',
    options: [
      'A. To define project metadata and dependencies',
      'B. To define project styles',
      'C. To define project tests',
      'D. To define project routes'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Node.js Debugging',
    difficulty: 'medium',
    question: 'How do you enable debugging in Node.js?',
    options: [
      'A. Using the --inspect flag',
      'B. Using the --debug flag',
      'C. Using the --trace flag',
      'D. Using the --log flag'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Node.js Performance',
    difficulty: 'advanced',
    question: 'What is the purpose of the Node.js performance hooks?',
    options: [
      'A. To measure and analyze application performance',
      'B. To improve application performance',
      'C. To optimize application code',
      'D. To monitor application memory'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Node.js Memory Management',
    difficulty: 'advanced',
    question: 'What is the purpose of garbage collection in Node.js?',
    options: [
      'A. To automatically free up memory that is no longer in use',
      'B. To collect garbage data',
      'C. To manage memory allocation',
      'D. To optimize memory usage'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Node.js Crypto',
    difficulty: 'advanced',
    question: 'What is the purpose of the crypto module in Node.js?',
    options: [
      'A. To provide cryptographic functionality like hashing and encryption',
      'B. To handle cryptocurrency operations',
      'C. To manage cryptographic keys',
      'D. To handle secure connections'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Node.js Zlib',
    difficulty: 'advanced',
    question: 'What is the purpose of the zlib module in Node.js?',
    options: [
      'A. To provide compression and decompression functionality',
      'B. To handle zip files',
      'C. To manage compressed data',
      'D. To handle file compression'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Node.js Net Module',
    difficulty: 'advanced',
    question: 'What is the purpose of the net module in Node.js?',
    options: [
      'A. To provide networking functionality for creating TCP servers and clients',
      'B. To handle HTTP requests',
      'C. To manage network connections',
      'D. To handle network events'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Node.js DNS Module',
    difficulty: 'advanced',
    question: 'What is the purpose of the dns module in Node.js?',
    options: [
      'A. To provide DNS lookup and resolution functionality',
      'B. To manage DNS records',
      'C. To handle DNS requests',
      'D. To configure DNS settings'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Node.js Timing',
    difficulty: 'medium',
    question: 'What is the purpose of setImmediate in Node.js?',
    options: [
      'A. To execute a function after the current event loop cycle completes',
      'B. To execute a function immediately',
      'C. To execute a function after a specified delay',
      'D. To execute a function at regular intervals'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Node.js Timing',
    difficulty: 'medium',
    question: 'What is the difference between setImmediate and process.nextTick?',
    options: [
      'A. setImmediate runs after the current event loop cycle; process.nextTick runs before',
      'B. setImmediate and process.nextTick are the same',
      'C. process.nextTick runs after the current event loop cycle',
      'D. setImmediate runs before the current event loop cycle'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Node.js Global Objects',
    difficulty: 'medium',
    question: 'Which of the following is a global object in Node.js?',
    options: [
      'A. global',
      'B. window',
      'C. document',
      'D. localStorage'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Node.js Console',
    difficulty: 'easy',
    question: 'What is the purpose of the console object in Node.js?',
    options: [
      'A. To output messages to the standard output and standard error',
      'B. To manage console logs',
      'C. To handle console input',
      'D. To configure console settings'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Node.js Error Classes',
    difficulty: 'medium',
    question: 'What is the purpose of the Error class in Node.js?',
    options: [
      'A. To create and handle error objects',
      'B. To manage error messages',
      'C. To handle error events',
      'D. To configure error settings'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Node.js URL Module',
    difficulty: 'medium',
    question: 'What is the purpose of the url module in Node.js?',
    options: [
      'A. To parse and format URL strings',
      'B. To handle URL requests',
      'C. To manage URL parameters',
      'D. To configure URL settings'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Node.js Query String Module',
    difficulty: 'medium',
    question: 'What is the purpose of the querystring module in Node.js?',
    options: [
      'A. To parse and format query strings',
      'B. To handle query requests',
      'C. To manage query parameters',
      'D. To configure query settings'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Node.js Assert Module',
    difficulty: 'advanced',
    question: 'What is the purpose of the assert module in Node.js?',
    options: [
      'A. To provide assertion functions for testing',
      'B. To handle assertions in code',
      'C. To manage assertion errors',
      'D. To configure assertion settings'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Node.js REPL',
    difficulty: 'medium',
    question: 'What is the REPL in Node.js?',
    options: [
      'A. A Read-Eval-Print-Loop interactive environment for executing JavaScript',
      'B. A type of loop',
      'C. A way to evaluate code',
      'D. A way to print output'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Node.js Debugger',
    difficulty: 'advanced',
    question: 'What is the purpose of the Node.js debugger?',
    options: [
      'A. To debug Node.js applications',
      'B. To manage debugging settings',
      'C. To handle debugging events',
      'D. To configure debugging options'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Node.js Process Signals',
    difficulty: 'advanced',
    question: 'What are process signals in Node.js?',
    options: [
      'A. Messages sent to a process to notify it of events or request actions',
      'B. A type of event',
      'C. A type of message',
      'D. A type of signal'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Node.js Exit Codes',
    difficulty: 'advanced',
    question: 'What is the purpose of exit codes in Node.js?',
    options: [
      'A. To indicate the success or failure of a process',
      'B. To manage process exits',
      'C. To handle exit events',
      'D. To configure exit settings'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Node.js Load Balancing',
    difficulty: 'advanced',
    question: 'How can you implement load balancing in Node.js?',
    options: [
      'A. Using the cluster module',
      'B. Using the worker_threads module',
      'C. Using the child_process module',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Node.js Security',
    difficulty: 'advanced',
    question: 'What is a common security best practice in Node.js?',
    options: [
      'A. Sanitize user input',
      'B. Use HTTPS',
      'C. Keep dependencies updated',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Node.js Environment',
    difficulty: 'easy',
    question: 'What is the default port for HTTP servers in Node.js?',
    options: [
      'A. 80',
      'B. 443',
      'C. 3000',
      'D. 8080'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Node.js Express',
    difficulty: 'medium',
    question: 'What is Express.js in the Node.js ecosystem?',
    options: [
      'A. A web application framework for Node.js',
      'B. A database library',
      'C. A testing framework',
      'D. A build tool'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Node.js Middleware',
    difficulty: 'medium',
    question: 'What is middleware in Express?',
    options: [
      'A. Functions that have access to the request and response objects',
      'B. A type of database connection',
      'C. A type of routing',
      'D. A type of error handling'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Node.js REST API',
    difficulty: 'medium',
    question: 'What is a REST API in Node.js?',
    options: [
      'A. An API that follows REST architectural principles',
      'B. A type of database',
      'C. A type of framework',
      'D. A type of routing'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Node.js Deployment',
    difficulty: 'advanced',
    question: 'What is a common deployment strategy for Node.js applications?',
    options: [
      'A. Using PM2 for process management',
      'B. Using Docker containers',
      'C. Using a cloud platform like AWS or Vercel',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Node.js Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a Node.js best practice?',
    options: [
      'A. Use asynchronous code for I/O operations',
      'B. Handle errors properly',
      'C. Use environment variables for configuration',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;