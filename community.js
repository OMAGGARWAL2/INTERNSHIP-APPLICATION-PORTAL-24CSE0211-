// Community functionality for InternHub
// This file provides client-side functionality for the community features

// Sample data for posts
const samplePosts = [
    {
        id: 1,
        author: "Priya Sharma",
        avatar: "PS",
        position: "Software Engineering Intern at Google",
        time: "2 hours ago",
        content: "Just completed my first project at Google and it feels amazing! Working on optimizing search algorithms has been an incredible learning experience. The mentorship here is top-notch and I'm grateful for the opportunity.",
        tags: ["#internship", "#softwareengineering", "#google", "#careerdevelopment"],
        likes: 24,
        comments: 8,
        shares: 3
    },
    {
        id: 2,
        author: "Rahul Kumar",
        avatar: "RK",
        position: "Data Analyst Intern at Microsoft",
        time: "5 hours ago",
        content: "Just earned my Data Visualization Certificate from Coursera! This course helped me understand how to present complex data in a clear and compelling way. Highly recommend it to anyone in the data field.\n\nCheck out the certificate in my profile!",
        tags: [],
        likes: 42,
        comments: 12,
        shares: 5
    },
    {
        id: 3,
        author: "Ananya Das",
        avatar: "AD",
        position: "Product Management Intern at Amazon",
        time: "1 day ago",
        content: "Thrilled to announce that our team's project just got approved for the next development phase! It's been an incredible journey working with such talented individuals. The collaborative culture here is truly inspiring.\n\nBig thanks to my teammates and mentors who made this possible!",
        tags: [],
        likes: 67,
        comments: 18,
        shares: 9
    }
];

// Sample data for certificates
const sampleCertificates = [
    {
        id: 1,
        title: "Python for Data Science",
        issuer: "IBM",
        description: "Completed advanced Python programming for data analysis and visualization.",
        skills: ["Python", "Data Science"],
        issueDate: "Jun 2023"
    },
    {
        id: 2,
        title: "Machine Learning",
        issuer: "Stanford",
        description: "Mastered supervised and unsupervised learning algorithms and applications.",
        skills: ["ML", "AI"],
        issueDate: "Apr 2023"
    },
    {
        id: 3,
        title: "UX Design Principles",
        issuer: "Google",
        description: "Learned user-centered design principles and prototyping techniques.",
        skills: ["UX", "Design"],
        issueDate: "Mar 2023"
    },
    {
        id: 4,
        title: "Cloud Computing",
        issuer: "AWS",
        description: "Completed comprehensive training on cloud infrastructure and services.",
        skills: ["AWS", "Cloud"],
        issueDate: "Jan 2023"
    }
];

// Sample data for people
const samplePeople = [
    {
        id: 1,
        name: "Meera Jain",
        avatar: "MJ",
        position: "Senior Software Engineer at Meta",
        description: "Former intern at Microsoft. Passionate about mentoring and helping students succeed in tech.",
        skills: ["React", "Node.js", "Python"]
    },
    {
        id: 2,
        name: "Vikram Khanna",
        avatar: "VK",
        position: "Product Manager at Netflix",
        description: "Experienced in product strategy and user experience. Open to mentoring product-minded interns.",
        skills: ["Product", "Strategy", "UX"]
    },
    {
        id: 3,
        name: "Sneha Patel",
        avatar: "SP",
        position: "Data Scientist at Apple",
        description: "Specialized in machine learning and data visualization. Available for technical mentorship.",
        skills: ["ML", "Python", "SQL"]
    },
    {
        id: 4,
        name: "David Rodriguez",
        avatar: "DR",
        position: "UX Designer at Adobe",
        description: "Expert in user research and interface design. Happy to help with portfolio reviews.",
        skills: ["Figma", "UI/UX", "Research"]
    }
];

