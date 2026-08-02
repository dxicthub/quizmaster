export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Supabase Fundamentals',
    difficulty: 'easy',
    question: 'What is Supabase?',
    options: [
      'A. An open-source Firebase alternative',
      'B. A frontend framework',
      'C. A database management system',
      'D. A cloud hosting platform'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Supabase Features',
    difficulty: 'easy',
    question: 'Which of the following features does Supabase provide?',
    options: [
      'A. Authentication',
      'B. Real-time subscriptions',
      'C. Storage',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Supabase Database',
    difficulty: 'easy',
    question: 'What database does Supabase use as its backend?',
    options: [
      'A. PostgreSQL',
      'B. MongoDB',
      'C. MySQL',
      'D. SQLite'
    ],
    correctAnswer: 'A'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Supabase Authentication',
    difficulty: 'easy',
    question: 'Which authentication methods does Supabase support?',
    options: [
      'A. Email/Password',
      'B. OAuth providers',
      'C. Magic links',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Supabase Real-time',
    difficulty: 'medium',
    question: 'What technology does Supabase use for real-time features?',
    options: [
      'A. WebSockets',
      'B. Server-Sent Events',
      'C. Long polling',
      'D. Push notifications'
    ],
    correctAnswer: 'A'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Supabase Storage',
    difficulty: 'medium',
    question: 'What is Supabase Storage used for?',
    options: [
      'A. Storing files and images',
      'B. Storing database records',
      'C. Storing authentication tokens',
      'D. Storing API keys'
    ],
    correctAnswer: 'A'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Supabase APIs',
    difficulty: 'medium',
    question: 'What type of API does Supabase automatically generate?',
    options: [
      'A. RESTful APIs',
      'B. GraphQL APIs',
      'C. SOAP APIs',
      'D. WebSocket APIs'
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Supabase Row Level Security',
    difficulty: 'medium',
    question: 'What is Row Level Security (RLS) in Supabase?',
    options: [
      'A. A way to restrict access to rows based on user permissions',
      'B. A way to restrict access to columns',
      'C. A way to restrict access to tables',
      'D. A way to restrict access to databases'
    ],
    correctAnswer: 'A'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Supabase Policies',
    difficulty: 'advanced',
    question: 'What is a policy in Supabase?',
    options: [
      'A. A rule that defines access control for a table',
      'B. A rule that defines data validation',
      'C. A rule that defines data formatting',
      'D. A rule that defines data indexing'
    ],
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Supabase Functions',
    difficulty: 'advanced',
    question: 'What are Edge Functions in Supabase?',
    options: [
      'A. Serverless functions that run close to the user',
      'B. Database functions',
      'C. API functions',
      'D. Authentication functions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Supabase Realtime',
    difficulty: 'medium',
    question: 'How do you enable real-time subscriptions in Supabase?',
    options: [
      'A. Using the supabase-js client with .on() method',
      'B. Using the supabase-js client with .listen() method',
      'C. Using the supabase-js client with .subscribe() method',
      'D. Using the supabase-js client with .watch() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Supabase Auth',
    difficulty: 'medium',
    question: 'How do you sign up a user in Supabase?',
    options: [
      'A. supabase.auth.signUp()',
      'B. supabase.auth.register()',
      'C. supabase.auth.createUser()',
      'D. supabase.auth.addUser()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Supabase Auth',
    difficulty: 'medium',
    question: 'How do you sign in a user in Supabase?',
    options: [
      'A. supabase.auth.signIn()',
      'B. supabase.auth.login()',
      'C. supabase.auth.authenticate()',
      'D. supabase.auth.validate()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Supabase Auth',
    difficulty: 'medium',
    question: 'How do you sign out a user in Supabase?',
    options: [
      'A. supabase.auth.signOut()',
      'B. supabase.auth.logout()',
      'C. supabase.auth.exit()',
      'D. supabase.auth.disconnect()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Supabase Session Management',
    difficulty: 'medium',
    question: 'How do you get the current session in Supabase?',
    options: [
      'A. supabase.auth.getSession()',
      'B. supabase.auth.session()',
      'C. supabase.auth.currentSession()',
      'D. supabase.auth.getUser()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Supabase User Management',
    difficulty: 'medium',
    question: 'How do you get the current user in Supabase?',
    options: [
      'A. supabase.auth.getUser()',
      'B. supabase.auth.user()',
      'C. supabase.auth.currentUser()',
      'D. supabase.auth.getSession()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Supabase Database Queries',
    difficulty: 'medium',
    question: 'How do you select data from a Supabase table?',
    options: [
      'A. supabase.from(\'table\').select()',
      'B. supabase.table(\'table\').select()',
      'C. supabase.select(\'table\')',
      'D. supabase.query(\'table\')'
    ],
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Supabase Database Queries',
    difficulty: 'medium',
    question: 'How do you insert data into a Supabase table?',
    options: [
      'A. supabase.from(\'table\').insert()',
      'B. supabase.table(\'table\').insert()',
      'C. supabase.insert(\'table\')',
      'D. supabase.add(\'table\')'
    ],
    correctAnswer: 'A'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Supabase Database Queries',
    difficulty: 'medium',
    question: 'How do you update data in a Supabase table?',
    options: [
      'A. supabase.from(\'table\').update()',
      'B. supabase.table(\'table\').update()',
      'C. supabase.update(\'table\')',
      'D. supabase.modify(\'table\')'
    ],
    correctAnswer: 'A'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Supabase Database Queries',
    difficulty: 'medium',
    question: 'How do you delete data from a Supabase table?',
    options: [
      'A. supabase.from(\'table\').delete()',
      'B. supabase.table(\'table\').delete()',
      'C. supabase.delete(\'table\')',
      'D. supabase.remove(\'table\')'
    ],
    correctAnswer: 'A'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Supabase Filtering',
    difficulty: 'advanced',
    question: 'How do you filter data in a Supabase query?',
    options: [
      'A. Using .eq(), .neq(), .gt(), .lt() methods',
      'B. Using .filter() method',
      'C. Using .where() method',
      'D. Using .condition() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Supabase Ordering',
    difficulty: 'advanced',
    question: 'How do you order data in a Supabase query?',
    options: [
      'A. Using .order() method',
      'B. Using .sort() method',
      'C. Using .arrange() method',
      'D. Using .sequence() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Supabase Limits',
    difficulty: 'advanced',
    question: 'How do you limit data in a Supabase query?',
    options: [
      'A. Using .limit() method',
      'B. Using .max() method',
      'C. Using .top() method',
      'D. Using .first() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Supabase Storage',
    difficulty: 'advanced',
    question: 'How do you upload a file to Supabase Storage?',
    options: [
      'A. supabase.storage.from(\'bucket\').upload()',
      'B. supabase.storage.upload()',
      'C. supabase.upload()',
      'D. supabase.file.upload()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Supabase Storage',
    difficulty: 'advanced',
    question: 'How do you download a file from Supabase Storage?',
    options: [
      'A. supabase.storage.from(\'bucket\').download()',
      'B. supabase.storage.download()',
      'C. supabase.download()',
      'D. supabase.file.download()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Supabase Storage',
    difficulty: 'advanced',
    question: 'How do you get a public URL for a file in Supabase Storage?',
    options: [
      'A. supabase.storage.from(\'bucket\').getPublicUrl()',
      'B. supabase.storage.publicUrl()',
      'C. supabase.publicUrl()',
      'D. supabase.file.url()'
    ],
    correctAnswer: 'A'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Supabase Realtime',
    difficulty: 'advanced',
    question: 'How do you listen to changes in a Supabase table?',
    options: [
      'A. Using supabase.channel() and .on() method',
      'B. Using supabase.listen() method',
      'C. Using supabase.watch() method',
      'D. Using supabase.subscribe() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Supabase PostgreSQL',
    difficulty: 'advanced',
    question: 'What PostgreSQL features does Supabase support?',
    options: [
      'A. Full-text search',
      'B. JSON operations',
      'C. Custom functions',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Supabase Migration',
    difficulty: 'advanced',
    question: 'What is a migration in Supabase?',
    options: [
      'A. A way to version database schema changes',
      'B. A way to move data between tables',
      'C. A way to backup data',
      'D. A way to restore data'
    ],
    correctAnswer: 'A'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Supabase Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in Supabase?',
    options: [
      'A. Enable Row Level Security',
      'B. Use service role keys carefully',
      'C. Validate user input',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Supabase Anon Key',
    difficulty: 'medium',
    question: 'What is the anon key used for in Supabase?',
    options: [
      'A. Public API access with limited permissions',
      'B. Admin API access with full permissions',
      'C. Database access with full permissions',
      'D. Storage access with full permissions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Supabase Service Role Key',
    difficulty: 'medium',
    question: 'What is the service role key used for in Supabase?',
    options: [
      'A. Admin access with full permissions',
      'B. Public API access with limited permissions',
      'C. Database access with limited permissions',
      'D. Storage access with limited permissions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Supabase Environment Variables',
    difficulty: 'medium',
    question: 'What environment variables are required for Supabase?',
    options: [
      'A. NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'B. SUPABASE_URL and SUPABASE_KEY',
      'C. DATABASE_URL and DATABASE_KEY',
      'D. API_URL and API_KEY'
    ],
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Supabase Client',
    difficulty: 'medium',
    question: 'How do you initialize the Supabase client?',
    options: [
      'A. createClient(url, key)',
      'B. new Supabase(url, key)',
      'C. initSupabase(url, key)',
      'D. setupSupabase(url, key)'
    ],
    correctAnswer: 'A'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Supabase TypeScript',
    difficulty: 'advanced',
    question: 'How do you generate TypeScript types for Supabase?',
    options: [
      'A. Using supabase gen types typescript',
      'B. Using supabase generate types',
      'C. Using supabase types generate',
      'D. Using supabase ts types'
    ],
    correctAnswer: 'A'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Supabase Database Functions',
    difficulty: 'advanced',
    question: 'How do you call a database function in Supabase?',
    options: [
      'A. supabase.rpc(\'function_name\')',
      'B. supabase.call(\'function_name\')',
      'C. supabase.execute(\'function_name\')',
      'D. supabase.run(\'function_name\')'
    ],
    correctAnswer: 'A'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Supabase Filters',
    difficulty: 'advanced',
    question: 'What is the .or() filter in Supabase?',
    options: [
      'A. A filter that applies OR conditions',
      'B. A filter that applies AND conditions',
      'C. A filter that applies NOT conditions',
      'D. A filter that applies BETWEEN conditions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Supabase Filters',
    difficulty: 'advanced',
    question: 'What is the .in() filter in Supabase?',
    options: [
      'A. A filter that checks if a value is in an array',
      'B. A filter that checks if a value is not in an array',
      'C. A filter that checks if a value is null',
      'D. A filter that checks if a value is not null'
    ],
    correctAnswer: 'A'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Supabase Joins',
    difficulty: 'advanced',
    question: 'How do you perform a join in Supabase?',
    options: [
      'A. Using .select() with foreign key references',
      'B. Using .join() method',
      'C. Using .merge() method',
      'D. Using .combine() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Supabase Aggregations',
    difficulty: 'advanced',
    question: 'How do you perform aggregations in Supabase?',
    options: [
      'A. Using .select() with count, sum, avg',
      'B. Using .aggregate() method',
      'C. Using .summarize() method',
      'D. Using .group() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Supabase Database Triggers',
    difficulty: 'advanced',
    question: 'What is a database trigger in Supabase?',
    options: [
      'A. A function that runs automatically on database events',
      'B. A function that runs manually on database events',
      'C. A function that runs on API calls',
      'D. A function that runs on authentication events'
    ],
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Supabase Database Views',
    difficulty: 'advanced',
    question: 'What is a database view in Supabase?',
    options: [
      'A. A virtual table based on a query',
      'B. A physical table',
      'C. A stored procedure',
      'D. A function'
    ],
    correctAnswer: 'A'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Supabase Materialized Views',
    difficulty: 'advanced',
    question: 'What is a materialized view in Supabase?',
    options: [
      'A. A view that stores the query result physically',
      'B. A view that is stored virtually',
      'C. A view that is stored temporarily',
      'D. A view that is stored in memory'
    ],
    correctAnswer: 'A'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Supabase Full-Text Search',
    difficulty: 'advanced',
    question: 'How do you perform full-text search in Supabase?',
    options: [
      'A. Using PostgreSQL full-text search functions',
      'B. Using .search() method',
      'C. Using .match() method',
      'D. Using .find() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Supabase Geospatial Queries',
    difficulty: 'advanced',
    question: 'How do you perform geospatial queries in Supabase?',
    options: [
      'A. Using PostGIS extensions',
      'B. Using .geo() method',
      'C. Using .location() method',
      'D. Using .distance() method'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Supabase Deployment',
    difficulty: 'advanced',
    question: 'How do you deploy a Supabase project?',
    options: [
      'A. Through the Supabase dashboard',
      'B. Using the Supabase CLI',
      'C. Both A and B',
      'D. Only through the dashboard'
    ],
    correctAnswer: 'C'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Supabase CLI',
    difficulty: 'advanced',
    question: 'What is the Supabase CLI used for?',
    options: [
      'A. Local development and deployment',
      'B. Database management',
      'C. Authentication management',
      'D. Storage management'
    ],
    correctAnswer: 'A'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Supabase Local Development',
    difficulty: 'advanced',
    question: 'How do you start Supabase locally?',
    options: [
      'A. supabase start',
      'B. supabase init',
      'C. supabase serve',
      'D. supabase run'
    ],
    correctAnswer: 'A'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Supabase Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a Supabase best practice?',
    options: [
      'A. Use Row Level Security',
      'B. Use environment variables for keys',
      'C. Use database functions for complex logic',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Supabase Use Cases',
    difficulty: 'medium',
    question: 'Which of the following is a common use case for Supabase?',
    options: [
      'A. SaaS applications',
      'B. Real-time applications',
      'C. Mobile applications',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  }
];

export default questions;