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
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'CSS Selectors',
    difficulty: 'easy',
    question: 'Which CSS selector targets an element by its ID?',
    options: [
      'A. .id',
      'B. #id',
      'C. *id',
      'D. element#id'
    ],
    correctAnswer: 'B'
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'CSS Selectors',
    difficulty: 'easy',
    question: 'Which CSS selector targets an element by its class?',
    options: [
      'A. #class',
      'B. *class',
      'C. .class',
      'D. element#class'
    ],
    correctAnswer: 'C'
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'CSS Colors',
    difficulty: 'easy',
    question: 'Which of the following is a valid CSS color format?',
    options: [
      'A. color(red)',
      'B. color: red',
      'C. rgb-color(255,0,0)',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'CSS Units',
    difficulty: 'easy',
    question: 'Which statement correctly describes px and em in CSS?',
    options: [
      'A. px is an absolute length unit; em is relative to font size',
      'B. Both px and em are absolute units',
      'C. Both px and em are relative to the viewport',
      'D. px is relative to the viewport; em is absolute'
    ],
    correctAnswer: 'A'
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'CSS Flexbox',
    difficulty: 'medium',
    question: 'Which CSS property is used to enable flexbox?',
    options: [
      'A. display: block',
      'B. display: flex',
      'C. display: inline',
      'D. display: grid'
    ],
    correctAnswer: 'B'
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'CSS Flexbox',
    difficulty: 'medium',
    question: 'What does justify-content control in a flex container?',
    options: [
      'A. The size of flex items',
      'B. The wrapping behavior of flex items',
      'C. Alignment of items along the main axis',
      'D. Alignment of items along the cross axis'
    ],
    correctAnswer: 'C'
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'CSS Flexbox',
    difficulty: 'medium',
    question: 'What does align-items control in a flex container?',
    options: [
      'A. The size of flex items',
      'B. The wrapping behavior of flex items',
      'C. Alignment of items along the main axis',
      'D. Alignment of items along the cross axis'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'CSS Grid',
    difficulty: 'medium',
    question: 'What is the purpose of grid-template-columns?',
    options: [
      'A. To define the gap between columns',
      'B. To define the number and size of columns',
      'C. To define the alignment of columns',
      'D. To define the number and size of rows'
    ],
    correctAnswer: 'B'
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'CSS Grid',
    difficulty: 'medium',
    question: 'What is the purpose of grid-template-rows?',
    options: [
      'A. To define the number and size of columns',
      'B. To define the gap between rows',
      'C. To define the number and size of rows',
      'D. To define the alignment of rows'
    ],
    correctAnswer: 'C'
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'CSS Box Model',
    difficulty: 'medium',
    question: 'What are the components of the CSS box model?',
    options: [
      'A. Content, spacing, border, margin',
      'B. Content, padding, border, spacing',
      'C. Content, padding, margin, spacing',
      'D. Content, padding, border, margin'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'CSS Position',
    difficulty: 'medium',
    question: 'What are the possible values for the position property?',
    options: [
      'A. static, relative, absolute, fixed, fluid',
      'B. static, relative, absolute, fixed, sticky',
      'C. static, relative, absolute, sticky, floating',
      'D. static, relative, absolute, fixed, flexible'
    ],
    correctAnswer: 'B'
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'CSS Position',
    difficulty: 'medium',
    question: 'What does position: absolute do?',
    options: [
      'A. Positions relative to the viewport',
      'B. Positions relative to the parent',
      'C. Positions relative to the nearest positioned ancestor',
      'D. Positions relative to the document'
    ],
    correctAnswer: 'C'
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'CSS Position',
    difficulty: 'medium',
    question: 'What does position: fixed do?',
    options: [
      'A. Positions relative to the nearest positioned ancestor',
      'B. Positions relative to the parent',
      'C. Positions relative to the document',
      'D. Positions relative to the viewport'
    ],
    correctAnswer: 'D'
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'CSS Animations',
    difficulty: 'advanced',
    question: 'What at-rule is used to define keyframe animations?',
    options: [
      'A. @keyframes',
      'B. animation',
      'C. @animations',
      'D. keyframes'
    ],
    correctAnswer: 'A'
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'CSS Animations',
    difficulty: 'advanced',
    question: 'What is the purpose of animation-duration?',
    options: [
      'A. To specify when an animation starts',
      'B. To specify how long an animation takes to complete',
      'C. To specify how many times an animation repeats',
      'D. To specify the timing function of an animation'
    ],
    correctAnswer: 'B'
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'CSS Transitions',
    difficulty: 'medium',
    question: 'What is the purpose of CSS transitions?',
    options: [
      'A. To create complex animations',
      'B. To change property values instantly',
      'C. To smoothly change property values over time',
      'D. To create keyframe animations'
    ],
    correctAnswer: 'C'
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'CSS Transitions',
    difficulty: 'medium',
    question: 'What is the purpose of transition-duration?',
    options: [
      'A. To specify when a transition starts',
      'B. To specify how many times a transition repeats',
      'C. To specify the timing function of a transition',
      'D. To specify how long a transition takes'
    ],
    correctAnswer: 'D'
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'CSS Media Queries',
    difficulty: 'medium',
    question: 'What is a media query used for?',
    options: [
      'A. To apply styles based on device or viewport characteristics',
      'B. To query a database',
      'C. To make HTTP requests',
      'D. To validate input'
    ],
    correctAnswer: 'A'
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'CSS Media Queries',
    difficulty: 'medium',
    question: 'What is the correct general syntax for a media query?',
    options: [
      'A. @media { condition: styles }',
      'B. @media (condition) { styles }',
      'C. @media condition { styles }',
      'D. @media { styles condition }'
    ],
    correctAnswer: 'B'
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'CSS Responsive Design',
    difficulty: 'medium',
    question: 'What is responsive design?',
    options: [
      'A. Designing websites that are fast',
      'B. Designing websites that are secure',
      'C. Designing websites that adapt to different screen sizes',
      'D. Designing websites that are accessible'
    ],
    correctAnswer: 'C'
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'CSS Viewport Units',
    difficulty: 'medium',
    question: 'What are viewport units in CSS?',
    options: [
      'A. Units relative to the parent size',
      'B. Units relative to the font size',
      'C. Units relative to the element size',
      'D. Units relative to the viewport size'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'CSS Pseudo-elements',
    difficulty: 'medium',
    question: 'What is a pseudo-element in CSS?',
    options: [
      'A. A selector that targets the entire element',
      'B. A selector that targets parts of an element',
      'C. A selector that targets a specific state',
      'D. A selector that targets a specific class'
    ],
    correctAnswer: 'B'
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'CSS Specificity',
    difficulty: 'advanced',
    question: 'What is CSS specificity?',
    options: [
      'A. The speed at which styles are applied',
      'B. The number of styles applied',
      'C. The weight that determines which competing styles are applied',
      'D. The order of styles applied'
    ],
    correctAnswer: 'C'
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'CSS Specificity Order',
    difficulty: 'advanced',
    question: 'What is the order of CSS specificity from highest to lowest?',
    options: [
      'A. Class, ID, Element',
      'B. Element, Class, ID',
      'C. ID, Element, Class',
      'D. ID, Class, Element'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'CSS Variables Syntax',
    difficulty: 'advanced',
    question: 'What is the syntax for defining a CSS custom property?',
    options: [
      'A. var-variable-name: value',
      'B. --variable-name: value',
      'C. $variable-name: value',
      'D. @variable-name: value'
    ],
    correctAnswer: 'B'
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'CSS Variables Usage',
    difficulty: 'advanced',
    question: 'What is the syntax for using a CSS custom property?',
    options: [
      'A. var(variable-name)',
      'B. $variable-name',
      'C. var(--variable-name)',
      'D. @variable-name'
    ],
    correctAnswer: 'C'
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'CSS Gradients',
    difficulty: 'medium',
    question: 'What is a CSS gradient?',
    options: [
      'A. A sharp transition between colors',
      'B. A pattern of colors',
      'C. A single color',
      'D. A smooth transition between colors'
    ],
    correctAnswer: 'D'
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'CSS Gradients',
    difficulty: 'medium',
    question: 'What is the difference between linear-gradient and radial-gradient?',
    options: [
      'A. linear is along a line; radial is from a center point',
      'B. linear is horizontal; radial is vertical',
      'C. linear is vertical; radial is horizontal',
      'D. linear is from a center point; radial is along a line'
    ],
    correctAnswer: 'A'
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'CSS Transforms',
    difficulty: 'advanced',
    question: 'What is the purpose of CSS transforms?',
    options: [
      'A. To change the color of elements',
      'B. To rotate, scale, skew, or translate elements',
      'C. To change the size of elements',
      'D. To change the position of elements'
    ],
    correctAnswer: 'B'
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'CSS Transforms',
    difficulty: 'advanced',
    question: 'What does transform: rotate(45deg) do?',
    options: [
      'A. Scales an element by 45%',
      'B. Skews an element by 45 degrees',
      'C. Rotates an element by 45 degrees',
      'D. Translates an element by 45px'
    ],
    correctAnswer: 'C'
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'CSS Filters',
    difficulty: 'advanced',
    question: 'What is the purpose of CSS filters?',
    options: [
      'A. To apply animation to elements',
      'B. To apply positioning to elements',
      'C. To apply styling to elements',
      'D. To apply visual effects to elements'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'CSS Box Shadow',
    difficulty: 'medium',
    question: 'What is the purpose of box-shadow?',
    options: [
      'A. To add border effects to elements',
      'B. To add shadow effects to elements',
      'C. To add outline effects to elements',
      'D. To add background effects to elements'
    ],
    correctAnswer: 'B'
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'CSS Border Radius',
    difficulty: 'medium',
    question: 'What is the purpose of border-radius?',
    options: [
      'A. To add borders to elements',
      'B. To add shadows to elements',
      'C. To round the corners of elements',
      'D. To add padding to elements'
    ],
    correctAnswer: 'C'
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'CSS Opacity',
    difficulty: 'medium',
    question: 'What does the CSS opacity property control?',
    options: [
      'A. The element’s display mode',
      'B. The element’s position',
      'C. The element’s stacking order',
      'D. The transparency of an element'
    ],
    correctAnswer: 'D'
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
    correctAnswer: 'A'
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'CSS Flexbox vs Grid',
    difficulty: 'advanced',
    question: 'What is the difference between flexbox and grid?',
    options: [
      'A. Flexbox is two-dimensional; grid is one-dimensional',
      'B. Flexbox is one-dimensional; grid is two-dimensional',
      'C. Flexbox is for rows; grid is for columns',
      'D. Flexbox and grid are the same'
    ],
    correctAnswer: 'B'
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'CSS Preprocessors',
    difficulty: 'advanced',
    question: 'What is a CSS preprocessor?',
    options: [
      'A. A tool that minifies CSS',
      'B. A tool that validates CSS',
      'C. A tool that extends CSS with features such as variables and functions',
      'D. A tool that formats CSS'
    ],
    correctAnswer: 'C'
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
    correctAnswer: 'D'
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'CSS Performance',
    difficulty: 'advanced',
    question: 'Which of the following can help improve CSS performance?',
    options: [
      'A. Use efficient selectors',
      'B. Use unnecessarily complex selectors',
      'C. Add unused CSS rules',
      'D. Load multiple unnecessary stylesheets'
    ],
    correctAnswer: 'A'
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'CSS Accessibility',
    difficulty: 'advanced',
    question: 'Which of the following is a CSS accessibility best practice?',
    options: [
      'A. Use appropriate font sizes',
      'B. Ensure sufficient color contrast',
      'C. Hide keyboard focus indicators',
      'D. Use very low-contrast text'
    ],
    correctAnswer: 'B'
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'CSS Print Styles',
    difficulty: 'advanced',
    question: 'How do you create print styles in CSS?',
    options: [
      'A. Using @print',
      'B. Using @media screen',
      'C. Using @media print',
      'D. Using @media all'
    ],
    correctAnswer: 'C'
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'CSS Custom Properties',
    difficulty: 'advanced',
    question: 'What is a key characteristic of CSS custom properties?',
    options: [
      'A. They are global only',
      'B. They are local only',
      'C. They never inherit',
      'D. They inherit from parent to child by default'
    ],
    correctAnswer: 'D'
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'CSS Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a CSS best practice?',
    options: [
      'A. Use random class names',
      'B. Use semantic class names',
      'C. Put all styles in inline attributes',
      'D. Duplicate the same CSS rules unnecessarily'
    ],
    correctAnswer: 'B'
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'CSS Future',
    difficulty: 'advanced',
    question: 'Which of the following represents current trends or approaches in modern CSS development?',
    options: [
      'A. CSS-in-JS',
      'B. Utility-first CSS such as Tailwind CSS',
      'C. CSS custom properties',
      'D. All of the above'
    ],
    correctAnswer: 'D'
  }
];

export default questions;