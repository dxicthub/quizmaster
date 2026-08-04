export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    objective: 'MongoDB Fundamentals',
    difficulty: 'easy',
    question: 'What type of database is MongoDB?',
    options: [
      'A. NoSQL document database',
      'B. Relational database',
      'C. Graph database',
      'D. Key-value store'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 2,
    type: 'multiple-choice',
    objective: 'MongoDB Documents',
    difficulty: 'easy',
    question: 'What is a document in MongoDB?',
    options: [
      'A. A JSON-like data structure',
      'B. A row in a table',
      'C. A stored procedure',
      'D. A collection of fields'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 3,
    type: 'multiple-choice',
    objective: 'MongoDB Collections',
    difficulty: 'easy',
    question: 'What is a collection in MongoDB?',
    options: [
      'A. A group of documents',
      'B. A type of document',
      'C. A database schema',
      'D. A query result'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 4,
    type: 'multiple-choice',
    objective: 'MongoDB Queries',
    difficulty: 'easy',
    question: 'How do you find documents in a MongoDB collection?',
    options: [
      'A. db.collection.find()',
      'B. db.collection.select()',
      'C. db.collection.get()',
      'D. db.collection.query()'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 5,
    type: 'multiple-choice',
    objective: 'MongoDB Insert',
    difficulty: 'easy',
    question: 'How do you insert a document into a MongoDB collection?',
    options: [
      'A. db.collection.insertOne()',
      'B. db.collection.add()',
      'C. db.collection.push()',
      'D. db.collection.create()'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 6,
    type: 'multiple-choice',
    objective: 'MongoDB Update',
    difficulty: 'medium',
    question: 'How do you update a document in MongoDB?',
    options: [
      'A. db.collection.updateOne()',
      'B. db.collection.modify()',
      'C. db.collection.edit()',
      'D. db.collection.set()'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 7,
    type: 'multiple-choice',
    objective: 'MongoDB Delete',
    difficulty: 'medium',
    question: 'How do you delete a document from a MongoDB collection?',
    options: [
      'A. db.collection.deleteOne()',
      'B. db.collection.remove()',
      'C. db.collection.drop()',
      'D. db.collection.destroy()'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 8,
    type: 'multiple-choice',
    objective: 'MongoDB Aggregation',
    difficulty: 'medium',
    question: 'What is the aggregation pipeline in MongoDB?',
    options: [
      'A. A framework for data aggregation with stages',
      'B. A query language',
      'C. A data validation tool',
      'D. A backup mechanism'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 9,
    type: 'multiple-choice',
    objective: 'MongoDB Indexes',
    difficulty: 'medium',
    question: 'Why are indexes important in MongoDB?',
    options: [
      'A. To improve query performance',
      'B. To enforce data constraints',
      'C. To compress data',
      'D. To encrypt data'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 10,
    type: 'multiple-choice',
    objective: 'MongoDB Index Types',
    difficulty: 'medium',
    question: 'What is a unique index in MongoDB?',
    options: [
      'A. An index that ensures field values are unique',
      'B. An index that is unique to a collection',
      'C. An index that is created automatically',
      'D. An index that is only for primary keys'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 11,
    type: 'multiple-choice',
    objective: 'MongoDB Schema Design',
    difficulty: 'medium',
    question: 'What is schema design in MongoDB?',
    options: [
      'A. Designing the structure of documents in a collection',
      'B. Designing the database schema',
      'C. Designing the query structure',
      'D. Designing the index structure'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 12,
    type: 'multiple-choice',
    objective: 'MongoDB Relations',
    difficulty: 'medium',
    question: 'How do you model relationships in MongoDB?',
    options: [
      'A. Using embedded documents or references',
      'B. Using foreign keys',
      'C. Using joins',
      'D. Using constraints'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 13,
    type: 'multiple-choice',
    objective: 'MongoDB Embedded Documents',
    difficulty: 'medium',
    question: 'What is an embedded document in MongoDB?',
    options: [
      'A. A document nested inside another document',
      'B. A document that is embedded in an array',
      'C. A document that references another document',
      'D. A document that is stored separately'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 14,
    type: 'multiple-choice',
    objective: 'MongoDB References',
    difficulty: 'medium',
    question: 'What is a reference in MongoDB?',
    options: [
      'A. A way to link documents using an ID',
      'B. A way to embed documents',
      'C. A way to join collections',
      'D. A way to index documents'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 15,
    type: 'multiple-choice',
    objective: 'MongoDB Aggregation',
    difficulty: 'advanced',
    question: 'What is the $match stage in MongoDB aggregation?',
    options: [
      'A. To filter documents',
      'B. To group documents',
      'C. To sort documents',
      'D. To project fields'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 16,
    type: 'multiple-choice',
    objective: 'MongoDB Aggregation',
    difficulty: 'advanced',
    question: 'What is the $group stage in MongoDB aggregation?',
    options: [
      'A. To group documents by a specified key',
      'B. To filter documents',
      'C. To sort documents',
      'D. To project fields'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 17,
    type: 'multiple-choice',
    objective: 'MongoDB Aggregation',
    difficulty: 'advanced',
    question: 'What is the $project stage in MongoDB aggregation?',
    options: [
      'A. To specify which fields to include or exclude',
      'B. To filter documents',
      'C. To group documents',
      'D. To sort documents'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 18,
    type: 'multiple-choice',
    objective: 'MongoDB Aggregation',
    difficulty: 'advanced',
    question: 'What is the $sort stage in MongoDB aggregation?',
    options: [
      'A. To sort documents',
      'B. To filter documents',
      'C. To group documents',
      'D. To project fields'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 19,
    type: 'multiple-choice',
    objective: 'MongoDB Aggregation',
    difficulty: 'advanced',
    question: 'What is the $lookup stage in MongoDB aggregation?',
    options: [
      'A. To perform a left outer join with another collection',
      'B. To filter documents',
      'C. To group documents',
      'D. To project fields'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 20,
    type: 'multiple-choice',
    objective: 'MongoDB Aggregation',
    difficulty: 'advanced',
    question: 'What is the $unwind stage in MongoDB aggregation?',
    options: [
      'A. To deconstruct an array field',
      'B. To filter documents',
      'C. To group documents',
      'D. To project fields'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 21,
    type: 'multiple-choice',
    objective: 'MongoDB Transactions',
    difficulty: 'advanced',
    question: 'What is a transaction in MongoDB?',
    options: [
      'A. A group of operations that are executed atomically',
      'B. A query operation',
      'C. A write operation',
      'D. A read operation'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 22,
    type: 'multiple-choice',
    objective: 'MongoDB ACID',
    difficulty: 'advanced',
    question: 'What does ACID stand for in MongoDB?',
    options: [
      'A. Atomicity, Consistency, Isolation, Durability',
      'B. Accuracy, Consistency, Integrity, Durability',
      'C. Atomicity, Consistency, Integrity, Durability',
      'D. Accuracy, Consistency, Isolation, Durability'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 23,
    type: 'multiple-choice',
    objective: 'MongoDB Replication',
    difficulty: 'advanced',
    question: 'What is replication in MongoDB?',
    options: [
      'A. Copying data across multiple servers for redundancy and availability',
      'B. Copying data within a single server',
      'C. Copying data to a backup',
      'D. Copying data to a different database'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 24,
    type: 'multiple-choice',
    objective: 'MongoDB Sharding',
    difficulty: 'advanced',
    question: 'What is sharding in MongoDB?',
    options: [
      'A. Partitioning data across multiple servers',
      'B. Copying data across multiple servers',
      'C. Deleting data from multiple servers',
      'D. Encrypting data across multiple servers'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 25,
    type: 'multiple-choice',
    objective: 'MongoDB Replica Sets',
    difficulty: 'advanced',
    question: 'What is a replica set in MongoDB?',
    options: [
      'A. A group of MongoDB servers that maintain the same data',
      'B. A group of collections',
      'C. A group of databases',
      'D. A group of indexes'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 26,
    type: 'multiple-choice',
    objective: 'MongoDB Primary and Secondary',
    difficulty: 'advanced',
    question: 'What is the role of a primary node in a replica set?',
    options: [
      'A. To accept write operations',
      'B. To accept read operations',
      'C. To backup data',
      'D. To handle queries'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 27,
    type: 'multiple-choice',
    objective: 'MongoDB Connection',
    difficulty: 'medium',
    question: 'What is the default port for MongoDB?',
    options: [
      'A. 27017',
      'B. 3306',
      'C. 5432',
      'D. 6379'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 28,
    type: 'multiple-choice',
    objective: 'MongoDB Drivers',
    difficulty: 'medium',
    question: 'What is the purpose of MongoDB drivers?',
    options: [
      'A. To connect applications to MongoDB databases',
      'B. To manage MongoDB databases',
      'C. To query MongoDB databases',
      'D. To backup MongoDB databases'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 29,
    type: 'multiple-choice',
    objective: 'MongoDB Compass',
    difficulty: 'medium',
    question: 'What is MongoDB Compass?',
    options: [
      'A. A GUI tool for MongoDB',
      'B. A command-line tool',
      'C. A backup tool',
      'D. A monitoring tool'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 30,
    type: 'multiple-choice',
    objective: 'MongoDB Atlas',
    difficulty: 'medium',
    question: 'What is MongoDB Atlas?',
    options: [
      'A. A cloud database service for MongoDB',
      'B. A desktop application',
      'C. A command-line tool',
      'D. A backup service'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 31,
    type: 'multiple-choice',
    objective: 'MongoDB Security',
    difficulty: 'advanced',
    question: 'What is a security best practice in MongoDB?',
    options: [
      'A. Enable authentication',
      'B. Use SSL/TLS',
      'C. Restrict network access',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 32,
    type: 'multiple-choice',
    objective: 'MongoDB Authentication',
    difficulty: 'advanced',
    question: 'What is the default authentication mechanism in MongoDB?',
    options: [
      'A. SCRAM-SHA-256',
      'B. SCRAM-SHA-1',
      'C. LDAP',
      'D. Kerberos'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 33,
    type: 'multiple-choice',
    objective: 'MongoDB Authorization',
    difficulty: 'advanced',
    question: 'What is role-based access control in MongoDB?',
    options: [
      'A. A system that grants permissions based on roles',
      'B. A system that grants permissions based on users',
      'C. A system that grants permissions based on collections',
      'D. A system that grants permissions based on databases'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 34,
    type: 'multiple-choice',
    objective: 'MongoDB Performance',
    difficulty: 'advanced',
    question: 'What is a common performance optimization in MongoDB?',
    options: [
      'A. Creating appropriate indexes',
      'B. Using aggregation pipelines',
      'C. Using write concern',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  },
  {
    id: 35,
    type: 'multiple-choice',
    objective: 'MongoDB Data Types',
    difficulty: 'medium',
    question: 'Which of the following is a MongoDB data type?',
    options: [
      'A. ObjectId',
      'B. String',
      'C. Number',
      'D. All of the above'
    ],
    correctAnswer: 'D' // Kept as D
  },
  {
    id: 36,
    type: 'multiple-choice',
    objective: 'MongoDB ObjectId',
    difficulty: 'medium',
    question: 'What is an ObjectId in MongoDB?',
    options: [
      'A. A unique identifier for documents',
      'B. A type of object',
      'C. A type of ID',
      'D. A type of document'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 37,
    type: 'multiple-choice',
    objective: 'MongoDB BSON',
    difficulty: 'medium',
    question: 'What is BSON in MongoDB?',
    options: [
      'A. A binary JSON format used by MongoDB',
      'B. A JSON format used by MongoDB',
      'C. A XML format used by MongoDB',
      'D. A text format used by MongoDB'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 38,
    type: 'multiple-choice',
    objective: 'MongoDB Queries',
    difficulty: 'medium',
    question: 'What is a query operator in MongoDB?',
    options: [
      'A. A symbol that specifies conditions in a query',
      'B. A function that queries data',
      'C. A method that finds data',
      'D. A tool that queries data'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 39,
    type: 'multiple-choice',
    objective: 'MongoDB Comparison Operators',
    difficulty: 'medium',
    question: 'What is the $gt operator in MongoDB?',
    options: [
      'A. Greater than',
      'B. Greater than or equal to',
      'C. Less than',
      'D. Less than or equal to'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 40,
    type: 'multiple-choice',
    objective: 'MongoDB Comparison Operators',
    difficulty: 'medium',
    question: 'What is the $lt operator in MongoDB?',
    options: [
      'A. Less than',
      'B. Greater than',
      'C. Less than or equal to',
      'D. Greater than or equal to'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 41,
    type: 'multiple-choice',
    objective: 'MongoDB Logical Operators',
    difficulty: 'medium',
    question: 'What is the $and operator in MongoDB?',
    options: [
      'A. Logical AND',
      'B. Logical OR',
      'C. Logical NOT',
      'D. Logical NOR'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 42,
    type: 'multiple-choice',
    objective: 'MongoDB Logical Operators',
    difficulty: 'medium',
    question: 'What is the $or operator in MongoDB?',
    options: [
      'A. Logical OR',
      'B. Logical AND',
      'C. Logical NOT',
      'D. Logical NOR'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 43,
    type: 'multiple-choice',
    objective: 'MongoDB Array Operators',
    difficulty: 'advanced',
    question: 'What is the $push operator in MongoDB?',
    options: [
      'A. Adds an element to an array',
      'B. Removes an element from an array',
      'C. Updates an element in an array',
      'D. Finds an element in an array'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 44,
    type: 'multiple-choice',
    objective: 'MongoDB Array Operators',
    difficulty: 'advanced',
    question: 'What is the $pull operator in MongoDB?',
    options: [
      'A. Removes elements from an array',
      'B. Adds elements to an array',
      'C. Updates elements in an array',
      'D. Finds elements in an array'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 45,
    type: 'multiple-choice',
    objective: 'MongoDB Text Search',
    difficulty: 'advanced',
    question: 'What is text search in MongoDB?',
    options: [
      'A. A way to search for text in string fields',
      'B. A way to search for text in numeric fields',
      'C. A way to search for text in arrays',
      'D. A way to search for text in documents'
    ],
    correctAnswer: 'B' // Moved from A to B
  },
  {
    id: 46,
    type: 'multiple-choice',
    objective: 'MongoDB Geospatial Queries',
    difficulty: 'advanced',
    question: 'What are geospatial queries in MongoDB?',
    options: [
      'A. Queries that work with location data',
      'B. Queries that work with text data',
      'C. Queries that work with numeric data',
      'D. Queries that work with array data'
    ],
    correctAnswer: 'C' // Moved from A to C
  },
  {
    id: 47,
    type: 'multiple-choice',
    objective: 'MongoDB GridFS',
    difficulty: 'advanced',
    question: 'What is GridFS in MongoDB?',
    options: [
      'A. A specification for storing and retrieving large files',
      'B. A type of index',
      'C. A type of query',
      'D. A type of aggregation'
    ],
    correctAnswer: 'D' // Moved from A to D
  },
  {
    id: 48,
    type: 'multiple-choice',
    objective: 'MongoDB Change Streams',
    difficulty: 'advanced',
    question: 'What are change streams in MongoDB?',
    options: [
      'A. A way to watch for changes in collections',
      'B. A way to stream data',
      'C. A way to backup data',
      'D. A way to replicate data'
    ],
    correctAnswer: 'A' // Kept as A
  },
  {
    id: 49,
    type: 'multiple-choice',
    objective: 'MongoDB Best Practices',
    difficulty: 'advanced',
    question: 'Which of the following is a MongoDB best practice?',
    options: [
      'A. Use appropriate indexing',
      'B. Avoid large documents',
      'C. Use connection pooling',
      'D. All of the above'
    ],
    correctAnswer: 'B' // Moved from D to B
  },
  {
    id: 50,
    type: 'multiple-choice',
    objective: 'MongoDB Use Cases',
    difficulty: 'medium',
    question: 'Which of the following is a common use case for MongoDB?',
    options: [
      'A. Content management systems',
      'B. Real-time analytics',
      'C. E-commerce applications',
      'D. All of the above'
    ],
    correctAnswer: 'C' // Moved from D to C
  }
];

export default questions;