// Sample data for connections
const sampleConnections = [
    {
        id: 1,
        name: "Meera Jain",
        avatar: "MJ",
        position: "Senior Software Engineer at Meta",
        description: "Former intern at Microsoft. Passionate about mentoring and helping students succeed in tech.",
        skills: ["React", "Node.js", "Python"]
    },
    {
        id: 2,
        name: "Vikram Khanna",
        avatar: "VK",
        position: "Product Manager at Netflix",
        description: "Experienced in product strategy and user experience. Open to mentoring product-minded interns.",
        skills: ["Product", "Strategy", "UX"]
    },
    {
        id: 3,
        name: "Sneha Patel",
        avatar: "SP",
        position: "Data Scientist at Apple",
        description: "Specialized in machine learning and data visualization. Available for technical mentorship.",
        skills: ["ML", "Python", "SQL"]
    },
    {
        id: 4,
        name: "David Rodriguez",
        avatar: "DR",
        position: "UX Designer at Adobe",
        description: "Expert in user research and interface design. Happy to help with portfolio reviews.",
        skills: ["Figma", "UI/UX", "Research"]
    }
];

// Sample data for invitations
const sampleInvitations = [
    {
        id: 1,
        name: "Amit Rao",
        avatar: "AR",
        position: "Software Developer at Google",
        connection: "2nd degree connection",
        message: "Hi there! I came across your profile and thought we might have some common interests in software development. Would love to connect!"
    },
    {
        id: 2,
        name: "Priya Sharma",
        avatar: "PS",
        position: "Product Manager at Microsoft",
        connection: "3rd degree connection",
        message: "Looking to expand my network in the product management space. Noticed your interest in product roles and thought we could connect!"
    }
];

// Sample data for jobs
const sampleJobs = [
    {
        id: 1,
        title: "Software Engineering Intern",
        company: "Google",
        location: "Mountain View, CA",
        logo: "G",
        type: "Internship",
        duration: "3 months",
        salary: "$30/hr",
        description: "Join our team to work on cutting-edge machine learning projects. You'll collaborate with experienced engineers to develop innovative solutions that impact millions of users.",
        skills: ["Python", "Machine Learning", "TensorFlow", "Cloud"]
    },
    {
        id: 2,
        title: "Data Analyst Intern",
        company: "Microsoft",
        location: "Redmond, WA",
        logo: "M",
        type: "Internship",
        duration: "4 months",
        salary: "$28/hr",
        description: "Analyze large datasets to extract meaningful insights and support business decisions. Work with cross-functional teams to create dashboards and reports that drive product improvements.",
        skills: ["SQL", "Python", "Tableau", "Statistics"]
    },
    {
        id: 3,
        title: "UX Design Intern",
        company: "Amazon",
        location: "Seattle, WA",
        logo: "A",
        type: "Internship",
        duration: "6 months",
        salary: "$25/hr",
        description: "Design intuitive user experiences for our e-commerce platform. Collaborate with product managers and engineers to create wireframes, prototypes, and high-fidelity designs.",
        skills: ["Figma", "UI/UX", "Prototyping", "Research"]
    },
    {
        id: 4,
        title: "Product Management Intern",
        company: "Facebook",
        location: "Menlo Park, CA",
        logo: "F",
        type: "Internship",
        duration: "3 months",
        salary: "$32/hr",
        description: "Work on product strategy and roadmap development. Conduct market research, analyze user feedback, and collaborate with engineering teams to deliver impactful features.",
        skills: ["Product", "Strategy", "Analytics", "Agile"]
    }
];

