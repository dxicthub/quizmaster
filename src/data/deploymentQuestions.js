export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Deployment Fundamentals',
    difficulty: 'easy',
    question: 'What is software deployment?',
    options: [
      'A. The process of releasing software to users',
      'B. Writing software code',
      'C. Designing software architecture',
      'D. Testing software'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Deployment Platforms',
    difficulty: 'easy',
    question: 'Which of the following is a deployment platform?',
    options: [
      'A. Vercel',
      'B. GitHub',
      'C. Git',
      'D. Node.js'
    ],
    correctAnswer: 'A'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Deployment Strategies',
    difficulty: 'easy',
    question: 'What is continuous deployment?',
    options: [
      'A. Automatically deploying every change to production',
      'B. Deploying once a month',
      'C. Manual deployment process',
      'D. Deployment only on weekends'
    ],
    correctAnswer: 'A'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Deployment Configuration',
    difficulty: 'medium',
    question: 'What are environment variables used for in deployment?',
    options: [
      'A. To store configuration values',
      'B. To store source code',
      'C. To store database records',
      'D. To store images'
    ],
    correctAnswer: 'A'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'CI/CD',
    difficulty: 'easy',
    question: 'What does CI/CD stand for?',
    options: [
      'A. Continuous Integration/Continuous Deployment',
      'B. Continuous Input/Continuous Delivery',
      'C. Continuous Integration/Continuous Delivery',
      'D. Continuous Input/Continuous Deployment'
    ],
    correctAnswer: 'C'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'CI',
    difficulty: 'medium',
    question: 'What is Continuous Integration?',
    options: [
      'A. Automatically building and testing code changes',
      'B. Automatically deploying code changes',
      'C. Manually integrating code changes',
      'D. Testing code changes manually'
    ],
    correctAnswer: 'A'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'CD',
    difficulty: 'medium',
    question: 'What is Continuous Delivery?',
    options: [
      'A. Automatically deploying code to staging',
      'B. Automatically deploying code to production',
      'C. Manually deploying code',
      'D. Testing code manually'
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Deployment Environments',
    difficulty: 'medium',
    question: 'What are common deployment environments?',
    options: [
      'A. Development, Staging, Production',
      'B. Development, Testing, Production',
      'C. Development, Staging, Testing',
      'D. Staging, Testing, Production'
    ],
    correctAnswer: 'A'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Staging Environment',
    difficulty: 'medium',
    question: 'What is a staging environment used for?',
    options: [
      'A. Testing before production deployment',
      'B. Development of new features',
      'C. Production of final code',
      'D. Testing in production'
    ],
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Production Environment',
    difficulty: 'medium',
    question: 'What is the production environment?',
    options: [
      'A. The environment where the live application runs',
      'B. The environment where development happens',
      'C. The environment where testing happens',
      'D. The environment where staging happens'
    ],
    correctAnswer: 'A'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Deployment Methods',
    difficulty: 'medium',
    question: 'What is rolling deployment?',
    options: [
      'A. Updating instances gradually',
      'B. Updating all instances at once',
      'C. Rolling back to previous version',
      'D. Deploying to a single instance'
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Deployment Methods',
    difficulty: 'medium',
    question: 'What is blue-green deployment?',
    options: [
      'A. Running two identical environments for zero-downtime deployment',
      'B. Running two different environments',
      'C. Running one environment at a time',
      'D. Running multiple environments'
    ],
    correctAnswer: 'A'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Deployment Methods',
    difficulty: 'medium',
    question: 'What is canary deployment?',
    options: [
      'A. Gradually rolling out to a small subset of users',
      'B. Rolling out to all users at once',
      'C. Rolling back to previous version',
      'D. Deploying to staging first'
    ],
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Deployment Methods',
    difficulty: 'medium',
    question: 'What is A/B testing in deployment?',
    options: [
      'A. Comparing two versions to determine which performs better',
      'B. Testing two different features',
      'C. Testing two different environments',
      'D. Testing two different users'
    ],
    correctAnswer: 'A'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Deployment Tools',
    difficulty: 'medium',
    question: 'Which of the following is a deployment tool?',
    options: [
      'A. Jenkins',
      'B. GitHub Actions',
      'C. GitLab CI',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Jenkins',
    difficulty: 'medium',
    question: 'What is Jenkins used for?',
    options: [
      'A. Automation and CI/CD',
      'B. Code versioning',
      'C. Code review',
      'D. Code testing'
    ],
    correctAnswer: 'A'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'GitHub Actions',
    difficulty: 'medium',
    question: 'What is GitHub Actions used for?',
    options: [
      'A. Automating workflows, CI/CD',
      'B. Version control',
      'C. Code hosting',
      'D. Code review'
    ],
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Deployment Automation',
    difficulty: 'advanced',
    question: 'What is the benefit of deployment automation?',
    options: [
      'A. Reduces human error',
      'B. Speeds up deployment',
      'C. Increases reliability',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Rollback Strategies',
    difficulty: 'advanced',
    question: 'What is a rollback in deployment?',
    options: [
      'A. Reverting to a previous version',
      'B. Updating to a newer version',
      'C. Deleting the current version',
      'D. Skipping the deployment'
    ],
    correctAnswer: 'A'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Rollback Strategies',
    difficulty: 'advanced',
    question: 'What is a best practice for rollback?',
    options: [
      'A. Have a rollback plan ready',
      'B. Automate rollback when possible',
      'C. Test rollback procedures',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Deployment Monitoring',
    difficulty: 'advanced',
    question: 'What is deployment monitoring?',
    options: [
      'A. Tracking application performance after deployment',
      'B. Tracking code changes',
      'C. Tracking user activity',
      'D. Tracking database changes'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Deployment Logging',
    difficulty: 'advanced',
    question: 'What is deployment logging?',
    options: [
      'A. Recording deployment events and errors',
      'B. Recording user activity',
      'C. Recording code changes',
      'D. Recording database changes'
    ],
    correctAnswer: 'A'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Deployment Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in deployment?',
    options: [
      'A. Use secure connections (HTTPS)',
      'B. Manage secrets properly',
      'C. Restrict access to deployments',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Secret Management',
    difficulty: 'advanced',
    question: 'What is secret management in deployment?',
    options: [
      'A. Securely storing and managing sensitive information',
      'B. Managing user passwords',
      'C. Managing API keys',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Deployment Strategies',
    difficulty: 'advanced',
    question: 'What is the purpose of a deployment strategy?',
    options: [
      'A. To ensure smooth and safe deployments',
      'B. To speed up deployments',
      'C. To reduce deployment costs',
      'D. To automate deployments'
    ],
    correctAnswer: 'A'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Cloud Deployment',
    difficulty: 'medium',
    question: 'Which of the following is a cloud deployment platform?',
    options: [
      'A. AWS',
      'B. Azure',
      'C. Google Cloud',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'AWS',
    difficulty: 'medium',
    question: 'What is AWS used for?',
    options: [
      'A. Cloud computing and deployment',
      'B. Version control',
      'C. Code editing',
      'D. Database management'
    ],
    correctAnswer: 'A'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Azure',
    difficulty: 'medium',
    question: 'What is Microsoft Azure used for?',
    options: [
      'A. Cloud computing and deployment',
      'B. Version control',
      'C. Code editing',
      'D. Database management'
    ],
    correctAnswer: 'A'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Google Cloud',
    difficulty: 'medium',
    question: 'What is Google Cloud Platform used for?',
    options: [
      'A. Cloud computing and deployment',
      'B. Version control',
      'C. Code editing',
      'D. Database management'
    ],
    correctAnswer: 'A'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Docker',
    difficulty: 'advanced',
    question: 'What is Docker used for in deployment?',
    options: [
      'A. Containerization of applications',
      'B. Version control',
      'C. Code editing',
      'D. Database management'
    ],
    correctAnswer: 'A'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Kubernetes',
    difficulty: 'advanced',
    question: 'What is Kubernetes used for?',
    options: [
      'A. Orchestrating containers',
      'B. Version control',
      'C. Code editing',
      'D. Database management'
    ],
    correctAnswer: 'A'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Containerization',
    difficulty: 'advanced',
    question: 'What is containerization in deployment?',
    options: [
      'A. Packaging applications with their dependencies',
      'B. Creating containers for storage',
      'C. Containerizing code',
      'D. Containerizing databases'
    ],
    correctAnswer: 'A'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Serverless Deployment',
    difficulty: 'advanced',
    question: 'What is serverless deployment?',
    options: [
      'A. Deploying code without managing servers',
      'B. Deploying without any servers',
      'C. Deploying on physical servers',
      'D. Deploying on virtual machines'
    ],
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'AWS Lambda',
    difficulty: 'advanced',
    question: 'What is AWS Lambda?',
    options: [
      'A. A serverless computing service',
      'B. A database service',
      'C. A storage service',
      'D. A networking service'
    ],
    correctAnswer: 'A'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Deployment Pipelines',
    difficulty: 'advanced',
    question: 'What is a deployment pipeline?',
    options: [
      'A. A series of automated steps to deploy code',
      'B. A pipeline for data',
      'C. A pipeline for code',
      'D. A pipeline for testing'
    ],
    correctAnswer: 'A'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Infrastructure as Code',
    difficulty: 'advanced',
    question: 'What is Infrastructure as Code (IaC)?',
    options: [
      'A. Managing infrastructure through code',
      'B. Managing code through infrastructure',
      'C. Managing infrastructure manually',
      'D. Managing code manually'
    ],
    correctAnswer: 'A'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Terraform',
    difficulty: 'advanced',
    question: 'What is Terraform used for?',
    options: [
      'A. Infrastructure as Code',
      'B. Version control',
      'C. Code editing',
      'D. Database management'
    ],
    correctAnswer: 'A'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Deployment Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a deployment best practice?',
    options: [
      'A. Automate deployments',
      'B. Test in staging before production',
      'C. Monitor after deployment',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Deployment Testing',
    difficulty: 'advanced',
    question: 'What is the purpose of deployment testing?',
    options: [
      'A. To ensure the deployment works correctly',
      'B. To test code before deployment',
      'C. To test after deployment',
      'D. To test user acceptance'
    ],
    correctAnswer: 'A'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Deployment Documentation',
    difficulty: 'advanced',
    question: 'What is deployment documentation?',
    options: [
      'A. Documentation about how to deploy the application',
      'B. Documentation about how to use the application',
      'C. Documentation about how to develop the application',
      'D. Documentation about how to test the application'
    ],
    correctAnswer: 'A'
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Deployment Checklist',
    difficulty: 'advanced',
    question: 'What is a deployment checklist?',
    options: [
      'A. A list of items to verify before deployment',
      'B. A list of items to do after deployment',
      'C. A list of items to test during deployment',
      'D. A list of items to document'
    ],
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Deployment Success Criteria',
    difficulty: 'advanced',
    question: 'What defines a successful deployment?',
    options: [
      'A. The application is live and working correctly',
      'B. The deployment completed without errors',
      'C. All tests passed',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Deployment Risks',
    difficulty: 'advanced',
    question: 'What is a common deployment risk?',
    options: [
      'A. Downtime',
      'B. Data loss',
      'C. Performance issues',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Deployment Mitigation',
    difficulty: 'advanced',
    question: 'What is a way to mitigate deployment risks?',
    options: [
      'A. Have a rollback plan',
      'B. Test thoroughly',
      'C. Monitor closely',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Deployment Collaboration',
    difficulty: 'advanced',
    question: 'What is the role of collaboration in deployment?',
    options: [
      'A. Coordinating between teams for successful deployment',
      'B. Working individually on deployments',
      'C. Deploying without communication',
      'D. Deploying without planning'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Deployment Feedback',
    difficulty: 'advanced',
    question: 'What is the importance of deployment feedback?',
    options: [
      'A. To improve future deployments',
      'B. To confirm deployment success',
      'C. To identify issues',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Deployment Metrics',
    difficulty: 'advanced',
    question: 'What are deployment metrics?',
    options: [
      'A. Measurements to track deployment performance',
      'B. Measurements to track code quality',
      'C. Measurements to track user activity',
      'D. Measurements to track database performance'
    ],
    correctAnswer: 'A'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Deployment Time',
    difficulty: 'advanced',
    question: 'What is the importance of deployment time?',
    options: [
      'A. Faster deployments mean faster time to market',
      'B. Slower deployments mean better quality',
      'C. Deployment time doesn\'t matter',
      'D. Deployment time only matters for large projects'
    ],
    correctAnswer: 'A'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Deployment Frequency',
    difficulty: 'advanced',
    question: 'What is the benefit of frequent deployments?',
    options: [
      'A. Faster feedback and innovation',
      'B. More deployment work',
      'C. Higher deployment risk',
      'D. Lower deployment quality'
    ],
    correctAnswer: 'A'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Deployment Future',
    difficulty: 'advanced',
    question: 'What is a trend in deployment?',
    options: [
      'A. GitOps',
      'B. Serverless deployment',
      'C. Progressive delivery',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  }
];

export default questions;