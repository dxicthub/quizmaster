export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'CSS Fundamentals',
    difficulty: 'easy',
    question: 'What does CSS stand for?',
    options: [
      'A. Cascading Style Sheets',
      'B. Creative Style Sheets',
      'C. Computer Style Sheets',
      'D. Color Style Sheets'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'CSS Selectors',
    difficulty: 'easy',
    question: 'Which CSS selector targets an element by its ID?',
    options: [
      'A. #id',
      'B. .id',
      'C. *id',
      'D. element#id'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'CSS Selectors',
    difficulty: 'easy',
    question: 'Which CSS selector targets an element by its class?',
    options: [
      'A. .class',
      'B. #class',
      'C. *class',
      'D. element.class'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'CSS Colors',
    difficulty: 'easy',
    question: 'Which of the following is a valid CSS color format?',
    options: [
      'A. #FF0000',
      'B. rgb(255,0,0)',
      'C. red',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'CSS Units',
    difficulty: 'easy',
    question: 'What is the difference between px and em in CSS?',
    options: [
      'A. px is absolute; em is relative to parent',
      'B. px is relative; em is absolute',
      'C. Both are absolute',
      'D. Both are relative'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'CSS Flexbox',
    difficulty: 'medium',
    question: 'Which CSS property is used to enable flexbox?',
    options: [
      'A. display: flex',
      'B. display: block',
      'C. display: inline',
      'D. display: grid'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'CSS Flexbox',
    difficulty: 'medium',
    question: 'What is the purpose of justify-content in flexbox?',
    options: [
      'A. To align items horizontally',
      'B. To align items vertically',
      'C. To align items in a grid',
      'D. To align items in a row'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'CSS Flexbox',
    difficulty: 'medium',
    question: 'What is the purpose of align-items in flexbox?',
    options: [
      'A. To align items vertically',
      'B. To align items horizontally',
      'C. To align items in a grid',
      'D. To align items in a column'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'CSS Grid',
    difficulty: 'medium',
    question: 'Which CSS property is used to enable grid layout?',
    options: [
      'A. display: grid',
      'B. display: flex',
      'C. display: block',
      'D. display: inline'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'CSS Grid',
    difficulty: 'medium',
    question: 'What is the purpose of grid-template-columns?',
    options: [
      'A. To define the number and size of columns',
      'B. To define the number and size of rows',
      'C. To define the gap between columns',
      'D. To define the alignment of columns'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'CSS Grid',
    difficulty: 'medium',
    question: 'What is the purpose of grid-template-rows?',
    options: [
      'A. To define the number and size of rows',
      'B. To define the number and size of columns',
      'C. To define the gap between rows',
      'D. To define the alignment of rows'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'CSS Box Model',
    difficulty: 'medium',
    question: 'What are the components of the CSS box model?',
    options: [
      'A. Content, padding, border, margin',
      'B. Content, spacing, border, margin',
      'C. Content, padding, border, spacing',
      'D. Content, padding, margin, spacing'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'CSS Box Model',
    difficulty: 'medium',
    question: 'What is the difference between padding and margin?',
    options: [
      'A. Padding is inside the border; margin is outside the border',
      'B. Padding is outside the border; margin is inside the border',
      'C. Padding and margin are the same',
      'D. Padding is for content; margin is for spacing'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'CSS Position',
    difficulty: 'medium',
    question: 'What are the possible values for the position property?',
    options: [
      'A. static, relative, absolute, fixed, sticky',
      'B. static, relative, absolute, fixed, fluid',
      'C. static, relative, absolute, sticky, floating',
      'D. static, relative, absolute, fixed, flexible'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'CSS Position',
    difficulty: 'medium',
    question: 'What does position: absolute do?',
    options: [
      'A. Positions relative to the nearest positioned ancestor',
      'B. Positions relative to the viewport',
      'C. Positions relative to the parent',
      'D. Positions relative to the document'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'CSS Position',
    difficulty: 'medium',
    question: 'What does position: fixed do?',
    options: [
      'A. Positions relative to the viewport',
      'B. Positions relative to the nearest positioned ancestor',
      'C. Positions relative to the parent',
      'D. Positions relative to the document'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'CSS Animations',
    difficulty: 'advanced',
    question: 'What property is used to create keyframe animations?',
    options: [
      'A. @keyframes',
      'B. animation',
      'C. @animations',
      'D. keyframes'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'CSS Animations',
    difficulty: 'advanced',
    question: 'What is the purpose of animation-duration?',
    options: [
      'A. To specify how long an animation takes to complete',
      'B. To specify when an animation starts',
      'C. To specify how many times an animation repeats',
      'D. To specify the timing function of an animation'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'CSS Transitions',
    difficulty: 'medium',
    question: 'What is the purpose of CSS transitions?',
    options: [
      'A. To smoothly change property values over time',
      'B. To create complex animations',
      'C. To change property values instantly',
      'D. To create keyframe animations'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'CSS Transitions',
    difficulty: 'medium',
    question: 'What is the purpose of transition-duration?',
    options: [
      'A. To specify how long a transition takes',
      'B. To specify when a transition starts',
      'C. To specify how many times a transition repeats',
      'D. To specify the timing function of a transition'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'CSS Media Queries',
    difficulty: 'medium',
    question: 'What is a media query used for?',
    options: [
      'A. To apply styles based on device characteristics',
      'B. To query a database',
      'C. To make HTTP requests',
      'D. To validate input'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'CSS Media Queries',
    difficulty: 'medium',
    question: 'What is the syntax for a media query?',
    options: [
      'A. @media (condition) { styles }',
      'B. @media { condition: styles }',
      'C. @media { styles condition }',
      'D. @media condition { styles }'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'CSS Responsive Design',
    difficulty: 'medium',
    question: 'What is responsive design?',
    options: [
      'A. Designing websites that adapt to different screen sizes',
      'B. Designing websites that are fast',
      'C. Designing websites that are secure',
      'D. Designing websites that are accessible'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'CSS Viewport Units',
    difficulty: 'medium',
    question: 'What are viewport units in CSS?',
    options: [
      'A. Units relative to the viewport size',
      'B. Units relative to the parent size',
      'C. Units relative to the font size',
      'D. Units relative to the element size'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'CSS Pseudo-classes',
    difficulty: 'medium',
    question: 'What is a pseudo-class in CSS?',
    options: [
      'A. A selector that targets elements in a specific state',
      'B. A selector that targets elements with a specific class',
      'C. A selector that targets elements with a specific ID',
      'D. A selector that targets elements with a specific attribute'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'CSS Pseudo-elements',
    difficulty: 'medium',
    question: 'What is a pseudo-element in CSS?',
    options: [
      'A. A selector that targets parts of an element',
      'B. A selector that targets the entire element',
      'C. A selector that targets a specific state',
      'D. A selector that targets a specific class'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'CSS Specificity',
    difficulty: 'advanced',
    question: 'What is CSS specificity?',
    options: [
      'A. The weight that determines which styles are applied',
      'B. The speed at which styles are applied',
      'C. The number of styles applied',
      'D. The order of styles applied'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'CSS Specificity Order',
    difficulty: 'advanced',
    question: 'What is the order of CSS specificity from highest to lowest?',
    options: [
      'A. ID, Class, Element',
      'B. Class, ID, Element',
      'C. Element, Class, ID',
      'D. ID, Element, Class'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'CSS Variables',
    difficulty: 'advanced',
    question: 'What is a CSS variable?',
    options: [
      'A. A custom property that can be reused',
      'B. A variable in JavaScript',
      'C. A variable in CSS preprocessors',
      'D. A variable in HTML'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'CSS Variables Syntax',
    difficulty: 'advanced',
    question: 'What is the syntax for defining a CSS variable?',
    options: [
      'A. --variable-name: value',
      'B. var-variable-name: value',
      'C. $variable-name: value',
      'D. @variable-name: value'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'CSS Variables Usage',
    difficulty: 'advanced',
    question: 'What is the syntax for using a CSS variable?',
    options: [
      'A. var(--variable-name)',
      'B. var(variable-name)',
      'C. $variable-name',
      'D. @variable-name'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'CSS Gradients',
    difficulty: 'medium',
    question: 'What is a CSS gradient?',
    options: [
      'A. A smooth transition between colors',
      'B. A sharp transition between colors',
      'C. A pattern of colors',
      'D. A single color'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'CSS Gradients',
    difficulty: 'medium',
    question: 'What is the difference between linear-gradient and radial-gradient?',
    options: [
      'A. linear is along a line; radial is from a center point',
      'B. linear is from a center point; radial is along a line',
      'C. linear is horizontal; radial is vertical',
      'D. linear is vertical; radial is horizontal'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'CSS Transforms',
    difficulty: 'advanced',
    question: 'What is the purpose of CSS transforms?',
    options: [
      'A. To rotate, scale, skew, or translate elements',
      'B. To change the color of elements',
      'C. To change the size of elements',
      'D. To change the position of elements'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'CSS Transforms',
    difficulty: 'advanced',
    question: 'What does transform: rotate(45deg) do?',
    options: [
      'A. Rotates an element by 45 degrees',
      'B. Scales an element by 45%',
      'C. Skews an element by 45 degrees',
      'D. Translates an element by 45px'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'CSS Filters',
    difficulty: 'advanced',
    question: 'What is the purpose of CSS filters?',
    options: [
      'A. To apply visual effects to elements',
      'B. To apply styling to elements',
      'C. To apply animation to elements',
      'D. To apply positioning to elements'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'CSS Filters',
    difficulty: 'advanced',
    question: 'What does filter: blur(5px) do?',
    options: [
      'A. Applies a blur effect of 5px',
      'B. Applies a brightness of 5%',
      'C. Applies a contrast of 5%',
      'D. Applies a drop shadow of 5px'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'CSS Box Shadow',
    difficulty: 'medium',
    question: 'What is the purpose of box-shadow?',
    options: [
      'A. To add shadow effects to elements',
      'B. To add border effects to elements',
      'C. To add outline effects to elements',
      'D. To add background effects to elements'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'CSS Border Radius',
    difficulty: 'medium',
    question: 'What is the purpose of border-radius?',
    options: [
      'A. To round the corners of elements',
      'B. To add borders to elements',
      'C. To add shadows to elements',
      'D. To add padding to elements'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'CSS Opacity',
    difficulty: 'medium',
    question: 'What is the purpose of opacity?',
    options: [
      'A. To control the transparency of elements',
      'B. To control the visibility of elements',
      'C. To control the display of elements',
      'D. To control the positioning of elements'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'CSS Z-Index',
    difficulty: 'medium',
    question: 'What is the purpose of z-index?',
    options: [
      'A. To control the stack order of elements',
      'B. To control the size of elements',
      'C. To control the position of elements',
      'D. To control the visibility of elements'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'CSS Flexbox vs Grid',
    difficulty: 'advanced',
    question: 'What is the difference between flexbox and grid?',
    options: [
      'A. Flexbox is one-dimensional; grid is two-dimensional',
      'B. Flexbox is two-dimensional; grid is one-dimensional',
      'C. Flexbox and grid are the same',
      'D. Flexbox is for rows; grid is for columns'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'CSS Preprocessors',
    difficulty: 'advanced',
    question: 'What is a CSS preprocessor?',
    options: [
      'A. A tool that extends CSS with variables and functions',
      'B. A tool that minifies CSS',
      'C. A tool that validates CSS',
      'D. A tool that formats CSS'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'CSS Preprocessors',
    difficulty: 'advanced',
    question: 'Which of the following is a CSS preprocessor?',
    options: [
      'A. SASS',
      'B. LESS',
      'C. Stylus',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'CSS Performance',
    difficulty: 'advanced',
    question: 'What is a CSS performance best practice?',
    options: [
      'A. Minimize CSS file size',
      'B. Use efficient selectors',
      'C. Avoid layout thrashing',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'CSS Accessibility',
    difficulty: 'advanced',
    question: 'What is a CSS accessibility best practice?',
    options: [
      'A. Use sufficient color contrast',
      'B. Use appropriate font sizes',
      'C. Ensure focus visibility',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'CSS Print Styles',
    difficulty: 'advanced',
    question: 'How do you create print styles in CSS?',
    options: [
      'A. Using @media print',
      'B. Using @print',
      'C. Using @media screen',
      'D. Using @media all'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'CSS Custom Properties',
    difficulty: 'advanced',
    question: 'What is the scope of CSS custom properties?',
    options: [
      'A. They inherit from parent to child',
      'B. They are global only',
      'C. They are local only',
      'D. They are scoped to the element only'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'CSS Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a CSS best practice?',
    options: [
      'A. Use semantic class names',
      'B. Organize CSS files logically',
      'C. Use CSS variables for consistency',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'CSS Future',
    difficulty: 'advanced',
    question: 'What is a trend in CSS?',
    options: [
      'A. CSS-in-JS',
      'B. Utility-first CSS (Tailwind)',
      'C. CSS custom properties',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;