// Sample data for conversations
const sampleConversations = [
    {
        id: 1,
        name: "Priya Sharma",
        avatar: "PS",
        position: "Software Engineer at Google",
        lastMessage: "Thanks for the connection! Let's catch up soon.",
        time: "2h",
        unread: false
    },
    {
        id: 2,
        name: "Rahul Kumar",
        avatar: "RK",
        position: "Data Analyst at Microsoft",
        lastMessage: "Did you see the new internship posting?",
        time: "1d",
        unread: false
    },
    {
        id: 3,
        name: "Ananya Das",
        avatar: "AD",
        position: "Product Manager at Amazon",
        lastMessage: "Great presentation today! Let's collaborate.",
        time: "2d",
        unread: false
    },
    {
        id: 4,
        name: "Meera Jain",
        avatar: "MJ",
        position: "Senior Software Engineer at Meta",
        lastMessage: "Thanks for the recommendation!",
        time: "3d",
        unread: false
    },
    {
        id: 5,
        name: "Vikram Khanna",
        avatar: "VK",
        position: "Product Manager at Netflix",
        lastMessage: "Let's schedule a meeting next week.",
        time: "1w",
        unread: false
    }
];

// Sample data for messages
const sampleMessages = [
    {
        id: 1,
        conversationId: 1,
        sender: "Priya Sharma",
        avatar: "PS",
        content: "Hi there! Thanks for connecting with me on InternHub. I saw your profile and thought we might have some common interests in software development.",
        time: "10:30 AM",
        isReceived: true
    },
    {
        id: 2,
        conversationId: 1,
        sender: "You",
        avatar: "JD",
        content: "Hi Priya! Thanks for reaching out. I'm really interested in learning more about your experience at Google. Would you be open to a quick chat?",
        time: "10:32 AM",
        isReceived: false
    },
    {
        id: 3,
        conversationId: 1,
        sender: "Priya Sharma",
        avatar: "PS",
        content: "Absolutely! I'd be happy to chat. I'm free tomorrow afternoon if that works for you. We can discuss career paths in software engineering and any questions you might have about internships.",
        time: "10:35 AM",
        isReceived: true
    },
    {
        id: 4,
        conversationId: 1,
        sender: "You",
        avatar: "JD",
        content: "That sounds perfect! Tomorrow afternoon works great for me. Should we do a video call or phone call?",
        time: "10:36 AM",
        isReceived: false
    },
    {
        id: 5,
        conversationId: 1,
        sender: "Priya Sharma",
        avatar: "PS",
        content: "Either works for me, but I think a video call would be better so we can share screens if needed. I'll send you a calendar invite.",
        time: "10:38 AM",
        isReceived: true
    },
    {
        id: 6,
        conversationId: 1,
        sender: "You",
        avatar: "JD",
        content: "Sounds good! Looking forward to it. Thanks again for connecting!",
        time: "10:40 AM",
        isReceived: false
    }
];

// Sample data for notifications
const sampleNotifications = [
    {
        id: 1,
        icon: "fas fa-briefcase",
        title: "New Internship Match",
        content: "We found a new internship that matches your skills: UX Design Intern at DesignStudio. Apply now to secure your spot!",
        time: "2 hours ago",
        unread: true,
        actions: ["View Details", "Apply Now"]
    },
    {
        id: 2,
        icon: "fas fa-user-plus",
        title: "New Connection Request",
        content: "Priya Sharma wants to connect with you. She's a Software Engineer at Google with similar interests.",
        time: "5 hours ago",
        unread: true,
        actions: ["Accept", "View Profile"]
    },
    {
        id: 3,
        icon: "fas fa-comments",
        title: "New Message",
        content: "Rahul Kumar sent you a message: \"Did you see the new internship posting? Would love your thoughts on it.\"",
        time: "1 day ago",
        unread: true,
        actions: ["Reply", "View Message"]
    },
    {
        id: 4,
        icon: "fas fa-calendar-check",
        title: "Interview Scheduled",
        content: "Your interview with Amazon for the Data Analyst Intern position is scheduled for tomorrow at 2:00 PM.",
        time: "2 days ago",
        unread: false,
        actions: ["View Details", "Add to Calendar"]
    },
    {
        id: 5,
        icon: "fas fa-file-certificate",
        title: "Certificate Earned",
        content: "Congratulations! You've earned your Python for Data Science certificate. Add it to your profile to showcase your skills.",
        time: "3 days ago",
        unread: false,
        actions: ["View Certificate", "Add to Profile"]
    },
    {
        id: 6,
        icon: "fas fa-trophy",
        title: "Profile View Milestone",
        content: "Your profile has been viewed 100 times this month! This is 25% more than last month. Keep up the great work!",
        time: "1 week ago",
        unread: false,
        actions: ["View Analytics"]
    }
];

