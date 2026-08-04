export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Express.js Fundamentals',
    difficulty: 'easy',
    question: 'What is Express.js?',
    options: [
      'A. A web application framework for Node.js',
      'B. A frontend library',
      'C. A database ORM',
      'D. A testing framework'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Express.js Routing',
    difficulty: 'easy',
    question: 'Which method is used to handle GET requests in Express?',
    options: [
      'A. app.get()',
      'B. app.post()',
      'C. app.put()',
      'D. app.delete()'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Express.js Routing',
    difficulty: 'easy',
    question: 'Which method is used to handle POST requests in Express?',
    options: [
      'A. app.post()',
      'B. app.get()',
      'C. app.put()',
      'D. app.delete()'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Express.js Middleware',
    difficulty: 'easy',
    question: 'What is middleware in Express?',
    options: [
      'A. Functions that have access to the request and response objects',
      'B. A database connection layer',
      'C. A templating engine',
      'D. A testing utility'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Express.js Request Object',
    difficulty: 'easy',
    question: 'What does the req.params object contain in Express?',
    options: [
      'A. Route parameters',
      'B. Query string parameters',
      'C. Request body data',
      'D. Request headers'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Express.js Request Object',
    difficulty: 'easy',
    question: 'What does the req.query object contain in Express?',
    options: [
      'A. Query string parameters',
      'B. Route parameters',
      'C. Request body data',
      'D. Request headers'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Express.js Response Object',
    difficulty: 'easy',
    question: 'What method is used to send a JSON response in Express?',
    options: [
      'A. res.json()',
      'B. res.send()',
      'C. res.render()',
      'D. res.sendFile()'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Express.js Routing',
    difficulty: 'medium',
    question: 'What is route parameter in Express?',
    options: [
      'A. A variable in the route path that captures a value from the URL',
      'B. A query string parameter',
      'C. A request body parameter',
      'D. A header parameter'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Express.js Middleware',
    difficulty: 'medium',
    question: 'What is the purpose of next() in Express middleware?',
    options: [
      'A. To pass control to the next middleware function',
      'B. To end the request-response cycle',
      'C. To throw an error',
      'D. To render a view'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Express.js Error Handling',
    difficulty: 'medium',
    question: 'How do you handle errors in Express.js?',
    options: [
      'A. Using error-handling middleware with four parameters',
      'B. Using try-catch blocks',
      'C. Using promises',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Express.js Error Handling',
    difficulty: 'medium',
    question: 'What is the signature of an error-handling middleware function?',
    options: [
      'A. (err, req, res, next)',
      'B. (req, res, next)',
      'C. (err, res, next)',
      'D. (req, res, err, next)'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Express.js Static Files',
    difficulty: 'medium',
    question: 'How do you serve static files in Express?',
    options: [
      'A. Using express.static() middleware',
      'B. Using app.static() method',
      'C. Using res.sendFile()',
      'D. Using app.use(express.static())'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Express.js Template Engines',
    difficulty: 'medium',
    question: 'Which of the following is a template engine that can be used with Express?',
    options: [
      'A. EJS',
      'B. Pug',
      'C. Handlebars',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Express.js Body Parsing',
    difficulty: 'medium',
    question: 'What is the purpose of body-parser in Express?',
    options: [
      'A. To parse incoming request bodies',
      'B. To parse query strings',
      'C. To parse route parameters',
      'D. To parse headers'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Express.js Routing',
    difficulty: 'medium',
    question: 'What is the purpose of app.use() in Express?',
    options: [
      'A. To mount middleware functions at a specified path',
      'B. To handle GET requests',
      'C. To handle POST requests',
      'D. To handle error responses'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Express.js Router',
    difficulty: 'medium',
    question: 'What is the purpose of express.Router()?',
    options: [
      'A. To create modular, mountable route handlers',
      'B. To handle HTTP requests',
      'C. To manage middleware',
      'D. To handle errors'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Express.js CORS',
    difficulty: 'medium',
    question: 'What is CORS in Express?',
    options: [
      'A. A mechanism that allows restricted resources to be requested from another domain',
      'B. A type of middleware',
      'C. A type of error handling',
      'D. A type of routing'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Express.js CORS',
    difficulty: 'medium',
    question: 'How do you enable CORS in Express?',
    options: [
      'A. Using the cors middleware package',
      'B. Using app.cors()',
      'C. Using express.cors()',
      'D. Using res.cors()'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Express.js Sessions',
    difficulty: 'advanced',
    question: 'What is the purpose of sessions in Express?',
    options: [
      'A. To store user data across multiple requests',
      'B. To manage database connections',
      'C. To handle file uploads',
      'D. To manage static files'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Express.js Cookies',
    difficulty: 'advanced',
    question: 'How do you set a cookie in Express?',
    options: [
      'A. Using res.cookie()',
      'B. Using req.cookie()',
      'C. Using app.cookie()',
      'D. Using express.cookie()'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Express.js Authentication',
    difficulty: 'advanced',
    question: 'What is a common authentication strategy used with Express?',
    options: [
      'A. JWT (JSON Web Tokens)',
      'B. Session-based authentication',
      'C. OAuth',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Express.js Passport',
    difficulty: 'advanced',
    question: 'What is Passport.js in the Express ecosystem?',
    options: [
      'A. An authentication middleware for Node.js',
      'B. A database library',
      'C. A testing framework',
      'D. A build tool'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Express.js Environment Variables',
    difficulty: 'medium',
    question: 'How do you access environment variables in Express?',
    options: [
      'A. Using process.env',
      'B. Using app.env',
      'C. Using express.env',
      'D. Using req.env'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Express.js Configuration',
    difficulty: 'medium',
    question: 'What is the purpose of app.set() in Express?',
    options: [
      'A. To set application settings',
      'B. To set route parameters',
      'C. To set middleware',
      'D. To set error handlers'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Express.js Configuration',
    difficulty: 'medium',
    question: 'What is the purpose of app.get() for configuration?',
    options: [
      'A. To get application settings',
      'B. To handle GET requests',
      'C. To get route parameters',
      'D. To get middleware'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Express.js File Upload',
    difficulty: 'advanced',
    question: 'How do you handle file uploads in Express?',
    options: [
      'A. Using multer middleware',
      'B. Using body-parser',
      'C. Using express.json()',
      'D. Using express.urlencoded()'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Express.js Validation',
    difficulty: 'advanced',
    question: 'What is a common library for request validation in Express?',
    options: [
      'A. Joi',
      'B. Yup',
      'C. Validator.js',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Express.js Logging',
    difficulty: 'medium',
    question: 'What is the purpose of morgan in Express?',
    options: [
      'A. A logging middleware for HTTP requests',
      'B. A database library',
      'C. A testing framework',
      'D. A build tool'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Express.js Compression',
    difficulty: 'medium',
    question: 'What is the purpose of compression in Express?',
    options: [
      'A. To compress response bodies for faster transmission',
      'B. To compress static files',
      'C. To compress database queries',
      'D. To compress session data'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Express.js Helmet',
    difficulty: 'medium',
    question: 'What is the purpose of helmet in Express?',
    options: [
      'A. To secure HTTP headers',
      'B. To secure database connections',
      'C. To secure file uploads',
      'D. To secure sessions'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Express.js Rate Limiting',
    difficulty: 'advanced',
    question: 'What is the purpose of rate limiting in Express?',
    options: [
      'A. To limit the number of requests a client can make',
      'B. To limit the size of requests',
      'C. To limit the speed of responses',
      'D. To limit the number of concurrent connections'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Express.js Performance',
    difficulty: 'advanced',
    question: 'What is a common performance optimization technique in Express?',
    options: [
      'A. Using compression',
      'B. Using caching',
      'C. Using load balancing',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Express.js Database Integration',
    difficulty: 'advanced',
    question: 'What is the purpose of an ORM in Express applications?',
    options: [
      'A. To map database records to JavaScript objects',
      'B. To handle HTTP requests',
      'C. To manage middleware',
      'D. To handle errors'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Express.js REST API Design',
    difficulty: 'advanced',
    question: 'What is a best practice for REST API versioning?',
    options: [
      'A. Including the version in the URL path',
      'B. Using query parameters for versioning',
      'C. Using custom headers',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates a successful GET request?',
    options: [
      'A. 200',
      'B. 201',
      'C. 204',
      'D. 301'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates a resource was created successfully?',
    options: [
      'A. 201',
      'B. 200',
      'C. 204',
      'D. 301'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates a bad request?',
    options: [
      'A. 400',
      'B. 401',
      'C. 403',
      'D. 404'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates a resource was not found?',
    options: [
      'A. 404',
      'B. 400',
      'C. 401',
      'D. 403'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates an internal server error?',
    options: [
      'A. 500',
      'B. 501',
      'C. 502',
      'D. 503'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Express.js HTTPS',
    difficulty: 'advanced',
    question: 'How do you enable HTTPS in Express?',
    options: [
      'A. Using the https module with a certificate',
      'B. Using app.https()',
      'C. Using express.https()',
      'D. Using res.https()'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Express.js WebSockets',
    difficulty: 'advanced',
    question: 'What is the purpose of Socket.io with Express?',
    options: [
      'A. To enable real-time bidirectional communication',
      'B. To handle HTTP requests',
      'C. To manage database connections',
      'D. To handle file uploads'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Express.js Testing',
    difficulty: 'advanced',
    question: 'What is a common testing framework for Express applications?',
    options: [
      'A. Jest',
      'B. Mocha',
      'C. Supertest',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Express.js Debugging',
    difficulty: 'advanced',
    question: 'How do you enable debug logging in Express?',
    options: [
      'A. Using the DEBUG environment variable',
      'B. Using app.debug()',
      'C. Using express.debug()',
      'D. Using req.debug()'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Express.js Application Structure',
    difficulty: 'advanced',
    question: 'What is a best practice for organizing Express applications?',
    options: [
      'A. MVC pattern',
      'B. Route separation',
      'C. Using environment variables',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Express.js Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in Express?',
    options: [
      'A. Sanitize user input',
      'B. Use HTTPS',
      'C. Keep dependencies updated',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Express.js Deployment',
    difficulty: 'advanced',
    question: 'What is a common deployment platform for Express applications?',
    options: [
      'A. Heroku',
      'B. AWS',
      'C. Vercel (serverless)',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Express.js Environment',
    difficulty: 'medium',
    question: 'What is the default port for Express applications?',
    options: [
      'A. 3000',
      'B. 80',
      'C. 443',
      'D. 8080'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Express.js JSON Handling',
    difficulty: 'medium',
    question: 'What middleware is used to parse JSON request bodies?',
    options: [
      'A. express.json()',
      'B. express.urlencoded()',
      'C. bodyParser.json()',
      'D. Both A and C'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Express.js URL Encoding',
    difficulty: 'medium',
    question: 'What middleware is used to parse URL-encoded request bodies?',
    options: [
      'A. express.urlencoded()',
      'B. express.json()',
      'C. bodyParser.urlencoded()',
      'D. Both A and C'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Express.js Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is an Express.js best practice?',
    options: [
      'A. Use environment variables for configuration',
      'B. Implement proper error handling',
      'C. Use middleware effectively',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;