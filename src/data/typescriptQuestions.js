export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'TypeScript Fundamentals',
    difficulty: 'easy',
    question: 'What is TypeScript?',
    options: [
      'A. A typed superset of JavaScript that compiles to plain JavaScript',
      'B. A JavaScript framework',
      'C. A database management system',
      'D. A CSS preprocessor'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'TypeScript Types',
    difficulty: 'easy',
    question: 'What is the syntax for defining a type in TypeScript?',
    options: [
      'A. type Name = string',
      'B. let Name = string',
      'C. const Name = string',
      'D. function Name = string'
    ],
    correctAnswer: 'A'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'TypeScript Interfaces',
    difficulty: 'easy',
    question: 'What is an interface in TypeScript?',
    options: [
      'A. A way to define the structure of an object',
      'B. A function declaration',
      'C. A class implementation',
      'D. A database schema'
    ],
    correctAnswer: 'A'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'TypeScript Primitive Types',
    difficulty: 'easy',
    question: 'Which of the following is NOT a primitive type in TypeScript?',
    options: [
      'A. any',
      'B. string',
      'C. number',
      'D. boolean'
    ],
    correctAnswer: 'A'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'TypeScript Arrays',
    difficulty: 'easy',
    question: 'How do you define an array of strings in TypeScript?',
    options: [
      'A. string[]',
      'B. Array<string>',
      'C. Both A and B',
      'D. [string]'
    ],
    correctAnswer: 'C'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'TypeScript Union Types',
    difficulty: 'medium',
    question: 'What is a union type in TypeScript?',
    options: [
      'A. A type that can be one of several types',
      'B. A type that combines multiple types',
      'C. A type that intersects types',
      'D. A type that extends a base type'
    ],
    correctAnswer: 'A'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'TypeScript Intersection Types',
    difficulty: 'medium',
    question: 'What is an intersection type in TypeScript?',
    options: [
      'A. A type that combines multiple types into one',
      'B. A type that can be one of several types',
      'C. A type that extends a base type',
      'D. A type that excludes certain types'
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'TypeScript Generics',
    difficulty: 'advanced',
    question: 'What is a generic in TypeScript?',
    options: [
      'A. A type parameter that can be used with functions and classes to create reusable components',
      'B. A built-in type',
      'C. A style definition',
      'D. A configuration file'
    ],
    correctAnswer: 'A'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'TypeScript Type Inference',
    difficulty: 'medium',
    question: 'What is type inference in TypeScript?',
    options: [
      'A. The ability of the compiler to automatically determine the type of a variable',
      'B. The ability to infer types from the code',
      'C. The ability to define types',
      'D. The ability to override types'
    ],
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'TypeScript Enums',
    difficulty: 'medium',
    question: 'What is an enum in TypeScript?',
    options: [
      'A. A way to define a set of named constants',
      'B. A way to define a class',
      'C. A way to define an interface',
      'D. A way to define a type'
    ],
    correctAnswer: 'A'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'TypeScript Optional Properties',
    difficulty: 'medium',
    question: 'How do you make a property optional in a TypeScript interface?',
    options: [
      'A. Using the ? symbol after the property name',
      'B. Using the optional keyword',
      'C. Using the maybe keyword',
      'D. Using the ? symbol before the property name'
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'TypeScript Readonly Properties',
    difficulty: 'medium',
    question: 'How do you make a property readonly in TypeScript?',
    options: [
      'A. Using the readonly keyword',
      'B. Using the const keyword',
      'C. Using the immutable keyword',
      'D. Using the fixed keyword'
    ],
    correctAnswer: 'A'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'TypeScript Type Assertion',
    difficulty: 'medium',
    question: 'What is type assertion in TypeScript?',
    options: [
      'A. A way to tell the compiler the type of a value when it cannot be inferred',
      'B. A way to change the type of a value',
      'C. A way to define a type',
      'D. A way to override a type'
    ],
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'TypeScript Classes vs Interfaces',
    difficulty: 'medium',
    question: 'What is the difference between a class and an interface in TypeScript?',
    options: [
      'A. Classes can have implementations; interfaces only define structure',
      'B. Classes and interfaces are the same',
      'C. Interfaces can have implementations',
      'D. Classes only define structure'
    ],
    correctAnswer: 'A'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'TypeScript Abstract Classes',
    difficulty: 'advanced',
    question: 'What is an abstract class in TypeScript?',
    options: [
      'A. A class that cannot be instantiated and serves as a base for other classes',
      'B. A class that has no implementation',
      'C. A class that can only be used as an interface',
      'D. A class that is fully implemented'
    ],
    correctAnswer: 'A'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'TypeScript Decorators',
    difficulty: 'advanced',
    question: 'What are decorators in TypeScript?',
    options: [
      'A. A way to modify classes, methods, or properties using annotations',
      'B. A way to decorate objects',
      'C. A type of function',
      'D. A method of styling code'
    ],
    correctAnswer: 'A'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'TypeScript Namespaces',
    difficulty: 'advanced',
    question: 'What is a namespace in TypeScript?',
    options: [
      'A. A way to organize code into logical groups',
      'B. A way to define types',
      'C. A way to import modules',
      'D. A way to export modules'
    ],
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'TypeScript Modules',
    difficulty: 'advanced',
    question: 'What is the purpose of modules in TypeScript?',
    options: [
      'A. To organize code into reusable, maintainable units',
      'B. To make code run faster',
      'C. To reduce file size',
      'D. To enable multi-threading'
    ],
    correctAnswer: 'A'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'TypeScript Utility Types',
    difficulty: 'advanced',
    question: 'What is Partial<T> in TypeScript?',
    options: [
      'A. A utility type that makes all properties of T optional',
      'B. A utility type that makes all properties of T required',
      'C. A utility type that makes all properties of T readonly',
      'D. A utility type that selects specific properties'
    ],
    correctAnswer: 'A'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'TypeScript Utility Types',
    difficulty: 'advanced',
    question: 'What is Readonly<T> in TypeScript?',
    options: [
      'A. A utility type that makes all properties of T readonly',
      'B. A utility type that makes all properties of T optional',
      'C. A utility type that makes all properties of T required',
      'D. A utility type that selects specific properties'
    ],
    correctAnswer: 'A'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'TypeScript Utility Types',
    difficulty: 'advanced',
    question: 'What is Pick<T, K> in TypeScript?',
    options: [
      'A. A utility type that selects specific properties from T',
      'B. A utility type that makes all properties optional',
      'C. A utility type that makes all properties required',
      'D. A utility type that makes all properties readonly'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'TypeScript Utility Types',
    difficulty: 'advanced',
    question: 'What is Omit<T, K> in TypeScript?',
    options: [
      'A. A utility type that excludes specific properties from T',
      'B. A utility type that selects specific properties from T',
      'C. A utility type that makes all properties optional',
      'D. A utility type that makes all properties required'
    ],
    correctAnswer: 'A'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'TypeScript Utility Types',
    difficulty: 'advanced',
    question: 'What is Record<K, T> in TypeScript?',
    options: [
      'A. A utility type that creates an object type with keys of type K and values of type T',
      'B. A utility type that selects specific properties',
      'C. A utility type that excludes specific properties',
      'D. A utility type that makes all properties optional'
    ],
    correctAnswer: 'A'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'TypeScript Type Guards',
    difficulty: 'advanced',
    question: 'What is a type guard in TypeScript?',
    options: [
      'A. A way to narrow down the type of a variable within a conditional block',
      'B. A way to guard against type errors',
      'C. A way to define types',
      'D. A way to override types'
    ],
    correctAnswer: 'A'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'TypeScript Discriminated Unions',
    difficulty: 'advanced',
    question: 'What is a discriminated union in TypeScript?',
    options: [
      'A. A union type with a common property that can be used to determine the actual type',
      'B. A union type that discriminates against certain types',
      'C. A type that combines multiple types',
      'D. A type that extends a base type'
    ],
    correctAnswer: 'A'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'TypeScript Function Types',
    difficulty: 'medium',
    question: 'How do you define a function type in TypeScript?',
    options: [
      'A. (param: type) => returnType',
      'B. function(param: type): returnType',
      'C. param: type => returnType',
      'D. type(param) => returnType'
    ],
    correctAnswer: 'A'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'TypeScript Void Type',
    difficulty: 'medium',
    question: 'What is the void type in TypeScript?',
    options: [
      'A. A type that represents the absence of a value, often used as the return type of functions that don\'t return a value',
      'B. A type that represents an empty value',
      'C. A type that represents undefined',
      'D. A type that represents null'
    ],
    correctAnswer: 'A'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'TypeScript Never Type',
    difficulty: 'advanced',
    question: 'What is the never type in TypeScript?',
    options: [
      'A. A type that represents values that never occur',
      'B. A type that represents null',
      'C. A type that represents undefined',
      'D. A type that represents void'
    ],
    correctAnswer: 'A'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'TypeScript Unknown Type',
    difficulty: 'medium',
    question: 'What is the unknown type in TypeScript?',
    options: [
      'A. A type-safe counterpart of any, requiring type checking before use',
      'B. A type that represents any value',
      'C. A type that represents void',
      'D. A type that represents never'
    ],
    correctAnswer: 'A'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'TypeScript Any Type',
    difficulty: 'easy',
    question: 'What is the any type in TypeScript?',
    options: [
      'A. A type that can represent any value, bypassing type checking',
      'B. A type that represents a specific value',
      'C. A type that represents void',
      'D. A type that represents never'
    ],
    correctAnswer: 'A'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'TypeScript Tuple Types',
    difficulty: 'medium',
    question: 'What is a tuple type in TypeScript?',
    options: [
      'A. An array with a fixed number of elements, where each element can have a different type',
      'B. An array with a fixed number of elements of the same type',
      'C. A type that represents a pair',
      'D. A type that represents a list'
    ],
    correctAnswer: 'A'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'TypeScript Mapped Types',
    difficulty: 'advanced',
    question: 'What is a mapped type in TypeScript?',
    options: [
      'A. A type that transforms existing types by applying a transformation to each property',
      'B. A type that maps values to types',
      'C. A type that creates a map',
      'D. A type that defines a dictionary'
    ],
    correctAnswer: 'A'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'TypeScript Conditional Types',
    difficulty: 'advanced',
    question: 'What is a conditional type in TypeScript?',
    options: [
      'A. A type that selects one of two possible types based on a condition',
      'B. A type that is conditional on the input',
      'C. A type that depends on the context',
      'D. A type that is determined at runtime'
    ],
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'TypeScript Literal Types',
    difficulty: 'medium',
    question: 'What is a literal type in TypeScript?',
    options: [
      'A. A type that represents a specific value',
      'B. A type that represents any value',
      'C. A type that represents a range of values',
      'D. A type that represents a collection of values'
    ],
    correctAnswer: 'A'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'TypeScript Type Aliases',
    difficulty: 'medium',
    question: 'What is a type alias in TypeScript?',
    options: [
      'A. A way to give a type a new name',
      'B. A way to define a new type',
      'C. A way to extend a type',
      'D. A way to import a type'
    ],
    correctAnswer: 'A'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'TypeScript Interface vs Type',
    difficulty: 'medium',
    question: 'What is the difference between an interface and a type alias in TypeScript?',
    options: [
      'A. Interfaces can be extended and merged; type aliases cannot',
      'B. Interfaces and type aliases are the same',
      'C. Type aliases can be extended; interfaces cannot',
      'D. Interfaces can only be used for objects'
    ],
    correctAnswer: 'A'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'TypeScript Class Properties',
    difficulty: 'medium',
    question: 'How do you define a property in a TypeScript class?',
    options: [
      'A. propertyName: type',
      'B. propertyName = value',
      'C. propertyName: type = value',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'TypeScript Access Modifiers',
    difficulty: 'medium',
    question: 'Which access modifier makes a property private in TypeScript?',
    options: [
      'A. private',
      'B. protected',
      'C. public',
      'D. readonly'
    ],
    correctAnswer: 'A'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'TypeScript Access Modifiers',
    difficulty: 'medium',
    question: 'What is the default access modifier in TypeScript?',
    options: [
      'A. public',
      'B. private',
      'C. protected',
      'D. readonly'
    ],
    correctAnswer: 'A'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'TypeScript Constructor',
    difficulty: 'medium',
    question: 'What is the purpose of a constructor in a TypeScript class?',
    options: [
      'A. To initialize the class instance',
      'B. To define class methods',
      'C. To define class properties',
      'D. To create a new object'
    ],
    correctAnswer: 'A'
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'TypeScript Inheritance',
    difficulty: 'advanced',
    question: 'How do you implement inheritance in TypeScript?',
    options: [
      'A. Using the extends keyword',
      'B. Using the implements keyword',
      'C. Using the inherit keyword',
      'D. Using the super keyword'
    ],
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'TypeScript Mixins',
    difficulty: 'advanced',
    question: 'What is a mixin in TypeScript?',
    options: [
      'A. A way to combine multiple classes into a single class',
      'B. A way to mix types',
      'C. A way to combine interfaces',
      'D. A way to create a class from a function'
    ],
    correctAnswer: 'A'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'TypeScript Declaration Merging',
    difficulty: 'advanced',
    question: 'What is declaration merging in TypeScript?',
    options: [
      'A. The ability to combine multiple declarations of the same name into a single definition',
      'B. The ability to merge types',
      'C. The ability to combine interfaces',
      'D. The ability to combine classes'
    ],
    correctAnswer: 'A'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'TypeScript Ambient Declarations',
    difficulty: 'advanced',
    question: 'What is an ambient declaration in TypeScript?',
    options: [
      'A. A declaration that tells the compiler about existing code in another file or library',
      'B. A declaration that defines a type',
      'C. A declaration that defines an interface',
      'D. A declaration that defines a class'
    ],
    correctAnswer: 'A'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'TypeScript Type Narrowing',
    difficulty: 'advanced',
    question: 'What is type narrowing in TypeScript?',
    options: [
      'A. The process of refining a type to a more specific type based on runtime checks',
      'B. The process of narrowing down the options',
      'C. The process of reducing the number of types',
      'D. The process of restricting a type'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'TypeScript Index Signatures',
    difficulty: 'advanced',
    question: 'What is an index signature in TypeScript?',
    options: [
      'A. A way to define the type of properties accessed by index',
      'B. A way to index into a type',
      'C. A way to define array types',
      'D. A way to define object types'
    ],
    correctAnswer: 'A'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'TypeScript Call Signatures',
    difficulty: 'advanced',
    question: 'What is a call signature in TypeScript?',
    options: [
      'A. A way to define the type of a function',
      'B. A way to call a function',
      'C. A way to define a method',
      'D. A way to define a constructor'
    ],
    correctAnswer: 'A'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'TypeScript Constructor Signatures',
    difficulty: 'advanced',
    question: 'What is a constructor signature in TypeScript?',
    options: [
      'A. A way to define the type of a constructor',
      'B. A way to construct an object',
      'C. A way to define a class',
      'D. A way to define a function'
    ],
    correctAnswer: 'A'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'TypeScript Template Literal Types',
    difficulty: 'advanced',
    question: 'What are template literal types in TypeScript?',
    options: [
      'A. Types that use template literal syntax to create new types from strings',
      'B. Types that are created from templates',
      'C. Types that are used for string manipulation',
      'D. Types that are used for string formatting'
    ],
    correctAnswer: 'A'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'TypeScript Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a TypeScript best practice?',
    options: [
      'A. Use explicit types instead of relying on inference when possible',
      'B. Use any type for all variables',
      'C. Disable strict mode',
      'D. Use var for all declarations'
    ],
    correctAnswer: 'A'
  }
];

export default questions;