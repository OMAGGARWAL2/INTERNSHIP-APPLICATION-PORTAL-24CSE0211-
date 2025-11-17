// GraphQL Schema for InternHub
const {
  graphql,
  buildSchema
} = require('graphql');

// Define the GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    profilePhoto: String
    skills: [String!]
    connections: [User!]
  }

  type Internship {
    id: ID!
    position: String!
    company: String!
    location: String!
    stipend: String!
    description: String!
    skills: [String!]
    postedDate: String!
    applications: [Application!]
  }

  type Application {
    id: ID!
    applicant: User!
    internship: Internship!
    status: String!
    appliedDate: String!
  }

  type Post {
    id: ID!
    author: User!
    content: String!
    timestamp: String!
    likes: Int!
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    author: User!
    content: String!
    timestamp: String!
  }

  type Query {
    users: [User!]
    user(id: ID!): User
    internships: [Internship!]
    internship(id: ID!): Internship
    posts: [Post!]
    post(id: ID!): Post
    applications: [Application!]
    application(id: ID!): Application
    searchInternships(query: String!): [Internship!]
    getUserApplications(userId: ID!): [Application!]
  }

  type Mutation {
    createUser(name: String!, email: String!, role: String!): User
    createInternship(position: String!, company: String!, location: String!, stipend: String!, description: String!, skills: [String!]!): Internship
    applyToInternship(userId: ID!, internshipId: ID!): Application
    createPost(authorId: ID!, content: String!): Post
    addComment(postId: ID!, authorId: ID!, content: String!): Comment
    likePost(postId: ID!): Post
    updateApplicationStatus(applicationId: ID!, status: String!): Application
  }
`);

// Sample data (in a real app, this would come from a database)
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    profilePhoto: 'https://ui-avatars.com/api/?name=John+Doe',
    skills: ['JavaScript', 'React', 'Node.js']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'hirer',
    profilePhoto: 'https://ui-avatars.com/api/?name=Jane+Smith',
    skills: ['Recruitment', 'HR', 'Management']
  }
];

const internships = [
  {
    id: '1',
    position: 'Frontend Developer Intern',
    company: 'TechCorp',
    location: 'Remote',
    stipend: '₹20,000 - ₹25,000',
    description: 'Work on cutting-edge web applications using React and modern JavaScript frameworks.',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    postedDate: '2025-11-15'
  }
];

const applications = [
  {
    id: '1',
    applicant: users[0],
    internship: internships[0],
    status: 'pending',
    appliedDate: '2025-11-16'
  }
];

const posts = [
  {
    id: '1',
    author: users[0],
    content: 'Just completed my first project at Google and it feels amazing!',
    timestamp: '2025-11-16T10:30:00Z',
    likes: 24,
    comments: []
  }
];

// Root resolver
const root = {
  // Queries
  users: () => users,
  user: ({id}) => users.find(user => user.id === id),
  internships: () => internships,
  internship: ({id}) => internships.find(internship => internship.id === id),
  posts: () => posts,
  post: ({id}) => posts.find(post => post.id === id),
  applications: () => applications,
  application: ({id}) => applications.find(app => app.id === id),
  
  searchInternships: ({query}) => {
    return internships.filter(internship => 
      internship.position.toLowerCase().includes(query.toLowerCase()) ||
      internship.company.toLowerCase().includes(query.toLowerCase()) ||
      internship.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
  },
  
  getUserApplications: ({userId}) => {
    return applications.filter(app => app.applicant.id === userId);
  },

  // Mutations
  createUser: ({name, email, role}) => {
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      role,
      profilePhoto: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
    };
    users.push(newUser);
    return newUser;
  },
  
  createInternship: ({position, company, location, stipend, description, skills}) => {
    const newInternship = {
      id: String(internships.length + 1),
      position,
      company,
      location,
      stipend,
      description,
      skills,
      postedDate: new Date().toISOString().split('T')[0]
    };
    internships.push(newInternship);
    return newInternship;
  },
  
  applyToInternship: ({userId, internshipId}) => {
    const user = users.find(u => u.id === userId);
    const internship = internships.find(i => i.id === internshipId);
    
    if (!user || !internship) {
      throw new Error('User or internship not found');
    }
    
    const newApplication = {
      id: String(applications.length + 1),
      applicant: user,
      internship,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    
    applications.push(newApplication);
    return newApplication;
  },
  
  createPost: ({authorId, content}) => {
    const author = users.find(u => u.id === authorId);
    
    if (!author) {
      throw new Error('Author not found');
    }
    
    const newPost = {
      id: String(posts.length + 1),
      author,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    
    posts.push(newPost);
    return newPost;
  },
  
  addComment: ({postId, authorId, content}) => {
    const post = posts.find(p => p.id === postId);
    const author = users.find(u => u.id === authorId);
    
    if (!post || !author) {
      throw new Error('Post or author not found');
    }
    
    const newComment = {
      id: String(post.comments.length + 1),
      author,
      content,
      timestamp: new Date().toISOString()
    };
    
    post.comments.push(newComment);
    return newComment;
  },
  
  likePost: ({postId}) => {
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      throw new Error('Post not found');
    }
    
    post.likes += 1;
    return post;
  },
  
  updateApplicationStatus: ({applicationId, status}) => {
    const application = applications.find(a => a.id === applicationId);
    
    if (!application) {
      throw new Error('Application not found');
    }
    
    application.status = status;
    return application;
  }
};

module.exports = { schema, root };