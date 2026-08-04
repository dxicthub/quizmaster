export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'OAuth Fundamentals',
    difficulty: 'easy',
    question: 'What is OAuth?',
    options: [
      'A. An open standard for access delegation',
      'B. A programming language',
      'C. A database system',
      'D. A design framework'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'OAuth Purpose',
    difficulty: 'easy',
    question: 'What is the primary purpose of OAuth?',
    options: [
      'A. To allow applications to access user data without sharing passwords',
      'B. To authenticate users',
      'C. To encrypt user data',
      'D. To store user data'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'OAuth Versions',
    difficulty: 'easy',
    question: 'What is the current version of OAuth?',
    options: [
      'A. OAuth 2.0',
      'B. OAuth 1.0',
      'C. OAuth 3.0',
      'D. OAuth 1.1'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'OAuth Roles',
    difficulty: 'medium',
    question: 'Which of the following is NOT a role in OAuth?',
    options: [
      'A. Resource Owner',
      'B. Client',
      'C. Authorization Server',
      'D. Database Server'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'OAuth Roles',
    difficulty: 'medium',
    question: 'What is a Resource Owner in OAuth?',
    options: [
      'A. The user who owns the resource',
      'B. The application that requests access',
      'C. The server that authorizes access',
      'D. The server that stores resources'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'OAuth Roles',
    difficulty: 'medium',
    question: 'What is a Client in OAuth?',
    options: [
      'A. The application that requests access to resources',
      'B. The user who owns the resource',
      'C. The server that authorizes access',
      'D. The server that stores resources'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'OAuth Roles',
    difficulty: 'medium',
    question: 'What is an Authorization Server in OAuth?',
    options: [
      'A. The server that issues access tokens',
      'B. The application that requests access',
      'C. The user who owns the resource',
      'D. The server that stores resources'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'OAuth Roles',
    difficulty: 'medium',
    question: 'What is a Resource Server in OAuth?',
    options: [
      'A. The server that hosts the protected resources',
      'B. The server that issues access tokens',
      'C. The application that requests access',
      'D. The user who owns the resource'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'OAuth Grants',
    difficulty: 'medium',
    question: 'Which of the following is an OAuth grant type?',
    options: [
      'A. Authorization Code',
      'B. Client Credentials',
      'C. Refresh Token',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'OAuth Authorization Code Grant',
    difficulty: 'medium',
    question: 'What is the Authorization Code Grant in OAuth?',
    options: [
      'A. A flow where the client exchanges an authorization code for an access token',
      'B. A flow where the client uses client credentials to get a token',
      'C. A flow where the client uses a refresh token',
      'D. A flow where the client uses a password'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'OAuth Client Credentials Grant',
    difficulty: 'medium',
    question: 'What is the Client Credentials Grant in OAuth?',
    options: [
      'A. A flow where the client uses its own credentials to get a token',
      'B. A flow where the client exchanges an authorization code',
      'C. A flow where the client uses a refresh token',
      'D. A flow where the client uses a password'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'OAuth Refresh Token Grant',
    difficulty: 'medium',
    question: 'What is the Refresh Token Grant in OAuth?',
    options: [
      'A. A flow where the client uses a refresh token to get a new access token',
      'B. A flow where the client exchanges an authorization code',
      'C. A flow where the client uses client credentials',
      'D. A flow where the client uses a password'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'OAuth PKCE',
    difficulty: 'advanced',
    question: 'What is PKCE in OAuth?',
    options: [
      'A. Proof Key for Code Exchange',
      'B. Public Key for Code Exchange',
      'C. Private Key for Code Exchange',
      'D. Protected Key for Code Exchange'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'OAuth PKCE Purpose',
    difficulty: 'advanced',
    question: 'What is the purpose of PKCE in OAuth?',
    options: [
      'A. To prevent authorization code interception attacks',
      'B. To encrypt user data',
      'C. To validate API responses',
      'D. To manage user sessions'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'OAuth Scopes',
    difficulty: 'medium',
    question: 'What is an OAuth scope?',
    options: [
      'A. A permission boundary',
      'B. A security token',
      'C. A user role',
      'D. An API endpoint'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'OAuth Scopes Purpose',
    difficulty: 'medium',
    question: 'What is the purpose of scopes in OAuth?',
    options: [
      'A. To limit the access granted to the client',
      'B. To authenticate the user',
      'C. To encrypt the connection',
      'D. To store user data'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'OAuth Access Tokens',
    difficulty: 'medium',
    question: 'What is an access token in OAuth?',
    options: [
      'A. A credential used to access protected resources',
      'B. A credential used to authenticate the user',
      'C. A credential used to authorize the client',
      'D. A credential used to encrypt data'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'OAuth Refresh Tokens',
    difficulty: 'medium',
    question: 'What is a refresh token in OAuth?',
    options: [
      'A. A long-lived token used to obtain new access tokens',
      'B. A short-lived token used to access resources',
      'C. A token used to authenticate the user',
      'D. A token used to authorize the client'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'OAuth Token Expiry',
    difficulty: 'medium',
    question: 'Why do access tokens expire in OAuth?',
    options: [
      'A. To improve security',
      'B. To reduce server load',
      'C. To improve performance',
      'D. To reduce bandwidth'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'OAuth Providers',
    difficulty: 'medium',
    question: 'Which of the following is NOT a common OAuth provider?',
    options: [
      'A. MySQL',
      'B. Google',
      'C. GitHub',
      'D. Facebook'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'OAuth Google',
    difficulty: 'medium',
    question: 'What OAuth scopes does Google support?',
    options: [
      'A. profile',
      'B. email',
      'C. openid',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'OAuth GitHub',
    difficulty: 'medium',
    question: 'What OAuth scopes does GitHub support?',
    options: [
      'A. repo',
      'B. user',
      'C. admin:org',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'OAuth Facebook',
    difficulty: 'medium',
    question: 'What OAuth scopes does Facebook support?',
    options: [
      'A. email',
      'B. public_profile',
      'C. user_friends',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'OAuth Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in OAuth?',
    options: [
      'A. Use HTTPS',
      'B. Use state parameter',
      'C. Use PKCE',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'OAuth State Parameter',
    difficulty: 'advanced',
    question: 'What is the purpose of the state parameter in OAuth?',
    options: [
      'A. To prevent CSRF attacks',
      'B. To authenticate the user',
      'C. To authorize the client',
      'D. To encrypt the connection'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'OAuth vs OIDC',
    difficulty: 'advanced',
    question: 'What is the difference between OAuth and OpenID Connect?',
    options: [
      'A. OAuth is for authorization; OIDC is for authentication',
      'B. OAuth is for authentication; OIDC is for authorization',
      'C. Both are for authorization',
      'D. Both are for authentication'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'OAuth ID Token',
    difficulty: 'advanced',
    question: 'What is an ID token in OpenID Connect?',
    options: [
      'A. A JWT that contains user identity information',
      'B. An access token',
      'C. A refresh token',
      'D. A client credential'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'OAuth Token Introspection',
    difficulty: 'advanced',
    question: 'What is token introspection in OAuth?',
    options: [
      'A. A way to validate and get information about a token',
      'B. A way to revoke a token',
      'C. A way to refresh a token',
      'D. A way to store a token'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'OAuth Token Revocation',
    difficulty: 'advanced',
    question: 'What is token revocation in OAuth?',
    options: [
      'A. Invalidating a token before its natural expiry',
      'B. Refreshing a token',
      'C. Validating a token',
      'D. Storing a token'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'OAuth Client Types',
    difficulty: 'medium',
    question: 'What are the client types in OAuth?',
    options: [
      'A. Confidential and Public',
      'B. Private and Public',
      'C. Secure and Insecure',
      'D. Trusted and Untrusted'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'OAuth Confidential Client',
    difficulty: 'medium',
    question: 'What is a confidential client in OAuth?',
    options: [
      'A. A client that can keep client credentials secret',
      'B. A client that cannot keep client credentials secret',
      'C. A client that is publicly accessible',
      'D. A client that is not publicly accessible'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'OAuth Public Client',
    difficulty: 'medium',
    question: 'What is a public client in OAuth?',
    options: [
      'A. A client that cannot keep client credentials secret',
      'B. A client that can keep client credentials secret',
      'C. A client that is publicly accessible',
      'D. A client that is not publicly accessible'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'OAuth Implicit Grant',
    difficulty: 'medium',
    question: 'What is the Implicit Grant in OAuth?',
    options: [
      'A. A flow where the access token is returned directly in the redirect URI',
      'B. A flow where the client exchanges an authorization code',
      'C. A flow where the client uses client credentials',
      'D. A flow where the client uses a refresh token'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'OAuth Implicit Grant Deprecation',
    difficulty: 'medium',
    question: 'Why is the Implicit Grant deprecated?',
    options: [
      'A. Security concerns',
      'B. Performance concerns',
      'C. Complexity concerns',
      'D. Compatibility concerns'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'OAuth Device Grant',
    difficulty: 'advanced',
    question: 'What is the Device Grant in OAuth?',
    options: [
      'A. A flow for devices that cannot enter credentials directly',
      'B. A flow for mobile devices',
      'C. A flow for IoT devices',
      'D. A flow for web applications'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'OAuth Device Grant Process',
    difficulty: 'advanced',
    question: 'How does the Device Grant work in OAuth?',
    options: [
      'A. The device displays a code and URL for the user to authenticate',
      'B. The device sends credentials directly',
      'C. The device uses a refresh token',
      'D. The device uses client credentials'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'OAuth Error Responses',
    difficulty: 'advanced',
    question: 'What is a common OAuth error response?',
    options: [
      'A. invalid_request',
      'B. unauthorized_client',
      'C. access_denied',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'OAuth Error Handling',
    difficulty: 'advanced',
    question: 'How should OAuth errors be handled?',
    options: [
      'A. Display user-friendly error messages',
      'B. Log errors for debugging',
      'C. Redirect to error page',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'OAuth Standard Compliance',
    difficulty: 'advanced',
    question: 'What is the OAuth 2.0 specification?',
    options: [
      'A. RFC 6749',
      'B. RFC 6750',
      'C. RFC 6819',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'OAuth Bearer Token Usage',
    difficulty: 'medium',
    question: 'How is a bearer token used in OAuth?',
    options: [
      'A. In the Authorization header',
      'B. In the request body',
      'C. In the query string',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'OAuth Authorization Header',
    difficulty: 'medium',
    question: 'What is the format of the Authorization header for bearer tokens?',
    options: [
      'A. Authorization: Bearer <token>',
      'B. Authorization: Token <token>',
      'C. Authorization: Bearer token',
      'D. Authorization: Bearer=token'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'OAuth Response Types',
    difficulty: 'medium',
    question: 'What are common response types in OAuth?',
    options: [
      'A. code',
      'B. token',
      'C. id_token',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'OAuth Response Type code',
    difficulty: 'medium',
    question: 'What does the "code" response type in OAuth indicate?',
    options: [
      'A. The authorization code flow',
      'B. The implicit flow',
      'C. The client credentials flow',
      'D. The refresh token flow'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'OAuth Response Type token',
    difficulty: 'medium',
    question: 'What does the "token" response type in OAuth indicate?',
    options: [
      'A. The implicit flow',
      'B. The authorization code flow',
      'C. The client credentials flow',
      'D. The refresh token flow'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'OAuth Redirect URI',
    difficulty: 'medium',
    question: 'What is a redirect URI in OAuth?',
    options: [
      'A. The URI where the authorization server redirects the user after authorization',
      'B. The URI where the client is hosted',
      'C. The URI where the resource server is hosted',
      'D. The URI where the user is authenticated'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'OAuth Redirect URI Validation',
    difficulty: 'advanced',
    question: 'Why is redirect URI validation important in OAuth?',
    options: [
      'A. To prevent open redirect attacks',
      'B. To improve performance',
      'C. To reduce bandwidth',
      'D. To improve user experience'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'OAuth Client Registration',
    difficulty: 'advanced',
    question: 'What is client registration in OAuth?',
    options: [
      'A. The process of registering a client with the authorization server',
      'B. The process of registering a user',
      'C. The process of registering a resource server',
      'D. The process of registering an API'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'OAuth Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is an OAuth best practice?',
    options: [
      'A. Use short-lived access tokens',
      'B. Use refresh tokens for long-lived sessions',
      'C. Store tokens securely',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'OAuth Security',
    difficulty: 'advanced',
    question: 'What is a common OAuth security vulnerability?',
    options: [
      'A. Weak client authentication',
      'B. Token leakage',
      'C. CSRF attacks',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'OAuth Future',
    difficulty: 'advanced',
    question: 'What is a trend in OAuth development?',
    options: [
      'A. OAuth 2.1',
      'B. FAPI (Financial-grade API)',
      'C. CIBA (Client Initiated Backchannel Authentication)',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;