// Initialize the community functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'community.html':
            initCommunityPage();
            break;
        case 'network.html':
            initNetworkPage();
            break;
        case 'jobs.html':
            initJobsPage();
            break;
        case 'messages.html':
            initMessagesPage();
            break;
        case 'notifications.html':
            initNotificationsPage();
            break;
    }
    
    // Add event listeners for all pages
    addGlobalEventListeners();
});

// Initialize community page
function initCommunityPage() {
    // Load posts
    loadPosts();
    
    // Load certificates
    loadCertificates();
    
    // Load people
    loadPeople();
    
    // Add event listeners for tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });
    
    // Add event listener for post submission
    const postButton = document.querySelector('.new-post .btn');
    if (postButton) {
        postButton.addEventListener('click', submitPost);
    }
}

// Initialize network page
function initNetworkPage() {
    // Load connections
    loadConnections();
    
    // Load invitations
    loadInvitations();
}

// Initialize jobs page
function initJobsPage() {
    // Load jobs
    loadJobs();
    
    // Add event listeners for filters
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options in this section
            this.parentElement.querySelectorAll('.filter-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
}

// Initialize messages page
function initMessagesPage() {
    // Load conversations
    loadConversations();
    
    // Load messages for the first conversation
    if (sampleConversations.length > 0) {
        loadMessages(sampleConversations[0].id);
    }
    
    // Add event listeners for conversations
    document.querySelectorAll('.conversation').forEach(conv => {
        conv.addEventListener('click', function() {
            // Remove active class from all conversations
            document.querySelectorAll('.conversation').forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active class to clicked conversation
            this.classList.add('active');
            
            // Load messages for this conversation
            const convId = parseInt(this.getAttribute('data-id'));
            loadMessages(convId);
        });
    });
    
    // Add event listener for message submission
    const sendButton = document.querySelector('.chat-input button');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
}

// Initialize notifications page
function initNotificationsPage() {
    // Load notifications
    loadNotifications();
    
    // Add event listeners for filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Add event listener for mark all as read
    const markAllButton = document.querySelector('.mark-all button');
    if (markAllButton) {
        markAllButton.addEventListener('click', markAllAsRead);
    }
}

// Add global event listeners
function addGlobalEventListeners() {
    // Add event listeners for post actions
    document.querySelectorAll('.post-action').forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.querySelector('i').className;
            const postId = this.closest('.post').getAttribute('data-id');
            
            switch(actionType) {
                case 'fas fa-thumbs-up':
                    likePost(postId);
                    break;
                case 'fas fa-comment':
                    commentOnPost(postId);
                    break;
                case 'fas fa-share':
                    sharePost(postId);
                    break;
            }
        });
    });
    
    // Add event listeners for connection actions
    document.querySelectorAll('.connect-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const personId = this.closest('.connection-card, .person-card').getAttribute('data-id');
            connectWithPerson(personId);
        });
    });
    
    // Add event listeners for message buttons
    document.querySelectorAll('.message-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const personId = this.closest('.connection-card, .person-card').getAttribute('data-id');
            sendMessageToPerson(personId);
        });
    });
    
    // Add event listeners for job actions
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = this.closest('.job-card').getAttribute('data-id');
            applyForJob(jobId);
        });
    });
    
    // Add event listeners for save job buttons
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = this.closest('.job-card').getAttribute('data-id');
            saveJob(jobId);
        });
    });
}

