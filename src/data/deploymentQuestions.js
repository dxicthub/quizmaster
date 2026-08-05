export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Deployment Fundamentals',
    difficulty: 'easy',
    question: 'What is software deployment?',
    options: [
      'A. The process of releasing software to users or a target environment',
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
      'A. Git',
      'B. Node.js',
      'C. Vercel',
      'D. JavaScript'
    ],
    correctAnswer: 'C'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Deployment Strategies',
    difficulty: 'easy',
    question: 'What is continuous deployment?',
    options: [
      'A. Deploying once a month',
      'B. Manual deployment process',
      'C. Deployment only on weekends',
      'D. Automatically deploying changes to production after they pass the required checks'
    ],
    correctAnswer: 'D'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Deployment Configuration',
    difficulty: 'medium',
    question: 'What are environment variables commonly used for in deployment?',
    options: [
      'A. Storing configuration values such as API endpoints and environment-specific settings',
      'B. Storing source code',
      'C. Storing database records',
      'D. Storing images'
    ],
    correctAnswer: 'A'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'CI/CD',
    difficulty: 'easy',
    question: 'What does CI/CD commonly stand for?',
    options: [
      'A. Continuous Input / Continuous Delivery',
      'B. Continuous Integration / Continuous Delivery',
      'C. Continuous Integration / Continuous Design',
      'D. Continuous Input / Continuous Deployment'
    ],
    correctAnswer: 'B'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'CI',
    difficulty: 'medium',
    question: 'What is Continuous Integration (CI)?',
    options: [
      'A. Automatically deploying every code change to production',
      'B. Manually integrating code changes',
      'C. Frequently integrating code changes and automatically building and testing them',
      'D. Testing code changes manually'
    ],
    correctAnswer: 'C'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'CD',
    difficulty: 'medium',
    question: 'What is Continuous Delivery?',
    options: [
      'A. Automatically deploying every change directly to production',
      'B. Keeping software in a releasable state through an automated build, test, and delivery process',
      'C. Manually deploying code',
      'D. Testing code manually'
    ],
    correctAnswer: 'B'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Deployment Environments',
    difficulty: 'medium',
    question: 'Which set represents common deployment environments?',
    options: [
      'A. Development, Staging, Production',
      'B. Development, Gaming, Production',
      'C. Design, Staging, Production',
      'D. Development, Backup, Production'
    ],
    correctAnswer: 'A'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Staging Environment',
    difficulty: 'medium',
    question: 'What is a staging environment primarily used for?',
    options: [
      'A. Writing source code',
      'B. Testing and validating changes before production deployment',
      'C. Replacing the production environment permanently',
      'D. Storing user passwords'
    ],
    correctAnswer: 'B'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Production Environment',
    difficulty: 'medium',
    question: 'What is the production environment?',
    options: [
      'A. The environment where developers experiment with code',
      'B. The environment used only for automated testing',
      'C. The environment where the live application or service is made available to users',
      'D. The environment used only for staging'
    ],
    correctAnswer: 'C'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Deployment Methods',
    difficulty: 'medium',
    question: 'What is a rolling deployment?',
    options: [
      'A. Updating every server at exactly the same time',
      'B. Reverting to a previous version',
      'C. Deploying to only one server permanently',
      'D. Gradually updating instances or servers in batches'
    ],
    correctAnswer: 'D'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Deployment Methods',
    difficulty: 'medium',
    question: 'What is blue-green deployment?',
    options: [
      'A. Running two separate environments so traffic can be switched between the current and new versions',
      'B. Running only one environment at a time',
      'C. Deploying only to development',
      'D. Using two different programming languages'
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
      'A. Rolling out a new version to all users immediately',
      'B. Gradually exposing a new version to a small subset of users or traffic before wider rollout',
      'C. Deploying only to a development environment',
      'D. Permanently removing the old version before testing'
    ],
    correctAnswer: 'B'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Deployment Methods',
    difficulty: 'medium',
    question: 'What is A/B testing in deployment?',
    options: [
      'A. Testing two database servers',
      'B. Testing two programming languages',
      'C. Comparing two versions or variants with users to determine which performs better',
      'D. Testing two development computers'
    ],
    correctAnswer: 'C'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Deployment Tools',
    difficulty: 'medium',
    question: 'Which of the following is commonly used as a CI/CD or deployment automation tool?',
    options: [
      'A. Microsoft Word',
      'B. Jenkins',
      'C. Photoshop',
      'D. Notepad'
    ],
    correctAnswer: 'B'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Jenkins',
    difficulty: 'medium',
    question: 'What is Jenkins commonly used for?',
    options: [
      'A. Automation of software build, testing, and CI/CD workflows',
      'B. Version control itself',
      'C. Designing websites',
      'D. Writing database queries'
    ],
    correctAnswer: 'A'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'GitHub Actions',
    difficulty: 'medium',
    question: 'What is GitHub Actions primarily used for?',
    options: [
      'A. Hosting database servers',
      'B. Automating workflows such as CI/CD',
      'C. Replacing Git version control',
      'D. Designing graphical interfaces'
    ],
    correctAnswer: 'B'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Deployment Automation',
    difficulty: 'advanced',
    question: 'Which is a major benefit of deployment automation?',
    options: [
      'A. It eliminates the need for testing',
      'B. It prevents developers from making code changes',
      'C. It can reduce human error, improve consistency, and speed up deployments',
      'D. It guarantees that software will never fail'
    ],
    correctAnswer: 'C'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Rollback Strategies',
    difficulty: 'advanced',
    question: 'What is a rollback in deployment?',
    options: [
      'A. Updating to a newer version',
      'B. Deleting all previous versions',
      'C. Starting a new development project',
      'D. Reverting a deployment to a previous stable version'
    ],
    correctAnswer: 'D'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Rollback Strategies',
    difficulty: 'advanced',
    question: 'Which is a good rollback practice?',
    options: [
      'A. Have a tested rollback plan ready before deployment',
      'B. Never keep previous versions',
      'C. Disable monitoring during deployment',
      'D. Delete backups after every deployment'
    ],
    correctAnswer: 'A'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Deployment Monitoring',
    difficulty: 'advanced',
    question: 'What is deployment monitoring?',
    options: [
      'A. Monitoring only source-code formatting',
      'B. Observing application health, performance, errors, and other indicators after deployment',
      'C. Monitoring only developer activity',
      'D. Monitoring only database backups'
    ],
    correctAnswer: 'B'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Deployment Logging',
    difficulty: 'advanced',
    question: 'What is deployment logging?',
    options: [
      'A. Recording only user passwords',
      'B. Recording only source-code comments',
      'C. Recording deployment events, status information, and relevant errors',
      'D. Recording only database usernames'
    ],
    correctAnswer: 'C'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Deployment Security',
    difficulty: 'advanced',
    question: 'Which is an important security practice during deployment?',
    options: [
      'A. Store secrets directly in public source code',
      'B. Give every developer unrestricted production access',
      'C. Disable HTTPS',
      'D. Use secure connections, protect secrets, and restrict deployment access'
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
      'A. Securely storing and controlling sensitive values such as API keys, passwords, and tokens',
      'B. Publishing passwords in source code',
      'C. Sharing API keys publicly',
      'D. Storing secrets in plain text in documentation'
    ],
    correctAnswer: 'A'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Deployment Strategies',
    difficulty: 'advanced',
    question: 'What is a primary purpose of a deployment strategy?',
    options: [
      'A. To make software development unnecessary',
      'B. To eliminate the need for monitoring',
      'C. To provide a planned approach for releasing software safely and reliably',
      'D. To guarantee zero software defects'
    ],
    correctAnswer: 'C'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Cloud Deployment',
    difficulty: 'medium',
    question: 'Which of the following are major cloud computing platforms?',
    options: [
      'A. Git and GitHub',
      'B. HTML and CSS',
      'C. AWS, Microsoft Azure, and Google Cloud',
      'D. Node.js and Express'
    ],
    correctAnswer: 'C'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'AWS',
    difficulty: 'medium',
    question: 'What is AWS commonly used for?',
    options: [
      'A. Editing source code only',
      'B. Version control only',
      'C. Designing user interfaces only',
      'D. Cloud computing, hosting, storage, networking, and application deployment'
    ],
    correctAnswer: 'D'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Azure',
    difficulty: 'medium',
    question: 'What is Microsoft Azure commonly used for?',
    options: [
      'A. Cloud computing, hosting, and application deployment',
      'B. Version control only',
      'C. Code editing only',
      'D. Image editing only'
    ],
    correctAnswer: 'A'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Google Cloud',
    difficulty: 'medium',
    question: 'What is Google Cloud commonly used for?',
    options: [
      'A. Version control only',
      'B. Cloud computing, hosting, storage, and application deployment',
      'C. Code editing only',
      'D. Desktop publishing only'
    ],
    correctAnswer: 'B'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Docker',
    difficulty: 'advanced',
    question: 'What is Docker commonly used for in deployment?',
    options: [
      'A. Version control',
      'B. Code editing',
      'C. Packaging and running applications in containers',
      'D. Managing DNS records only'
    ],
    correctAnswer: 'C'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Kubernetes',
    difficulty: 'advanced',
    question: 'What is Kubernetes primarily used for?',
    options: [
      'A. Writing JavaScript code',
      'B. Hosting Git repositories',
      'C. Editing container images',
      'D. Orchestrating and managing containerized applications'
    ],
    correctAnswer: 'D'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Containerization',
    difficulty: 'advanced',
    question: 'What is containerization?',
    options: [
      'A. Packaging an application and its dependencies into a portable container',
      'B. Storing files only on physical hard drives',
      'C. Creating database tables',
      'D. Writing application documentation'
    ],
    correctAnswer: 'A'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Serverless Deployment',
    difficulty: 'advanced',
    question: 'What does serverless deployment generally mean?',
    options: [
      'A. Running software without any computers or servers',
      'B. Running applications while the cloud provider manages the underlying server infrastructure',
      'C. Running applications only on physical servers',
      'D. Running applications without an internet connection'
    ],
    correctAnswer: 'B'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'AWS Lambda',
    difficulty: 'advanced',
    question: 'What is AWS Lambda?',
    options: [
      'A. A relational database service',
      'B. A file storage service',
      'C. A serverless compute service that runs code in response to events',
      'D. A version-control platform'
    ],
    correctAnswer: 'C'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Deployment Pipelines',
    difficulty: 'advanced',
    question: 'What is a deployment pipeline?',
    options: [
      'A. A database backup',
      'B. A source-code repository',
      'C. A collection of application screenshots',
      'D. A sequence of automated or controlled stages used to build, test, and deploy software'
    ],
    correctAnswer: 'D'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Infrastructure as Code',
    difficulty: 'advanced',
    question: 'What is Infrastructure as Code (IaC)?',
    options: [
      'A. Managing and provisioning infrastructure using machine-readable configuration or code',
      'B. Managing source code manually',
      'C. Designing application logos',
      'D. Writing documentation without automation'
    ],
    correctAnswer: 'A'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Terraform',
    difficulty: 'advanced',
    question: 'What is Terraform commonly used for?',
    options: [
      'A. Version control',
      'B. Code editing',
      'C. Database administration only',
      'D. Infrastructure as Code and infrastructure provisioning'
    ],
    correctAnswer: 'D'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Deployment Best Practices',
    difficulty: 'advanced',
    question: 'Which combination represents good deployment practices?',
    options: [
      'A. Deploy without testing and disable monitoring',
      'B. Store secrets in source code and deploy manually',
      'C. Test changes, automate where appropriate, and monitor after deployment',
      'D. Remove rollback procedures'
    ],
    correctAnswer: 'C'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Deployment Testing',
    difficulty: 'advanced',
    question: 'What is the primary purpose of deployment testing?',
    options: [
      'A. To replace all software development testing',
      'B. To increase the number of developers',
      'C. To eliminate the need for monitoring',
      'D. To verify that the deployed application works correctly in its target environment'
    ],
    correctAnswer: 'D'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Deployment Documentation',
    difficulty: 'advanced',
    question: 'What is deployment documentation?',
    options: [
      'A. Documentation describing how to deploy, configure, verify, and potentially roll back an application',
      'B. Documentation containing only user passwords',
      'C. Documentation about graphic design only',
      'D. Documentation about unrelated software'
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
      'A. A list of programming languages used in a project',
      'B. A list of items and checks to verify before, during, or after deployment',
      'C. A list of users registered on a website',
      'D. A list of database tables'
    ],
    correctAnswer: 'B'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Deployment Success Criteria',
    difficulty: 'advanced',
    question: 'Which combination best describes a successful deployment?',
    options: [
      'A. The deployment finishes regardless of whether the application works',
      'B. Only the build succeeds',
      'C. The application is successfully deployed, functions correctly, and meets required checks',
      'D. The deployment takes as long as possible'
    ],
    correctAnswer: 'C'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Deployment Risks',
    difficulty: 'advanced',
    question: 'Which of the following can be a deployment risk?',
    options: [
      'A. Downtime',
      'B. Data loss or corruption',
      'C. Performance degradation',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Deployment Mitigation',
    difficulty: 'advanced',
    question: 'Which combination can help mitigate deployment risks?',
    options: [
      'A. Use testing, monitoring, backups, and a rollback plan',
      'B. Disable monitoring',
      'C. Deploy without testing',
      'D. Remove previous application versions immediately'
    ],
    correctAnswer: 'A'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Deployment Collaboration',
    difficulty: 'advanced',
    question: 'What is the role of collaboration in deployment?',
    options: [
      'A. Allowing teams to work without communication',
      'B. Coordinating developers, operations, security, and other stakeholders for a successful release',
      'C. Preventing teams from sharing deployment information',
      'D. Eliminating deployment planning'
    ],
    correctAnswer: 'B'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Deployment Feedback',
    difficulty: 'advanced',
    question: 'Why is feedback important after deployment?',
    options: [
      'A. It eliminates the need for future testing',
      'B. It guarantees that every deployment will succeed',
      'C. It helps identify problems and improve future deployments',
      'D. It prevents developers from making changes'
    ],
    correctAnswer: 'C'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Deployment Metrics',
    difficulty: 'advanced',
    question: 'What are deployment metrics?',
    options: [
      'A. Measurements used to evaluate software development salaries',
      'B. Measurements used only to count source-code files',
      'C. Measurements used only to track office attendance',
      'D. Measurements used to assess deployment performance, reliability, frequency, or related delivery outcomes'
    ],
    correctAnswer: 'D'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Deployment Time',
    difficulty: 'advanced',
    question: 'Why can reducing deployment time be valuable?',
    options: [
      'A. Faster deployments can shorten time to market and enable quicker feedback',
      'B. Slower deployments always produce better software',
      'C. Deployment time has no effect on software delivery',
      'D. Deployment speed matters only for very large companies'
    ],
    correctAnswer: 'A'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Deployment Frequency',
    difficulty: 'advanced',
    question: 'What is a potential benefit of frequent, well-controlled deployments?',
    options: [
      'A. They eliminate all deployment risks',
      'B. They can provide faster feedback and enable smaller, more manageable changes',
      'C. They guarantee zero defects',
      'D. They eliminate the need for automated testing'
    ],
    correctAnswer: 'B'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Deployment Future',
    difficulty: 'advanced',
    question: 'Which of the following are important trends or approaches in modern software deployment?',
    options: [
      'A. Manual deployment only',
      'B. Deploying without testing',
      'C. GitOps, serverless deployment, and progressive delivery',
      'D. Removing deployment automation'
    ],
    correctAnswer: 'C'
  }
];

export default questions;