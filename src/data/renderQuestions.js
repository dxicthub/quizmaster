export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Render Fundamentals',
    difficulty: 'easy',
    question: 'What is Render?',
    options: [
      'A. A cloud application hosting platform',
      'B. A frontend framework',
      'C. A database management system',
      'D. A design tool'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Render Services',
    difficulty: 'easy',
    question: 'Which of the following can you deploy on Render?',
    options: [
      'A. Web services',
      'B. Static sites',
      'C. Databases',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Render Configuration',
    difficulty: 'medium',
    question: 'What file is used to configure Render deployments?',
    options: [
      'A. render.yaml',
      'B. config.yaml',
      'C. deploy.yaml',
      'D. settings.yaml'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Render Databases',
    difficulty: 'medium',
    question: 'What type of databases does Render support?',
    options: [
      'A. PostgreSQL',
      'B. MySQL',
      'C. Redis',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Render Environment Variables',
    difficulty: 'medium',
    question: 'How do you add environment variables in Render?',
    options: [
      'A. Through the Render dashboard',
      'B. Using the Render CLI',
      'C. Both A and B',
      'D. Only through the API'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Render Web Services',
    difficulty: 'medium',
    question: 'What is a web service in Render?',
    options: [
      'A. A deployable application that serves HTTP requests',
      'B. A static website',
      'C. A database instance',
      'D. A background worker'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Render Static Sites',
    difficulty: 'medium',
    question: 'What is a static site in Render?',
    options: [
      'A. A site with pre-built HTML, CSS, and JavaScript files',
      'B. A dynamic web application',
      'C. A database-driven application',
      'D. An API service'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Render Background Workers',
    difficulty: 'advanced',
    question: 'What is a background worker in Render?',
    options: [
      'A. A service that runs background tasks and jobs',
      'B. A web service',
      'C. A static site',
      'D. A database instance'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Render Cron Jobs',
    difficulty: 'advanced',
    question: 'What is a cron job in Render?',
    options: [
      'A. A scheduled task that runs at specified intervals',
      'B. A web service',
      'C. A background worker',
      'D. A database instance'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Render Private Services',
    difficulty: 'advanced',
    question: 'What is a private service in Render?',
    options: [
      'A. A service that is not publicly accessible',
      'B. A public web service',
      'C. A static site',
      'D. A database instance'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Render GitHub Integration',
    difficulty: 'medium',
    question: 'How does Render connect to GitHub repositories?',
    options: [
      'A. Through GitHub integration and OAuth',
      'B. Through manual file upload',
      'C. Via SSH key authentication only',
      'D. Using FTP protocol'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Render Auto Deploy',
    difficulty: 'medium',
    question: 'What triggers automatic deployments on Render?',
    options: [
      'A. Pushing to specified branches',
      'B. Manual deployment only',
      'C. Scheduled deployments only',
      'D. API calls only'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Render Build Settings',
    difficulty: 'medium',
    question: 'What build settings can be configured in Render?',
    options: [
      'A. Build command',
      'B. Build environment',
      'C. Output directory',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Render Health Checks',
    difficulty: 'advanced',
    question: 'What is a health check in Render?',
    options: [
      'A. A mechanism to verify a service is running correctly',
      'B. A performance test',
      'C. A security audit',
      'D. A code review tool'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Render Auto Scaling',
    difficulty: 'advanced',
    question: 'What is auto scaling in Render?',
    options: [
      'A. Automatically adjusting resources based on demand',
      'B. A fixed resource allocation',
      'C. Manual scaling',
      'D. Scaling only during deployment'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Render Logging',
    difficulty: 'medium',
    question: 'How do you access logs in Render?',
    options: [
      'A. Through the Render dashboard',
      'B. Using the Render CLI',
      'C. Both A and B',
      'D. Only through the API'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Render Metrics',
    difficulty: 'advanced',
    question: 'What metrics does Render provide?',
    options: [
      'A. CPU usage',
      'B. Memory usage',
      'C. Response times',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Render Alerts',
    difficulty: 'advanced',
    question: 'How do you set up alerts in Render?',
    options: [
      'A. Through the Render dashboard',
      'B. Using the Render CLI',
      'C. Both A and B',
      'D. Only through the API'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Render Custom Domains',
    difficulty: 'medium',
    question: 'How do you add a custom domain to a Render service?',
    options: [
      'A. Through the Render dashboard',
      'B. By updating DNS records',
      'C. Both A and B',
      'D. Only through the CLI'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Render SSL',
    difficulty: 'medium',
    question: 'Does Render provide SSL certificates?',
    options: [
      'A. Yes, automatically',
      'B. No, you must provide them',
      'C. Only for paid plans',
      'D. Only for enterprise plans'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Render Pricing',
    difficulty: 'medium',
    question: 'What is the pricing model for Render?',
    options: [
      'A. Pay-as-you-go',
      'B. Fixed monthly plans',
      'C. Both A and B',
      'D. Only enterprise pricing'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Render Free Tier',
    difficulty: 'medium',
    question: 'Does Render offer a free tier?',
    options: [
      'A. Yes, with limited resources',
      'B. No, all plans are paid',
      'C. Only for students',
      'D. Only for open-source projects'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Render PostgreSQL',
    difficulty: 'advanced',
    question: 'What is Render PostgreSQL?',
    options: [
      'A. A managed PostgreSQL database service',
      'B. A self-hosted PostgreSQL database',
      'C. A PostgreSQL client',
      'D. A PostgreSQL backup tool'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Render Redis',
    difficulty: 'advanced',
    question: 'What is Render Redis?',
    options: [
      'A. A managed Redis cache service',
      'B. A self-hosted Redis instance',
      'C. A Redis client',
      'D. A Redis backup tool'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Render Disk Attachments',
    difficulty: 'advanced',
    question: 'What is a disk attachment in Render?',
    options: [
      'A. Persistent storage attached to a service',
      'B. A temporary storage',
      'C. A backup storage',
      'D. A cache storage'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Render Preview Environments',
    difficulty: 'advanced',
    question: 'What are preview environments in Render?',
    options: [
      'A. Temporary environments for testing pull requests',
      'B. Production environments',
      'C. Staging environments',
      'D. Development environments'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Render Blueprints',
    difficulty: 'advanced',
    question: 'What is a blueprint in Render?',
    options: [
      'A. A configuration file that defines infrastructure',
      'B. A design template',
      'C. A code template',
      'D. A deployment template'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Render CLI',
    difficulty: 'medium',
    question: 'What is the Render CLI used for?',
    options: [
      'A. Managing deployments and services',
      'B. Only for deployment',
      'C. Only for logs',
      'D. Only for metrics'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Render API',
    difficulty: 'advanced',
    question: 'What is the Render API used for?',
    options: [
      'A. Programmatic management of services',
      'B. Only for deployment',
      'C. Only for logs',
      'D. Only for metrics'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Render Security',
    difficulty: 'advanced',
    question: 'What is a security best practice on Render?',
    options: [
      'A. Use environment variables for secrets',
      'B. Enable two-factor authentication',
      'C. Restrict access to services',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Render Deployment Strategies',
    difficulty: 'advanced',
    question: 'What deployment strategies does Render support?',
    options: [
      'A. Rolling deployments',
      'B. Blue-green deployments',
      'C. Both A and B',
      'D. Only rolling deployments'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Render Rollbacks',
    difficulty: 'advanced',
    question: 'How do you rollback a deployment on Render?',
    options: [
      'A. Through the dashboard',
      'B. Using the CLI',
      'C. Both A and B',
      'D. Only through the API'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Render Environment Groups',
    difficulty: 'advanced',
    question: 'What is an environment group in Render?',
    options: [
      'A. A collection of environment variables shared across services',
      'B. A group of services',
      'C. A group of users',
      'D. A group of domains'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Render Secrets',
    difficulty: 'advanced',
    question: 'How does Render handle secrets?',
    options: [
      'A. Using environment variables',
      'B. Using a separate secrets manager',
      'C. Both A and B',
      'D. Only using environment variables'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Render Integrations',
    difficulty: 'advanced',
    question: 'What integrations does Render support?',
    options: [
      'A. GitHub',
      'B. GitLab',
      'C. Slack',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Render Notifications',
    difficulty: 'medium',
    question: 'How does Render send notifications?',
    options: [
      'A. Email',
      'B. Slack',
      'C. Webhooks',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Render Support',
    difficulty: 'medium',
    question: 'What support options does Render offer?',
    options: [
      'A. Community support',
      'B. Email support',
      'C. Priority support for paid plans',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Render Documentation',
    difficulty: 'medium',
    question: 'Where can you find Render documentation?',
    options: [
      'A. On the Render website',
      'B. In the Render dashboard',
      'C. Both A and B',
      'D. Only in the Render CLI'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Render Status Page',
    difficulty: 'medium',
    question: 'Where can you check Render service status?',
    options: [
      'A. On the Render status page',
      'B. In the dashboard',
      'C. Both A and B',
      'D. Only through the API'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Render Regions',
    difficulty: 'advanced',
    question: 'What regions does Render support?',
    options: [
      'A. US East',
      'B. US West',
      'C. Europe',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Render Compliance',
    difficulty: 'advanced',
    question: 'What compliance certifications does Render have?',
    options: [
      'A. SOC2',
      'B. GDPR',
      'C. HIPAA',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Render Service Types',
    difficulty: 'medium',
    question: 'What types of services can you deploy on Render?',
    options: [
      'A. Web services',
      'B. Static sites',
      'C. Background workers',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Render Deployment Speed',
    difficulty: 'medium',
    question: 'How fast are deployments on Render?',
    options: [
      'A. Usually takes a few seconds to a few minutes',
      'B. Takes about 30 minutes',
      'C. Takes about an hour',
      'D. Takes about 24 hours'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Render GitHub Actions',
    difficulty: 'advanced',
    question: 'Can you use Render with GitHub Actions?',
    options: [
      'A. Yes, using Render\'s GitHub integration',
      'B. No, only built-in CI/CD',
      'C. Only with manual triggers',
      'D. Only with the Render CLI'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Render Docker Support',
    difficulty: 'advanced',
    question: 'Does Render support Docker deployments?',
    options: [
      'A. Yes, using Dockerfiles or Docker Compose',
      'B. No, only from source code',
      'C. Only for enterprise plans',
      'D. Only for paid plans'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Render Performance',
    difficulty: 'advanced',
    question: 'What is a common performance optimization on Render?',
    options: [
      'A. Using caching',
      'B. Using a CDN',
      'C. Using auto-scaling',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Render Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a Render best practice?',
    options: [
      'A. Use environment variables for configuration',
      'B. Use health checks for services',
      'C. Use logging for debugging',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Render Use Cases',
    difficulty: 'medium',
    question: 'Which of the following is a common use case for Render?',
    options: [
      'A. Hosting web applications',
      'B. Hosting APIs',
      'C. Hosting static websites',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Render Alternatives',
    difficulty: 'medium',
    question: 'Which of the following is an alternative to Render?',
    options: [
      'A. Heroku',
      'B. Vercel',
      'C. Netlify',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Render Getting Started',
    difficulty: 'easy',
    question: 'How do you get started with Render?',
    options: [
      'A. Sign up on the Render website',
      'B. Connect your GitHub/GitLab',
      'C. Deploy your first service',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;