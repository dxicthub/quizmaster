export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'PostgreSQL Fundamentals',
    difficulty: 'easy',
    question: 'What type of database is PostgreSQL?',
    options: [
      'A. Relational database',
      'B. NoSQL database',
      'C. Graph database',
      'D. Key-value store'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'PostgreSQL Queries',
    difficulty: 'easy',
    question: 'What SQL statement is used to retrieve data from a PostgreSQL table?',
    options: [
      'A. SELECT',
      'B. FETCH',
      'C. GET',
      'D. RETRIEVE'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'PostgreSQL Insert',
    difficulty: 'easy',
    question: 'What SQL statement is used to insert data into a PostgreSQL table?',
    options: [
      'A. INSERT INTO',
      'B. ADD INTO',
      'C. CREATE INTO',
      'D. UPDATE INTO'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'PostgreSQL Update',
    difficulty: 'easy',
    question: 'What SQL statement is used to update data in a PostgreSQL table?',
    options: [
      'A. UPDATE',
      'B. MODIFY',
      'C. CHANGE',
      'D. ALTER'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'PostgreSQL Delete',
    difficulty: 'easy',
    question: 'What SQL statement is used to delete data from a PostgreSQL table?',
    options: [
      'A. DELETE FROM',
      'B. REMOVE FROM',
      'C. DROP FROM',
      'D. CLEAR FROM'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'PostgreSQL Primary Key',
    difficulty: 'medium',
    question: 'What is a primary key in PostgreSQL?',
    options: [
      'A. A unique identifier for a row in a table',
      'B. A foreign key',
      'C. An index',
      'D. A constraint'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'PostgreSQL Foreign Key',
    difficulty: 'medium',
    question: 'What is a foreign key in PostgreSQL?',
    options: [
      'A. A field that references a primary key in another table',
      'B. A primary key',
      'C. An index',
      'D. A constraint'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'PostgreSQL Relationships',
    difficulty: 'medium',
    question: 'How do you create a foreign key constraint in PostgreSQL?',
    options: [
      'A. FOREIGN KEY (column) REFERENCES table (column)',
      'B. KEY FOREIGN (column) REFERENCES table (column)',
      'C. CONSTRAINT FOREIGN (column) REFERENCES table (column)',
      'D. REFERENCE KEY (column) REFERENCES table (column)'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'PostgreSQL Joins',
    difficulty: 'medium',
    question: 'What is an INNER JOIN in PostgreSQL?',
    options: [
      'A. A join that returns only rows that match in both tables',
      'B. A join that returns all rows from both tables',
      'C. A join that returns all rows from the left table',
      'D. A join that returns all rows from the right table'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'PostgreSQL Joins',
    difficulty: 'medium',
    question: 'What is a LEFT JOIN in PostgreSQL?',
    options: [
      'A. A join that returns all rows from the left table and matching rows from the right table',
      'B. A join that returns only matching rows from both tables',
      'C. A join that returns all rows from the right table',
      'D. A join that returns all rows from both tables'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'PostgreSQL Joins',
    difficulty: 'medium',
    question: 'What is a RIGHT JOIN in PostgreSQL?',
    options: [
      'A. A join that returns all rows from the right table and matching rows from the left table',
      'B. A join that returns only matching rows from both tables',
      'C. A join that returns all rows from the left table',
      'D. A join that returns all rows from both tables'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'PostgreSQL Joins',
    difficulty: 'medium',
    question: 'What is a FULL OUTER JOIN in PostgreSQL?',
    options: [
      'A. A join that returns all rows from both tables',
      'B. A join that returns only matching rows from both tables',
      'C. A join that returns all rows from the left table',
      'D. A join that returns all rows from the right table'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'PostgreSQL Indexes',
    difficulty: 'medium',
    question: 'What is the default index type in PostgreSQL?',
    options: [
      'A. B-tree',
      'B. Hash',
      'C. GiST',
      'D. GIN'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'PostgreSQL Indexes',
    difficulty: 'medium',
    question: 'What is a unique index in PostgreSQL?',
    options: [
      'A. An index that ensures column values are unique',
      'B. An index that is created for primary keys',
      'C. An index that is created for foreign keys',
      'D. An index that is created for performance'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'PostgreSQL Views',
    difficulty: 'medium',
    question: 'What is a view in PostgreSQL?',
    options: [
      'A. A virtual table based on a query',
      'B. A physical table',
      'C. A stored procedure',
      'D. A function'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'PostgreSQL Transactions',
    difficulty: 'advanced',
    question: 'What is a transaction in PostgreSQL?',
    options: [
      'A. A group of operations that are executed as a single unit',
      'B. A single operation',
      'C. A query operation',
      'D. A write operation'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'PostgreSQL ACID',
    difficulty: 'advanced',
    question: 'What does ACID stand for in PostgreSQL?',
    options: [
      'A. Atomicity, Consistency, Isolation, Durability',
      'B. Accuracy, Consistency, Integrity, Durability',
      'C. Atomicity, Consistency, Integrity, Durability',
      'D. Accuracy, Consistency, Isolation, Durability'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'PostgreSQL Isolation Levels',
    difficulty: 'advanced',
    question: 'What is the default isolation level in PostgreSQL?',
    options: [
      'A. Read Committed',
      'B. Read Uncommitted',
      'C. Repeatable Read',
      'D. Serializable'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'PostgreSQL Functions',
    difficulty: 'advanced',
    question: 'What is a function in PostgreSQL?',
    options: [
      'A. A block of code that can be executed',
      'B. A stored procedure',
      'C. A view',
      'D. A trigger'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'PostgreSQL Stored Procedures',
    difficulty: 'advanced',
    question: 'What is a stored procedure in PostgreSQL?',
    options: [
      'A. A precompiled block of code that can be executed',
      'B. A function',
      'C. A view',
      'D. A trigger'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'PostgreSQL Triggers',
    difficulty: 'advanced',
    question: 'What is a trigger in PostgreSQL?',
    options: [
      'A. A function that is automatically executed in response to an event',
      'B. A stored procedure',
      'C. A view',
      'D. A constraint'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'PostgreSQL Constraints',
    difficulty: 'medium',
    question: 'What is a NOT NULL constraint in PostgreSQL?',
    options: [
      'A. A constraint that ensures a column cannot have a NULL value',
      'B. A constraint that ensures a column has a unique value',
      'C. A constraint that ensures a column has a default value',
      'D. A constraint that ensures a column is indexed'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'PostgreSQL Constraints',
    difficulty: 'medium',
    question: 'What is a UNIQUE constraint in PostgreSQL?',
    options: [
      'A. A constraint that ensures column values are unique',
      'B. A constraint that ensures a column cannot have a NULL value',
      'C. A constraint that ensures a column has a default value',
      'D. A constraint that ensures a column is indexed'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'PostgreSQL CHECK Constraint',
    difficulty: 'medium',
    question: 'What is a CHECK constraint in PostgreSQL?',
    options: [
      'A. A constraint that validates data based on a condition',
      'B. A constraint that ensures a column has a unique value',
      'C. A constraint that ensures a column cannot have a NULL value',
      'D. A constraint that ensures a column has a default value'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'PostgreSQL Sequences',
    difficulty: 'medium',
    question: 'What is a sequence in PostgreSQL?',
    options: [
      'A. A database object that generates a sequence of numbers',
      'B. A table',
      'C. A view',
      'D. A function'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'PostgreSQL Auto-increment',
    difficulty: 'medium',
    question: 'How do you create an auto-incrementing column in PostgreSQL?',
    options: [
      'A. Using SERIAL or IDENTITY',
      'B. Using AUTO_INCREMENT',
      'C. Using AUTOINCREMENT',
      'D. Using INCREMENT'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'PostgreSQL Data Types',
    difficulty: 'medium',
    question: 'Which of the following is a PostgreSQL data type?',
    options: [
      'A. INTEGER',
      'B. VARCHAR',
      'C. TEXT',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'PostgreSQL JSON',
    difficulty: 'advanced',
    question: 'What is the JSONB data type in PostgreSQL?',
    options: [
      'A. A binary JSON data type with indexing support',
      'B. A text JSON data type',
      'C. A XML data type',
      'D. A CSV data type'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'PostgreSQL Full-Text Search',
    difficulty: 'advanced',
    question: 'What is full-text search in PostgreSQL?',
    options: [
      'A. A way to search for text in string fields',
      'B. A way to search for text in numeric fields',
      'C. A way to search for text in arrays',
      'D. A way to search for text in JSON fields'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'PostgreSQL Partitioning',
    difficulty: 'advanced',
    question: 'What is partitioning in PostgreSQL?',
    options: [
      'A. Dividing a large table into smaller, more manageable pieces',
      'B. Dividing a database into smaller databases',
      'C. Dividing a schema into smaller schemas',
      'D. Dividing a column into smaller columns'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'PostgreSQL Performance',
    difficulty: 'advanced',
    question: 'What is query optimization in PostgreSQL?',
    options: [
      'A. Improving query performance',
      'B. Reducing memory usage',
      'C. Compressing data',
      'D. Encrypting data'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'PostgreSQL Explain',
    difficulty: 'advanced',
    question: 'What is the EXPLAIN command used for in PostgreSQL?',
    options: [
      'A. To show the execution plan of a query',
      'B. To explain the schema of a table',
      'C. To explain the structure of a database',
      'D. To explain the contents of a table'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'PostgreSQL Vacuum',
    difficulty: 'advanced',
    question: 'What is the VACUUM command used for in PostgreSQL?',
    options: [
      'A. To reclaim storage space and update statistics',
      'B. To vacuum the database',
      'C. To clean the database',
      'D. To optimize the database'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'PostgreSQL Backup',
    difficulty: 'advanced',
    question: 'What is a common backup strategy for PostgreSQL?',
    options: [
      'A. Using pg_dump',
      'B. Using pg_dumpall',
      'C. Using pg_basebackup',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'PostgreSQL Replication',
    difficulty: 'advanced',
    question: 'What is replication in PostgreSQL?',
    options: [
      'A. Copying data to another server',
      'B. Copying data to a backup',
      'C. Copying data to a file',
      'D. Copying data to a table'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'PostgreSQL Logical Replication',
    difficulty: 'advanced',
    question: 'What is logical replication in PostgreSQL?',
    options: [
      'A. Replication based on changes in the logical structure',
      'B. Replication based on physical structure',
      'C. Replication based on data only',
      'D. Replication based on schema only'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'PostgreSQL Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in PostgreSQL?',
    options: [
      'A. Use strong passwords',
      'B. Restrict network access',
      'C. Use SSL/TLS',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'PostgreSQL Roles',
    difficulty: 'medium',
    question: 'What is a role in PostgreSQL?',
    options: [
      'A. A database user or group of users',
      'B. A table',
      'C. A view',
      'D. A function'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'PostgreSQL Privileges',
    difficulty: 'medium',
    question: 'What is the GRANT command used for in PostgreSQL?',
    options: [
      'A. To give permissions to a role',
      'B. To revoke permissions from a role',
      'C. To create a role',
      'D. To drop a role'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'PostgreSQL Privileges',
    difficulty: 'medium',
    question: 'What is the REVOKE command used for in PostgreSQL?',
    options: [
      'A. To remove permissions from a role',
      'B. To give permissions to a role',
      'C. To create a role',
      'D. To drop a role'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'PostgreSQL Schemas',
    difficulty: 'medium',
    question: 'What is a schema in PostgreSQL?',
    options: [
      'A. A container for database objects',
      'B. A table',
      'C. A view',
      'D. A function'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'PostgreSQL Tablespaces',
    difficulty: 'advanced',
    question: 'What is a tablespace in PostgreSQL?',
    options: [
      'A. A location where database objects are stored',
      'B. A table',
      'C. A schema',
      'D. A database'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'PostgreSQL Extensions',
    difficulty: 'advanced',
    question: 'What is an extension in PostgreSQL?',
    options: [
      'A. A package that adds functionality to PostgreSQL',
      'B. A table',
      'C. A view',
      'D. A function'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'PostgreSQL Extensions',
    difficulty: 'advanced',
    question: 'What is the PostGIS extension used for?',
    options: [
      'A. Geospatial data support',
      'B. Full-text search',
      'C. JSON support',
      'D. XML support'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'PostgreSQL Connection',
    difficulty: 'medium',
    question: 'What is the default port for PostgreSQL?',
    options: [
      'A. 5432',
      'B. 3306',
      'C. 27017',
      'D. 6379'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'PostgreSQL Clients',
    difficulty: 'medium',
    question: 'What is the default client for PostgreSQL?',
    options: [
      'A. psql',
      'B. pgAdmin',
      'C. DBeaver',
      'D. Navicat'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'PostgreSQL pgAdmin',
    difficulty: 'medium',
    question: 'What is pgAdmin?',
    options: [
      'A. A GUI tool for PostgreSQL',
      'B. A command-line tool',
      'C. A backup tool',
      'D. A monitoring tool'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'PostgreSQL Migration',
    difficulty: 'advanced',
    question: 'What is a common tool for migrating to PostgreSQL?',
    options: [
      'A. pg_dump',
      'B. pg_restore',
      'C. pg_migrate',
      'D. All of the above'
    ],
    correctAnswer: 'A' // Moved from D to A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'PostgreSQL Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a PostgreSQL best practice?',
    options: [
      'A. Use appropriate indexes',
      'B. Regularly backup your database',
      'C. Use connection pooling',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'PostgreSQL Use Cases',
    difficulty: 'medium',
    question: 'Which of the following is a common use case for PostgreSQL?',
    options: [
      'A. Enterprise applications',
      'B. Analytics applications',
      'C. Web applications',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;