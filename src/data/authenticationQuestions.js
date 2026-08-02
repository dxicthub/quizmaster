export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Authentication Fundamentals',
    difficulty: 'easy',
    question: 'What is authentication?',
    options: [
      'A. Verifying the identity of a user',
      'B. Authorizing user actions',
      'C. Encrypting user data',
      'D. Logging user activity'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Authentication vs Authorization',
    difficulty: 'easy',
    question: 'What is the difference between authentication and authorization?',
    options: [
      'A. Authentication verifies identity; authorization verifies permissions',
      'B. Authorization verifies identity; authentication verifies permissions',
      'C. They are the same thing',
      'D. Authentication is for users; authorization is for systems'
    ],
    correctAnswer: 'A'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Authentication Methods',
    difficulty: 'easy',
    question: 'Which of the following is a common authentication method?',
    options: [
      'A. Password-based',
      'B. Biometric',
      'C. Multi-factor',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Password Security',
    difficulty: 'medium',
    question: 'What is the best practice for storing passwords?',
    options: [
      'A. Hashing and salting',
      'B. Storing in plain text',
      'C. Using base64 encoding',
      'D. Encrypting with AES'
    ],
    correctAnswer: 'A'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Hashing Algorithms',
    difficulty: 'medium',
    question: 'Which of the following is a secure password hashing algorithm?',
    options: [
      'A. bcrypt',
      'B. MD5',
      'C. SHA-1',
      'D. Base64'
    ],
    correctAnswer: 'A'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'JWT Authentication',
    difficulty: 'medium',
    question: 'What does JWT stand for?',
    options: [
      'A. JSON Web Token',
      'B. JavaScript Web Token',
      'C. Java Web Token',
      'D. JSON Written Token'
    ],
    correctAnswer: 'A'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'JWT Structure',
    difficulty: 'advanced',
    question: 'What are the three parts of a JWT?',
    options: [
      'A. Header, Payload, Signature',
      'B. Header, Body, Signature',
      'C. Header, Claims, Verify',
      'D. Header, Payload, Verify'
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'OAuth 2.0',
    difficulty: 'advanced',
    question: 'What is OAuth 2.0?',
    options: [
      'A. An authorization framework',
      'B. An authentication protocol',
      'C. A database system',
      'D. A programming language'
    ],
    correctAnswer: 'A'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'OAuth Flow',
    difficulty: 'advanced',
    question: 'What is the purpose of an OAuth authorization code?',
    options: [
      'A. To exchange for an access token',
      'B. To authenticate the user',
      'C. To store user data',
      'D. To encrypt the connection'
    ],
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'OAuth Scopes',
    difficulty: 'advanced',
    question: 'What is an OAuth scope?',
    options: [
      'A. A permission boundary',
      'B. A security token',
      'C. A user role',
      'D. An API endpoint'
    ],
    correctAnswer: 'A'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Multi-Factor Authentication',
    difficulty: 'medium',
    question: 'What is Multi-Factor Authentication (MFA)?',
    options: [
      'A. Using multiple factors to verify identity',
      'B. Using multiple passwords',
      'C. Using multiple usernames',
      'D. Using multiple sessions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'MFA Factors',
    difficulty: 'medium',
    question: 'Which of the following is NOT a factor in MFA?',
    options: [
      'A. Something you want',
      'B. Something you know',
      'C. Something you have',
      'D. Something you are'
    ],
    correctAnswer: 'A'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Session Management',
    difficulty: 'medium',
    question: 'What is session management in authentication?',
    options: [
      'A. Managing user sessions after authentication',
      'B. Managing user passwords',
      'C. Managing user roles',
      'D. Managing user permissions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Session Cookies',
    difficulty: 'medium',
    question: 'What is a session cookie?',
    options: [
      'A. A cookie that stores session information',
      'B. A cookie that stores user preferences',
      'C. A cookie that stores page views',
      'D. A cookie that stores analytics data'
    ],
    correctAnswer: 'A'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'HttpOnly Cookies',
    difficulty: 'advanced',
    question: 'What is the purpose of the HttpOnly flag on cookies?',
    options: [
      'A. To prevent JavaScript access to the cookie',
      'B. To prevent HTTP access to the cookie',
      'C. To prevent HTTPS access to the cookie',
      'D. To prevent all access to the cookie'
    ],
    correctAnswer: 'A'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Secure Cookies',
    difficulty: 'advanced',
    question: 'What is the purpose of the Secure flag on cookies?',
    options: [
      'A. To ensure cookies are only sent over HTTPS',
      'B. To encrypt cookies',
      'C. To prevent JavaScript access',
      'D. To prevent HTTP access'
    ],
    correctAnswer: 'A'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'SameSite Cookies',
    difficulty: 'advanced',
    question: 'What is the purpose of the SameSite attribute on cookies?',
    options: [
      'A. To prevent CSRF attacks',
      'B. To prevent XSS attacks',
      'C. To prevent SQL injection',
      'D. To prevent session hijacking'
    ],
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Refresh Tokens',
    difficulty: 'advanced',
    question: 'What is a refresh token in OAuth 2.0?',
    options: [
      'A. A token used to obtain new access tokens',
      'B. A token used to authenticate users',
      'C. A token used to authorize actions',
      'D. A token used to encrypt data'
    ],
    correctAnswer: 'A'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Access Tokens',
    difficulty: 'advanced',
    question: 'What is an access token in OAuth 2.0?',
    options: [
      'A. A token used to access protected resources',
      'B. A token used to refresh sessions',
      'C. A token used to authenticate users',
      'D. A token used to encrypt data'
    ],
    correctAnswer: 'A'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Passwordless Authentication',
    difficulty: 'medium',
    question: 'What is passwordless authentication?',
    options: [
      'A. Authentication without using a password',
      'B. Authentication without any security',
      'C. Authentication without a username',
      'D. Authentication without a server'
    ],
    correctAnswer: 'A'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Magic Links',
    difficulty: 'medium',
    question: 'What is a magic link in authentication?',
    options: [
      'A. A one-time login link sent via email',
      'B. A magic spell for authentication',
      'C. A permanent login link',
      'D. A link to reset password'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Social Login',
    difficulty: 'medium',
    question: 'What is social login?',
    options: [
      'A. Authentication using social media accounts',
      'B. Authentication using social security numbers',
      'C. Authentication using social networks',
      'D. Authentication using social engineering'
    ],
    correctAnswer: 'A'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'SAML Authentication',
    difficulty: 'advanced',
    question: 'What is SAML?',
    options: [
      'A. Security Assertion Markup Language',
      'B. Simple Authentication Markup Language',
      'C. Standard Authentication Markup Language',
      'D. Secure Authentication Markup Language'
    ],
    correctAnswer: 'A'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'LDAP Authentication',
    difficulty: 'advanced',
    question: 'What is LDAP?',
    options: [
      'A. Lightweight Directory Access Protocol',
      'B. Lightweight Data Access Protocol',
      'C. Lightweight Directory Authentication Protocol',
      'D. Lightweight Data Authentication Protocol'
    ],
    correctAnswer: 'A'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Single Sign-On',
    difficulty: 'advanced',
    question: 'What is Single Sign-On (SSO)?',
    options: [
      'A. One authentication for multiple applications',
      'B. One application for multiple authentications',
      'C. One session for multiple users',
      'D. One user for multiple sessions'
    ],
    correctAnswer: 'A'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Brute Force Protection',
    difficulty: 'advanced',
    question: 'What is a common protection against brute force attacks?',
    options: [
      'A. Rate limiting',
      'B. Password hashing',
      'C. Session management',
      'D. Encryption'
    ],
    correctAnswer: 'A'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Account Lockout',
    difficulty: 'advanced',
    question: 'What is account lockout?',
    options: [
      'A. Locking an account after failed login attempts',
      'B. Locking an account after successful login',
      'C. Locking an account after inactivity',
      'D. Locking an account after expiration'
    ],
    correctAnswer: 'A'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Password Reset',
    difficulty: 'medium',
    question: 'What is a secure way to implement password reset?',
    options: [
      'A. Send a reset link with a token',
      'B. Send the password via email',
      'C. Reset without verification',
      'D. Use a fixed reset code'
    ],
    correctAnswer: 'A'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Biometric Authentication',
    difficulty: 'medium',
    question: 'What is biometric authentication?',
    options: [
      'A. Authentication using physical characteristics',
      'B. Authentication using biological samples',
      'C. Authentication using biometric data',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: '2FA',
    difficulty: 'medium',
    question: 'What does 2FA stand for?',
    options: [
      'A. Two-Factor Authentication',
      'B. Two-Factor Authorization',
      'C. Two-Factor Access',
      'D. Two-Factor Approval'
    ],
    correctAnswer: 'A'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'TOTP',
    difficulty: 'advanced',
    question: 'What is TOTP?',
    options: [
      'A. Time-based One-Time Password',
      'B. Token-based One-Time Password',
      'C. Text-based One-Time Password',
      'D. Trust-based One-Time Password'
    ],
    correctAnswer: 'A'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'HOTP',
    difficulty: 'advanced',
    question: 'What is HOTP?',
    options: [
      'A. HMAC-based One-Time Password',
      'B. Hash-based One-Time Password',
      'C. HMAC-based OTP',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Authentication Tokens',
    difficulty: 'medium',
    question: 'What is an authentication token?',
    options: [
      'A. A piece of data used to authenticate',
      'B. A piece of hardware for authentication',
      'C. A piece of software for authentication',
      'D. A piece of code for authentication'
    ],
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Bearer Tokens',
    difficulty: 'advanced',
    question: 'What is a bearer token?',
    options: [
      'A. A token that grants access to the bearer',
      'B. A token that carries user data',
      'C. A token that carries authorization',
      'D. A token that carries authentication'
    ],
    correctAnswer: 'A'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'CSRF Protection',
    difficulty: 'advanced',
    question: 'What is CSRF protection in authentication?',
    options: [
      'A. Protecting against Cross-Site Request Forgery attacks',
      'B. Protecting against Cross-Site Scripting attacks',
      'C. Protecting against SQL injection attacks',
      'D. Protecting against session hijacking'
    ],
    correctAnswer: 'A'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'XSS Protection',
    difficulty: 'advanced',
    question: 'What is XSS protection?',
    options: [
      'A. Protecting against Cross-Site Scripting attacks',
      'B. Protecting against Cross-Site Request Forgery attacks',
      'C. Protecting against SQL injection attacks',
      'D. Protecting against session hijacking'
    ],
    correctAnswer: 'A'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Session Fixation',
    difficulty: 'advanced',
    question: 'What is session fixation?',
    options: [
      'A. An attack where an attacker sets a session ID',
      'B. An attack where an attacker steals a session ID',
      'C. An attack where an attacker deletes a session ID',
      'D. An attack where an attacker encrypts a session ID'
    ],
    correctAnswer: 'A'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Session Hijacking',
    difficulty: 'advanced',
    question: 'What is session hijacking?',
    options: [
      'A. An attack where an attacker steals a session ID',
      'B. An attack where an attacker sets a session ID',
      'C. An attack where an attacker deletes a session ID',
      'D. An attack where an attacker encrypts a session ID'
    ],
    correctAnswer: 'A'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'OIDC',
    difficulty: 'advanced',
    question: 'What is OIDC?',
    options: [
      'A. OpenID Connect',
      'B. Open Identity Connect',
      'C. OpenID Configuration',
      'D. Open Identity Configuration'
    ],
    correctAnswer: 'A'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Authentication Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is an authentication best practice?',
    options: [
      'A. Use strong passwords',
      'B. Implement MFA',
      'C. Use secure protocols (HTTPS)',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Zero Trust Authentication',
    difficulty: 'advanced',
    question: 'What is Zero Trust in authentication?',
    options: [
      'A. Never trust, always verify',
      'B. Always trust, never verify',
      'C. Trust once, verify never',
      'D. Verify once, trust always'
    ],
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Identity Providers',
    difficulty: 'advanced',
    question: 'What is an Identity Provider (IdP)?',
    options: [
      'A. A service that manages user identities',
      'B. A service that provides user data',
      'C. A service that provides authentication',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Federated Identity',
    difficulty: 'advanced',
    question: 'What is federated identity?',
    options: [
      'A. Sharing identity across multiple systems',
      'B. Centralized identity management',
      'C. Decentralized identity management',
      'D. Local identity management'
    ],
    correctAnswer: 'A'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Password Managers',
    difficulty: 'medium',
    question: 'What is a password manager?',
    options: [
      'A. A tool that securely stores and manages passwords',
      'B. A tool that generates passwords',
      'C. A tool that encrypts passwords',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Authentication Security',
    difficulty: 'advanced',
    question: 'What is the purpose of rate limiting in authentication?',
    options: [
      'A. To prevent brute force attacks',
      'B. To improve performance',
      'C. To reduce bandwidth usage',
      'D. To cache authentication tokens'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'PKCE',
    difficulty: 'advanced',
    question: 'What is PKCE in OAuth?',
    options: [
      'A. Proof Key for Code Exchange',
      'B. Public Key for Code Exchange',
      'C. Private Key for Code Exchange',
      'D. Protected Key for Code Exchange'
    ],
    correctAnswer: 'A'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Device Authentication',
    difficulty: 'advanced',
    question: 'What is device authentication?',
    options: [
      'A. Authenticating a device rather than a user',
      'B. Authenticating a user on a device',
      'C. Authenticating a device user',
      'D. Authenticating a device session'
    ],
    correctAnswer: 'A'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Continuous Authentication',
    difficulty: 'advanced',
    question: 'What is continuous authentication?',
    options: [
      'A. Continuously verifying identity throughout a session',
      'B. Authenticating continuously without stopping',
      'C. Authenticating multiple times simultaneously',
      'D. Authenticating for multiple applications'
    ],
    correctAnswer: 'A'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Authentication Standards',
    difficulty: 'advanced',
    question: 'Which of the following is an authentication standard?',
    options: [
      'A. OAuth 2.0',
      'B. SAML 2.0',
      'C. OpenID Connect',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Future of Authentication',
    difficulty: 'advanced',
    question: 'What is a trend in authentication?',
    options: [
      'A. Passwordless authentication',
      'B. Biometric authentication',
      'C. Continuous authentication',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  }
];

export default questions;