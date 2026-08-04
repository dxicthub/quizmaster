export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Next.js Fundamentals',
    difficulty: 'easy',
    question: 'What is Next.js?',
    options: [
      'A. A React framework for production',
      'B. A JavaScript library',
      'C. A database system',
      'D. A design tool'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Next.js Features',
    difficulty: 'easy',
    question: 'What is server-side rendering in Next.js?',
    options: [
      'A. Rendering pages on the server',
      'B. Rendering pages on the client',
      'C. Rendering pages in the database',
      'D. Rendering pages in the browser'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Next.js Routing',
    difficulty: 'easy',
    question: 'How does Next.js handle routing?',
    options: [
      'A. File-based routing in the pages directory',
      'B. React Router',
      'C. Custom routing configuration',
      'D. Hash-based routing'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Next.js Pages',
    difficulty: 'easy',
    question: 'What is a page in Next.js?',
    options: [
      'A. A React component exported from a file in the pages directory',
      'B. A JavaScript function',
      'C. A CSS file',
      'D. A configuration file'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Next.js App Router',
    difficulty: 'medium',
    question: 'What is the App Router in Next.js?',
    options: [
      'A. A newer routing system based on React Server Components',
      'B. A router for APIs',
      'C. A router for static files',
      'D. A router for images'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Next.js API Routes',
    difficulty: 'medium',
    question: 'Where do you create API routes in Next.js?',
    options: [
      'A. pages/api directory',
      'B. api directory',
      'C. server directory',
      'D. routes directory'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Next.js API Routes',
    difficulty: 'medium',
    question: 'What is the purpose of API routes in Next.js?',
    options: [
      'A. To build API endpoints within the Next.js application',
      'B. To serve static files',
      'C. To handle database connections',
      'D. To manage user authentication'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Next.js SSR',
    difficulty: 'medium',
    question: 'What is Server-Side Rendering (SSR) in Next.js?',
    options: [
      'A. Rendering pages on the server for each request',
      'B. Rendering pages at build time',
      'C. Rendering pages on the client',
      'D. Rendering pages in the database'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Next.js SSG',
    difficulty: 'medium',
    question: 'What is Static Site Generation (SSG) in Next.js?',
    options: [
      'A. Rendering pages at build time',
      'B. Rendering pages on the server for each request',
      'C. Rendering pages on the client',
      'D. Rendering pages in the database'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Next.js ISR',
    difficulty: 'advanced',
    question: 'What is Incremental Static Regeneration (ISR) in Next.js?',
    options: [
      'A. Updating static pages after build without rebuilding the entire site',
      'B. Incrementally building the site',
      'C. Regenerating static pages on each request',
      'D. Rebuilding the entire site'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Next.js getStaticProps',
    difficulty: 'medium',
    question: 'What is the purpose of getStaticProps in Next.js?',
    options: [
      'A. To fetch data at build time for static generation',
      'B. To fetch data on the server for each request',
      'C. To fetch data on the client',
      'D. To fetch data from the database'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Next.js getServerSideProps',
    difficulty: 'medium',
    question: 'What is the purpose of getServerSideProps in Next.js?',
    options: [
      'A. To fetch data on the server for each request',
      'B. To fetch data at build time',
      'C. To fetch data on the client',
      'D. To fetch data from the database'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Next.js getStaticPaths',
    difficulty: 'advanced',
    question: 'What is the purpose of getStaticPaths in Next.js?',
    options: [
      'A. To define which paths should be pre-rendered at build time',
      'B. To define which paths should be rendered on the server',
      'C. To define which paths should be rendered on the client',
      'D. To define which paths should be rendered in the database'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Next.js Middleware',
    difficulty: 'advanced',
    question: 'What is middleware in Next.js?',
    options: [
      'A. Code that runs before a request is completed',
      'B. Code that runs after a request is completed',
      'C. Code that runs during a request',
      'D. Code that runs before the server starts'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Next.js Middleware',
    difficulty: 'advanced',
    question: 'Where do you define middleware in Next.js?',
    options: [
      'A. In a middleware.js file',
      'B. In the pages directory',
      'C. In the components directory',
      'D. In the styles directory'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Next.js Image Optimization',
    difficulty: 'medium',
    question: 'What is Image Optimization in Next.js?',
    options: [
      'A. Automatic image optimization and lazy loading',
      'B. Manual image resizing',
      'C. Image compression only',
      'D. Image caching only'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Next.js Image Component',
    difficulty: 'medium',
    question: 'Which component is used for image optimization in Next.js?',
    options: [
      'A. Image',
      'B. Img',
      'C. Picture',
      'D. Figure'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Next.js Font Optimization',
    difficulty: 'medium',
    question: 'What is Font Optimization in Next.js?',
    options: [
      'A. Automatic font optimization and loading',
      'B. Manual font configuration',
      'C. Font compression',
      'D. Font caching'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Next.js Head Component',
    difficulty: 'medium',
    question: 'What is the purpose of the Head component in Next.js?',
    options: [
      'A. To modify the head section of a page',
      'B. To modify the body section of a page',
      'C. To modify the footer section of a page',
      'D. To modify the header section of a page'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Next.js Link Component',
    difficulty: 'medium',
    question: 'What is the purpose of the Link component in Next.js?',
    options: [
      'A. To enable client-side navigation',
      'B. To enable server-side navigation',
      'C. To enable external links',
      'D. To enable email links'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Next.js Script Component',
    difficulty: 'medium',
    question: 'What is the purpose of the Script component in Next.js?',
    options: [
      'A. To load and optimize third-party scripts',
      'B. To load JavaScript libraries',
      'C. To load CSS files',
      'D. To load images'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Next.js Dynamic Imports',
    difficulty: 'advanced',
    question: 'What is dynamic import in Next.js?',
    options: [
      'A. Loading components lazily',
      'B. Loading components at build time',
      'C. Loading components on the server',
      'D. Loading components in the browser'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Next.js Dynamic Routes',
    difficulty: 'advanced',
    question: 'What is a dynamic route in Next.js?',
    options: [
      'A. A route that matches a dynamic pattern',
      'B. A route that is generated dynamically',
      'C. A route that is built dynamically',
      'D. A route that is served dynamically'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Next.js Catch-all Routes',
    difficulty: 'advanced',
    question: 'What is a catch-all route in Next.js?',
    options: [
      'A. A route that matches any path',
      'B. A route that matches a specific path',
      'C. A route that matches all paths',
      'D. A route that matches no paths'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Next.js Environment Variables',
    difficulty: 'medium',
    question: 'How do you access environment variables in Next.js?',
    options: [
      'A. Using process.env',
      'B. Using next.config.js',
      'C. Using .env file',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Next.js Environment Variables',
    difficulty: 'medium',
    question: 'What is the prefix for environment variables that are exposed to the browser?',
    options: [
      'A. NEXT_PUBLIC_',
      'B. PUBLIC_',
      'C. BROWSER_',
      'D. CLIENT_'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Next.js Configuration',
    difficulty: 'medium',
    question: 'What file is used to configure Next.js?',
    options: [
      'A. next.config.js',
      'B. config.js',
      'C. next.js',
      'D. next-config.js'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Next.js Custom Server',
    difficulty: 'advanced',
    question: 'How do you create a custom server in Next.js?',
    options: [
      'A. By using a server.js file',
      'B. By using next.config.js',
      'C. By using .env file',
      'D. By using package.json'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Next.js Deployment',
    difficulty: 'advanced',
    question: 'How do you deploy a Next.js application?',
    options: [
      'A. Using Vercel',
      'B. Using Netlify',
      'C. Using AWS',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Next.js Vercel Deployment',
    difficulty: 'advanced',
    question: 'What is the recommended platform for deploying Next.js?',
    options: [
      'A. Vercel',
      'B. Netlify',
      'C. AWS',
      'D. Heroku'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Next.js Performance',
    difficulty: 'advanced',
    question: 'What is a performance optimization in Next.js?',
    options: [
      'A. Image optimization',
      'B. Code splitting',
      'C. Lazy loading',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Next.js SEO',
    difficulty: 'advanced',
    question: 'How does Next.js support SEO?',
    options: [
      'A. Through server-side rendering',
      'B. Through static generation',
      'C. Through the Head component',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Next.js Authentication',
    difficulty: 'advanced',
    question: 'What are common authentication strategies in Next.js?',
    options: [
      'A. NextAuth.js',
      'B. JWT with cookies',
      'C. OAuth with providers',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Next.js Database',
    difficulty: 'advanced',
    question: 'How do you connect to a database in Next.js?',
    options: [
      'A. Using API routes',
      'B. Using server components',
      'C. Using getServerSideProps',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Next.js State Management',
    difficulty: 'advanced',
    question: 'What are common state management options in Next.js?',
    options: [
      'A. Redux',
      'B. Zustand',
      'C. Context API',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Next.js Styling',
    difficulty: 'medium',
    question: 'What are styling options in Next.js?',
    options: [
      'A. CSS Modules',
      'B. Tailwind CSS',
      'C. Styled Components',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Next.js CSS Modules',
    difficulty: 'medium',
    question: 'What are CSS Modules in Next.js?',
    options: [
      'A. A way to scope CSS locally',
      'B. A way to write global CSS',
      'C. A way to inline CSS',
      'D. A way to use CSS frameworks'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Next.js Middleware',
    difficulty: 'advanced',
    question: 'What can middleware do in Next.js?',
    options: [
      'A. Redirect users',
      'B. Rewrite URLs',
      'C. Add headers',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Next.js Data Fetching',
    difficulty: 'advanced',
    question: 'What are the data fetching methods in Next.js?',
    options: [
      'A. getStaticProps',
      'B. getServerSideProps',
      'C. getStaticPaths',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Next.js React Server Components',
    difficulty: 'advanced',
    question: 'What are React Server Components in Next.js?',
    options: [
      'A. Components that render on the server',
      'B. Components that render on the client',
      'C. Components that render in the database',
      'D. Components that render in the browser'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Next.js Client Components',
    difficulty: 'advanced',
    question: 'What are Client Components in Next.js?',
    options: [
      'A. Components that render on the client',
      'B. Components that render on the server',
      'C. Components that render in the database',
      'D. Components that render in the browser'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Next.js Server Actions',
    difficulty: 'advanced',
    question: 'What are Server Actions in Next.js?',
    options: [
      'A. Functions that run on the server',
      'B. Functions that run on the client',
      'C. Functions that run in the database',
      'D. Functions that run in the browser'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Next.js Internationalization',
    difficulty: 'advanced',
    question: 'What is internationalization in Next.js?',
    options: [
      'A. Supporting multiple languages and locales',
      'B. Supporting multiple time zones',
      'C. Supporting multiple currencies',
      'D. Supporting multiple countries'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Next.js Analytics',
    difficulty: 'advanced',
    question: 'What is Next.js Analytics?',
    options: [
      'A. A built-in analytics tool',
      'B. A third-party analytics tool',
      'C. A performance monitoring tool',
      'D. A user tracking tool'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Next.js Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in Next.js?',
    options: [
      'A. Use HTTPS',
      'B. Sanitize user input',
      'C. Use environment variables for secrets',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Next.js Testing',
    difficulty: 'advanced',
    question: 'What are testing options in Next.js?',
    options: [
      'A. Jest',
      'B. React Testing Library',
      'C. Cypress',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Next.js Error Handling',
    difficulty: 'advanced',
    question: 'How does Next.js handle errors?',
    options: [
      'A. Using error boundaries',
      'B. Using custom error pages',
      'C. Using try-catch',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Next.js Custom Error Page',
    difficulty: 'advanced',
    question: 'How do you create a custom error page in Next.js?',
    options: [
      'A. Create a _error.js file',
      'B. Create a error.js file',
      'C. Create a 404.js file',
      'D. Create a 500.js file'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Next.js Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a Next.js best practice?',
    options: [
      'A. Use getStaticProps for static data',
      'B. Use getServerSideProps for dynamic data',
      'C. Use dynamic imports for large components',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Next.js Future',
    difficulty: 'advanced',
    question: 'What is a trend in Next.js development?',
    options: [
      'A. React Server Components',
      'B. Server Actions',
      'C. Partial Prerendering',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;