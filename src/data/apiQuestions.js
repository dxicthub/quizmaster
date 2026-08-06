
export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'API Fundamentals',
    difficulty: 'easy',
    question: 'What does API stand for?',
    options: [
      'A. Application Protocol Interface',
      'B. Advanced Programming Interface',
      'C. Application Process Interface',
      'D. Application Programming Interface'
    ],
    correctAnswer: 'D'
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
      'A. Resource State Transfer',
      'B. Request State Transfer',
      'C. Response State Transfer',
      'D. Representational State Transfer'
    ],
    correctAnswer: 'D'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'HTTP Methods',
    difficulty: 'easy',
    question: 'Which HTTP method is used to retrieve data from an API?',
    options: [
      'A. POST',
      'B. PUT',
      'C. GET',
      'D. DELETE'
    ],
    correctAnswer: 'C'
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
      'A. PATCH',
      'B. PUT',
      'C. POST',
      'D. GET'
    ],
    correctAnswer: 'B'
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
      'A. Not Found',
      'B. Success',
      'C. Server Error',
      'D. Unauthorized'
    ],
    correctAnswer: 'B'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'easy',
    question: 'What does a 404 status code indicate?',
    options: [
      'A. Success',
      'B. Server error',
      'C. Resource not found',
      'D. Unauthorized'
    ],
    correctAnswer: 'C'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'medium',
    question: 'What does a 400 status code indicate?',
    options: [
      'A. Not Found',
      'B. Unauthorized',
      'C. Server Error',
      'D. Bad Request'
    ],
    correctAnswer: 'D'
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
      'A. Unauthorized',
      'B. Bad Request',
      'C. Not Found',
      'D. Forbidden'
    ],
    correctAnswer: 'D'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'HTTP Status Codes',
    difficulty: 'medium',
    question: 'What does a 500 status code indicate?',
    options: [
      'A. Bad Request',
      'B. Internal Server Error',
      'C. Not Found',
      'D. Unauthorized'
    ],
    correctAnswer: 'B'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'API Authentication',
    difficulty: 'medium',
    question: 'What is API authentication?',
    options: [
      'A. Encrypting API requests',
      'B. Caching API responses',
      'C. Logging API calls',
      'D. Verifying the identity of the client'
    ],
    correctAnswer: 'D'
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
      'A. A password for the API',
      'B. A unique identifier used to authenticate API requests',
      'C. A username for the API',
      'D. A token for the API'
    ],
    correctAnswer: 'B'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'JWT Authentication',
    difficulty: 'advanced',
    question: 'What does JWT stand for?',
    options: [
      'A. JavaScript Web Token',
      'B. JSON Web Token',
      'C. Java Web Token',
      'D. JSON Written Token'
    ],
    correctAnswer: 'B'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'JWT Structure',
    difficulty: 'advanced',
    question: 'What are the three parts of a JWT?',
    options: [
      'A. Header, Body, Signature',
      'B. Header, Claims, Verify',
      'C. Header, Payload, Signature',
      'D. Header, Payload, Verify'
    ],
    correctAnswer: 'C'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'OAuth',
    difficulty: 'advanced',
    question: 'What is OAuth?',
    options: [
      'A. A programming language',
      'B. An open standard for access delegation',
      'C. A database system',
      'D. A design framework'
    ],
    correctAnswer: 'B'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'API Rate Limiting',
    difficulty: 'advanced',
    question: 'What is rate limiting in APIs?',
    options: [
      'A. Limiting the size of requests',
      'B. Limiting the speed of responses',
      'C. Limiting the number of requests a client can make',
      'D. Limiting the number of concurrent connections'
    ],
    correctAnswer: 'C'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'API Versioning',
    difficulty: 'advanced',
    question: 'What is API versioning?',
    options: [
      'A. Managing API performance',
      'B. Managing API security',
      'C. Managing different versions of an API',
      'D. Managing API documentation'
    ],
    correctAnswer: 'C'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'API Documentation',
    difficulty: 'medium',
    question: 'What is API documentation?',
    options: [
      'A. Information about the API\'s implementation',
      'B. Information about how to use an API',
      'C. Information about the API\'s database',
      'D. Information about the API\'s server'
    ],
    correctAnswer: 'B'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'API Testing Tools',
    difficulty: 'medium',
    question: 'Which of the following is a common API testing tool?',
    options: [
      'A. Postman',
      'B. All of the above',
      'C. Insomnia',
      'D. cURL'
    ],
    correctAnswer: 'B'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Postman',
    difficulty: 'medium',
    question: 'What is Postman used for?',
    options: [
      'A. Writing API documentation',
      'B. Monitoring API performance',
      'C. All of the above',
      'D. Testing and developing APIs'
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
      'A. A database query language',
      'B. A programming language',
      'C. A design framework',
      'D. A query language for APIs'
    ],
    correctAnswer: 'D'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'GraphQL vs REST',
    difficulty: 'advanced',
    question: 'What is a key difference between GraphQL and REST?',
    options: [
      'A. REST allows clients to request specific data',
      'B. GraphQL is faster than REST',
      'C. REST is faster than GraphQL',
      'D. GraphQL allows clients to request specific data'
    ],
    correctAnswer: 'D'
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
      'C. All of the above',
      'D. Sensitive data exposure'
    ],
    correctAnswer: 'C'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'API CORS',
    difficulty: 'advanced',
    question: 'What is CORS in the context of APIs?',
    options: [
      'A. A security protocol',
      'B. An authentication method',
      'C. A database protocol',
      'D. A mechanism that allows restricted resources to be requested from another domain'
    ],
    correctAnswer: 'D'
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
      'A. JavaScript Online Notation',
      'B. Java Object Notation',
      'C. JavaScript Object Notation',
      'D. Java Online Notation'
    ],
    correctAnswer: 'C'
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
      'A. Removing sensitive data from responses',
      'B. Returning only data that matches specific criteria',
      'C. Sorting data in responses',
      'D. Grouping data in responses'
    ],
    correctAnswer: 'B'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'API Sorting',
    difficulty: 'advanced',
    question: 'What is sorting in APIs?',
    options: [
      'A. Filtering data in responses',
      'B. Ordering data in responses based on specific fields',
      'C. Pagination in responses',
      'D. Validation in responses'
    ],
    correctAnswer: 'B'
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
      'A. Writing API documentation',
      'B. Testing API endpoints',
      'C. Recording API requests and responses',
      'D. Monitoring API performance'
    ],
    correctAnswer: 'C'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'API Monitoring',
    difficulty: 'advanced',
    question: 'What is monitoring in APIs?',
    options: [
      'A. Tracking API documentation',
      'B. Tracking API performance and availability',
      'C. Tracking API development',
      'D. Tracking API testing'
    ],
    correctAnswer: 'B'
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
      'A. Designing the API server',
      'B. Designing the API database',
      'C. Designing the API client',
      'D. Planning and structuring API endpoints'
    ],
    correctAnswer: 'D'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'RESTful Principles',
    difficulty: 'advanced',
    question: 'Which of the following is a RESTful principle?',
    options: [
      'A. All of the above',
      'B. Statelessness',
      'C. Client-server architecture',
      'D. Cacheability'
    ],
    correctAnswer: 'A'
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
      'A. A database table',
      'B. A URL where an API can be accessed',
      'C. A server file',
      'D. A client application'
    ],
    correctAnswer: 'B'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'API Gateway',
    difficulty: 'advanced',
    question: 'What is an API gateway?',
    options: [
      'A. A database server',
      'B. A web server',
      'C. A server that acts as a single entry point for APIs',
      'D. An application server'
    ],
    correctAnswer: 'C'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'API Management',
    difficulty: 'advanced',
    question: 'What is API management?',
    options: [
      'A. Managing the API server',
      'B. Managing the API database',
      'C. Controlling, monitoring, and analyzing API usage',
      'D. Managing the API client'
    ],
    correctAnswer: 'C'
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
      'A. All of the above',
      'B. Use HTTPS',
      'C. Implement proper authentication',
      'D. Validate input'
    ],
    correctAnswer: 'A'
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
      'C. All of the above',
      'D. Serverless APIs'
    ],
    correctAnswer: 'C'
  }
];

export default questions;
