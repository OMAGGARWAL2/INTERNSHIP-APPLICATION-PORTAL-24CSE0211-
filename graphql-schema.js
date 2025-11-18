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

  type Course {
    id: ID!
    title: String!
    description: String!
    price: Float!
    hirerId: ID!
    modules: [Module!]
    isPublished: Boolean!
  }

  type Module {
    id: ID!
    title: String!
    description: String!
    price: Float!
    courseId: ID!
    materials: [StudyMaterial!]
  }

  type StudyMaterial {
    id: ID!
    title: String!
    description: String!
    price: Float!
    moduleId: ID!
    url: String
  }

  type Payment {
    id: ID!
    userId: ID!
    courseId: ID
    moduleId: ID
    materialId: ID
    amount: Float!
    status: String!
    paymentMethod: String!
    createdAt: String!
  }

  type Subscription {
    id: ID!
    userId: ID!
    courseId: ID!
    startDate: String!
    endDate: String!
    isActive: Boolean!
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
    getCourses: [Course!]
    getCourse(id: ID!): Course
    getUserCourses(userId: ID!): [Course!]
    getUserPayments(userId: ID!): [Payment!]
    getUserSubscriptions(userId: ID!): [Subscription!]
  }

  type Mutation {
    createUser(name: String!, email: String!, role: String!): User
    createInternship(position: String!, company: String!, location: String!, stipend: String!, description: String!, skills: [String!]!): Internship
    applyToInternship(userId: ID!, internshipId: ID!): Application
    createPost(authorId: ID!, content: String!): Post
    addComment(postId: ID!, authorId: ID!, content: String!): Comment
    likePost(postId: ID!): Post
    updateApplicationStatus(applicationId: ID!, status: String!): Application
    createCourse(title: String!, description: String!, price: Float!, hirerId: ID!): Course
    updateCourse(id: ID!, title: String, description: String, price: Float, isPublished: Boolean): Course
    createModule(courseId: ID!, title: String!, description: String!, price: Float!): Module
    updateModule(id: ID!, title: String, description: String, price: Float): Module
    createStudyMaterial(moduleId: ID!, title: String!, description: String!, price: Float!, url: String): StudyMaterial
    updateStudyMaterial(id: ID!, title: String, description: String, price: Float, url: String): StudyMaterial
    processPayment(userId: ID!, courseId: ID, moduleId: ID, materialId: ID, amount: Float!, paymentMethod: String!): Payment
    createSubscription(userId: ID!, courseId: ID!, durationMonths: Int!): Subscription
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

// Payment-related data structures
const courses = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development including HTML, CSS, and JavaScript',
    price: 99.99,
    hirerId: '2',
    isPublished: true
  }
];

const modules = [
  {
    id: '1',
    title: 'HTML Basics',
    description: 'Introduction to HTML and basic tags',
    price: 29.99,
    courseId: '1'
  }
];

const studyMaterials = [
  {
    id: '1',
    title: 'HTML Cheat Sheet',
    description: 'Complete HTML reference guide',
    price: 9.99,
    moduleId: '1',
    url: 'https://example.com/html-cheat-sheet.pdf'
  }
];

const payments = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    amount: 99.99,
    status: 'completed',
    paymentMethod: 'gpay',
    createdAt: '2025-11-16T10:30:00Z'
  }
];

