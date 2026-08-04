export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Web Security Fundamentals',
    difficulty: 'easy',
    question: 'What is web security?',
    options: [
      'A. Protecting websites and web applications from attacks',
      'B. Designing websites',
      'C. Hosting websites',
      'D. Building websites'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'XSS Attacks',
    difficulty: 'easy',
    question: 'What is XSS?',
    options: [
      'A. Cross-Site Scripting',
      'B. Cross-Site Request Forgery',
      'C. Cross-Site Security',
      'D. Cross-Site Server'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'XSS Prevention',
    difficulty: 'medium',
    question: 'How can you prevent XSS attacks?',
    options: [
      'A. Sanitize user input',
      'B. Use parameterized queries',
      'C. Use HTTPS',
      'D. Use firewall'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'CSRF Attacks',
    difficulty: 'easy',
    question: 'What is CSRF?',
    options: [
      'A. Cross-Site Request Forgery',
      'B. Cross-Site Scripting',
      'C. Cross-Site Security',
      'D. Cross-Site Server'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'CSRF Prevention',
    difficulty: 'medium',
    question: 'How can you prevent CSRF attacks?',
    options: [
      'A. Use anti-CSRF tokens',
      'B. Use HTTPS',
      'C. Use same-site cookies',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'SQL Injection',
    difficulty: 'medium',
    question: 'What is SQL injection?',
    options: [
      'A. An attack where malicious SQL code is inserted into queries',
      'B. An attack where malicious JavaScript is inserted into pages',
      'C. An attack where malicious HTML is inserted into pages',
      'D. An attack where malicious CSS is inserted into pages'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'SQL Injection Prevention',
    difficulty: 'medium',
    question: 'How can you prevent SQL injection?',
    options: [
      'A. Use parameterized queries',
      'B. Use string concatenation',
      'C. Use eval()',
      'D. Use all of the above'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'HTTPS',
    difficulty: 'easy',
    question: 'What is HTTPS?',
    options: [
      'A. HTTP with SSL/TLS encryption',
      'B. HTTP without encryption',
      'C. A database protocol',
      'D. A file transfer protocol'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'SSL/TLS',
    difficulty: 'medium',
    question: 'What is the purpose of SSL/TLS?',
    options: [
      'A. To encrypt data between client and server',
      'B. To authenticate users',
      'C. To authorize users',
      'D. To store data'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'CSP',
    difficulty: 'advanced',
    question: 'What is Content Security Policy (CSP)?',
    options: [
      'A. A security policy that controls which resources can be loaded',
      'B. A content management system',
      'C. A security protocol',
      'D. A caching policy'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'CSP Purpose',
    difficulty: 'advanced',
    question: 'What is the purpose of CSP?',
    options: [
      'A. To prevent XSS attacks',
      'B. To prevent CSRF attacks',
      'C. To prevent SQL injection',
      'D. To prevent DDoS attacks'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'CORS',
    difficulty: 'advanced',
    question: 'What is CORS?',
    options: [
      'A. Cross-Origin Resource Sharing',
      'B. Cross-Origin Request Security',
      'C. Cross-Origin Resource Security',
      'D. Cross-Origin Request Sharing'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'CORS Purpose',
    difficulty: 'advanced',
    question: 'What is the purpose of CORS?',
    options: [
      'A. To allow controlled access to resources from different origins',
      'B. To block all cross-origin requests',
      'C. To allow all cross-origin requests',
      'D. To manage cookies'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Authentication Security',
    difficulty: 'medium',
    question: 'What is a secure authentication practice?',
    options: [
      'A. Use multi-factor authentication',
      'B. Use strong passwords',
      'C. Use secure password storage',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Session Security',
    difficulty: 'medium',
    question: 'What is a secure session management practice?',
    options: [
      'A. Use secure cookies with HttpOnly flag',
      'B. Use session timeouts',
      'C. Regenerate session IDs after login',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Cookie Security',
    difficulty: 'medium',
    question: 'What is the purpose of the Secure flag on cookies?',
    options: [
      'A. To ensure cookies are only sent over HTTPS',
      'B. To ensure cookies are encrypted',
      'C. To ensure cookies are not accessible via JavaScript',
      'D. To ensure cookies are not accessible via HTTP'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Cookie Security',
    difficulty: 'medium',
    question: 'What is the purpose of the HttpOnly flag on cookies?',
    options: [
      'A. To prevent JavaScript access to the cookie',
      'B. To prevent HTTP access to the cookie',
      'C. To ensure cookies are only sent over HTTPS',
      'D. To ensure cookies are encrypted'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Cookie Security',
    difficulty: 'medium',
    question: 'What is the purpose of the SameSite flag on cookies?',
    options: [
      'A. To prevent CSRF attacks',
      'B. To prevent XSS attacks',
      'C. To prevent SQL injection',
      'D. To prevent DDoS attacks'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Input Validation',
    difficulty: 'medium',
    question: 'Why is input validation important?',
    options: [
      'A. To prevent injection attacks',
      'B. To improve performance',
      'C. To improve user experience',
      'D. To reduce bandwidth'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Input Sanitization',
    difficulty: 'medium',
    question: 'What is input sanitization?',
    options: [
      'A. Cleaning user input to prevent attacks',
      'B. Validating user input',
      'C. Formatting user input',
      'D. Storing user input'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Output Encoding',
    difficulty: 'medium',
    question: 'What is output encoding?',
    options: [
      'A. Encoding data before sending it to the user',
      'B. Encoding data before storing it',
      'C. Encoding data before validating it',
      'D. Encoding data before sanitizing it'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Security Headers',
    difficulty: 'advanced',
    question: 'What is the purpose of security headers?',
    options: [
      'A. To protect against various types of attacks',
      'B. To improve performance',
      'C. To improve SEO',
      'D. To improve accessibility'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Security Headers',
    difficulty: 'advanced',
    question: 'Which of the following is a security header?',
    options: [
      'A. X-Content-Type-Options',
      'B. X-Frame-Options',
      'C. Strict-Transport-Security',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'HSTS',
    difficulty: 'advanced',
    question: 'What is HSTS?',
    options: [
      'A. HTTP Strict Transport Security',
      'B. HTTPS Strict Transport Security',
      'C. HTTP Secure Transport Security',
      'D. HTTPS Secure Transport Security'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'HSTS Purpose',
    difficulty: 'advanced',
    question: 'What is the purpose of HSTS?',
    options: [
      'A. To force browsers to use HTTPS',
      'B. To force browsers to use HTTP',
      'C. To force browsers to use SSL',
      'D. To force browsers to use TLS'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'X-Frame-Options',
    difficulty: 'advanced',
    question: 'What is the purpose of X-Frame-Options?',
    options: [
      'A. To prevent clickjacking attacks',
      'B. To prevent XSS attacks',
      'C. To prevent CSRF attacks',
      'D. To prevent SQL injection'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'X-Content-Type-Options',
    difficulty: 'advanced',
    question: 'What is the purpose of X-Content-Type-Options?',
    options: [
      'A. To prevent MIME type sniffing',
      'B. To prevent XSS attacks',
      'C. To prevent CSRF attacks',
      'D. To prevent SQL injection'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'DDoS Attacks',
    difficulty: 'advanced',
    question: 'What is a DDoS attack?',
    options: [
      'A. Distributed Denial of Service',
      'B. Direct Denial of Service',
      'C. Dynamic Denial of Service',
      'D. Digital Denial of Service'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'DDoS Prevention',
    difficulty: 'advanced',
    question: 'How can you prevent DDoS attacks?',
    options: [
      'A. Use rate limiting',
      'B. Use load balancing',
      'C. Use CDN',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Man-in-the-Middle Attacks',
    difficulty: 'advanced',
    question: 'What is a Man-in-the-Middle attack?',
    options: [
      'A. An attack where a third party intercepts communication',
      'B. An attack where a third party modifies communication',
      'C. An attack where a third party eavesdrops on communication',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'MITM Prevention',
    difficulty: 'advanced',
    question: 'How can you prevent Man-in-the-Middle attacks?',
    options: [
      'A. Use HTTPS',
      'B. Use certificate pinning',
      'C. Use secure protocols',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Password Security',
    difficulty: 'medium',
    question: 'What is a secure password practice?',
    options: [
      'A. Use long passwords',
      'B. Use complex passwords',
      'C. Use unique passwords per site',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Password Hashing',
    difficulty: 'advanced',
    question: 'What is a secure password hashing algorithm?',
    options: [
      'A. bcrypt',
      'B. Argon2',
      'C. PBKDF2',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Salting Passwords',
    difficulty: 'advanced',
    question: 'What is salting in password hashing?',
    options: [
      'A. Adding random data to passwords before hashing',
      'B. Adding salt to passwords',
      'C. Encrypting passwords',
      'D. Encoding passwords'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Security Auditing',
    difficulty: 'advanced',
    question: 'What is the purpose of security auditing?',
    options: [
      'A. To identify vulnerabilities',
      'B. To test application performance',
      'C. To verify user permissions',
      'D. To backup data'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Penetration Testing',
    difficulty: 'advanced',
    question: 'What is penetration testing?',
    options: [
      'A. Simulating attacks to find vulnerabilities',
      'B. Testing application performance',
      'C. Testing application usability',
      'D. Testing application accessibility'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'OWASP',
    difficulty: 'advanced',
    question: 'What is OWASP?',
    options: [
      'A. Open Web Application Security Project',
      'B. Open Web Application Security Protocol',
      'C. Open Web Application Security Platform',
      'D. Open Web Application Security Program'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'OWASP Top 10',
    difficulty: 'advanced',
    question: 'What is the OWASP Top 10?',
    options: [
      'A. A list of the top 10 web application security risks',
      'B. A list of the top 10 web application frameworks',
      'C. A list of the top 10 web application languages',
      'D. A list of the top 10 web application databases'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Security Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a security best practice?',
    options: [
      'A. Keep software updated',
      'B. Use strong authentication',
      'C. Validate user input',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'API Security',
    difficulty: 'advanced',
    question: 'What is an API security best practice?',
    options: [
      'A. Use authentication and authorization',
      'B. Use rate limiting',
      'C. Use input validation',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'JWT Security',
    difficulty: 'advanced',
    question: 'What is a JWT security best practice?',
    options: [
      'A. Use short-lived tokens',
      'B. Use proper signing algorithms',
      'C. Validate token signatures',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'OAuth Security',
    difficulty: 'advanced',
    question: 'What is an OAuth security best practice?',
    options: [
      'A. Use state parameter',
      'B. Use PKCE',
      'C. Validate redirect URIs',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Security Misconfiguration',
    difficulty: 'advanced',
    question: 'What is a security misconfiguration?',
    options: [
      'A. Improperly configured security settings',
      'B. Properly configured security settings',
      'C. A security best practice',
      'D. A security protocol'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Data Protection',
    difficulty: 'advanced',
    question: 'What is a data protection best practice?',
    options: [
      'A. Encrypt sensitive data',
      'B. Use secure storage',
      'C. Implement access controls',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Privacy Protection',
    difficulty: 'advanced',
    question: 'What is a privacy protection best practice?',
    options: [
      'A. Minimize data collection',
      'B. Implement data retention policies',
      'C. Provide user privacy controls',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Zero Trust Security',
    difficulty: 'advanced',
    question: 'What is Zero Trust Security?',
    options: [
      'A. A security model that never trusts and always verifies',
      'B. A security model that always trusts',
      'C. A security model that never verifies',
      'D. A security model that verifies once'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Security Monitoring',
    difficulty: 'advanced',
    question: 'What is security monitoring?',
    options: [
      'A. Continuously monitoring for security incidents',
      'B. Monitoring application performance',
      'C. Monitoring user activity',
      'D. Monitoring database activity'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Incident Response',
    difficulty: 'advanced',
    question: 'What is incident response?',
    options: [
      'A. Responding to security incidents',
      'B. Responding to performance issues',
      'C. Responding to user requests',
      'D. Responding to system updates'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Security Awareness',
    difficulty: 'advanced',
    question: 'What is security awareness training?',
    options: [
      'A. Training employees on security best practices',
      'B. Training employees on development',
      'C. Training employees on design',
      'D. Training employees on marketing'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Future of Web Security',
    difficulty: 'advanced',
    question: 'What is a trend in web security?',
    options: [
      'A. AI-powered security',
      'B. Zero Trust security',
      'C. Cloud-native security',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;