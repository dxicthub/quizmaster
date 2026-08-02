export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'JavaScript Variables',
    difficulty: 'easy',
    question: 'Which keyword is used to declare a constant variable in JavaScript?',
    options: [
      'A. const',
      'B. let',
      'C. var',
      'D. constant'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'JavaScript Variables',
    difficulty: 'easy',
    question: 'What is the difference between let and var?',
    options: [
      'A. let is block-scoped, var is function-scoped',
      'B. let is function-scoped, var is block-scoped',
      'C. let and var are the same',
      'D. let cannot be reassigned'
    ],
    correctAnswer: 'A'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'JavaScript Data Types',
    difficulty: 'easy',
    question: 'Which of the following is NOT a primitive data type in JavaScript?',
    options: [
      'A. Object',
      'B. String',
      'C. Number',
      'D. Boolean'
    ],
    correctAnswer: 'A'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'JavaScript Functions',
    difficulty: 'easy',
    question: 'What is a function in JavaScript?',
    options: [
      'A. A block of reusable code that performs a specific task',
      'B. A variable that holds multiple values',
      'C. A conditional statement',
      'D. A loop structure'
    ],
    correctAnswer: 'A'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'JavaScript Arrow Functions',
    difficulty: 'easy',
    question: 'What is the syntax for an arrow function in JavaScript?',
    options: [
      'A. () => {}',
      'B. function() {}',
      'C. => () {}',
      'D. function => {}'
    ],
    correctAnswer: 'A'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'JavaScript Hoisting',
    difficulty: 'medium',
    question: 'What is hoisting in JavaScript?',
    options: [
      'A. The behavior where variable and function declarations are moved to the top of their scope',
      'B. A feature that allows functions to be called before they are defined',
      'C. A method of optimizing code performance',
      'D. A way to declare variables'
    ],
    correctAnswer: 'A'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'JavaScript Closures',
    difficulty: 'medium',
    question: 'What is a closure in JavaScript?',
    options: [
      'A. A function that has access to its own scope, the outer function\'s scope, and the global scope',
      'B. A function that closes over its own variables',
      'C. A function that cannot access outer variables',
      'D. A function that returns a function'
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'JavaScript Promises',
    difficulty: 'medium',
    question: 'What is a Promise in JavaScript?',
    options: [
      'A. An object representing the eventual completion or failure of an asynchronous operation',
      'B. A synchronous operation result',
      'C. A function that returns a value immediately',
      'D. A way to handle errors'
    ],
    correctAnswer: 'A'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'JavaScript Async/Await',
    difficulty: 'medium',
    question: 'What does the async keyword do in JavaScript?',
    options: [
      'A. It defines an asynchronous function that returns a Promise',
      'B. It makes a function run faster',
      'C. It ensures a function runs synchronously',
      'D. It optimizes function performance'
    ],
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'JavaScript Classes',
    difficulty: 'medium',
    question: 'What is a class in JavaScript?',
    options: [
      'A. A template for creating objects with shared properties and methods',
      'B. A function that returns an object',
      'C. A data type',
      'D. A way to organize code'
    ],
    correctAnswer: 'A'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'JavaScript Spread Operator',
    difficulty: 'medium',
    question: 'What does the spread operator (...) do in JavaScript?',
    options: [
      'A. It expands an iterable into individual elements',
      'B. It creates a new array from an existing one',
      'C. It merges objects',
      'D. It copies arrays'
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'JavaScript Destructuring',
    difficulty: 'medium',
    question: 'What is destructuring in JavaScript?',
    options: [
      'A. A way to unpack values from arrays or properties from objects into distinct variables',
      'B. A way to destroy objects',
      'C. A method for deleting properties from objects',
      'D. A way to clone objects'
    ],
    correctAnswer: 'A'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'JavaScript Map vs Object',
    difficulty: 'medium',
    question: 'What is the difference between a Map and an Object in JavaScript?',
    options: [
      'A. Map maintains insertion order and accepts any type as keys; Object keys are limited to strings',
      'B. Map and Object are the same',
      'C. Object is faster than Map',
      'D. Map cannot be iterated'
    ],
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'JavaScript Event Loop',
    difficulty: 'medium',
    question: 'What is the event loop in JavaScript?',
    options: [
      'A. A mechanism that handles asynchronous callbacks by managing the call stack and task queue',
      'B. A loop that runs forever',
      'C. A way to handle events',
      'D. A performance optimization tool'
    ],
    correctAnswer: 'A'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'JavaScript This Keyword',
    difficulty: 'medium',
    question: 'What does the `this` keyword refer to in JavaScript?',
    options: [
      'A. The current execution context, which depends on how a function is called',
      'B. The global object',
      'C. The function itself',
      'D. The parent object'
    ],
    correctAnswer: 'A'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'JavaScript Prototypes',
    difficulty: 'medium',
    question: 'What is a prototype in JavaScript?',
    options: [
      'A. An object from which other objects inherit properties and methods',
      'B. A class definition',
      'C. A constructor function',
      'D. A type of object'
    ],
    correctAnswer: 'A'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'JavaScript Callback Functions',
    difficulty: 'medium',
    question: 'What is a callback function in JavaScript?',
    options: [
      'A. A function passed as an argument to another function',
      'B. A function that is called back after execution',
      'C. A function that returns a value',
      'D. A function that is called recursively'
    ],
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'JavaScript Higher-Order Functions',
    difficulty: 'advanced',
    question: 'What is a higher-order function in JavaScript?',
    options: [
      'A. A function that takes a function as an argument or returns a function',
      'B. A function that is defined inside another function',
      'C. A function that has multiple parameters',
      'D. A function that is optimized for performance'
    ],
    correctAnswer: 'A'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'JavaScript Error Handling',
    difficulty: 'medium',
    question: 'How do you handle errors in JavaScript?',
    options: [
      'A. Using try-catch blocks',
      'B. Using if-else statements',
      'C. Using switch statements',
      'D. Using error codes'
    ],
    correctAnswer: 'A'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'JavaScript Modules',
    difficulty: 'medium',
    question: 'What is the purpose of modules in JavaScript?',
    options: [
      'A. To organize code into reusable, maintainable units with their own scope',
      'B. To make code run faster',
      'C. To reduce file size',
      'D. To enable multi-threading'
    ],
    correctAnswer: 'A'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'JavaScript Template Literals',
    difficulty: 'easy',
    question: 'What is a template literal in JavaScript?',
    options: [
      'A. A string literal that allows embedded expressions and multi-line strings',
      'B. A type of variable',
      'C. A template for functions',
      'D. A way to format strings'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'JavaScript Set vs Array',
    difficulty: 'medium',
    question: 'What is the difference between a Set and an Array in JavaScript?',
    options: [
      'A. Set stores unique values; Array can have duplicates',
      'B. Set and Array are the same',
      'C. Array is faster than Set',
      'D. Set cannot be iterated'
    ],
    correctAnswer: 'A'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'JavaScript Generators',
    difficulty: 'advanced',
    question: 'What is a generator function in JavaScript?',
    options: [
      'A. A function that can be paused and resumed, yielding multiple values',
      'B. A function that generates random numbers',
      'C. A function that creates objects',
      'D. A function that runs indefinitely'
    ],
    correctAnswer: 'A'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'JavaScript Decorators',
    difficulty: 'advanced',
    question: 'What are decorators in JavaScript?',
    options: [
      'A. A design pattern for adding behavior to functions or classes without modifying their structure',
      'B. A way to decorate objects',
      'C. A type of function',
      'D. A method of styling code'
    ],
    correctAnswer: 'A'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'JavaScript Proxy',
    difficulty: 'advanced',
    question: 'What is a Proxy in JavaScript?',
    options: [
      'A. An object that wraps another object and intercepts operations on it',
      'B. A network proxy',
      'C. A class that creates objects',
      'D. A function that intercepts events'
    ],
    correctAnswer: 'A'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'JavaScript Object.assign',
    difficulty: 'medium',
    question: 'What does Object.assign do in JavaScript?',
    options: [
      'A. It copies properties from one or more source objects to a target object',
      'B. It creates a new object',
      'C. It deletes properties from an object',
      'D. It merges arrays'
    ],
    correctAnswer: 'A'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'JavaScript Array Methods',
    difficulty: 'medium',
    question: 'What does the map() method do in JavaScript?',
    options: [
      'A. It creates a new array by applying a function to each element of the original array',
      'B. It filters an array based on a condition',
      'C. It reduces an array to a single value',
      'D. It sorts an array'
    ],
    correctAnswer: 'A'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'JavaScript Array Methods',
    difficulty: 'medium',
    question: 'What does the filter() method do in JavaScript?',
    options: [
      'A. It creates a new array with elements that pass a test function',
      'B. It creates a new array by applying a function to each element',
      'C. It reduces an array to a single value',
      'D. It sorts an array'
    ],
    correctAnswer: 'A'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'JavaScript Array Methods',
    difficulty: 'medium',
    question: 'What does the reduce() method do in JavaScript?',
    options: [
      'A. It reduces an array to a single value by applying a function to each element',
      'B. It filters an array based on a condition',
      'C. It creates a new array by applying a function to each element',
      'D. It sorts an array'
    ],
    correctAnswer: 'A'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'JavaScript Null vs Undefined',
    difficulty: 'easy',
    question: 'What is the difference between null and undefined in JavaScript?',
    options: [
      'A. undefined means a variable has been declared but not assigned a value; null is an assigned value representing no value',
      'B. null and undefined are the same',
      'C. null is a primitive type; undefined is an object',
      'D. undefined is a keyword; null is not'
    ],
    correctAnswer: 'A'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'JavaScript JSON',
    difficulty: 'easy',
    question: 'What does JSON stand for in JavaScript?',
    options: [
      'A. JavaScript Object Notation',
      'B. JavaScript Online Notation',
      'C. JavaScript Object Network',
      'D. JavaScript Online Network'
    ],
    correctAnswer: 'A'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'JavaScript Fetch API',
    difficulty: 'medium',
    question: 'What is the Fetch API in JavaScript?',
    options: [
      'A. A modern API for making HTTP requests using Promises',
      'B. A legacy API for making HTTP requests',
      'C. A database API',
      'D. A file system API'
    ],
    correctAnswer: 'A'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'JavaScript DOM Manipulation',
    difficulty: 'medium',
    question: 'What method is used to select an element by its ID in the DOM?',
    options: [
      'A. document.getElementById()',
      'B. document.querySelector()',
      'C. document.getElementsByClassName()',
      'D. document.getElementsByTagName()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'JavaScript Event Listeners',
    difficulty: 'medium',
    question: 'How do you add an event listener to a DOM element in JavaScript?',
    options: [
      'A. Using the addEventListener() method',
      'B. Using the attachEvent() method',
      'C. Using the addEvent() method',
      'D. Using the listenEvent() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'JavaScript Local Storage',
    difficulty: 'medium',
    question: 'What is the localStorage API used for in JavaScript?',
    options: [
      'A. To store data persistently in the browser',
      'B. To store data temporarily in memory',
      'C. To store data on the server',
      'D. To store data in cookies'
    ],
    correctAnswer: 'A'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'JavaScript Cookies',
    difficulty: 'medium',
    question: 'What is a cookie in JavaScript?',
    options: [
      'A. A small piece of data stored on the user\'s computer by the web browser',
      'B. A type of variable',
      'C. A function that returns a value',
      'D. A method of handling errors'
    ],
    correctAnswer: 'A'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'JavaScript Timers',
    difficulty: 'medium',
    question: 'What is the purpose of the setTimeout() function in JavaScript?',
    options: [
      'A. To execute a function after a specified delay',
      'B. To execute a function repeatedly at specified intervals',
      'C. To set a timer for a function',
      'D. To stop a function from executing'
    ],
    correctAnswer: 'A'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'JavaScript Timers',
    difficulty: 'medium',
    question: 'What is the purpose of the setInterval() function in JavaScript?',
    options: [
      'A. To execute a function repeatedly at specified intervals',
      'B. To execute a function after a specified delay',
      'C. To set a timer for a function',
      'D. To stop a function from executing'
    ],
    correctAnswer: 'A'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'JavaScript String Methods',
    difficulty: 'easy',
    question: 'What method is used to convert a string to uppercase in JavaScript?',
    options: [
      'A. toUpperCase()',
      'B. upperCase()',
      'C. toUpper()',
      'D. toUpperCaseString()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'JavaScript Array Methods',
    difficulty: 'easy',
    question: 'What method is used to add an element to the end of an array in JavaScript?',
    options: [
      'A. push()',
      'B. pop()',
      'C. shift()',
      'D. unshift()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'JavaScript Array Methods',
    difficulty: 'easy',
    question: 'What method is used to remove the last element from an array in JavaScript?',
    options: [
      'A. pop()',
      'B. push()',
      'C. shift()',
      'D. unshift()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'JavaScript Spread vs Rest',
    difficulty: 'advanced',
    question: 'What is the difference between the spread and rest operators in JavaScript?',
    options: [
      'A. Spread expands an iterable into elements; rest collects multiple elements into an array',
      'B. Spread and rest are the same',
      'C. Spread is used for objects; rest is used for arrays',
      'D. Spread is used for arrays; rest is used for objects'
    ],
    correctAnswer: 'A'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'JavaScript Symbol',
    difficulty: 'advanced',
    question: 'What is a Symbol in JavaScript?',
    options: [
      'A. A unique and immutable primitive value used as an object key',
      'B. A type of variable',
      'C. A function that returns a value',
      'D. A method of handling errors'
    ],
    correctAnswer: 'A'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'JavaScript WeakMap',
    difficulty: 'advanced',
    question: 'What is a WeakMap in JavaScript?',
    options: [
      'A. A collection of key-value pairs where keys are weakly referenced',
      'B. A type of Map',
      'C. A collection of unique values',
      'D. A type of Set'
    ],
    correctAnswer: 'A'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'JavaScript WeakSet',
    difficulty: 'advanced',
    question: 'What is a WeakSet in JavaScript?',
    options: [
      'A. A collection of objects where objects are weakly referenced',
      'B. A type of Set',
      'C. A collection of unique values',
      'D. A type of Map'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'JavaScript Private Fields',
    difficulty: 'advanced',
    question: 'How do you define a private field in a JavaScript class?',
    options: [
      'A. Using the # prefix',
      'B. Using the private keyword',
      'C. Using the _ prefix',
      'D. Using the var keyword'
    ],
    correctAnswer: 'A'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'JavaScript Static Methods',
    difficulty: 'medium',
    question: 'What is a static method in a JavaScript class?',
    options: [
      'A. A method that belongs to the class itself, not to instances of the class',
      'B. A method that cannot be changed',
      'C. A method that is called on an instance',
      'D. A method that is called automatically'
    ],
    correctAnswer: 'A'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'JavaScript Getters and Setters',
    difficulty: 'medium',
    question: 'What are getters and setters in JavaScript?',
    options: [
      'A. Methods that allow you to define how properties are accessed and modified',
      'B. Methods that get and set values',
      'C. Functions that return values',
      'D. Functions that set values'
    ],
    correctAnswer: 'A'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'JavaScript BigInt',
    difficulty: 'advanced',
    question: 'What is BigInt in JavaScript?',
    options: [
      'A. A primitive type for representing integers with arbitrary precision',
      'B. A type of number',
      'C. A type of object',
      'D. A type of string'
    ],
    correctAnswer: 'A'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'JavaScript Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a JavaScript best practice?',
    options: [
      'A. Use const and let instead of var',
      'B. Use var for all variable declarations',
      'C. Write all code in a single file',
      'D. Avoid using functions'
    ],
    correctAnswer: 'A'
  }
];

export default questions;