const subscriptions = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    startDate: '2025-11-16',
    endDate: '2026-11-16',
    isActive: true
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
  
  // Payment-related resolvers with relationships
  courses: () => courses,
  course: ({id}) => courses.find(course => course.id === id),
  
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

  // Payment-related queries
  getCourses: () => courses,
  getCourse: ({id}) => courses.find(course => course.id === id),
  getUserCourses: ({userId}) => {
    // In a real app, this would check user purchases
    return courses.filter(course => course.hirerId === userId);
  },
  getUserPayments: ({userId}) => {
    return payments.filter(payment => payment.userId === userId);
  },
  getUserSubscriptions: ({userId}) => {
    return subscriptions.filter(sub => sub.userId === userId);
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
  },

  // Payment-related mutations
  createCourse: ({title, description, price, hirerId}) => {
    const newCourse = {
      id: String(courses.length + 1),
      title,
      description,
      price,
      hirerId,
      isPublished: false
    };
    courses.push(newCourse);
    return newCourse;
  },

  updateCourse: ({id, title, description, price, isPublished}) => {
    const course = courses.find(c => c.id === id);
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (price !== undefined) course.price = price;
    if (isPublished !== undefined) course.isPublished = isPublished;
    
    return course;
  },

  createModule: ({courseId, title, description, price}) => {
    // Check if course exists
    const course = courses.find(c => c.id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    const newModule = {
      id: String(modules.length + 1),
      title,
      description,
      price,
      courseId
    };
    modules.push(newModule);
    return newModule;
  },

  updateModule: ({id, title, description, price}) => {
    const module = modules.find(m => m.id === id);
    
    if (!module) {
      throw new Error('Module not found');
    }
    
    if (title !== undefined) module.title = title;
    if (description !== undefined) module.description = description;
    if (price !== undefined) module.price = price;
    
    return module;
  },

  createStudyMaterial: ({moduleId, title, description, price, url}) => {
    // Check if module exists
    const module = modules.find(m => m.id === moduleId);
    if (!module) {
      throw new Error('Module not found');
    }
    
    const newMaterial = {
      id: String(studyMaterials.length + 1),
      title,
      description,
      price,
      moduleId,
      url: url || ''
    };
    studyMaterials.push(newMaterial);
    return newMaterial;
  },

  updateStudyMaterial: ({id, title, description, price, url}) => {
    const material = studyMaterials.find(m => m.id === id);
    
    if (!material) {
      throw new Error('Study material not found');
    }
    
    if (title !== undefined) material.title = title;
    if (description !== undefined) material.description = description;
    if (price !== undefined) material.price = price;
    if (url !== undefined) material.url = url;
    
    return material;
  },

  processPayment: ({userId, courseId, moduleId, materialId, amount, paymentMethod}) => {
    // In a real app, this would integrate with a payment gateway
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const newPayment = {
      id: String(payments.length + 1),
      userId,
      courseId: courseId || null,
      moduleId: moduleId || null,
      materialId: materialId || null,
      amount,
      status: 'completed',
      paymentMethod,
      createdAt: new Date().toISOString()
    };
    
    payments.push(newPayment);
    return newPayment;
  },

  createSubscription: ({userId, courseId, durationMonths}) => {
    const user = users.find(u => u.id === userId);
    const course = courses.find(c => c.id === courseId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);
    
    const newSubscription = {
      id: String(subscriptions.length + 1),
      userId,
      courseId,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      isActive: true
    };
    
    subscriptions.push(newSubscription);
    return newSubscription;
  },
  
  // Relationship resolvers
  Course: {
    modules: (course) => modules.filter(module => module.courseId === course.id),
    hirer: (course) => users.find(user => user.id === course.hirerId)
  },
  
  Module: {
    materials: (module) => studyMaterials.filter(material => material.moduleId === module.id),
    course: (module) => courses.find(course => course.id === module.courseId)
  },
  
  StudyMaterial: {
    module: (material) => modules.find(module => module.id === material.moduleId)
  },
  
  Payment: {
    user: (payment) => users.find(user => user.id === payment.userId),
    course: (payment) => courses.find(course => course.id === payment.courseId),
    module: (payment) => modules.find(module => module.id === payment.moduleId),
    material: (payment) => studyMaterials.find(material => material.id === payment.materialId)
  },
  
  Subscription: {
    user: (subscription) => users.find(user => user.id === subscription.userId),
    course: (subscription) => courses.find(course => course.id === subscription.courseId)
  }
};

module.exports = { schema, root };