// Load posts
function loadPosts() {
    const feedElement = document.getElementById('feed');
    if (!feedElement) return;
    
    feedElement.innerHTML = '';
    
    samplePosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.setAttribute('data-id', post.id);
        postElement.innerHTML = `
            <div class="post-author">
                <div class="avatar">${post.avatar}</div>
                <div class="post-author-info">
                    <h3>${post.author}</h3>
                    <p>${post.position} • ${post.time}</p>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content.replace(/\n/g, '<br>')}</p>
                ${post.tags.length > 0 ? `<p>${post.tags.join(' ')}</p>` : ''}
            </div>
            <div class="post-stats">
                <span>${post.likes} likes</span>
                <span>${post.comments} comments</span>
                <span>${post.shares} shares</span>
            </div>
            <div class="post-actions-bar">
                <button class="post-action"><i class="fas fa-thumbs-up"></i> Like</button>
                <button class="post-action"><i class="fas fa-comment"></i> Comment</button>
                <button class="post-action"><i class="fas fa-share"></i> Share</button>
            </div>
        `;
        feedElement.appendChild(postElement);
    });
}

// Load certificates
function loadCertificates() {
    const certificatesElement = document.getElementById('certificates');
    if (!certificatesElement) return;
    
    certificatesElement.innerHTML = '';
    
    const gridElement = document.createElement('div');
    gridElement.className = 'certificates-grid';
    
    sampleCertificates.forEach(cert => {
        const certElement = document.createElement('div');
        certElement.className = 'certificate-card';
        certElement.setAttribute('data-id', cert.id);
        certElement.innerHTML = `
            <div class="certificate-header">
                <h3>${cert.title}</h3>
            </div>
            <div class="certificate-body">
                <h3>Issued by ${cert.issuer}</h3>
                <p>${cert.description}</p>
                ${cert.skills.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
            </div>
            <div class="certificate-footer">
                <span>Issued: ${cert.issueDate}</span>
                <button class="btn" style="padding: 0.3rem 0.8rem; font-size: 0.9rem;">View</button>
            </div>
        `;
        gridElement.appendChild(certElement);
    });
    
    certificatesElement.appendChild(gridElement);
}

// Load people
function loadPeople() {
    const peopleElement = document.getElementById('people');
    if (!peopleElement) return;
    
    peopleElement.innerHTML = '';
    
    const gridElement = document.createElement('div');
    gridElement.className = 'people-grid';
    
    samplePeople.forEach(person => {
        const personElement = document.createElement('div');
        personElement.className = 'person-card';
        personElement.setAttribute('data-id', person.id);
        personElement.innerHTML = `
            <div class="person-header">
                <div class="person-avatar">${person.avatar}</div>
                <h3>${person.name}</h3>
                <p>${person.position}</p>
            </div>
            <div class="person-body">
                <p>${person.description}</p>
                <div class="person-skills">
                    ${person.skills.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
                </div>
            </div>
            <div class="person-footer">
                <button class="connect-btn">Connect</button>
                <button class="message-btn"><i class="fas fa-envelope"></i></button>
            </div>
        `;
        gridElement.appendChild(personElement);
    });
    
    peopleElement.appendChild(gridElement);
}

// Load connections
function loadConnections() {
    const connectionsGrid = document.querySelector('.connections-grid');
    if (!connectionsGrid) return;
    
    connectionsGrid.innerHTML = '';
    
    sampleConnections.forEach(connection => {
        const connectionElement = document.createElement('div');
        connectionElement.className = 'connection-card';
        connectionElement.setAttribute('data-id', connection.id);
        connectionElement.innerHTML = `
            <div class="connection-header">
                <div class="connection-avatar">${connection.avatar}</div>
                <h3>${connection.name}</h3>
                <p>${connection.position}</p>
            </div>
            <div class="connection-body">
                <p>${connection.description}</p>
                <div class="connection-skills">
                    ${connection.skills.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
                </div>
            </div>
            <div class="connection-footer">
                <button class="connect-btn">Connected</button>
                <button class="message-btn"><i class="fas fa-envelope"></i></button>
            </div>
        `;
        connectionsGrid.appendChild(connectionElement);
    });
}

