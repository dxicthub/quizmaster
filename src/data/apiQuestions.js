export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'API Fundamentals',
    difficulty: 'easy',
    question: 'What does API stand for?',
    options: [
      'A. Application Programming Interface',
      'B. Application Protocol Interface',
      'C. Advanced Programming Interface',
      'D. Application Process Interface'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'API Types',
    difficulty: 'easy',
    question: 'Which of the following is a type of API?',
    options: [
      'A. REST API',
      'B. SOAP API',
      'C. GraphQL API',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'REST API',
    difficulty: 'easy',
    question: 'What does REST stand for?',
    options: [
      'A. Representational State Transfer',
      'B. Resource State Transfer',
      'C. Request State Transfer',
      'D. Response State Transfer'
    ],
    correctAnswer: 'A'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'HTTP Methods',
    difficulty: 'easy',
    question: 'Which HTTP method is used to retrieve data from an API?',
    options: [
      'A. GET',
      'B. POST',
      'C. PUT',
      'D. DELETE'
    ],
    correctAnswer: 'A'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'HTTP Methods',
    difficulty: 'easy',
    question: 'Which HTTP method is used to create a new resource?',
    options: [
      'A. POST',
      'B. GET',
      'C. PUT',
      'D. DELETE'
    ],
    correctAnswer: 'A'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'HTTP Methods',
    difficulty: 'medium',
    question: 'Which HTTP method is used to update a resource entirely?',
    options: [
      'A. PUT',
      'B. PATCH',
      'C. POST',
      'D. GET'
    ],
    correctAnswer: 'A'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'HTTP Methods',
    difficulty: 'medium',
    question: 'Which HTTP method is used to partially update a resource?',
    options: [
      'A. PATCH',
      'B. PUT',
      'C. POST',
      'D. DELETE'
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'HTTP Methods',
    difficulty: 'easy',
    question: 'Which HTTP method is used to delete a resource?',
    options: [
      'A. DELETE',
      'B. POST',
      'C. GET',
      'D. PUT'
    ],
    correctAnswer: 'A'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'easy',
    question: 'What does a 200 status code indicate?',
    options: [
      'A. Success',
      'B. Not Found',
      'C. Server Error',
      'D. Unauthorized'
    ],
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'easy',
    question: 'What does a 404 status code indicate?',
    options: [
      'A. Resource not found',
      'B. Success',
      'C. Server error',
      'D. Unauthorized'
    ],
    correctAnswer: 'A'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'medium',
    question: 'What does a 400 status code indicate?',
    options: [
      'A. Bad Request',
      'B. Not Found',
      'C. Unauthorized',
      'D. Server Error'
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'medium',
    question: 'What does a 401 status code indicate?',
    options: [
      'A. Unauthorized',
      'B. Bad Request',
      'C. Not Found',
      'D. Server Error'
    ],
    correctAnswer: 'A'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'medium',
    question: 'What does a 403 status code indicate?',
    options: [
      'A. Forbidden',
      'B. Unauthorized',
      'C. Bad Request',
      'D. Not Found'
    ],
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'medium',
    question: 'What does a 500 status code indicate?',
    options: [
      'A. Internal Server Error',
      'B. Bad Request',
      'C. Not Found',
      'D. Unauthorized'
    ],
    correctAnswer: 'A'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'API Authentication',
    difficulty: 'medium',
    question: 'What is API authentication?',
    options: [
      'A. Verifying the identity of the client',
      'B. Encrypting API requests',
      'C. Caching API responses',
      'D. Logging API calls'
    ],
    correctAnswer: 'A'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'API Authentication Methods',
    difficulty: 'medium',
    question: 'Which of the following is a common API authentication method?',
    options: [
      'A. API Keys',
      'B. OAuth',
      'C. JWT',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'API Keys',
    difficulty: 'medium',
    question: 'What is an API key?',
    options: [
      'A. A unique identifier used to authenticate API requests',
      'B. A password for the API',
      'C. A username for the API',
      'D. A token for the API'
    ],
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'JWT Authentication',
    difficulty: 'advanced',
    question: 'What does JWT stand for?',
    options: [
      'A. JSON Web Token',
      'B. JavaScript Web Token',
      'C. Java Web Token',
      'D. JSON Written Token'
    ],
    correctAnswer: 'A'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'JWT Structure',
    difficulty: 'advanced',
    question: 'What are the three parts of a JWT?',
    options: [
      'A. Header, Payload, Signature',
      'B. Header, Body, Signature',
      'C. Header, Claims, Verify',
      'D. Header, Payload, Verify'
    ],
    correctAnswer: 'A'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'OAuth',
    difficulty: 'advanced',
    question: 'What is OAuth?',
    options: [
      'A. An open standard for access delegation',
      'B. A programming language',
      'C. A database system',
      'D. A design framework'
    ],
    correctAnswer: 'A'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'API Rate Limiting',
    difficulty: 'advanced',
    question: 'What is rate limiting in APIs?',
    options: [
      'A. Limiting the number of requests a client can make',
      'B. Limiting the size of requests',
      'C. Limiting the speed of responses',
      'D. Limiting the number of concurrent connections'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'API Versioning',
    difficulty: 'advanced',
    question: 'What is API versioning?',
    options: [
      'A. Managing different versions of an API',
      'B. Managing API performance',
      'C. Managing API security',
      'D. Managing API documentation'
    ],
    correctAnswer: 'A'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'API Documentation',
    difficulty: 'medium',
    question: 'What is API documentation?',
    options: [
      'A. Information about how to use an API',
      'B. Information about the API\'s implementation',
      'C. Information about the API\'s database',
      'D. Information about the API\'s server'
    ],
    correctAnswer: 'A'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'API Testing Tools',
    difficulty: 'medium',
    question: 'Which of the following is a common API testing tool?',
    options: [
      'A. Postman',
      'B. Insomnia',
      'C. cURL',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Postman',
    difficulty: 'medium',
    question: 'What is Postman used for?',
    options: [
      'A. Testing and developing APIs',
      'B. Writing API documentation',
      'C. Monitoring API performance',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'GraphQL',
    difficulty: 'advanced',
    question: 'What is GraphQL?',
    options: [
      'A. A query language for APIs',
      'B. A database query language',
      'C. A programming language',
      'D. A design framework'
    ],
    correctAnswer: 'A'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'GraphQL vs REST',
    difficulty: 'advanced',
    question: 'What is a key difference between GraphQL and REST?',
    options: [
      'A. GraphQL allows clients to request specific data',
      'B. REST allows clients to request specific data',
      'C. GraphQL is faster than REST',
      'D. REST is faster than GraphQL'
    ],
    correctAnswer: 'A'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'API Security',
    difficulty: 'advanced',
    question: 'What is a common API security vulnerability?',
    options: [
      'A. Injection attacks',
      'B. Broken authentication',
      'C. Sensitive data exposure',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'API CORS',
    difficulty: 'advanced',
    question: 'What is CORS in the context of APIs?',
    options: [
      'A. A mechanism that allows restricted resources to be requested from another domain',
      'B. A security protocol',
      'C. An authentication method',
      'D. A database protocol'
    ],
    correctAnswer: 'A'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'API Middleware',
    difficulty: 'advanced',
    question: 'What is middleware in API development?',
    options: [
      'A. Functions that intercept and process requests before they reach the endpoint',
      'B. The API database',
      'C. The API server',
      'D. The API client'
    ],
    correctAnswer: 'A'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'API Response Formats',
    difficulty: 'medium',
    question: 'What are common API response formats?',
    options: [
      'A. JSON',
      'B. XML',
      'C. Both A and B',
      'D. HTML only'
    ],
    correctAnswer: 'C'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'JSON',
    difficulty: 'easy',
    question: 'What does JSON stand for?',
    options: [
      'A. JavaScript Object Notation',
      'B. JavaScript Online Notation',
      'C. Java Object Notation',
      'D. Java Online Notation'
    ],
    correctAnswer: 'A'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'API Pagination',
    difficulty: 'advanced',
    question: 'What is pagination in APIs?',
    options: [
      'A. Splitting large responses into smaller pages',
      'B. Page numbering in API documentation',
      'C. Page loading in web applications',
      'D. Page ranking in search results'
    ],
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'API Filtering',
    difficulty: 'advanced',
    question: 'What is filtering in APIs?',
    options: [
      'A. Returning only data that matches specific criteria',
      'B. Removing sensitive data from responses',
      'C. Sorting data in responses',
      'D. Grouping data in responses'
    ],
    correctAnswer: 'A'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'API Sorting',
    difficulty: 'advanced',
    question: 'What is sorting in APIs?',
    options: [
      'A. Ordering data in responses based on specific fields',
      'B. Filtering data in responses',
      'C. Pagination in responses',
      'D. Validation in responses'
    ],
    correctAnswer: 'A'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'API Validation',
    difficulty: 'advanced',
    question: 'What is request validation in APIs?',
    options: [
      'A. Ensuring incoming data meets required criteria',
      'B. Validating the API server',
      'C. Validating the API client',
      'D. Validating the API database'
    ],
    correctAnswer: 'A'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'API Error Handling',
    difficulty: 'advanced',
    question: 'What is error handling in APIs?',
    options: [
      'A. Managing and responding to errors gracefully',
      'B. Ignoring errors',
      'C. Crashing on errors',
      'D. Logging errors only'
    ],
    correctAnswer: 'A'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'API Logging',
    difficulty: 'advanced',
    question: 'What is logging in APIs?',
    options: [
      'A. Recording API requests and responses',
      'B. Writing API documentation',
      'C. Testing API endpoints',
      'D. Monitoring API performance'
    ],
    correctAnswer: 'A'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'API Monitoring',
    difficulty: 'advanced',
    question: 'What is monitoring in APIs?',
    options: [
      'A. Tracking API performance and availability',
      'B. Tracking API documentation',
      'C. Tracking API development',
      'D. Tracking API testing'
    ],
    correctAnswer: 'A'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'API Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is an API best practice?',
    options: [
      'A. Use proper HTTP status codes',
      'B. Provide clear error messages',
      'C. Version your API',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'API Design',
    difficulty: 'advanced',
    question: 'What is API design?',
    options: [
      'A. Planning and structuring API endpoints',
      'B. Designing the API server',
      'C. Designing the API database',
      'D. Designing the API client'
    ],
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'RESTful Principles',
    difficulty: 'advanced',
    question: 'Which of the following is a RESTful principle?',
    options: [
      'A. Statelessness',
      'B. Client-server architecture',
      'C. Cacheability',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'API Resources',
    difficulty: 'medium',
    question: 'What is a resource in REST APIs?',
    options: [
      'A. An entity that can be accessed via a URL',
      'B. A database table',
      'C. A server file',
      'D. A client application'
    ],
    correctAnswer: 'A'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'API Endpoints',
    difficulty: 'medium',
    question: 'What is an API endpoint?',
    options: [
      'A. A URL where an API can be accessed',
      'B. A database table',
      'C. A server file',
      'D. A client application'
    ],
    correctAnswer: 'A'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'API Gateway',
    difficulty: 'advanced',
    question: 'What is an API gateway?',
    options: [
      'A. A server that acts as a single entry point for APIs',
      'B. A database server',
      'C. A web server',
      'D. An application server'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'API Management',
    difficulty: 'advanced',
    question: 'What is API management?',
    options: [
      'A. Controlling, monitoring, and analyzing API usage',
      'B. Managing the API server',
      'C. Managing the API database',
      'D. Managing the API client'
    ],
    correctAnswer: 'A'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'API Analytics',
    difficulty: 'advanced',
    question: 'What is API analytics?',
    options: [
      'A. Analyzing API usage patterns and performance',
      'B. Analyzing the API server',
      'C. Analyzing the API database',
      'D. Analyzing the API client'
    ],
    correctAnswer: 'A'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'API Security Best Practices',
    difficulty: 'advanced',
    question: 'What is a security best practice for APIs?',
    options: [
      'A. Use HTTPS',
      'B. Implement proper authentication',
      'C. Validate input',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'API Tools',
    difficulty: 'medium',
    question: 'Which of the following is an API development tool?',
    options: [
      'A. Swagger',
      'B. OpenAPI',
      'C. RAML',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'API Future',
    difficulty: 'advanced',
    question: 'What is a trend in API development?',
    options: [
      'A. GraphQL adoption',
      'B. API-first development',
      'C. Serverless APIs',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  }
];

export default questions;