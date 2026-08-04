export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Vercel Fundamentals',
    difficulty: 'easy',
    question: 'What is Vercel primarily used for?',
    options: [
      'A. Frontend deployment and hosting platform',
      'B. Version control and code management',
      'C. Database management',
      'D. Design and prototyping'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Vercel GitHub Integration',
    difficulty: 'easy',
    question: 'How does Vercel connect to a GitHub repository?',
    options: [
      'A. Through GitHub integration and OAuth',
      'B. Through manual file upload',
      'C. Via SSH key authentication only',
      'D. Using FTP protocol'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Vercel Features',
    difficulty: 'easy',
    question: 'Which of the following is a feature of Vercel?',
    options: [
      'A. Automatic deployments',
      'B. Preview deployments for pull requests',
      'C. Serverless functions',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Vercel Automatic Deployments',
    difficulty: 'medium',
    question: 'What triggers automatic deployments on Vercel when connected to GitHub?',
    options: [
      'A. Pushing to specific branches',
      'B. Pull request creation',
      'C. Both A and B',
      'D. Manual trigger only'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Vercel Protocols',
    difficulty: 'medium',
    question: 'Which protocol does Vercel use to communicate with GitHub repositories?',
    options: [
      'A. HTTPS',
      'B. Git protocol',
      'C. Both A and B',
      'D. WebSockets'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Vercel Benefits',
    difficulty: 'medium',
    question: 'What is the primary benefit of Vercel\'s GitHub integration?',
    options: [
      'A. Seamless CI/CD pipeline for frontend applications',
      'B. Automatic SSL certificate management',
      'C. Database backup automation',
      'D. Code review automation'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Vercel Project Types',
    difficulty: 'medium',
    question: 'What type of projects is Vercel best suited for?',
    options: [
      'A. Frontend frameworks like React, Next.js, Vue',
      'B. Backend APIs only',
      'C. Mobile applications',
      'D. Desktop applications'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Vercel Preview Deployments',
    difficulty: 'medium',
    question: 'What happens when you create a pull request in a GitHub repository connected to Vercel?',
    options: [
      'A. Vercel creates a preview deployment',
      'B. Nothing happens automatically',
      'C. Vercel automatically merges the PR',
      'D. Vercel deletes the production site'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Vercel Platforms',
    difficulty: 'medium',
    question: 'Which of the following is a valid deployment platform?',
    options: [
      'A. Vercel',
      'B. Netlify',
      'C. Both A and B',
      'D. Only GitHub'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Vercel Branches',
    difficulty: 'medium',
    question: 'What is the default branch that Vercel monitors for production deployments?',
    options: [
      'A. main or master',
      'B. develop',
      'C. staging',
      'D. production'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Vercel Dashboard',
    difficulty: 'easy',
    question: 'What is the first step to deploy a website to Vercel using the dashboard?',
    options: [
      'A. Log in to Vercel dashboard',
      'B. Install Vercel CLI',
      'C. Create a GitHub repository',
      'D. Write the HTML code'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Vercel Dashboard',
    difficulty: 'easy',
    question: 'In the Vercel dashboard, which button do you click to start a new deployment?',
    options: [
      'A. "Add New" → "Project"',
      'B. "Deploy" → "New Project"',
      'C. "Create" → "Deployment"',
      'D. "Settings" → "Deploy"'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Vercel Import',
    difficulty: 'medium',
    question: 'When deploying from the Vercel dashboard, which of these can you import?',
    options: [
      'A. GitHub repositories',
      'B. GitLab repositories',
      'C. Bitbucket repositories',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Vercel Configuration',
    difficulty: 'medium',
    question: 'What information does Vercel need to deploy your project from the dashboard?',
    options: [
      'A. Repository URL and branch',
      'B. Build command and output directory',
      'C. Both A and B',
      'D. Only the project name'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Vercel Deployment Process',
    difficulty: 'medium',
    question: 'After clicking "Deploy" in the Vercel dashboard, what happens?',
    options: [
      'A. Vercel builds and deploys the project',
      'B. The project is instantly live',
      'C. A confirmation email is sent',
      'D. The repository is cloned locally'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Vercel Deployment Status',
    difficulty: 'medium',
    question: 'Where can you view the deployment status in the Vercel dashboard?',
    options: [
      'A. On the project page',
      'B. In the deployments tab',
      'C. Both A and B',
      'D. Only in the logs section'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Vercel URLs',
    difficulty: 'easy',
    question: 'What is a deployment URL in Vercel?',
    options: [
      'A. A temporary preview URL',
      'B. A permanent production URL',
      'C. Both A and B',
      'D. A local development URL'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Vercel Redeployment',
    difficulty: 'medium',
    question: 'Which dashboard section allows you to redeploy a previous version?',
    options: [
      'A. Deployments',
      'B. Analytics',
      'C. Settings',
      'D. Integrations'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Vercel Permissions',
    difficulty: 'medium',
    question: 'What permission is required to deploy a GitHub repository via Vercel dashboard?',
    options: [
      'A. Read access to the repository',
      'B. Write access to the repository',
      'C. Admin access to the repository',
      'D. No permission is needed'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Vercel Project Deletion',
    difficulty: 'medium',
    question: 'What happens when you delete a project from the Vercel dashboard?',
    options: [
      'A. The deployment is removed but the repository remains',
      'B. The GitHub repository is also deleted',
      'C. Both are deleted',
      'D. Neither is deleted'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Vercel Environment Variables',
    difficulty: 'medium',
    question: 'Where can you configure environment variables in Vercel?',
    options: [
      'A. Project Settings → Environment Variables',
      'B. Deployment Settings',
      'C. Account Settings',
      'D. Build Settings'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Vercel Environment Variables Purpose',
    difficulty: 'medium',
    question: 'What is the purpose of environment variables in Vercel?',
    options: [
      'A. To store sensitive data like API keys',
      'B. To configure build settings',
      'C. To manage team members',
      'D. To set deployment regions'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Vercel Custom Domains',
    difficulty: 'medium',
    question: 'How do you add a custom domain to a Vercel project?',
    options: [
      'A. Through the domain management section',
      'B. By updating the DNS records manually',
      'C. Both A and B',
      'D. Only through the CLI'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Vercel DNS Records',
    difficulty: 'medium',
    question: 'What DNS record type is required for a Vercel custom domain?',
    options: [
      'A. CNAME record',
      'B. A record',
      'C. MX record',
      'D. TXT record'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Vercel Settings',
    difficulty: 'medium',
    question: 'Which of the following can be configured in Vercel project settings?',
    options: [
      'A. Build command',
      'B. Output directory',
      'C. Both A and B',
      'D. Only the framework preset'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Vercel Environment Scopes',
    difficulty: 'medium',
    question: 'What does the "Production" environment variable scope mean?',
    options: [
      'A. Variables are available in production deployments',
      'B. Variables are only available in preview deployments',
      'C. Variables are available in both preview and production',
      'D. Variables are only available locally'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Vercel Domain Verification',
    difficulty: 'medium',
    question: 'How can you verify a custom domain is working correctly in Vercel?',
    options: [
      'A. Check the domain status in the dashboard',
      'B. Visit the domain in a browser',
      'C. Both A and B',
      'D. Only through the CLI'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Vercel Preview Environment',
    difficulty: 'medium',
    question: 'What is a "preview" environment variable scope?',
    options: [
      'A. Variables available in preview deployment environments',
      'B. Variables available during build only',
      'C. Variables available in production only',
      'D. Variables available in all environments'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Vercel SSL',
    difficulty: 'medium',
    question: 'What is required to use a custom domain with Vercel?',
    options: [
      'A. A valid SSL certificate',
      'B. Domain ownership verification',
      'C. Both A and B',
      'D. Only domain ownership verification'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Vercel Team Management',
    difficulty: 'medium',
    question: 'Which section of Vercel dashboard manages team access and permissions?',
    options: [
      'A. Project Settings → Members',
      'B. Account Settings → Team',
      'C. Both A and B',
      'D. Project Settings → General'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Vercel CLI Installation',
    difficulty: 'easy',
    question: 'What is the command to install Vercel CLI globally?',
    options: [
      'A. npm install -g vercel',
      'B. npm install vercel',
      'C. npm install --save vercel',
      'D. npm install --dev vercel'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Vercel CLI Deploy',
    difficulty: 'easy',
    question: 'What command do you use to deploy a project with Vercel CLI?',
    options: [
      'A. vercel',
      'B. vercel deploy',
      'C. vercel --deploy',
      'D. vercel start'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Vercel CLI Production',
    difficulty: 'medium',
    question: 'What does the command "vercel --prod" do?',
    options: [
      'A. Deploys to production environment',
      'B. Deploys to preview environment',
      'C. Deploys to staging environment',
      'D. Only runs the build process'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Vercel CLI Version',
    difficulty: 'easy',
    question: 'After installation, what command verifies Vercel CLI is installed correctly?',
    options: [
      'A. vercel --version',
      'B. vercel -v',
      'C. Both A and B',
      'D. vercel help'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Vercel CLI First Run',
    difficulty: 'medium',
    question: 'When you run "vercel" for the first time, what does it prompt you to do?',
    options: [
      'A. Log in to Vercel account',
      'B. Set up project settings',
      'C. Both A and B',
      'D. Install additional dependencies'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Vercel CLI Redeploy',
    difficulty: 'medium',
    question: 'What command redeploys the latest version of your project?',
    options: [
      'A. vercel',
      'B. vercel redeploy',
      'C. vercel --force',
      'D. vercel --prod'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Vercel CLI Help',
    difficulty: 'easy',
    question: 'What does the command "vercel --help" display?',
    options: [
      'A. Available commands and options',
      'B. Version information',
      'C. Deployment status',
      'D. Logs from the last deployment'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Vercel CLI Link',
    difficulty: 'medium',
    question: 'How do you link an existing project to Vercel CLI?',
    options: [
      'A. Run "vercel link" in the project directory',
      'B. Run "vercel init"',
      'C. Run "vercel connect"',
      'D. Manual configuration in vercel.json'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Vercel Configuration File',
    difficulty: 'medium',
    question: 'What is the purpose of the "vercel.json" file?',
    options: [
      'A. To configure project settings for Vercel',
      'B. To store project dependencies',
      'C. To store environment variables',
      'D. To define build scripts'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Vercel CLI Update',
    difficulty: 'medium',
    question: 'What happens when you run "vercel" in a project directory without changes?',
    options: [
      'A. It redeploys the latest version',
      'B. It skips the deployment',
      'C. It shows an error',
      'D. It asks for confirmation'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Vercel Auto Deploy',
    difficulty: 'medium',
    question: 'What is the workflow to update a live site after code changes?',
    options: [
      'A. Make changes, commit, push, Vercel auto-deploys',
      'B. Make changes, run "vercel" manually',
      'C. Both A and B',
      'D. Only manual redeployment'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Vercel Auto Deploy Trigger',
    difficulty: 'medium',
    question: 'What happens when you push changes to the main branch with Vercel auto-deploy enabled?',
    options: [
      'A. The site is automatically redeployed',
      'B. Nothing happens',
      'C. A preview deployment is created',
      'D. The deployment fails'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Vercel Deployment Time',
    difficulty: 'medium',
    question: 'How long does a Vercel deployment typically take?',
    options: [
      'A. A few seconds to a few minutes',
      'B. 30 minutes',
      'C. 1 hour',
      'D. 24 hours'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Vercel Force Rebuild',
    difficulty: 'medium',
    question: 'What command forces a full rebuild without code changes?',
    options: [
      'A. vercel --force',
      'B. vercel --rebuild',
      'C. vercel --hard',
      'D. vercel --fresh'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Vercel Deployment History',
    difficulty: 'medium',
    question: 'Where can you view the deployment history of your Vercel project?',
    options: [
      'A. In the Vercel dashboard',
      'B. Using the CLI with "vercel list"',
      'C. Both A and B',
      'D. Only in the GitHub repository'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Vercel Deployment Failure',
    difficulty: 'medium',
    question: 'What should you do if a deployment fails after code changes?',
    options: [
      'A. Check the deployment logs',
      'B. Review the build output',
      'C. Both A and B',
      'D. Delete the project and start over'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Vercel Rollback',
    difficulty: 'medium',
    question: 'Can you rollback to a previous deployment version?',
    options: [
      'A. Yes, in the dashboard',
      'B. Yes, using the CLI',
      'C. Both A and B',
      'D. No, not possible'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Vercel Preview Purpose',
    difficulty: 'medium',
    question: 'What is the purpose of "preview deployments" when updating a site?',
    options: [
      'A. To test changes before production',
      'B. To speed up the deployment process',
      'C. To reduce deployment costs',
      'D. To backup the code'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Vercel Deployment Success',
    difficulty: 'medium',
    question: 'How do you know if a redeployment was successful?',
    options: [
      'A. Check the deployment status in the dashboard',
      'B. Visit the live site',
      'C. Both A and B',
      'D. Wait for an email notification'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Vercel Auto Deploy Benefits',
    difficulty: 'medium',
    question: 'What is the benefit of auto-deploy from GitHub?',
    options: [
      'A. Manual deployment is no longer needed',
      'B. Faster deployment cycles',
      'C. Both A and B',
      'D. It reduces build time'
    ],
    correctAnswer: 'C' // Kept as C
  }
];

export default questions;