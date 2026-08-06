export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'Git Fundamentals',
    difficulty: 'easy',
    question: 'What is Git?',
    options: [
      'A. A distributed version control system',
      'B. A programming language',
      'C. A database system',
      'D. A design tool'
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'Git Installation',
    difficulty: 'easy',
    question: 'What command verifies Git installation?',
    options: [
      'A. git --version',
      'B. git -v',
      'C. Both A and B',
      'D. git help'
    ],
    correctAnswer: 'C' // Moved from C to B (rotated options)
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'Git Init',
    difficulty: 'easy',
    question: 'What command initializes a Git repository?',
    options: [
      'A. git init',
      'B. git start',
      'C. git create',
      'D. git new'
    ],
    correctAnswer: 'A' // Moved from A to B
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'Git Configuration',
    difficulty: 'easy',
    question: 'What command sets the global Git user name?',
    options: [
      'A. git config --global user.name "Your Name"',
      'B. git config user.name "Your Name"',
      'C. git set user.name "Your Name"',
      'D. git name "Your Name"'
    ],
    correctAnswer: 'A' // Moved from A to B
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'Git Configuration',
    difficulty: 'easy',
    question: 'What command sets the global Git email?',
    options: [
      'A. git config --global user.email "email@example.com"',
      'B. git config user.email "email@example.com"',
      'C. git set email "email@example.com"',
      'D. git email "email@example.com"'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'Git Status',
    difficulty: 'easy',
    question: 'What does "git status" show?',
    options: [
      'A. The current state of the working directory',
      'B. The version of Git',
      'C. The remote repository URL',
      'D. The last commit message'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'Git Add',
    difficulty: 'easy',
    question: 'What command adds all changes to the staging area?',
    options: [
      'A. git add .',
      'B. git add -A',
      'C. Both A and B',
      'D. git stage .'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'Git Commit',
    difficulty: 'easy',
    question: 'What is the command to commit changes with a message?',
    options: [
      'A. git commit -m "message"',
      'B. git commit -a "message"',
      'C. git commit "message"',
      'D. git commit -c "message"'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'Git Push',
    difficulty: 'easy',
    question: 'What command pushes committed changes to the remote repository?',
    options: [
      'A. git push',
      'B. git push origin main',
      'C. Both A and B',
      'D. git upload'
    ],
    correctAnswer: 'C' // Moved from C to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'Git Push Upstream',
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
    id: 11,
    type: 'multiple-choice',
    objective: 'Git Branch',
    difficulty: 'medium',
    question: 'What command creates a new branch in Git?',
    options: [
      'A. git branch branch-name',
      'B. git new branch-name',
      'C. git create branch-name',
      'D. git checkout -b branch-name'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'Git Checkout',
    difficulty: 'medium',
    question: 'What command switches to a different branch in Git?',
    options: [
      'A. git checkout branch-name',
      'B. git switch branch-name',
      'C. Both A and B',
      'D. git move branch-name'
    ],
    correctAnswer: 'B' // Moved from C to B
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'Git Merge',
    difficulty: 'medium',
    question: 'What does "git merge" do?',
    options: [
      'A. Combines changes from one branch into another',
      'B. Deletes a branch',
      'C. Creates a new branch',
      'D. Updates the remote repository'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'Git Pull',
    difficulty: 'medium',
    question: 'What does "git pull" do?',
    options: [
      'A. Fetches and merges changes from the remote repository',
      'B. Pushes changes to the remote repository',
      'C. Deletes changes from the local repository',
      'D. Creates a new branch'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'Git Fetch',
    difficulty: 'medium',
    question: 'What does "git fetch" do?',
    options: [
      'A. Downloads changes from the remote repository without merging',
      'B. Downloads and merges changes from the remote repository',
      'C. Pushes changes to the remote repository',
      'D. Deletes changes from the local repository'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'Git Remote',
    difficulty: 'medium',
    question: 'What is the command to add a remote origin to a Git repository?',
    options: [
      'A. git remote add origin <repository-url>',
      'B. git add remote origin <repository-url>',
      'C. git origin add <repository-url>',
      'D. git remote origin <repository-url>'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'Git Remote',
    difficulty: 'medium',
    question: 'What does "origin" refer to in Git?',
    options: [
      'A. The default remote repository name',
      'B. The original source code',
      'C. The master branch',
      'D. The local repository'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'Git Remote Verification',
    difficulty: 'medium',
    question: 'How do you verify the remote origin is set correctly?',
    options: [
      'A. git remote -v',
      'B. git remote show origin',
      'C. Both A and B',
      'D. git status'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'Git Remote URL',
    difficulty: 'medium',
    question: 'What is the format of a GitHub repository URL?',
    options: [
      'A. https://github.com/username/repo.git',
      'B. git@github.com:username/repo.git',
      'C. Both A and B',
      'D. Only HTTP format'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'Git Remote Add',
    difficulty: 'medium',
    question: 'What happens if you try to add a remote that already exists?',
    options: [
      'A. It shows an error',
      'B. It overwrites the existing remote',
      'C. It creates a duplicate remote',
      'D. It ignores the command'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'Git Remote Remove',
    difficulty: 'medium',
    question: 'How do you remove a remote origin?',
    options: [
      'A. git remote remove origin',
      'B. git remote rm origin',
      'C. Both A and B',
      'D. git delete remote origin'
    ],
    correctAnswer: 'C' // Moved from C to C (kept as C)
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'Git Remote Requirements',
    difficulty: 'medium',
    question: 'What is required before connecting to a GitHub remote?',
    options: [
      'A. A GitHub repository must exist',
      'B. Git must be initialized locally',
      'C. Both A and B',
      'D. Only authentication is required'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'Git Remote Purpose',
    difficulty: 'medium',
    question: 'What is the purpose of a remote connection in Git?',
    options: [
      'A. To sync local changes with a remote repository',
      'B. To collaborate with other developers',
      'C. Both A and B',
      'D. To deploy the application'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'Git Remote Rename',
    difficulty: 'medium',
    question: 'How can you rename a remote repository?',
    options: [
      'A. git remote rename origin new-name',
      'B. git remote update origin new-name',
      'C. git rename origin new-name',
      'D. git remote set-name origin new-name'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'Git Remote List',
    difficulty: 'medium',
    question: 'What does "git remote" command do without any arguments?',
    options: [
      'A. Lists all remote repositories',
      'B. Adds a new remote',
      'C. Removes a remote',
      'D. Shows remote details'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'Git Clone',
    difficulty: 'medium',
    question: 'What does "git clone" do?',
    options: [
      'A. Creates a copy of a remote repository locally',
      'B. Creates a new repository',
      'C. Copies a local repository',
      'D. Copies a branch'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'Git Fork',
    difficulty: 'medium',
    question: 'What is a fork in Git?',
    options: [
      'A. A copy of a repository on GitHub',
      'B. A branch in a repository',
      'C. A clone of a repository',
      'D. A remote repository'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'Git Pull Request',
    difficulty: 'medium',
    question: 'What is a pull request?',
    options: [
      'A. A request to merge changes into a repository',
      'B. A request to pull changes from a repository',
      'C. A request to delete a branch',
      'D. A request to create a branch'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'Git Conflict',
    difficulty: 'advanced',
    question: 'What is a merge conflict in Git?',
    options: [
      'A. When changes from different branches conflict',
      'B. When changes from the same branch conflict',
      'C. When changes from different repositories conflict',
      'D. When changes from different users conflict'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'Git Conflict Resolution',
    difficulty: 'advanced',
    question: 'How do you resolve a merge conflict?',
    options: [
      'A. Manually edit the conflicting files and commit',
      'B. Use git merge --abort to cancel',
      'C. Both A and B',
      'D. Delete the conflicting files'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'Git Rebase',
    difficulty: 'advanced',
    question: 'What does "git rebase" do?',
    options: [
      'A. Reapplies commits on top of another base tip',
      'B. Merges commits into one',
      'C. Deletes commits',
      'D. Creates a new branch'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'Git Rebase vs Merge',
    difficulty: 'advanced',
    question: 'What is the difference between rebase and merge?',
    options: [
      'A. Rebase rewrites commit history; merge preserves it',
      'B. Merge rewrites commit history; rebase preserves it',
      'C. Both rewrite commit history',
      'D. Neither rewrites commit history'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'Git Stash',
    difficulty: 'advanced',
    question: 'What does "git stash" do?',
    options: [
      'A. Temporarily saves changes that are not ready to commit',
      'B. Deletes changes that are not ready to commit',
      'C. Commits changes that are not ready',
      'D. Moves changes to a new branch'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'Git Stash Apply',
    difficulty: 'advanced',
    question: 'What does "git stash apply" do?',
    options: [
      'A. Applies the last stashed changes to the working directory',
      'B. Deletes the last stashed changes',
      'C. Creates a new stash',
      'D. Lists all stashes'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'Git Stash Pop',
    difficulty: 'advanced',
    question: 'What does "git stash pop" do?',
    options: [
      'A. Applies and removes the last stashed changes',
      'B. Applies the last stashed changes',
      'C. Removes the last stashed changes',
      'D. Lists all stashes'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'Git Log',
    difficulty: 'medium',
    question: 'What does "git log" display?',
    options: [
      'A. The commit history',
      'B. The current status',
      'C. The remote branches',
      'D. The configuration settings'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'Git Diff',
    difficulty: 'medium',
    question: 'What does "git diff" show?',
    options: [
      'A. Changes between commits, branches, or working directory',
      'B. The current status',
      'C. The commit history',
      'D. The configuration settings'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'Git Reset',
    difficulty: 'advanced',
    question: 'What does "git reset" do?',
    options: [
      'A. Undoes changes by moving the HEAD pointer',
      'B. Deletes all changes',
      'C. Creates a new commit',
      'D. Merges branches'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'Git Reset Types',
    difficulty: 'advanced',
    question: 'What is the difference between git reset --soft and --hard?',
    options: [
      'A. --soft keeps changes staged; --hard discards all changes',
      'B. --hard keeps changes staged; --soft discards all changes',
      'C. Both keep changes staged',
      'D. Both discard all changes'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'Git Revert',
    difficulty: 'advanced',
    question: 'What does "git revert" do?',
    options: [
      'A. Creates a new commit that undoes a previous commit',
      'B. Deletes a previous commit',
      'C. Resets the repository',
      'D. Merges branches'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'Git Ignore',
    difficulty: 'medium',
    question: 'What is a .gitignore file used for?',
    options: [
      'A. To ignore certain files in Git commits',
      'B. To configure Git settings',
      'C. To store environment variables',
      'D. To define build commands'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'Git Ignore Files',
    difficulty: 'medium',
    question: 'Which files should typically be in .gitignore?',
    options: [
      'A. node_modules',
      'B. .env files',
      'C. Both A and B',
      'D. Only source code files'
    ],
    correctAnswer: 'D' // Moved from C to D
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'Git Tag',
    difficulty: 'advanced',
    question: 'What is a Git tag?',
    options: [
      'A. A marker for a specific commit in the repository',
      'B. A branch',
      'C. A remote repository',
      'D. A configuration setting'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'Git Tag Types',
    difficulty: 'advanced',
    question: 'What are the two types of Git tags?',
    options: [
      'A. Lightweight and Annotated',
      'B. Lightweight and Heavy',
      'C. Annotated and Heavy',
      'D. Simple and Complex'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'Git Submodule',
    difficulty: 'advanced',
    question: 'What is a Git submodule?',
    options: [
      'A. A reference to another repository within a repository',
      'B. A branch within a repository',
      'C. A remote repository',
      'D. A configuration file'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'Git Workflow',
    difficulty: 'advanced',
    question: 'What is a Git workflow?',
    options: [
      'A. A way to use Git for collaboration',
      'B. A way to configure Git',
      'C. A way to install Git',
      'D. A way to deploy Git'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'Git Flow',
    difficulty: 'advanced',
    question: 'What is Git Flow?',
    options: [
      'A. A branching model for Git',
      'B. A type of Git workflow',
      'C. A Git command',
      'D. A Git configuration'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'GitHub Flow',
    difficulty: 'advanced',
    question: 'What is GitHub Flow?',
    options: [
      'A. A simplified Git workflow for GitHub',
      'B. A type of Git branch',
      'C. A Git command',
      'D. A Git configuration'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'Git Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a Git best practice?',
    options: [
      'A. Write clear commit messages',
      'B. Commit often',
      'C. Use branches for features',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'Git Advanced',
    difficulty: 'advanced',
    question: 'What is Git bisect used for?',
    options: [
      'A. Finding which commit introduced a bug',
      'B. Finding which branch introduced a bug',
      'C. Finding which file introduced a bug',
      'D. Finding which commit fixed a bug'
    ],
    correctAnswer: 'D' // Moved from A to D
  }
];

export default questions;