// Load invitations
function loadInvitations() {
    const invitationsSection = document.querySelector('.invitations-section');
    if (!invitationsSection) return;
    
    // Clear existing invitations except the header
    const invitationsContainer = document.createElement('div');
    invitationsContainer.innerHTML = '<h2>Pending Invitations</h2>';
    
    sampleInvitations.forEach(invitation => {
        const invitationElement = document.createElement('div');
        invitationElement.className = 'invitation-card';
        invitationElement.setAttribute('data-id', invitation.id);
        invitationElement.innerHTML = `
            <div class="invitation-avatar">${invitation.avatar}</div>
            <div class="invitation-details">
                <h3>${invitation.name}</h3>
                <p>${invitation.position} • ${invitation.connection}</p>
                <p>${invitation.message}</p>
                <div class="invitation-actions">
                    <button class="accept-btn"><i class="fas fa-check"></i> Accept</button>
                    <button class="ignore-btn"><i class="fas fa-times"></i> Ignore</button>
                </div>
            </div>
        `;
        invitationsContainer.appendChild(invitationElement);
    });
    
    invitationsSection.innerHTML = invitationsContainer.innerHTML;
}

// Load jobs
function loadJobs() {
    const jobListings = document.querySelector('.job-listings');
    if (!jobListings) return;
    
    jobListings.innerHTML = '';
    
    sampleJobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-card';
        jobElement.setAttribute('data-id', job.id);
        jobElement.innerHTML = `
            <div class="job-header">
                <div class="job-logo">${job.logo}</div>
                <div class="job-info">
                    <h3>${job.title}</h3>
                    <p>${job.company} • ${job.location}</p>
                    <div class="job-meta">
                        <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                        <span><i class="fas fa-clock"></i> ${job.duration}</span>
                        <span><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
                    </div>
                </div>
            </div>
            <div class="job-description">
                <p>${job.description}</p>
            </div>
            <div class="job-tags">
                ${job.skills.map(skill => `<div class="job-tag">${skill}</div>`).join('')}
            </div>
            <div class="job-actions">
                <button class="apply-btn">Apply Now</button>
                <button class="save-btn"><i class="fas fa-bookmark"></i> Save Job</button>
            </div>
        `;
        jobListings.appendChild(jobElement);
    });
}

// Load conversations
function loadConversations() {
    const conversationsList = document.querySelector('.conversations');
    if (!conversationsList) return;
    
    conversationsList.innerHTML = '';
    
    sampleConversations.forEach(conv => {
        const convElement = document.createElement('div');
        convElement.className = `conversation ${conv.id === 1 ? 'active' : ''}`;
        convElement.setAttribute('data-id', conv.id);
        convElement.innerHTML = `
            <div class="conversation-avatar">${conv.avatar}</div>
            <div class="conversation-info">
                <h3>${conv.name}</h3>
                <p>${conv.lastMessage}</p>
            </div>
            <div class="conversation-time">${conv.time}</div>
        `;
        conversationsList.appendChild(convElement);
    });
}

// Load messages
function loadMessages(conversationId) {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;
    
    chatMessages.innerHTML = '';
    
    const messages = sampleMessages.filter(msg => msg.conversationId === conversationId);
    
    messages.forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.className = `message ${msg.isReceived ? 'received' : 'sent'}`;
        msgElement.innerHTML = `
            ${msg.content}
            <div class="message-time">${msg.time}</div>
        `;
        chatMessages.appendChild(msgElement);
    });
    
    // Scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Load notifications
