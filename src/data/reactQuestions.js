export const questions = [
  // Learning Objective 1: Explain what Vercel is and how it connects to a GitHub repository
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'easy',
    question: 'What is Vercel primarily used for?',
    options: [
      'A. Version control and code management',
      'B. Frontend deployment and hosting platform',
      'C. Database management',
      'D. Design and prototyping'
    ],
    correctAnswer: 'C' // Moved from B to C
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'easy',
    question: 'How does Vercel connect to a GitHub repository?',
    options: [
      'A. Through manual file upload',
      'B. Via SSH key authentication only',
      'C. Through GitHub integration and OAuth',
      'D. Using FTP protocol'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'medium',
    question: 'Which of the following is NOT a feature of Vercel?',
    options: [
      'A. Automatic deployments',
      'B. Preview deployments for pull requests',
      'C. Serverless functions',
      'D. Local development server only'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'medium',
    question: 'What triggers automatic deployments on Vercel when connected to GitHub?',
    options: [
      'A. Pull request creation',
      'B. Pushing to specific branches',
      'C. Both A and B',
      'D. Manual trigger only'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'easy',
    question: 'Which protocol does Vercel use to communicate with GitHub repositories?',
    options: [
      'A. HTTPS',
      'B. WebSockets',
      'C. Git protocol',
      'D. Both A and C'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'medium',
    question: 'What is the primary benefit of Vercel\'s GitHub integration?',
    options: [
      'A. Automatic SSL certificate management',
      'B. Seamless CI/CD pipeline for frontend applications',
      'C. Database backup automation',
      'D. Code review automation'
    ],
    correctAnswer: 'D' // Moved from B to D
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'easy',
    question: 'What type of projects is Vercel best suited for?',
    options: [
      'A. Backend APIs only',
      'B. Frontend frameworks like React, Next.js, Vue',
      'C. Mobile applications',
      'D. Desktop applications'
    ],
    correctAnswer: 'A' // Moved from B to A
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'medium',
    question: 'What happens when you create a pull request in a GitHub repository connected to Vercel?',
    options: [
      'A. Nothing happens automatically',
      'B. Vercel creates a preview deployment',
      'C. Vercel automatically merges the PR',
      'D. Vercel deletes the production site'
    ],
    correctAnswer: 'B' // Kept as B
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'medium',
    question: 'Which of the following is a valid deployment platform?',
    options: [
      'A. Vercel',
      'B. Netlify',
      'C. Both A and B',
      'D. Only GitHub'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Explain what Vercel is and how it connects to a GitHub repository',
    difficulty: 'easy',
    question: 'What is the default branch that Vercel monitors for production deployments?',
    options: [
      'A. main or master',
      'B. develop',
      'C. staging',
      'D. production'
    ],
    correctAnswer: 'D' // Moved from A to D
  },

  // Learning Objective 2: Deploy a website to Vercel using the Vercel Dashboard
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'easy',
    question: 'What is the first step to deploy a website to Vercel using the dashboard?',
    options: [
      'A. Install Vercel CLI',
      'B. Log in to Vercel dashboard',
      'C. Create a GitHub repository',
      'D. Write the HTML code'
    ],
    correctAnswer: 'A' // Moved from B to A
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'easy',
    question: 'In the Vercel dashboard, which button do you click to start a new deployment?',
    options: [
      'A. "Add New" → "Project"',
      'B. "Deploy" → "New Project"',
      'C. "Create" → "Deployment"',
      'D. "Settings" → "Deploy"'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'medium',
    question: 'When deploying from the Vercel dashboard, which of these can you import?',
    options: [
      'A. GitHub repositories',
      'B. GitLab repositories',
      'C. Bitbucket repositories',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'medium',
    question: 'What information does Vercel need to deploy your project from the dashboard?',
    options: [
      'A. Repository URL and branch',
      'B. Build command and output directory',
      'C. Both A and B',
      'D. Only the project name'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'easy',
    question: 'After clicking "Deploy" in the Vercel dashboard, what happens?',
    options: [
      'A. The project is instantly live',
      'B. Vercel builds and deploys the project',
      'C. A confirmation email is sent',
      'D. The repository is cloned locally'
    ],
    correctAnswer: 'A' // Moved from B to A
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'medium',
    question: 'Where can you view the deployment status in the Vercel dashboard?',
    options: [
      'A. On the project page',
      'B. In the deployments tab',
      'C. Both A and B',
      'D. Only in the logs section'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'easy',
    question: 'What is a deployment URL in Vercel?',
    options: [
      'A. A temporary preview URL',
      'B. A permanent production URL',
      'C. Both A and B',
      'D. A local development URL'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'medium',
    question: 'Which dashboard section allows you to redeploy a previous version?',
    options: [
      'A. Analytics',
      'B. Deployments',
      'C. Settings',
      'D. Integrations'
    ],
    correctAnswer: 'D' // Moved from B to D
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'easy',
    question: 'What permission is required to deploy a GitHub repository via Vercel dashboard?',
    options: [
      'A. Read access to the repository',
      'B. Write access to the repository',
      'C. Admin access to the repository',
      'D. No permission is needed'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Deploy a website to Vercel using the Vercel Dashboard',
    difficulty: 'medium',
    question: 'What happens when you delete a project from the Vercel dashboard?',
    options: [
      'A. The GitHub repository is also deleted',
      'B. The deployment is removed but the repository remains',
      'C. Both are deleted',
      'D. Neither is deleted'
    ],
    correctAnswer: 'B' // Kept as B
  },

  // Learning Objective 3: Configure project settings, environment variables and custom domains
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'easy',
    question: 'Where can you configure environment variables in Vercel?',
    options: [
      'A. Project Settings → Environment Variables',
      'B. Deployment Settings',
      'C. Account Settings',
      'D. Build Settings'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'medium',
    question: 'What is the purpose of environment variables in Vercel?',
    options: [
      'A. To store sensitive data like API keys',
      'B. To configure build settings',
      'C. To manage team members',
      'D. To set deployment regions'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'medium',
    question: 'How do you add a custom domain to a Vercel project?',
    options: [
      'A. Through the domain management section',
      'B. By updating the DNS records manually',
      'C. Both A and B',
      'D. Only through the CLI'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'easy',
    question: 'What DNS record type is required for a Vercel custom domain?',
    options: [
      'A. A record',
      'B. CNAME record',
      'C. MX record',
      'D. TXT record'
    ],
    correctAnswer: 'B' // Kept as B
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'medium',
    question: 'Which of the following can be configured in Vercel project settings?',
    options: [
      'A. Build command',
      'B. Output directory',
      'C. Both A and B',
      'D. Only the framework preset'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'easy',
    question: 'What does the "Production" environment variable scope mean?',
    options: [
      'A. Variables are only available in preview deployments',
      'B. Variables are available in production deployments',
      'C. Variables are available in both preview and production',
      'D. Variables are only available locally'
    ],
    correctAnswer: 'D' // Moved from B to D
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'medium',
    question: 'How can you verify a custom domain is working correctly in Vercel?',
    options: [
      'A. Check the domain status in the dashboard',
      'B. Visit the domain in a browser',
      'C. Both A and B',
      'D. Only through the CLI'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'easy',
    question: 'What is a "preview" environment variable scope?',
    options: [
      'A. Variables available during build only',
      'B. Variables available in preview deployment environments',
      'C. Variables available in production only',
      'D. Variables available in all environments'
    ],
    correctAnswer: 'B' // Kept as B
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'medium',
    question: 'What is required to use a custom domain with Vercel?',
    options: [
      'A. A valid SSL certificate',
      'B. Domain ownership verification',
      'C. Both A and B',
      'D. Only domain ownership verification'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Configure project settings, environment variables and custom domains',
    difficulty: 'medium',
    question: 'Which section of Vercel dashboard manages team access and permissions?',
    options: [
      'A. Project Settings → General',
      'B. Project Settings → Members',
      'C. Account Settings → Team',
      'D. Both B and C'
    ],
    correctAnswer: 'D' // Kept as D
  },

  // Learning Objective 4: Install and use the Vercel CLI to deploy and redeploy projects
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'easy',
    question: 'What is the command to install Vercel CLI globally?',
    options: [
      'A. npm install vercel',
      'B. npm install -g vercel',
      'C. npm install --save vercel',
      'D. npm install --dev vercel'
    ],
    correctAnswer: 'A' // Moved from B to A
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'easy',
    question: 'What command do you use to deploy a project with Vercel CLI?',
    options: [
      'A. vercel deploy',
      'B. vercel',
      'C. vercel --deploy',
      'D. vercel start'
    ],
    correctAnswer: 'B' // Kept as B
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'medium',
    question: 'What does the command "vercel --prod" do?',
    options: [
      'A. Deploys to production environment',
      'B. Deploys to preview environment',
      'C. Deploys to staging environment',
      'D. Only runs the build process'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'easy',
    question: 'After installation, what command verifies Vercel CLI is installed correctly?',
    options: [
      'A. vercel -v',
      'B. vercel --version',
      'C. Both A and B',
      'D. vercel help'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'medium',
    question: 'When you run "vercel" for the first time, what does it prompt you to do?',
    options: [
      'A. Log in to Vercel account',
      'B. Set up project settings',
      'C. Both A and B',
      'D. Install additional dependencies'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'easy',
    question: 'What command redeploys the latest version of your project?',
    options: [
      'A. vercel redeploy',
      'B. vercel --force',
      'C. vercel --prod',
      'D. vercel'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'medium',
    question: 'What does the command "vercel --help" display?',
    options: [
      'A. Version information',
      'B. Available commands and options',
      'C. Deployment status',
      'D. Logs from the last deployment'
    ],
    correctAnswer: 'C' // Moved from B to C
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'medium',
    question: 'How do you link an existing project to Vercel CLI?',
    options: [
      'A. Run "vercel link" in the project directory',
      'B. Run "vercel init"',
      'C. Run "vercel connect"',
      'D. Manual configuration in vercel.json'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'easy',
    question: 'What is the purpose of the "vercel.json" file?',
    options: [
      'A. To store project dependencies',
      'B. To configure project settings for Vercel',
      'C. To store environment variables',
      'D. To define build scripts'
    ],
    correctAnswer: 'A' // Moved from B to A
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Install and use the Vercel CLI to deploy and redeploy projects',
    difficulty: 'medium',
    question: 'What happens when you run "vercel" in a project directory without changes?',
    options: [
      'A. It skips the deployment',
      'B. It redeploys the latest version',
      'C. It shows an error',
      'D. It asks for confirmation'
    ],
    correctAnswer: 'B' // Kept as B
  },

  // Learning Objective 5: Update and redeploy a live site after making code changes
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'easy',
    question: 'What is the workflow to update a live site after code changes?',
    options: [
      'A. Make changes, commit, push, Vercel auto-deploys',
      'B. Make changes, run "vercel" manually',
      'C. Both A and B',
      'D. Only manual redeployment'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'medium',
    question: 'What happens when you push changes to the main branch with Vercel auto-deploy enabled?',
    options: [
      'A. The site is automatically redeployed',
      'B. Nothing happens',
      'C. A preview deployment is created',
      'D. The deployment fails'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'easy',
    question: 'How long does a Vercel deployment typically take?',
    options: [
      'A. A few seconds to a few minutes',
      'B. 30 minutes',
      'C. 1 hour',
      'D. 24 hours'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'medium',
    question: 'What command forces a full rebuild without code changes?',
    options: [
      'A. vercel --force',
      'B. vercel --rebuild',
      'C. vercel --hard',
      'D. vercel --fresh'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'easy',
    question: 'Where can you view the deployment history of your Vercel project?',
    options: [
      'A. In the Vercel dashboard',
      'B. Using the CLI with "vercel list"',
      'C. Both A and B',
      'D. Only in the GitHub repository'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'medium',
    question: 'What should you do if a deployment fails after code changes?',
    options: [
      'A. Check the deployment logs',
      'B. Review the build output',
      'C. Both A and B',
      'D. Delete the project and start over'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'easy',
    question: 'Can you rollback to a previous deployment version?',
    options: [
      'A. Yes, in the dashboard',
      'B. Yes, using the CLI',
      'C. Both A and B',
      'D. No, not possible'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'medium',
    question: 'What is the purpose of "preview deployments" when updating a site?',
    options: [
      'A. To test changes before production',
      'B. To speed up the deployment process',
      'C. To reduce deployment costs',
      'D. To backup the code'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'easy',
    question: 'How do you know if a redeployment was successful?',
    options: [
      'A. Check the deployment status in the dashboard',
      'B. Visit the live site',
      'C. Both A and B',
      'D. Wait for an email notification'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Update and redeploy a live site after making code changes',
    difficulty: 'medium',
    question: 'What is the benefit of auto-deploy from GitHub?',
    options: [
      'A. Manual deployment is no longer needed',
      'B. Faster deployment cycles',
      'C. Both A and B',
      'D. It reduces build time'
    ],
    correctAnswer: 'D' // Moved from C to D
  },

  // Learning Objective 6: Install Git on your computer and verify installation
  {
    id: 51,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'easy',
    question: 'How do you install Git on Windows?',
    options: [
      'A. Download from git-scm.com',
      'B. Use the Windows Store',
      'C. Both A and B',
      'D. Only via command line'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 52,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'easy',
    question: 'What command verifies Git installation?',
    options: [
      'A. git -v',
      'B. git --version',
      'C. Both A and B',
      'D. git help'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 53,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'easy',
    question: 'Which operating systems does Git support?',
    options: [
      'A. Windows',
      'B. macOS',
      'C. Linux',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 54,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'medium',
    question: 'What is the default Git installation directory on Windows?',
    options: [
      'A. C:\\Git',
      'B. C:\\Program Files\\Git',
      'C. C:\\Users\\Git',
      'D. C:\\Programs\\Git'
    ],
    correctAnswer: 'D' // Moved from B to D
  },
  {
    id: 55,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'easy',
    question: 'What does "git --version" display?',
    options: [
      'A. The current Git version number',
      'B. The Git configuration settings',
      'C. The Git repository status',
      'D. The Git help menu'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 56,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'medium',
    question: 'How do you install Git on macOS?',
    options: [
      'A. Using Homebrew',
      'B. Download from git-scm.com',
      'C. Both A and B',
      'D. Only through the App Store'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 57,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'easy',
    question: 'What is the minimum system requirement for Git?',
    options: [
      'A. 1GB RAM',
      'B. 2GB RAM',
      'C. 4GB RAM',
      'D. Very minimal - works on most systems'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 58,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'medium',
    question: 'Which command shows the Git installation path?',
    options: [
      'A. which git',
      'B. where git',
      'C. Both A and B',
      'D. git path'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 59,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'easy',
    question: 'What should you do after installing Git?',
    options: [
      'A. Configure user name and email',
      'B. Verify the installation',
      'C. Both A and B',
      'D. Nothing, it works automatically'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 60,
    type: 'multiple-choice',
    objective: 'Install Git on your computer and verify installation',
    difficulty: 'medium',
    question: 'How can you update Git to the latest version?',
    options: [
      'A. Download the latest installer',
      'B. Use the package manager',
      'C. Both A and B',
      'D. Only through the command line'
    ],
    correctAnswer: 'B' // Moved from C to B
  },

  // Learning Objective 7: Create and configure a GitHub account and repository
  {
    id: 61,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'easy',
    question: 'Where do you create a new repository on GitHub?',
    options: [
      'A. In the "Repositories" tab',
      'B. Click the "+" icon → "New repository"',
      'C. Both A and B',
      'D. Only through the CLI'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 62,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'easy',
    question: 'What is a GitHub repository?',
    options: [
      'A. A cloud-based storage for code',
      'B. A database management system',
      'C. A deployment tool',
      'D. A design platform'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 63,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'medium',
    question: 'What information is required to create a GitHub account?',
    options: [
      'A. Username',
      'B. Email',
      'C. Password',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 64,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'easy',
    question: 'How do you configure a repository after creation?',
    options: [
      'A. Through the repository settings',
      'B. Using the web interface',
      'C. Both A and B',
      'D. Only through the CLI'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 65,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'medium',
    question: 'What is the purpose of a README file in a GitHub repository?',
    options: [
      'A. To provide project documentation',
      'B. To configure build settings',
      'C. To store environment variables',
      'D. To define deployment settings'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 66,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'easy',
    question: 'Can you create a private repository on GitHub?',
    options: [
      'A. Yes, for free',
      'B. Yes, but only paid',
      'C. No, all repositories are public',
      'D. Only with a GitHub Pro account'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 67,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'medium',
    question: 'What is GitHub used for?',
    options: [
      'A. Version control and collaboration',
      'B. Code hosting',
      'C. Both A and B',
      'D. Only code hosting'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 68,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'easy',
    question: 'How do you add collaborators to a GitHub repository?',
    options: [
      'A. In the repository settings',
      'B. Through the collaborators section',
      'C. Both A and B',
      'D. Only by adding them as code owners'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 69,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'medium',
    question: 'What is a GitHub branch?',
    options: [
      'A. A parallel version of the repository',
      'B. A copy of the master branch',
      'C. Both A and B',
      'D. A type of file'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 70,
    type: 'multiple-choice',
    objective: 'Create and configure a GitHub account and repository',
    difficulty: 'easy',
    question: 'What is the default branch name in a new GitHub repository?',
    options: [
      'A. main',
      'B. master',
      'C. Both A and B depending on settings',
      'D. default'
    ],
    correctAnswer: 'D' // Moved from C to D
  },

  // Learning Objective 8: Configure Git locally including .gitignore
  {
    id: 71,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'easy',
    question: 'What is a .gitignore file used for?',
    options: [
      'A. To ignore certain files in Git commits',
      'B. To configure Git settings',
      'C. To store environment variables',
      'D. To define build commands'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 72,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'easy',
    question: 'Which files should typically be in .gitignore?',
    options: [
      'A. node_modules',
      'B. .env files',
      'C. Both A and B',
      'D. Only source code files'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 73,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'medium',
    question: 'What command initializes Git in a local directory?',
    options: [
      'A. git start',
      'B. git init',
      'C. git create',
      'D. git begin'
    ],
    correctAnswer: 'C' // Moved from B to C
  },
  {
    id: 74,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'easy',
    question: 'How do you set the global Git user name?',
    options: [
      'A. git config --global user.name "Your Name"',
      'B. git config user.name "Your Name"',
      'C. git set user.name "Your Name"',
      'D. git name "Your Name"'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 75,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'easy',
    question: 'How do you set the global Git email?',
    options: [
      'A. git config --global user.email "email@example.com"',
      'B. git config user.email "email@example.com"',
      'C. git set email "email@example.com"',
      'D. git email "email@example.com"'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 76,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'medium',
    question: 'Where is the global Git configuration stored?',
    options: [
      'A. ~/.gitconfig',
      'B. /.git/config',
      'C. /etc/gitconfig',
      'D. ~/git/config'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 77,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'easy',
    question: 'What does "git status" show?',
    options: [
      'A. The current state of the working directory',
      'B. The version of Git',
      'C. The remote repository URL',
      'D. The last commit message'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 78,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'medium',
    question: 'How can you check if .gitignore is working correctly?',
    options: [
      'A. Run "git status" to see untracked files',
      'B. Run "git check-ignore"',
      'C. Both A and B',
      'D. Only by committing files'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 79,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'easy',
    question: 'What is the purpose of configuring Git locally?',
    options: [
      'A. To identify the user in commits',
      'B. To set up the Git environment',
      'C. Both A and B',
      'D. To connect to the internet'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 80,
    type: 'multiple-choice',
    objective: 'Configure Git locally including .gitignore',
    difficulty: 'medium',
    question: 'Which command shows all Git configuration settings?',
    options: [
      'A. git config --list',
      'B. git config -l',
      'C. Both A and B',
      'D. git show-config'
    ],
    correctAnswer: 'B' // Moved from C to B
  },

  // Learning Objective 9: Connect local project to GitHub using remote origin
  {
    id: 81,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'easy',
    question: 'What is the command to add a remote origin to a Git repository?',
    options: [
      'A. git remote add origin <repository-url>',
      'B. git add remote origin <repository-url>',
      'C. git origin add <repository-url>',
      'D. git remote origin <repository-url>'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 82,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'easy',
    question: 'What does "origin" refer to in Git?',
    options: [
      'A. The default remote repository name',
      'B. The original source code',
      'C. The master branch',
      'D. The local repository'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 83,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'medium',
    question: 'How do you verify the remote origin is set correctly?',
    options: [
      'A. git remote -v',
      'B. git remote show origin',
      'C. Both A and B',
      'D. git status'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 84,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'easy',
    question: 'What is the format of a GitHub repository URL?',
    options: [
      'A. https://github.com/username/repo.git',
      'B. git@github.com:username/repo.git',
      'C. Both A and B',
      'D. Only HTTP format'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 85,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'medium',
    question: 'What happens if you try to add a remote that already exists?',
    options: [
      'A. It overwrites the existing remote',
      'B. It shows an error',
      'C. It creates a duplicate remote',
      'D. It ignores the command'
    ],
    correctAnswer: 'C' // Moved from B to C
  },
  {
    id: 86,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'easy',
    question: 'How do you remove a remote origin?',
    options: [
      'A. git remote remove origin',
      'B. git remote rm origin',
      'C. Both A and B',
      'D. git delete remote origin'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 87,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'medium',
    question: 'What is required before connecting to a GitHub remote?',
    options: [
      'A. A GitHub repository must exist',
      'B. Git must be initialized locally',
      'C. Both A and B',
      'D. Only authentication is required'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 88,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'easy',
    question: 'What is the purpose of a remote connection in Git?',
    options: [
      'A. To sync local changes with a remote repository',
      'B. To collaborate with other developers',
      'C. Both A and B',
      'D. To deploy the application'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 89,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'medium',
    question: 'How can you rename a remote repository?',
    options: [
      'A. git remote rename origin new-name',
      'B. git remote update origin new-name',
      'C. git rename origin new-name',
      'D. git remote set-name origin new-name'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 90,
    type: 'multiple-choice',
    objective: 'Connect local project to GitHub using remote origin',
    difficulty: 'easy',
    question: 'What does "git remote" command do without any arguments?',
    options: [
      'A. Lists all remote repositories',
      'B. Adds a new remote',
      'C. Removes a remote',
      'D. Shows remote details'
    ],
    correctAnswer: 'D' // Moved from A to D
  },

  // Learning Objective 10: Stage, commit and push changes using Git commands
  {
    id: 91,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'easy',
    question: 'What command adds all changes to the staging area?',
    options: [
      'A. git add .',
      'B. git add -A',
      'C. Both A and B',
      'D. git stage .'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 92,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'easy',
    question: 'What is the command to commit changes with a message?',
    options: [
      'A. git commit -m "message"',
      'B. git commit -a "message"',
      'C. git commit "message"',
      'D. git commit -c "message"'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 93,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'easy',
    question: 'What command pushes committed changes to the remote repository?',
    options: [
      'A. git push',
      'B. git push origin main',
      'C. Both A and B',
      'D. git upload'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 94,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'medium',
    question: 'What does the "-u" flag do in "git push -u origin main"?',
    options: [
      'A. It sets the upstream branch',
      'B. It pushes all branches',
      'C. It forces the push',
      'D. It updates the remote repository'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 95,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'easy',
    question: 'How do you check the status of your changes?',
    options: [
      'A. git status',
      'B. git diff',
      'C. Both A and B',
      'D. git check'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 96,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'medium',
    question: 'What is the difference between "git add ." and "git add -A"?',
    options: [
      'A. They are the same',
      'B. "git add ." adds only the current directory',
      'C. "git add -A" adds all changes in the repository',
      'D. Both B and C'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 97,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'easy',
    question: 'What happens when you push changes without committing them first?',
    options: [
      'A. It pushes all uncommitted changes',
      'B. It shows an error',
      'C. It automatically commits them',
      'D. It pushes only committed changes'
    ],
    correctAnswer: 'C' // Moved from B to C
  },
  {
    id: 98,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'medium',
    question: 'How do you view the commit history?',
    options: [
      'A. git log',
      'B. git history',
      'C. Both A and B',
      'D. git show'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 99,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'easy',
    question: 'What is the purpose of staging changes before committing?',
    options: [
      'A. To review changes before committing',
      'B. To select specific changes to commit',
      'C. Both A and B',
      'D. To automatically push changes'
    ],
    correctAnswer: 'A' // Moved from C to A
  },
  {
    id: 100,
    type: 'multiple-choice',
    objective: 'Stage, commit and push changes using Git commands',
    difficulty: 'medium',
    question: 'What command combines add and commit in one step?',
    options: [
      'A. git commit -am "message"',
      'B. git commit -m "message"',
      'C. git add and commit separately',
      'D. git push -am "message"'
    ],
    correctAnswer: 'B' // Moved from A to B
  }
];

export default questions;