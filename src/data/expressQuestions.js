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
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Express.js Routing',
    difficulty: 'easy',
    question: 'Which method is used to handle GET requests in Express?',
    options: [
      'A. app.post()',
      'B. app.get()',
      'C. app.put()',
      'D. app.delete()'
    ],
    correctAnswer: 'B'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Express.js Routing',
    difficulty: 'easy',
    question: 'Which method is used to handle POST requests in Express?',
    options: [
      'A. app.get()',
      'B. app.put()',
      'C. app.post()',
      'D. app.delete()'
    ],
    correctAnswer: 'C'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Express.js Middleware',
    difficulty: 'easy',
    question: 'What is middleware in Express?',
    options: [
      'A. A database connection layer',
      'B. A templating engine',
      'C. A testing utility',
      'D. Functions that have access to the request and response objects'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Express.js Request Object',
    difficulty: 'easy',
    question: 'What does the req.query object contain in Express?',
    options: [
      'A. Route parameters',
      'B. Query string parameters',
      'C. Request body data',
      'D. Request headers'
    ],
    correctAnswer: 'B'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Express.js Response Object',
    difficulty: 'easy',
    question: 'What method is used to send a JSON response in Express?',
    options: [
      'A. res.send()',
      'B. res.render()',
      'C. res.json()',
      'D. res.sendFile()'
    ],
    correctAnswer: 'C'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Express.js Routing',
    difficulty: 'medium',
    question: 'What is route parameter in Express?',
    options: [
      'A. A query string parameter',
      'B. A request body parameter',
      'C. A header parameter',
      'D. A variable in the route path that captures a value from the URL'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Express.js Error Handling',
    difficulty: 'medium',
    question: 'How do you handle errors in Express.js?',
    options: [
      'A. Using error-handling middleware with four parameters',
      'B. All of the above',
      'C. Using try-catch blocks',
      'D. Using promises'
    ],
    correctAnswer: 'B'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Express.js Error Handling',
    difficulty: 'medium',
    question: 'What is the signature of an error-handling middleware function?',
    options: [
      'A. (req, res, next)',
      'B. (err, res, next)',
      'C. (err, req, res, next)',
      'D. (req, res, err, next)'
    ],
    correctAnswer: 'C'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Express.js Static Files',
    difficulty: 'medium',
    question: 'How do you serve static files in Express?',
    options: [
      'A. Using app.static() method',
      'B. Using res.sendFile()',
      'C. Using app.use(express.static())',
      'D. Using express.static() middleware'
    ],
    correctAnswer: 'D'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Express.js Template Engines',
    difficulty: 'medium',
    question: 'Which of the following is a template engine that can be used with Express?',
    options: [
      'A. All of the above',
      'B. EJS',
      'C. Pug',
      'D. Handlebars'
    ],
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Express.js Body Parsing',
    difficulty: 'medium',
    question: 'What is the purpose of body-parser in Express?',
    options: [
      'A. To parse query strings',
      'B. To parse incoming request bodies',
      'C. To parse route parameters',
      'D. To parse headers'
    ],
    correctAnswer: 'B'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Express.js Routing',
    difficulty: 'medium',
    question: 'What is the purpose of app.use() in Express?',
    options: [
      'A. To handle GET requests',
      'B. To handle POST requests',
      'C. To mount middleware functions at a specified path',
      'D. To handle error responses'
    ],
    correctAnswer: 'C'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Express.js Router',
    difficulty: 'medium',
    question: 'What is the purpose of express.Router()?',
    options: [
      'A. To handle HTTP requests',
      'B. To manage middleware',
      'C. To handle errors',
      'D. To create modular, mountable route handlers'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Express.js CORS',
    difficulty: 'medium',
    question: 'How do you enable CORS in Express?',
    options: [
      'A. Using app.cors()',
      'B. Using the cors middleware package',
      'C. Using express.cors()',
      'D. Using res.cors()'
    ],
    correctAnswer: 'B'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Express.js Sessions',
    difficulty: 'advanced',
    question: 'What is the purpose of sessions in Express?',
    options: [
      'A. To manage database connections',
      'B. To handle file uploads',
      'C. To store user data across multiple requests',
      'D. To manage static files'
    ],
    correctAnswer: 'C'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Express.js Cookies',
    difficulty: 'advanced',
    question: 'How do you set a cookie in Express?',
    options: [
      'A. Using req.cookie()',
      'B. Using app.cookie()',
      'C. Using express.cookie()',
      'D. Using res.cookie()'
    ],
    correctAnswer: 'D'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Express.js Authentication',
    difficulty: 'advanced',
    question: 'What is a common authentication strategy used with Express?',
    options: [
      'A. All of the above',
      'B. JWT (JSON Web Tokens)',
      'C. Session-based authentication',
      'D. OAuth'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Express.js Passport',
    difficulty: 'advanced',
    question: 'What is Passport.js in the Express ecosystem?',
    options: [
      'A. A database library',
      'B. An authentication middleware for Node.js',
      'C. A testing framework',
      'D. A build tool'
    ],
    correctAnswer: 'B'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Express.js Environment Variables',
    difficulty: 'medium',
    question: 'How do you access environment variables in Express?',
    options: [
      'A. Using app.env',
      'B. Using express.env',
      'C. Using process.env',
      'D. Using req.env'
    ],
    correctAnswer: 'C'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Express.js Configuration',
    difficulty: 'medium',
    question: 'What is the purpose of app.set() in Express?',
    options: [
      'A. To set route parameters',
      'B. To set middleware',
      'C. To set error handlers',
      'D. To set application settings'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Express.js File Upload',
    difficulty: 'advanced',
    question: 'How do you handle file uploads in Express?',
    options: [
      'A. Using body-parser',
      'B. Using multer middleware',
      'C. Using express.json()',
      'D. Using express.urlencoded()'
    ],
    correctAnswer: 'B'
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
      'C. All of the above',
      'D. Validator.js'
    ],
    correctAnswer: 'C'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Express.js Logging',
    difficulty: 'medium',
    question: 'What is the purpose of morgan in Express?',
    options: [
      'A. A database library',
      'B. A testing framework',
      'C. A build tool',
      'D. A logging middleware for HTTP requests'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Express.js Helmet',
    difficulty: 'medium',
    question: 'What is the purpose of helmet in Express?',
    options: [
      'A. To secure database connections',
      'B. To secure HTTP headers',
      'C. To secure file uploads',
      'D. To secure sessions'
    ],
    correctAnswer: 'B'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Express.js Rate Limiting',
    difficulty: 'advanced',
    question: 'What is the purpose of rate limiting in Express?',
    options: [
      'A. To limit the size of requests',
      'B. To limit the speed of responses',
      'C. To limit the number of requests a client can make',
      'D. To limit the number of concurrent connections'
    ],
    correctAnswer: 'C'
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
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Express.js REST API Design',
    difficulty: 'advanced',
    question: 'What is a best practice for REST API versioning?',
    options: [
      'A. Including the version in the URL path',
      'B. All of the above',
      'C. Using query parameters for versioning',
      'D. Using custom headers'
    ],
    correctAnswer: 'B'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates a successful GET request?',
    options: [
      'A. 201',
      'B. 204',
      'C. 200',
      'D. 301'
    ],
    correctAnswer: 'C'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates a resource was created successfully?',
    options: [
      'A. 200',
      'B. 204',
      'C. 301',
      'D. 201'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates a resource was not found?',
    options: [
      'A. 400',
      'B. 404',
      'C. 401',
      'D. 403'
    ],
    correctAnswer: 'B'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Express.js HTTP Status Codes',
    difficulty: 'medium',
    question: 'What status code indicates an internal server error?',
    options: [
      'A. 501',
      'B. 502',
      'C. 500',
      'D. 503'
    ],
    correctAnswer: 'C'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Express.js HTTPS',
    difficulty: 'advanced',
    question: 'How do you enable HTTPS in Express?',
    options: [
      'A. Using app.https()',
      'B. Using express.https()',
      'C. Using res.https()',
      'D. Using the https module with a certificate'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Express.js Testing',
    difficulty: 'advanced',
    question: 'What is a common testing framework for Express applications?',
    options: [
      'A. Jest',
      'B. All of the above',
      'C. Mocha',
      'D. Supertest'
    ],
    correctAnswer: 'B'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Express.js Debugging',
    difficulty: 'advanced',
    question: 'How do you enable debug logging in Express?',
    options: [
      'A. Using app.debug()',
      'B. Using express.debug()',
      'C. Using the DEBUG environment variable',
      'D. Using req.debug()'
    ],
    correctAnswer: 'C'
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
    correctAnswer: 'D'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Express.js Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in Express?',
    options: [
      'A. All of the above',
      'B. Sanitize user input',
      'C. Use HTTPS',
      'D. Keep dependencies updated'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Express.js Deployment',
    difficulty: 'advanced',
    question: 'What is a common deployment platform for Express applications?',
    options: [
      'A. Heroku',
      'B. All of the above',
      'C. AWS',
      'D. Vercel (serverless)'
    ],
    correctAnswer: 'B'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Express.js Environment',
    difficulty: 'medium',
    question: 'What is the default port for Express applications?',
    options: [
      'A. 80',
      'B. 443',
      'C. 3000',
      'D. 8080'
    ],
    correctAnswer: 'C'
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
    correctAnswer: 'D'
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
    correctAnswer: 'D'
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
    correctAnswer: 'D'
  }
];

export default questions;