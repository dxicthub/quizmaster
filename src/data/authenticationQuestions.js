
export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Authentication Fundamentals',
    difficulty: 'easy',
    question: 'What is authentication?',
    options: [
      'A. Authorizing user actions',
      'B. Encrypting user data',
      'C. Logging user activity',
      'D. Verifying the identity of a user'
    ],
    correctAnswer: 'D'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Authentication vs Authorization',
    difficulty: 'easy',
    question: 'What is the difference between authentication and authorization?',
    options: [
      'A. They are the same thing',
      'B. Authorization verifies identity; authentication verifies permissions',
      'C. Authentication is for users; authorization is for systems',
      'D. Authentication verifies identity; authorization verifies permissions'
    ],
    correctAnswer: 'D'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Authentication Methods',
    difficulty: 'easy',
    question: 'Which of the following is a common authentication method?',
    options: [
      'A. Password-based',
      'B. Multi-factor',
      'C. Biometric',
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
      'A. Storing in plain text',
      'B. Using base64 encoding',
      'C. Hashing and salting',
      'D. Encrypting with AES'
    ],
    correctAnswer: 'C'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Hashing Algorithms',
    difficulty: 'medium',
    question: 'Which of the following is a secure password hashing algorithm?',
    options: [
      'A. bcrypt',
      'B. SHA-1',
      'C. MD5',
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
      'A. JavaScript Web Token',
      'B. JSON Web Token',
      'C. Java Web Token',
      'D. JSON Written Token'
    ],
    correctAnswer: 'B'
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
      'A. An authentication protocol',
      'B. A database system',
      'C. A programming language',
      'D. An authorization framework'
    ],
    correctAnswer: 'D'
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'OAuth Flow',
    difficulty: 'advanced',
    question: 'What is the purpose of an OAuth authorization code?',
    options: [
      'A. To store user data',
      'B. To exchange for an access token',
      'C. To encrypt the connection',
      'D. To authenticate the user'
    ],
    correctAnswer: 'B'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'OAuth Scopes',
    difficulty: 'advanced',
    question: 'What is an OAuth scope?',
    options: [
      'A. A security token',
      'B. A user role',
      'C. A permission boundary',
      'D. An API endpoint'
    ],
    correctAnswer: 'C'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Multi-Factor Authentication',
    difficulty: 'medium',
    question: 'What is Multi-Factor Authentication (MFA)?',
    options: [
      'A. Using multiple passwords',
      'B. Using multiple usernames',
      'C. Using multiple sessions',
      'D. Using multiple factors to verify identity'
    ],
    correctAnswer: 'D'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'MFA Factors',
    difficulty: 'medium',
    question: 'Which of the following is NOT a factor in MFA?',
    options: [
      'A. Something you know',
      'B. Something you have',
      'C. Something you are',
      'D. Something you want'
    ],
    correctAnswer: 'D'
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Session Management',
    difficulty: 'medium',
    question: 'What is session management in authentication?',
    options: [
      'A. Managing user passwords',
      'B. Managing user roles',
      'C. Managing user permissions',
      'D. Managing user sessions after authentication'
    ],
    correctAnswer: 'D'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Session Cookies',
    difficulty: 'medium',
    question: 'What is a session cookie?',
    options: [
      'A. A cookie that stores user preferences',
      'B. A cookie that stores session information',
      'C. A cookie that stores page views',
      'D. A cookie that stores analytics data'
    ],
    correctAnswer: 'B'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'HttpOnly Cookies',
    difficulty: 'advanced',
    question: 'What is the purpose of the HttpOnly flag on cookies?',
    options: [
      'A. To prevent HTTP access to the cookie',
      'B. To prevent HTTPS access to the cookie',
      'C. To prevent all access to the cookie',
      'D. To prevent JavaScript access to the cookie'
    ],
    correctAnswer: 'D'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Secure Cookies',
    difficulty: 'advanced',
    question: 'What is the purpose of the Secure flag on cookies?',
    options: [
      'A. To encrypt cookies',
      'B. To prevent JavaScript access',
      'C. To prevent HTTP access',
      'D. To ensure cookies are only sent over HTTPS'
    ],
    correctAnswer: 'D'
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
      'A. A token used to authenticate users',
      'B. A token used to obtain new access tokens',
      'C. A token used to authorize actions',
      'D. A token used to encrypt data'
    ],
    correctAnswer: 'B'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Access Tokens',
    difficulty: 'advanced',
    question: 'What is an access token in OAuth 2.0?',
    options: [
      'A. A token used to refresh sessions',
      'B. A token used to authenticate users',
      'C. A token used to access protected resources',
      'D. A token used to encrypt data'
    ],
    correctAnswer: 'C'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Passwordless Authentication',
    difficulty: 'medium',
    question: 'What is passwordless authentication?',
    options: [
      'A. Authentication without any security',
      'B. Authentication without a username',
      'C. Authentication without a server',
      'D. Authentication without using a password'
    ],
    correctAnswer: 'D'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Magic Links',
    difficulty: 'medium',
    question: 'What is a magic link in authentication?',
    options: [
      'A. A magic spell for authentication',
      'B. A permanent login link',
      'C. A link to reset password',
      'D. A one-time login link sent via email'
    ],
    correctAnswer: 'D'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Social Login',
    difficulty: 'medium',
    question: 'What is social login?',
    options: [
      'A. Authentication using social security numbers',
      'B. Authentication using social networks',
      'C. Authentication using social engineering',
      'D. Authentication using social media accounts'
    ],
    correctAnswer: 'D'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'SAML Authentication',
    difficulty: 'advanced',
    question: 'What is SAML?',
    options: [
      'A. Simple Authentication Markup Language',
      'B. Standard Authentication Markup Language',
      'C. Secure Authentication Markup Language',
      'D. Security Assertion Markup Language'
    ],
    correctAnswer: 'D'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'LDAP Authentication',
    difficulty: 'advanced',
    question: 'What is LDAP?',
    options: [
      'A. Lightweight Data Access Protocol',
      'B. Lightweight Directory Authentication Protocol',
      'C. Lightweight Data Authentication Protocol',
      'D. Lightweight Directory Access Protocol'
    ],
    correctAnswer: 'D'
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Single Sign-On',
    difficulty: 'advanced',
    question: 'What is Single Sign-On (SSO)?',
    options: [
      'A. One application for multiple authentications',
      'B. One session for multiple users',
      'C. One user for multiple sessions',
      'D. One authentication for multiple applications'
    ],
    correctAnswer: 'D'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Brute Force Protection',
    difficulty: 'advanced',
    question: 'What is a common protection against brute force attacks?',
    options: [
      'A. Password hashing',
      'B. Rate limiting',
      'C. Session management',
      'D. Encryption'
    ],
    correctAnswer: 'B'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Account Lockout',
    difficulty: 'advanced',
    question: 'What is account lockout?',
    options: [
      'A. Locking an account after successful login',
      'B. Locking an account after inactivity',
      'C. Locking an account after expiration',
      'D. Locking an account after failed login attempts'
    ],
    correctAnswer: 'D'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Password Reset',
    difficulty: 'medium',
    question: 'What is a secure way to implement password reset?',
    options: [
      'A. Send the password via email',
      'B. Reset without verification',
      'C. Use a fixed reset code',
      'D. Send a reset link with a token'
    ],
    correctAnswer: 'D'
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Biometric Authentication',
    difficulty: 'medium',
    question: 'What is biometric authentication?',
    options: [
      'A. Authentication using biological samples',
      'B. Authentication using comprehensive data',
      'C. All of the above',
      'D. Authentication using physical characteristics'
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
      'A. Two-Factor Authorization',
      'B. Two-Factor Authentication',
      'C. Two-Factor Access',
      'D. Two-Factor Approval'
    ],
    correctAnswer: 'B'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'TOTP',
    difficulty: 'advanced',
    question: 'What is TOTP?',
    options: [
      'A. Token-based One-Time Password',
      'B. Text-based One-Time Password',
      'C. Trust-based One-Time Password',
      'D. Time-based One-Time Password'
    ],
    correctAnswer: 'D'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'HOTP',
    difficulty: 'advanced',
    question: 'What is HOTP?',
    options: [
      'A. HMAC-based One-Time Password',
      'B. HMAC-based OTP',
      'C. All of the above',
      'D. Hash-based One-Time Password'
    ],
    correctAnswer: 'A'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Authentication Tokens',
    difficulty: 'medium',
    question: 'What is an authentication token?',
    options: [
      'A. A piece of hardware for authentication',
      'B. A piece of software for authentication',
      'C. A piece of code for authentication',
      'D. A piece of data used to authenticate'
    ],
    correctAnswer: 'D'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Bearer Tokens',
    difficulty: 'advanced',
    question: 'What is a bearer token?',
    options: [
      'A. A token that carries user data',
      'B. A token that grants access to the bearer',
      'C. A token that carries authorization',
      'D. A token that carries authentication'
    ],
    correctAnswer: 'B'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'CSRF Protection',
    difficulty: 'advanced',
    question: 'What is CSRF protection in authentication?',
    options: [
      'A. Protecting against Cross-Site Scripting attacks',
      'B. Protecting against SQL injection attacks',
      'C. Protecting against session hijacking',
      'D. Protecting against Cross-Site Request Forgery attacks'
    ],
    correctAnswer: 'D'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'XSS Protection',
    difficulty: 'advanced',
    question: 'What is XSS protection?',
    options: [
      'A. Protecting against Cross-Site Request Forgery attacks',
      'B. Protecting against SQL injection attacks',
      'C. Protecting against session hijacking',
      'D. Protecting against Cross-Site Scripting attacks'
    ],
    correctAnswer: 'D'
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Session Fixation',
    difficulty: 'advanced',
    question: 'What is session fixation?',
    options: [
      'A. An attack where an attacker steals a session ID',
      'B. An attack where an attacker deletes a session ID',
      'C. An attack where an attacker encrypts a session ID',
      'D. An attack where an attacker sets a session ID'
    ],
    correctAnswer: 'D'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Session Hijacking',
    difficulty: 'advanced',
    question: 'What is session hijacking?',
    options: [
      'A. An attack where an attacker sets a session ID',
      'B. An attack where an attacker deletes a session ID',
      'C. An attack where an attacker encrypts a session ID',
      'D. An attack where an attacker steals a session ID'
    ],
    correctAnswer: 'D'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'OIDC',
    difficulty: 'advanced',
    question: 'What is OIDC?',
    options: [
      'A. Open Identity Connect',
      'B. OpenID Configuration',
      'C. Open Identity Configuration',
      'D. OpenID Connect'
    ],
    correctAnswer: 'D'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Authentication Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is an authentication best practice?',
    options: [
      'A. Use strong passwords',
      'B. Use secure protocols (HTTPS)',
      'C. Implement MFA',
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
      'A. Always trust, never verify',
      'B. Trust once, verify never',
      'C. Verify once, trust always',
      'D. Never trust, always verify'
    ],
    correctAnswer: 'D'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Identity Providers',
    difficulty: 'advanced',
    question: 'What is an Identity Provider (IdP)?',
    options: [
      'A. A service that provides user data',
      'B. A service that provides authentication',
      'C. A service that manages user identities',
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
      'A. Centralized identity management',
      'B. Decentralized identity management',
      'C. Local identity management',
      'D. Sharing identity across multiple systems'
    ],
    correctAnswer: 'D'
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Password Managers',
    difficulty: 'medium',
    question: 'What is a password manager?',
    options: [
      'A. A tool that generates passwords',
      'B. A tool that encrypts passwords',
      'C. All of the above',
      'D. A tool that securely stores and manages passwords'
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
      'A. To improve performance',
      'B. To reduce bandwidth usage',
      'C. To cache authentication tokens',
      'D. To prevent brute force attacks'
    ],
    correctAnswer: 'D'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'PKCE',
    difficulty: 'advanced',
    question: 'What is PKCE in OAuth?',
    options: [
      'A. Public Key for Code Exchange',
      'B. Proof Key for Code Exchange',
      'C. Private Key for Code Exchange',
      'D. Protected Key for Code Exchange'
    ],
    correctAnswer: 'B'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Device Authentication',
    difficulty: 'advanced',
    question: 'What is device authentication?',
    options: [
      'A. Authenticating a user on a device',
      'B. Authenticating a device user',
      'C. Authenticating a device session',
      'D. Authenticating a device rather than a user'
    ],
    correctAnswer: 'D'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Continuous Authentication',
    difficulty: 'advanced',
    question: 'What is continuous authentication?',
    options: [
      'A. Authenticating continuously without stopping',
      'B. Authenticating multiple times simultaneously',
      'C. Authenticating for multiple applications',
      'D. Continuously verifying identity throughout a session'
    ],
    correctAnswer: 'D'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Authentication Standards',
    difficulty: 'advanced',
    question: 'Which of the following is an authentication standard?',
    options: [
      'A. SAML 2.0',
      'B. OpenID Connect',
      'C. All of the above',
      'D. OAuth 2.0'
    ],
    correctAnswer: 'C'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Future of Authentication',
    difficulty: 'advanced',
    question: 'What is a trend in authentication?',
    options: [
      'A. Biometric authentication',
      'B. Continuous authentication',
      'C. All of the above',
      'D. Passwordless authentication'
    ],
    correctAnswer: 'C'
  }
];

export default questions;
