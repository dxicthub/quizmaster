import { 
  FaGitAlt, FaGithub, FaDatabase, FaReact, FaNodeJs, 
  FaServer, FaCloud, FaKey, FaRocket, FaGlobe,
  FaJs, FaHtml5, FaCss3Alt, FaLock, FaUserShield,
  FaAws, FaDocker, FaPython, FaJava, FaPhp,
  FaVuejs, FaAngular, FaBootstrap, FaFigma,
  FaGraduationCap, FaCodeBranch, FaCloudUploadAlt
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiTypescript, SiMongodb, SiSupabase, 
  SiRender, SiVercel, SiExpress 
} from 'react-icons/si';

// OAuth icon - using FaKey as fallback since SiOauth doesn't exist
import { FaKey as OAuthIcon } from 'react-icons/fa';

export const quizCategories = [
  {
    id: 'fullstack-deployment',
    title: 'Full Stack Deployment',
    description: 'Comprehensive 100-question quiz covering Vercel, Git, GitHub, and deployment strategies.',
    icon: FaCloudUploadAlt,
    difficulty: 'Intermediate',
    totalQuestions: 100,
    estimatedTime: '60 min',
    questionFile: 'questions.js', // Points to the original 100-question file
    tags: ['deployment', 'git', 'github', 'vercel', 'fullstack']
  },
  {
    id: 'git',
    title: 'Git',
    description: 'Master Git version control, branching, merging, and collaboration workflows.',
    icon: FaGitAlt,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'gitQuestions.js',
    tags: ['version-control', 'collaboration', 'devops']
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Learn GitHub repositories, pull requests, actions, and team collaboration.',
    icon: FaGithub,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'githubQuestions.js',
    tags: ['collaboration', 'ci/cd', 'devops']
  },
  {
    id: 'react',
    title: 'React',
    description: 'Learn React fundamentals, hooks, routing, state management, and component architecture.',
    icon: FaReact,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'reactQuestions.js',
    tags: ['frontend', 'javascript', 'framework']
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Master JavaScript fundamentals, ES6+, async/await, and modern patterns.',
    icon: FaJs,
    difficulty: 'Beginner',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'javascriptQuestions.js',
    tags: ['frontend', 'backend', 'programming']
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'Learn TypeScript types, interfaces, generics, and advanced type features.',
    icon: SiTypescript,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'typescriptQuestions.js',
    tags: ['frontend', 'backend', 'programming']
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    description: 'Build scalable backend applications with Node.js, Express, and middleware.',
    icon: FaNodeJs,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'nodeQuestions.js',
    tags: ['backend', 'javascript', 'framework']
  },
  {
    id: 'express',
    title: 'Express.js',
    description: 'Master Express.js routing, middleware, error handling, and API development.',
    icon: SiExpress,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'expressQuestions.js',
    tags: ['backend', 'api', 'framework']
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    description: 'Learn MongoDB schema design, aggregation, indexing, and operations.',
    icon: SiMongodb,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'mongodbQuestions.js',
    tags: ['database', 'nosql', 'backend']
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: 'Master PostgreSQL queries, relationships, transactions, and optimization.',
    icon: FaDatabase,
    difficulty: 'Advanced',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'postgresQuestions.js',
    tags: ['database', 'sql', 'backend']
  },
  {
    id: 'supabase',
    title: 'Supabase',
    description: 'Build full-stack apps with Supabase, authentication, and real-time features.',
    icon: SiSupabase,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'supabaseQuestions.js',
    tags: ['backend', 'database', 'authentication']
  },
  {
    id: 'vercel',
    title: 'Vercel',
    description: 'Deploy frontend applications with Vercel, environment variables, and domains.',
    icon: SiVercel,
    difficulty: 'Beginner',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'vercelQuestions.js',
    tags: ['deployment', 'hosting', 'frontend']
  },
  {
    id: 'render',
    title: 'Render',
    description: 'Deploy web apps, databases, and static sites on Render platform.',
    icon: SiRender,
    difficulty: 'Beginner',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'renderQuestions.js',
    tags: ['deployment', 'hosting', 'backend']
  },
  {
    id: 'oauth',
    title: 'OAuth 2.0',
    description: 'Implement OAuth 2.0 authentication with providers like Google, GitHub, and more.',
    icon: OAuthIcon,
    difficulty: 'Advanced',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'oauthQuestions.js',
    tags: ['authentication', 'security', 'api']
  },
  {
    id: 'restapis',
    title: 'REST APIs',
    description: 'Design and implement RESTful APIs with proper status codes, validation, and documentation.',
    icon: FaServer,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'apiQuestions.js',
    tags: ['api', 'backend', 'integration']
  },
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'Learn authentication strategies including JWT, sessions, and password hashing.',
    icon: FaKey,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'authenticationQuestions.js',
    tags: ['security', 'backend', 'user-management']
  },
  {
    id: 'html5',
    title: 'HTML5',
    description: 'Master HTML5 semantics, forms, APIs, and modern markup standards.',
    icon: FaHtml5,
    difficulty: 'Beginner',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'htmlQuestions.js',
    tags: ['frontend', 'markup', 'web']
  },
  {
    id: 'css3',
    title: 'CSS3',
    description: 'Learn CSS3 flexbox, grid, animations, transitions, and responsive design.',
    icon: FaCss3Alt,
    difficulty: 'Beginner',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'cssQuestions.js',
    tags: ['frontend', 'styling', 'design']
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    description: 'Build modern UIs with Tailwind CSS utility classes and custom configurations.',
    icon: SiTailwindcss,
    difficulty: 'Beginner',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'tailwindQuestions.js',
    tags: ['frontend', 'styling', 'framework']
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Learn deployment strategies for frontend, backend, and full-stack applications.',
    icon: FaRocket,
    difficulty: 'Intermediate',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'deploymentQuestions.js',
    tags: ['devops', 'hosting', 'deployment']
  },
  {
    id: 'websecurity',
    title: 'Web Security',
    description: 'Protect applications from XSS, CSRF, injection attacks and implement best practices.',
    icon: FaUserShield,
    difficulty: 'Advanced',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'securityQuestions.js',
    tags: ['security', 'backend', 'frontend']
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    description: 'Build server-rendered React apps with Next.js, SSG, and API routes.',
    icon: FaReact,
    difficulty: 'Advanced',
    totalQuestions: 50,
    estimatedTime: '15 min',
    questionFile: 'nextjsQuestions.js',
    tags: ['frontend', 'framework', 'ssr']
  }
];