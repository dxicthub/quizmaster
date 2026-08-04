export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Fundamentals',
    difficulty: 'easy',
    question: 'What is Tailwind CSS?',
    options: [
      'A. A utility-first CSS framework',
      'B. A component-based framework',
      'C. A JavaScript library',
      'D. A database system'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Classes',
    difficulty: 'easy',
    question: 'Which class is used for padding in Tailwind?',
    options: [
      'A. p-4',
      'B. padding-4',
      'C. pad-4',
      'D. pt-4'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Classes',
    difficulty: 'easy',
    question: 'Which class is used for margin in Tailwind?',
    options: [
      'A. m-4',
      'B. margin-4',
      'C. mar-4',
      'D. mt-4'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Colors',
    difficulty: 'easy',
    question: 'Which class is used for blue text color?',
    options: [
      'A. text-blue-500',
      'B. text-blue',
      'C. color-blue',
      'D. blue-text'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Colors',
    difficulty: 'easy',
    question: 'Which class is used for a blue background?',
    options: [
      'A. bg-blue-500',
      'B. background-blue',
      'C. bg-blue',
      'D. blue-bg'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Configuration',
    difficulty: 'medium',
    question: 'What file is used to customize Tailwind CSS?',
    options: [
      'A. tailwind.config.js',
      'B. config.js',
      'C. tailwind.js',
      'D. settings.js'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Responsive',
    difficulty: 'medium',
    question: 'What prefix is used for responsive classes in Tailwind?',
    options: [
      'A. sm:, md:, lg:, xl:',
      'B. responsive-',
      'C. @media',
      'D. .responsive'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Responsive',
    difficulty: 'medium',
    question: 'What does the "sm:" prefix mean in Tailwind?',
    options: [
      'A. Small screens (640px and up)',
      'B. Small screens (480px and up)',
      'C. Small screens (768px and up)',
      'D. Small screens (1024px and up)'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Responsive',
    difficulty: 'medium',
    question: 'What does the "md:" prefix mean in Tailwind?',
    options: [
      'A. Medium screens (768px and up)',
      'B. Medium screens (640px and up)',
      'C. Medium screens (1024px and up)',
      'D. Medium screens (1280px and up)'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Responsive',
    difficulty: 'medium',
    question: 'What does the "lg:" prefix mean in Tailwind?',
    options: [
      'A. Large screens (1024px and up)',
      'B. Large screens (768px and up)',
      'C. Large screens (1280px and up)',
      'D. Large screens (640px and up)'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Flexbox',
    difficulty: 'medium',
    question: 'Which class enables flexbox in Tailwind?',
    options: [
      'A. flex',
      'B. display-flex',
      'C. d-flex',
      'D. flexbox'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Flexbox',
    difficulty: 'medium',
    question: 'Which class aligns items vertically in flexbox?',
    options: [
      'A. items-center',
      'B. justify-center',
      'C. align-center',
      'D. center-items'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Flexbox',
    difficulty: 'medium',
    question: 'Which class aligns items horizontally in flexbox?',
    options: [
      'A. justify-center',
      'B. items-center',
      'C. align-center',
      'D. center-items'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Grid',
    difficulty: 'medium',
    question: 'Which class enables CSS Grid in Tailwind?',
    options: [
      'A. grid',
      'B. display-grid',
      'C. d-grid',
      'D. grid-layout'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Grid',
    difficulty: 'medium',
    question: 'Which class defines grid columns in Tailwind?',
    options: [
      'A. grid-cols-3',
      'B. cols-3',
      'C. grid-columns-3',
      'D. columns-3'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Grid',
    difficulty: 'medium',
    question: 'Which class defines grid rows in Tailwind?',
    options: [
      'A. grid-rows-3',
      'B. rows-3',
      'C. grid-row-3',
      'D. row-3'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Spacing',
    difficulty: 'medium',
    question: 'What does the "p-4" class do in Tailwind?',
    options: [
      'A. Adds padding of 1rem (16px) on all sides',
      'B. Adds padding of 4px on all sides',
      'C. Adds margin of 1rem (16px) on all sides',
      'D. Adds margin of 4px on all sides'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Spacing',
    difficulty: 'medium',
    question: 'What does the "m-4" class do in Tailwind?',
    options: [
      'A. Adds margin of 1rem (16px) on all sides',
      'B. Adds margin of 4px on all sides',
      'C. Adds padding of 1rem (16px) on all sides',
      'D. Adds padding of 4px on all sides'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Typography',
    difficulty: 'medium',
    question: 'Which class is used for font size in Tailwind?',
    options: [
      'A. text-lg',
      'B. font-size-lg',
      'C. size-lg',
      'D. fs-lg'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Typography',
    difficulty: 'medium',
    question: 'Which class is used for font weight in Tailwind?',
    options: [
      'A. font-bold',
      'B. font-weight-bold',
      'C. weight-bold',
      'D. fw-bold'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Typography',
    difficulty: 'medium',
    question: 'Which class is used for text alignment in Tailwind?',
    options: [
      'A. text-center',
      'B. align-center',
      'C. center-text',
      'D. text-align-center'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Dark Mode',
    difficulty: 'medium',
    question: 'How do you enable dark mode in Tailwind?',
    options: [
      'A. Add darkMode: \'class\' to tailwind.config.js',
      'B. Add darkMode: \'media\' to tailwind.config.js',
      'C. Both A and B',
      'D. Only by using @media queries'
    ],
    correctAnswer: 'C' // Kept as C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Dark Mode',
    difficulty: 'medium',
    question: 'How do you apply dark mode styles in Tailwind?',
    options: [
      'A. Use dark: prefix',
      'B. Use @dark directive',
      'C. Use .dark class',
      'D. Use @media (prefers-color-scheme: dark)'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Customization',
    difficulty: 'advanced',
    question: 'How do you add custom colors in Tailwind?',
    options: [
      'A. Add to theme.extend.colors in tailwind.config.js',
      'B. Add to colors in tailwind.config.js',
      'C. Add to custom-colors in tailwind.config.js',
      'D. Add to variables in tailwind.config.js'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Customization',
    difficulty: 'advanced',
    question: 'How do you add custom fonts in Tailwind?',
    options: [
      'A. Add to theme.extend.fontFamily in tailwind.config.js',
      'B. Add to fontFamily in tailwind.config.js',
      'C. Add to fonts in tailwind.config.js',
      'D. Add to custom-fonts in tailwind.config.js'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Plugins',
    difficulty: 'advanced',
    question: 'How do you add plugins to Tailwind?',
    options: [
      'A. Add to plugins array in tailwind.config.js',
      'B. Add to plugins in package.json',
      'C. Add to plugins in postcss.config.js',
      'D. Add to plugins in vite.config.js'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Tailwind CSS @apply',
    difficulty: 'advanced',
    question: 'What is the @apply directive used for in Tailwind?',
    options: [
      'A. To apply Tailwind classes to custom CSS',
      'B. To apply custom CSS to Tailwind classes',
      'C. To apply JavaScript to Tailwind',
      'D. To apply Tailwind to JavaScript'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Tailwind CSS @layer',
    difficulty: 'advanced',
    question: 'What is the @layer directive used for in Tailwind?',
    options: [
      'A. To define custom CSS in specific layers',
      'B. To define custom JavaScript',
      'C. To define custom HTML',
      'D. To define custom components'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Utility Classes',
    difficulty: 'medium',
    question: 'Which class is used for border radius in Tailwind?',
    options: [
      'A. rounded-lg',
      'B. border-radius-lg',
      'C. radius-lg',
      'D. br-lg'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Utility Classes',
    difficulty: 'medium',
    question: 'Which class is used for box shadow in Tailwind?',
    options: [
      'A. shadow-lg',
      'B. box-shadow-lg',
      'C. shadow-lg',
      'D. bs-lg'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Utility Classes',
    difficulty: 'medium',
    question: 'Which class is used for opacity in Tailwind?',
    options: [
      'A. opacity-50',
      'B. opacity-50%',
      'C. op-50',
      'D. opacity-0.5'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Transitions',
    difficulty: 'advanced',
    question: 'Which class is used for transitions in Tailwind?',
    options: [
      'A. transition',
      'B. transition-all',
      'C. transition-colors',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Animations',
    difficulty: 'advanced',
    question: 'Which class is used for animations in Tailwind?',
    options: [
      'A. animate-pulse',
      'B. animate-spin',
      'C. animate-bounce',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Transform',
    difficulty: 'advanced',
    question: 'Which class is used for transforms in Tailwind?',
    options: [
      'A. transform',
      'B. transform-origin',
      'C. scale-100',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Hover States',
    difficulty: 'medium',
    question: 'How do you apply hover styles in Tailwind?',
    options: [
      'A. Use hover: prefix',
      'B. Use @hover directive',
      'C. Use .hover class',
      'D. Use :hover selector'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Focus States',
    difficulty: 'medium',
    question: 'How do you apply focus styles in Tailwind?',
    options: [
      'A. Use focus: prefix',
      'B. Use @focus directive',
      'C. Use .focus class',
      'D. Use :focus selector'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Active States',
    difficulty: 'medium',
    question: 'How do you apply active styles in Tailwind?',
    options: [
      'A. Use active: prefix',
      'B. Use @active directive',
      'C. Use .active class',
      'D. Use :active selector'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Pseudo-classes',
    difficulty: 'medium',
    question: 'Which pseudo-classes can be used in Tailwind?',
    options: [
      'A. hover',
      'B. focus',
      'C. active',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Pseudo-elements',
    difficulty: 'advanced',
    question: 'How do you style pseudo-elements in Tailwind?',
    options: [
      'A. Use before: and after: prefixes',
      'B. Use @before and @after directives',
      'C. Use ::before and ::after selectors',
      'D. Use .before and .after classes'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Container',
    difficulty: 'medium',
    question: 'What is the container class used for in Tailwind?',
    options: [
      'A. To center content and set max-width',
      'B. To create a container for JavaScript',
      'C. To create a container for images',
      'D. To create a container for videos'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Screen Sizes',
    difficulty: 'medium',
    question: 'What is the default screen size for "xl" in Tailwind?',
    options: [
      'A. 1280px',
      'B. 1024px',
      'C. 768px',
      'D. 640px'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Screen Sizes',
    difficulty: 'medium',
    question: 'What is the default screen size for "2xl" in Tailwind?',
    options: [
      'A. 1536px',
      'B. 1280px',
      'C. 1024px',
      'D. 768px'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Variants',
    difficulty: 'advanced',
    question: 'How do you add custom variants in Tailwind?',
    options: [
      'A. Add to variants in tailwind.config.js',
      'B. Add to custom-variants in tailwind.config.js',
      'C. Add to variants in package.json',
      'D. Add to variants in postcss.config.js'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Purge',
    difficulty: 'advanced',
    question: 'What is the purpose of purging in Tailwind?',
    options: [
      'A. To remove unused CSS classes',
      'B. To remove unused JavaScript',
      'C. To remove unused HTML',
      'D. To remove unused images'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Purge Content',
    difficulty: 'advanced',
    question: 'What does the content array in tailwind.config.js do?',
    options: [
      'A. Specifies files to scan for classes',
      'B. Specifies files to ignore',
      'C. Specifies files to compress',
      'D. Specifies files to exclude'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Tailwind CSS JIT',
    difficulty: 'advanced',
    question: 'What is the JIT (Just-in-Time) mode in Tailwind?',
    options: [
      'A. On-demand CSS generation',
      'B. Pre-generated CSS',
      'C. Minified CSS',
      'D. Compiled CSS'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Best Practices',
    difficulty: 'advanced',
    question: 'What is a best practice when using Tailwind CSS?',
    options: [
      'A. Avoid custom CSS when possible',
      'B. Use @apply for repeated utility combinations',
      'C. Configure custom colors and fonts',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'Tailwind CSS vs CSS',
    difficulty: 'advanced',
    question: 'What is the main advantage of Tailwind over traditional CSS?',
    options: [
      'A. Faster development',
      'B. Smaller bundle size',
      'C. Consistent styling',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Future',
    difficulty: 'advanced',
    question: 'What is a trend in Tailwind CSS development?',
    options: [
      'A. CSS-in-JS integration',
      'B. Component-based styling',
      'C. Design system integration',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Tailwind CSS Ecosystem',
    difficulty: 'advanced',
    question: 'Which of the following is a Tailwind CSS related tool?',
    options: [
      'A. Headless UI',
      'B. Tailwind UI',
      'C. Flowbite',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;