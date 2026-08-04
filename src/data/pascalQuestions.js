export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Pascal Fundamentals',
    difficulty: 'easy',
    question: 'What is Pascal?',
    options: [
      'A. A programming language named after Blaise Pascal',
      'B. A database system',
      'C. A web framework',
      'D. A design tool'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Pascal Syntax',
    difficulty: 'easy',
    question: 'What is the correct syntax to start a Pascal program?',
    options: [
      'A. program HelloWorld;',
      'B. start Program;',
      'C. begin Program;',
      'D. main Program;'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Pascal Variables',
    difficulty: 'easy',
    question: 'Which keyword is used to declare a variable in Pascal?',
    options: [
      'A. var',
      'B. let',
      'C. dim',
      'D. declare'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Pascal Data Types',
    difficulty: 'easy',
    question: 'Which of the following is a standard data type in Pascal?',
    options: [
      'A. integer',
      'B. string',
      'C. boolean',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Pascal Constants',
    difficulty: 'easy',
    question: 'Which keyword is used to declare a constant in Pascal?',
    options: [
      'A. const',
      'B. constant',
      'C. val',
      'D. fixed'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Pascal Input/Output',
    difficulty: 'easy',
    question: 'Which command is used to read input in Pascal?',
    options: [
      'A. readln',
      'B. input',
      'C. get',
      'D. scan'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Pascal Input/Output',
    difficulty: 'easy',
    question: 'Which command is used to write output in Pascal?',
    options: [
      'A. writeln',
      'B. output',
      'C. print',
      'D. display'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Pascal Comments',
    difficulty: 'easy',
    question: 'What is the correct syntax for a single-line comment in Pascal?',
    options: [
      'A. // comment',
      'B. /* comment */',
      'C. (* comment *)',
      'D. -- comment'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Pascal Operators',
    difficulty: 'medium',
    question: 'Which operator is used for division in Pascal?',
    options: [
      'A. /',
      'B. div',
      'C. Both A and B',
      'D. //'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Pascal Operators',
    difficulty: 'medium',
    question: 'Which operator is used for integer division in Pascal?',
    options: [
      'A. div',
      'B. mod',
      'C. /',
      'D. //'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Pascal Operators',
    difficulty: 'medium',
    question: 'Which operator is used for modulus in Pascal?',
    options: [
      'A. mod',
      'B. div',
      'C. %',
      'D. rem'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Pascal Conditional Statements',
    difficulty: 'medium',
    question: 'What is the syntax for an if statement in Pascal?',
    options: [
      'A. if condition then statement',
      'B. if (condition) { statement }',
      'C. if condition: statement',
      'D. if condition -> statement'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Pascal Loops',
    difficulty: 'medium',
    question: 'What is the correct syntax for a for loop in Pascal?',
    options: [
      'A. for i := 1 to 10 do',
      'B. for (i=1; i<=10; i++)',
      'C. for i in 1..10',
      'D. for i = 1 to 10'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Pascal Loops',
    difficulty: 'medium',
    question: 'What is the correct syntax for a while loop in Pascal?',
    options: [
      'A. while condition do',
      'B. while (condition) { }',
      'C. while condition:',
      'D. while condition ->'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Pascal Loops',
    difficulty: 'medium',
    question: 'What is the correct syntax for a repeat-until loop in Pascal?',
    options: [
      'A. repeat statement until condition',
      'B. do statement until condition',
      'C. loop statement until condition',
      'D. repeat statement while condition'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Pascal Case Statement',
    difficulty: 'medium',
    question: 'What is the correct syntax for a case statement in Pascal?',
    options: [
      'A. case variable of',
      'B. switch variable of',
      'C. case variable:',
      'D. select variable of'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Pascal Functions',
    difficulty: 'medium',
    question: 'How do you define a function in Pascal?',
    options: [
      'A. function functionName(parameters): returnType;',
      'B. function functionName(parameters) { return }',
      'C. function functionName(parameters) -> returnType',
      'D. def functionName(parameters): returnType'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Pascal Procedures',
    difficulty: 'medium',
    question: 'How do you define a procedure in Pascal?',
    options: [
      'A. procedure procedureName(parameters);',
      'B. void procedureName(parameters)',
      'C. def procedureName(parameters)',
      'D. function procedureName(parameters);'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Pascal Arrays',
    difficulty: 'medium',
    question: 'How do you declare an array in Pascal?',
    options: [
      'A. array[1..10] of integer',
      'B. int[] array = new int[10]',
      'C. array(1..10) of integer',
      'D. integer array[1..10]'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Pascal Strings',
    difficulty: 'medium',
    question: 'What is the data type for strings in Pascal?',
    options: [
      'A. string',
      'B. str',
      'C. text',
      'D. char[]'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Pascal Records',
    difficulty: 'advanced',
    question: 'What is a record in Pascal?',
    options: [
      'A. A data structure that groups related fields',
      'B. A type of database',
      'C. A file format',
      'D. A programming paradigm'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Pascal Records',
    difficulty: 'advanced',
    question: 'How do you declare a record in Pascal?',
    options: [
      'A. type recordName = record',
      'B. record recordName { }',
      'C. type recordName { }',
      'D. recordName = record'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Pascal Pointers',
    difficulty: 'advanced',
    question: 'What is a pointer in Pascal?',
    options: [
      'A. A variable that stores memory addresses',
      'B. A type of array',
      'C. A type of string',
      'D. A type of record'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Pascal Pointers',
    difficulty: 'advanced',
    question: 'Which symbol is used for pointer dereferencing in Pascal?',
    options: [
      'A. ^',
      'B. *',
      'C. &',
      'D. @'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Pascal File I/O',
    difficulty: 'advanced',
    question: 'How do you assign a file in Pascal?',
    options: [
      'A. assign(file, filename)',
      'B. file = open(filename)',
      'C. open(file, filename)',
      'D. file.open(filename)'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Pascal File I/O',
    difficulty: 'advanced',
    question: 'How do you close a file in Pascal?',
    options: [
      'A. close(file)',
      'B. file.close()',
      'C. closeFile(file)',
      'D. file.closeFile()'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Pascal Units',
    difficulty: 'advanced',
    question: 'What is a unit in Pascal?',
    options: [
      'A. A module for organizing code',
      'B. A type of variable',
      'C. A type of function',
      'D. A type of procedure'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Pascal Units',
    difficulty: 'advanced',
    question: 'What is the correct syntax to use a unit in Pascal?',
    options: [
      'A. uses unitName;',
      'B. include unitName;',
      'C. import unitName;',
      'D. require unitName;'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Pascal Object-Oriented Programming',
    difficulty: 'advanced',
    question: 'Does Pascal support object-oriented programming?',
    options: [
      'A. Yes, through objects and classes',
      'B. No, it is purely procedural',
      'C. Yes, but only in older versions',
      'D. Only in Delphi'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Pascal Classes',
    difficulty: 'advanced',
    question: 'What is the syntax for defining a class in Pascal?',
    options: [
      'A. type ClassName = class',
      'B. class ClassName { }',
      'C. type ClassName = object',
      'D. class ClassName:'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Pascal Inheritance',
    difficulty: 'advanced',
    question: 'How do you implement inheritance in Pascal?',
    options: [
      'A. using the "inherits" keyword',
      'B. using the "extends" keyword',
      'C. using the "implements" keyword',
      'D. using the "inherited" keyword'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Pascal Compilers',
    difficulty: 'medium',
    question: 'What is a common Pascal compiler?',
    options: [
      'A. Free Pascal',
      'B. Turbo Pascal',
      'C. Delphi',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Pascal History',
    difficulty: 'medium',
    question: 'Who created the Pascal programming language?',
    options: [
      'A. Niklaus Wirth',
      'B. Dennis Ritchie',
      'C. James Gosling',
      'D. Bjarne Stroustrup'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Pascal History',
    difficulty: 'medium',
    question: 'In which year was Pascal created?',
    options: [
      'A. 1970',
      'B. 1972',
      'C. 1983',
      'D. 1995'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Pascal Purpose',
    difficulty: 'medium',
    question: 'What was Pascal primarily designed for?',
    options: [
      'A. Teaching programming concepts',
      'B. Web development',
      'C. Game development',
      'D. Mobile development'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Pascal Uses',
    difficulty: 'medium',
    question: 'Which of the following is a common use for Pascal?',
    options: [
      'A. Educational programming',
      'B. Scientific computing',
      'C. Business applications',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Pascal Variants',
    difficulty: 'medium',
    question: 'Which of the following is a variant of Pascal?',
    options: [
      'A. Delphi',
      'B. Object Pascal',
      'C. Free Pascal',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Pascal Typing',
    difficulty: 'medium',
    question: 'Is Pascal strongly typed or weakly typed?',
    options: [
      'A. Strongly typed',
      'B. Weakly typed',
      'C. Dynamically typed',
      'D. Not typed'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Pascal Type Safety',
    difficulty: 'medium',
    question: 'What is the benefit of strong typing in Pascal?',
    options: [
      'A. Prevents type-related errors',
      'B. Improves performance',
      'C. Reduces memory usage',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Pascal Standard Library',
    difficulty: 'advanced',
    question: 'What is the standard library in Pascal called?',
    options: [
      'A. RTL (Run-Time Library)',
      'B. Standard Library',
      'C. Base Library',
      'D. Core Library'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Pascal Modules',
    difficulty: 'advanced',
    question: 'What is the Pascal equivalent of a module?',
    options: [
      'A. Unit',
      'B. Module',
      'C. Package',
      'D. Library'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Pascal Compilation',
    difficulty: 'advanced',
    question: 'What type of compilation does Pascal use?',
    options: [
      'A. Compiled',
      'B. Interpreted',
      'C. Just-in-Time',
      'D. Both compiled and interpreted'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Pascal Cross-Platform',
    difficulty: 'advanced',
    question: 'Is Pascal cross-platform compatible?',
    options: [
      'A. Yes, through compilers like Free Pascal',
      'B. No, it is only for Windows',
      'C. Yes, but only with specific frameworks',
      'D. Only through Delphi'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Pascal vs C',
    difficulty: 'advanced',
    question: 'What is a key difference between Pascal and C?',
    options: [
      'A. Pascal has better type safety',
      'B. C has better performance',
      'C. Pascal is easier to read',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Pascal Memory Management',
    difficulty: 'advanced',
    question: 'Does Pascal have automatic memory management?',
    options: [
      'A. Yes, through reference counting',
      'B. No, manual memory management',
      'C. Yes, through garbage collection',
      'D. Only in Delphi'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Pascal Garbage Collection',
    difficulty: 'advanced',
    question: 'Which Pascal implementation has garbage collection?',
    options: [
      'A. Delphi',
      'B. Turbo Pascal',
      'C. Free Pascal',
      'D. GNU Pascal'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Pascal Community',
    difficulty: 'medium',
    question: 'Is Pascal still actively used today?',
    options: [
      'A. Yes, especially in Delphi and Lazarus',
      'B. No, it is obsolete',
      'C. Yes, only in universities',
      'D. Only in legacy systems'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Pascal Tools',
    difficulty: 'medium',
    question: 'Which integrated development environment (IDE) is commonly used for Pascal?',
    options: [
      'A. Lazarus',
      'B. Delphi',
      'C. Both A and B',
      'D. Visual Studio'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Pascal Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a Pascal best practice?',
    options: [
      'A. Use meaningful variable names',
      'B. Use comments for documentation',
      'C. Follow the "begin" and "end" conventions',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Pascal Future',
    difficulty: 'advanced',
    question: 'What is a modern use of Pascal?',
    options: [
      'A. Developing cross-platform applications with Lazarus',
      'B. Web development',
      'C. Mobile development',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;