function loadNotifications() {
    const notificationsList = document.querySelector('.notifications-list');
    if (!notificationsList) return;
    
    notificationsList.innerHTML = '';
    
    sampleNotifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification ${notification.unread ? 'unread' : ''}`;
        notificationElement.setAttribute('data-id', notification.id);
        notificationElement.innerHTML = `
            <div class="notification-icon">
                <i class="${notification.icon}"></i>
            </div>
            <div class="notification-content">
                <h3>${notification.title}</h3>
                <p>${notification.content}</p>
                <div class="notification-actions">
                    ${notification.actions.map(action => `<button class="action-btn">${action}</button>`).join('')}
                </div>
            </div>
            <div class="notification-time">${notification.time}</div>
        `;
        notificationsList.appendChild(notificationElement);
    });
}

// Switch tabs
function switchTab(tabId) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content section
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Find and activate the clicked tab
    const tabs = document.querySelectorAll('.tab');
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].getAttribute('data-tab') === tabId) {
            tabs[i].classList.add('active');
            break;
        }
    }
}

// Submit a new post
function submitPost() {
    const textarea = document.querySelector('.new-post textarea');
    const content = textarea.value.trim();
    
    if (content) {
        // Create a new post object
        const newPost = {
            id: Date.now(),
            author: "You",
            avatar: "JD",
            position: "InternHub User",
            time: "Just now",
            content: content,
            tags: [],
            likes: 0,
            comments: 0,
            shares: 0
        };
        
        // Add to sample posts at the beginning
        samplePosts.unshift(newPost);
        
        // Reload posts display
        loadPosts();
        
        // Clear textarea
        textarea.value = '';
        
        // Show success message
        alert('Post submitted successfully!');
    } else {
        alert('Please enter some content for your post.');
    }
}

// Like a post
function likePost(postId) {
    // In a real implementation, we would send this to a server
    // For now, we'll just show an alert
    alert(`Liked post ${postId}`);
}

// Comment on a post
function commentOnPost(postId) {
    // In a real implementation, we would open a comment box
    // For now, we'll just show an alert
    alert(`Commenting on post ${postId}`);
}

// Share a post
function sharePost(postId) {
    // In a real implementation, we would open a share dialog
    // For now, we'll just show an alert
    alert(`Sharing post ${postId}`);
}

// Connect with a person
function connectWithPerson(personId) {
    // In a real implementation, we would send a connection request
    // For now, we'll just show an alert
    alert(`Connection request sent to person ${personId}`);
}

// Send message to a person
function sendMessageToPerson(personId) {
    // In a real implementation, we would open the messaging interface
    // For now, we'll just show an alert
    alert(`Opening message interface for person ${personId}`);
}

// Apply for a job
function applyForJob(jobId) {
    // In a real implementation, we would open the application form
    // For now, we'll just show an alert
    alert(`Applying for job ${jobId}`);
}

// Save a job
function saveJob(jobId) {
    // In a real implementation, we would save the job to the user's profile
    // For now, we'll just show an alert
    alert(`Job ${jobId} saved`);
}

// Send a message
function sendMessage() {
    const textarea = document.querySelector('.chat-input textarea');
    const content = textarea.value.trim();
    
    if (content) {
        // In a real implementation, we would send this to a server
        // For now, we'll just show an alert
        alert('Message sent successfully!');
        textarea.value = '';
    }
}

// Mark all notifications as read
function markAllAsRead() {
    // In a real implementation, we would send this to a server
    // For now, we'll just show an alert
    alert('All notifications marked as read');
}

// Accept invitation
function acceptInvitation(invitationId) {
    // In a real implementation, we would send this to a server
    // For now, we'll just show an alert
    alert(`Invitation ${invitationId} accepted`);
}

// Ignore invitation
function ignoreInvitation(invitationId) {
    // In a real implementation, we would send this to a server
    // For now, we'll just show an alert
    alert(`Invitation ${invitationId} ignored`);
}