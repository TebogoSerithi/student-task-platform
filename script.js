// Global variables
let currentUser = null;
let users = [];
let tasks = [];
let submissions = [];
let students = [];

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const addTaskBtn = document.getElementById('add-task-btn');
const addTaskModal = document.getElementById('add-task-modal');
const addTaskForm = document.getElementById('add-task-form');
const taskDetailModal = document.getElementById('task-detail-modal');
const submitTaskForm = document.getElementById('submit-task-form');
const taskTypeFilter = document.getElementById('task-type-filter');
const addUserBtn = document.getElementById('add-user-btn');
const addUserModal = document.getElementById('add-user-modal');
const addUserForm = document.getElementById('add-user-form');

// Section elements
const dashboardSection = document.getElementById('dashboard-section');
const tasksSection = document.getElementById('tasks-section');
const submissionsSection = document.getElementById('submissions-section');
const facilitatorSubmissionsSection = document.getElementById('facilitator-submissions-section');
const leaderboardSection = document.getElementById('leaderboard-section');
const userManagementSection = document.getElementById('user-management-section');

// Navigation links
const dashboardLink = document.getElementById('dashboard-link');
const tasksLink = document.getElementById('tasks-link');
const submissionsLink = document.getElementById('submissions-link');
const leaderboardLink = document.getElementById('leaderboard-link');
const usersLink = document.getElementById('users-link');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load sample data
    initializeSampleUsers();
    loadSampleData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check if user is logged in (for demo purposes)
    checkLoginStatus();
    
    // Update task statuses periodically
    updateTaskStatuses();
    setInterval(updateTaskStatuses, 24 * 60 * 60 * 1000); // Daily check
});

function initializeSampleUsers() {
    users = [
        {
            id: 1,
            name: "John Doe",
            email: "student1@school.com",
            password: "student123",
            role: "student",
            points: 85,
            tasksCompleted: 7
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "student2@school.com",
            password: "student123",
            role: "student",
            points: 120,
            tasksCompleted: 9
        },
        {
            id: 3,
            name: "Admin User",
            email: "facilitator1@school.com",
            password: "admin123",
            role: "facilitator"
        },
        {
            id: 4,
            name: "Second Admin",
            email: "facilitator2@school.com",
            password: "admin123",
            role: "facilitator"
        }
    ];
    
    // Initialize students array for leaderboard
    students = users.filter(user => user.role === 'student');
}

function loadSampleData() {
    // Sample tasks
    tasks = [
        {
            id: 1,
            title: "Like our Facebook page",
            description: "Visit our school's Facebook page and like it. Take a screenshot as proof.",
            type: "social",
            category: "class",
            points: 10,
            createdBy: "facilitator1@school.com",
            createdAt: new Date('2023-05-01'),
            deadline: new Date('2023-06-30'),
            status: 'active'
        },
        {
            id: 2,
            title: "Follow our TikTok account",
            description: "Follow the school's official TikTok account and send a screenshot of your following list.",
            type: "social",
            category: "home",
            points: 15,
            createdBy: "facilitator1@school.com",
            createdAt: new Date('2023-05-05'),
            deadline: new Date('2023-06-15'),
            status: 'active'
        },
        {
            id: 3,
            title: "Create a Google account",
            description: "Create a new Google account using your school email and provide the email address.",
            type: "data",
            category: "class",
            points: 20,
            createdBy: "facilitator2@school.com",
            createdAt: new Date('2023-05-10'),
            deadline: new Date('2023-06-20'),
            status: 'active'
        },
        {
            id: 4,
            title: "Watch educational YouTube video",
            description: "Watch the assigned YouTube video about digital literacy and write a 100-word summary.",
            type: "social",
            category: "home",
            points: 25,
            createdBy: "facilitator1@school.com",
            createdAt: new Date('2023-05-15'),
            deadline: new Date('2023-06-25'),
            status: 'active'
        },
        {
            id: 5,
            title: "Content moderation exercise",
            description: "Review 10 forum posts and flag any inappropriate content with reasons.",
            type: "content",
            category: "class",
            points: 30,
            createdBy: "facilitator2@school.com",
            createdAt: new Date('2023-05-20'),
            deadline: new Date('2023-06-10'),
            status: 'active'
        }
    ];

    // Sample submissions
    submissions = [
        {
            id: 1,
            taskId: 1,
            studentId: 1,
            proof: "https://example.com/screenshot1.jpg",
            submittedAt: new Date('2023-05-02'),
            status: "approved",
            reviewedBy: "facilitator1@school.com",
            reviewedAt: new Date('2023-05-03')
        },
        {
            id: 2,
            taskId: 2,
            studentId: 1,
            proof: "https://example.com/screenshot2.jpg",
            submittedAt: new Date('2023-05-06'),
            status: "pending"
        },
        {
            id: 3,
            taskId: 1,
            studentId: 2,
            proof: "https://example.com/screenshot3.jpg",
            submittedAt: new Date('2023-05-03'),
            status: "approved",
            reviewedBy: "facilitator1@school.com",
            reviewedAt: new Date('2023-05-04')
        },
        {
            id: 4,
            taskId: 3,
            studentId: 1,
            proof: "newstudent@gmail.com",
            submittedAt: new Date('2023-05-12'),
            status: "rejected",
            reviewedBy: "facilitator2@school.com",
            reviewedAt: new Date('2023-05-13'),
            feedback: "Please use your school email as instructed."
        },
        {
            id: 5,
            taskId: 4,
            studentId: 2,
            proof: "Summary text...",
            submittedAt: new Date('2023-05-16'),
            status: "pending"
        }
    ];
}

function setupEventListeners() {
    // Login button
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Logout button
    logoutBtn.addEventListener('click', logout);

    // Close modals when clicking X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;
        
        if (email && password && role) {
            if (login(email, password, role)) {
                loginModal.style.display = 'none';
                loginForm.reset();
            }
        }
    });

    // Navigation links
    dashboardLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('dashboard');
    });

    tasksLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('tasks');
    });

    submissionsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('submissions');
    });

    leaderboardLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('leaderboard');
    });

    usersLink?.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('users');
    });

    // Add task button (for facilitators)
    addTaskBtn.addEventListener('click', () => {
        addTaskModal.style.display = 'block';
    });

    // Add task form submission
    addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewTask();
    });

    // Task filters
    taskTypeFilter.addEventListener('change', renderTasks);
    document.getElementById('task-status-filter').addEventListener('change', renderTasks);
    document.getElementById('task-sort').addEventListener('change', renderTasks);

    // Submit task form
    submitTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitTask();
    });

    // User management
    addUserBtn?.addEventListener('click', () => {
        addUserModal.style.display = 'block';
    });

    addUserForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;
        const role = document.getElementById('user-role').value;
        
        if (addUser(name, email, password, role)) {
            addUserModal.style.display = 'none';
            addUserForm.reset();
        }
    });
}

function checkLoginStatus() {
    if (!currentUser) {
        // Show login button
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        
        // Hide all sections except login
        hideAllSections();
    } else {
        // Show logout button
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        
        // Show appropriate sections based on role
        showSection('dashboard');
    }
}

function login(email, password, role) {
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    
    if (user) {
        currentUser = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            points: user.points || 0,
            tasksCompleted: user.tasksCompleted || 0
        };
        
        // Update UI
        checkLoginStatus();
        updateDashboard();
        
        // Show appropriate UI based on role
        if (role === 'facilitator') {
            document.querySelectorAll('.facilitator-only').forEach(el => {
                el.style.display = 'block';
            });
            document.querySelectorAll('.student-only').forEach(el => {
                el.style.display = 'none';
            });
        } else {
            document.querySelectorAll('.student-only').forEach(el => {
                el.style.display = 'block';
            });
            document.querySelectorAll('.facilitator-only').forEach(el => {
                el.style.display = 'none';
            });
        }
        return true;
    } else {
        alert('Invalid credentials or role');
        return false;
    }
}

function logout() {
    currentUser = null;
    checkLoginStatus();
}

function showSection(section) {
    hideAllSections();
    
    switch (section) {
        case 'dashboard':
            dashboardSection.style.display = 'block';
            updateDashboard();
            break;
        case 'tasks':
            tasksSection.style.display = 'block';
            renderTasks();
            break;
        case 'submissions':
            if (currentUser.role === 'facilitator') {
                facilitatorSubmissionsSection.style.display = 'block';
                renderFacilitatorSubmissions();
            } else {
                submissionsSection.style.display = 'block';
                renderStudentSubmissions();
            }
            break;
        case 'leaderboard':
            leaderboardSection.style.display = 'block';
            renderLeaderboard();
            break;
        case 'users':
            if (currentUser.role === 'facilitator') {
                userManagementSection.style.display = 'block';
                renderUserManagement();
            }
            break;
    }
}

function hideAllSections() {
    dashboardSection.style.display = 'none';
    tasksSection.style.display = 'none';
    submissionsSection.style.display = 'none';
    facilitatorSubmissionsSection.style.display = 'none';
    leaderboardSection.style.display = 'none';
    userManagementSection.style.display = 'none';
}

function updateDashboard() {
    if (!currentUser) return;
    
    // Update welcome message
    document.getElementById('welcome-name').textContent = currentUser.name;
    
    if (currentUser.role === 'student') {
        // Find student data
        const student = students.find(s => s.id === currentUser.id) || 
                        { points: 0, tasksCompleted: 0 };
        
        // Update stats
        document.getElementById('user-points').textContent = student.points;
        document.getElementById('tasks-completed').textContent = student.tasksCompleted;
        
        // Calculate pending approvals
        const pendingCount = submissions.filter(
            s => s.studentId === student.id && s.status === 'pending'
        ).length;
        document.getElementById('pending-approvals').textContent = pendingCount;
        
        // Show recent tasks (filter out completed ones)
        const completedTaskIds = submissions
            .filter(s => s.studentId === student.id && s.status === 'approved')
            .map(s => s.taskId);
        
        const recentTasks = tasks
            .filter(task => !completedTaskIds.includes(task.id) && task.status === 'active')
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 3);
        
        renderTaskGrid(recentTasks, 'recent-tasks-grid');
    } else {
        // Facilitator dashboard
        document.getElementById('user-points').textContent = '-';
        document.getElementById('tasks-completed').textContent = tasks.length;
        
        // Pending submissions to review
        const pendingCount = submissions.filter(s => s.status === 'pending').length;
        document.getElementById('pending-approvals').textContent = pendingCount;
        
        // Show recently created tasks
        const recentTasks = tasks
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 3);
        
        renderTaskGrid(recentTasks, 'recent-tasks-grid');
    }
}

function renderTasks() {
    const typeFilter = taskTypeFilter.value;
    const statusFilter = document.getElementById('task-status-filter').value;
    const sortBy = document.getElementById('task-sort').value;
    
    let filteredTasks = tasks;
    
    // Filter by type
    if (typeFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => {
            if (typeFilter === 'social') return task.type === 'social';
            if (typeFilter === 'data') return task.type === 'data';
            if (typeFilter === 'content') return task.type === 'content';
            if (typeFilter === 'class') return task.category === 'class';
            if (typeFilter === 'home') return task.category === 'home';
            return true;
        });
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }
    
    // Sort tasks
    filteredTasks.sort((a, b) => {
        if (sortBy === 'newest') return b.createdAt - a.createdAt;
        if (sortBy === 'deadline') return a.deadline - b.deadline;
        if (sortBy === 'points') return b.points - a.points;
        return 0;
    });
    
    renderTaskGrid(filteredTasks, 'tasks-grid');
}

function renderTaskGrid(tasksToRender, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (!currentUser) return;
    
    // For students, filter out completed tasks
    let tasksToShow = [...tasksToRender];
    if (currentUser.role === 'student') {
        const student = students.find(s => s.id === currentUser.id);
        if (student) {
            const completedTaskIds = submissions
                .filter(s => s.studentId === student.id && s.status === 'approved')
                .map(s => s.taskId);
            
            tasksToShow = tasksToShow.filter(task => !completedTaskIds.includes(task.id));
        }
    }
    
    if (tasksToShow.length === 0) {
        container.innerHTML = '<p>No tasks found.</p>';
        return;
    }
    
    tasksToShow.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.dataset.taskId = task.id;
        
        // Determine type and category badges
        const typeBadgeClass = getTypeBadgeClass(task.type);
        const categoryBadgeClass = getCategoryBadgeClass(task.category);
        const statusBadgeClass = task.status === 'active' ? 'badge-active' : 'badge-expired';
        
        taskCard.innerHTML = `
            <div class="task-card-header">
                <h3>${task.title}</h3>
            </div>
            <div class="task-card-body">
                <div class="task-card-meta">
                    <span class="task-type-badge ${typeBadgeClass}">${formatTaskType(task.type)}</span>
                    <span class="task-type-badge ${categoryBadgeClass}">${formatTaskCategory(task.category)}</span>
                    <span class="task-type-badge ${statusBadgeClass}">${task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                    <span class="task-card-points">${task.points} pts</span>
                </div>
                <p class="task-card-description">${task.description}</p>
                <div class="task-card-meta">
                    <small>Posted: ${formatDate(task.createdAt)}</small>
                    <small>Deadline: ${formatDate(task.deadline)}</small>
                </div>
            </div>
            <div class="task-card-footer">
                <button class="view-task-btn">View Details</button>
            </div>
        `;
        
        container.appendChild(taskCard);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.closest('.task-card').dataset.taskId);
            showTaskDetails(taskId);
        });
    });
}

function getTypeBadgeClass(type) {
    switch (type) {
        case 'social': return 'badge-social';
        case 'data': return 'badge-data';
        case 'content': return 'badge-content';
        default: return '';
    }
}

function getCategoryBadgeClass(category) {
    switch (category) {
        case 'class': return 'badge-class';
        case 'home': return 'badge-home';
        default: return '';
    }
}

function formatTaskType(type) {
    switch (type) {
        case 'social': return 'Social Media';
        case 'data': return 'Data Entry';
        case 'content': return 'Content Mod';
        default: return type;
    }
}

function formatTaskCategory(category) {
    switch (category) {
        case 'class': return 'Class Task';
        case 'home': return 'Home Task';
        default: return category;
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showTaskDetails(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Populate modal with task details
    document.getElementById('task-detail-title').textContent = task.title;
    document.getElementById('task-detail-description').textContent = task.description;
    
    // Set meta information
    document.getElementById('task-detail-type').className = 'task-type-badge ' + getTypeBadgeClass(task.type);
    document.getElementById('task-detail-type').textContent = formatTaskType(task.type);
    
    document.getElementById('task-detail-category').className = 'task-type-badge ' + getCategoryBadgeClass(task.category);
    document.getElementById('task-detail-category').textContent = formatTaskCategory(task.category);
    
    document.getElementById('task-detail-points').textContent = `${task.points} points`;
    document.getElementById('task-detail-deadline').textContent = `Deadline: ${formatDate(task.deadline)}`;
    
    const statusBadgeClass = task.status === 'active' ? 'badge-active' : 'badge-expired';
    document.getElementById('task-detail-status').className = 'task-type-badge ' + statusBadgeClass;
    document.getElementById('task-detail-status').textContent = task.status.charAt(0).toUpperCase() + task.status.slice(1);
    
    // Show appropriate actions based on user role
    if (currentUser.role === 'student') {
        document.getElementById('submit-task-form').style.display = 'block';
        document.getElementById('submit-task-form').dataset.taskId = task.id;
        document.getElementById('facilitator-actions').style.display = 'none';
    } else {
        document.getElementById('submit-task-form').style.display = 'none';
        document.getElementById('facilitator-actions').style.display = 'block';
        
        // Set up edit/delete buttons
        document.getElementById('edit-task-btn').dataset.taskId = task.id;
        document.getElementById('delete-task-btn').dataset.taskId = task.id;
        
        document.getElementById('edit-task-btn').addEventListener('click', () => {
            editTask(task.id);
        });
        
        document.getElementById('delete-task-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks = tasks.filter(t => t.id !== task.id);
                taskDetailModal.style.display = 'none';
                renderTasks();
                updateDashboard();
            }
        });
    }
    
    // Show the modal
    taskDetailModal.style.display = 'block';
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Populate the add task form with existing values
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-type').value = task.type;
    document.getElementById('task-category').value = task.category;
    document.getElementById('task-points').value = task.points;
    document.getElementById('task-deadline').value = task.deadline.toISOString().split('T')[0];
    
    // Change the form to edit mode
    const form = document.getElementById('add-task-form');
    form.dataset.editingTaskId = taskId;
    form.querySelector('button[type="submit"]').textContent = 'Update Task';
    
    // Show the modal
    taskDetailModal.style.display = 'none';
    addTaskModal.style.display = 'block';
}

function addNewTask() {
    const form = document.getElementById('add-task-form');
    const isEditing = form.dataset.editingTaskId !== undefined;
    const taskId = isEditing ? parseInt(form.dataset.editingTaskId) : 
                  (tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1);
    
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const type = document.getElementById('task-type').value;
    const category = document.getElementById('task-category').value;
    const points = parseInt(document.getElementById('task-points').value);
    const deadline = document.getElementById('task-deadline').value;
    
    if (!title || !description || !type || !category || !points || !deadline) {
        alert('Please fill all fields');
        return;
    }
    
    const taskData = {
        id: taskId,
        title,
        description,
        type,
        category,
        points,
        createdBy: currentUser.email,
        createdAt: isEditing ? tasks.find(t => t.id === taskId).createdAt : new Date(),
        deadline: new Date(deadline),
        status: 'active'
    };
    
    if (isEditing) {
        // Update existing task
        const index = tasks.findIndex(t => t.id === taskId);
        tasks[index] = taskData;
    } else {
        // Add new task
        tasks.push(taskData);
    }
    
    // Reset form and close modal
    addTaskModal.style.display = 'none';
    form.reset();
    delete form.dataset.editingTaskId;
    form.querySelector('button[type="submit"]').textContent = 'Create Task';
    
    // Update UI
    renderTasks();
    updateDashboard();
    
    // Show success message
    alert(`Task ${isEditing ? 'updated' : 'created'} successfully!`);
}

function submitTask() {
    const taskId = parseInt(document.getElementById('submit-task-form').dataset.taskId);
    const proof = document.getElementById('submission-proof').value;
    
    if (!taskId || !proof) return;
    
    const student = students.find(s => s.id === currentUser.id);
    if (!student) return;
    
    const newSubmission = {
        id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
        taskId,
        studentId: student.id,
        proof,
        submittedAt: new Date(),
        status: 'pending'
    };
    
    submissions.push(newSubmission);
    submitTaskForm.reset();
    taskDetailModal.style.display = 'none';
    
    // Update UI
    renderStudentSubmissions();
    updateDashboard();
    
    // Show success message
    alert('Task submitted successfully! Waiting for facilitator approval.');
}

function renderStudentSubmissions() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const container = document.getElementById('submissions-grid');
    container.innerHTML = '';
    
    const student = students.find(s => s.id === currentUser.id);
    if (!student) return;
    
    const studentSubmissions = submissions
        .filter(s => s.studentId === student.id)
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    if (studentSubmissions.length === 0) {
        container.innerHTML = '<p>You have no submissions yet.</p>';
        return;
    }
    
    studentSubmissions.forEach(sub => {
        const task = tasks.find(t => t.id === sub.taskId);
        if (!task) return;
        
        const subCard = document.createElement('div');
        subCard.className = `submission-card ${sub.status}`;
        
        subCard.innerHTML = `
            <div class="submission-header">
                <span class="submission-task">${task.title}</span>
                <span class="submission-status ${sub.status}">${sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}</span>
            </div>
            <div class="submission-meta">
                <small>Submitted: ${formatDate(sub.submittedAt)}</small>
                ${sub.reviewedAt ? `<small>Reviewed: ${formatDate(sub.reviewedAt)}</small>` : ''}
            </div>
            <div class="submission-proof">
                <strong>Proof:</strong> ${sub.proof}
            </div>
            ${sub.feedback ? `<div class="submission-feedback"><strong>Feedback:</strong> ${sub.feedback}</div>` : ''}
        `;
        
        container.appendChild(subCard);
    });
}

function renderFacilitatorSubmissions() {
    if (!currentUser || currentUser.role !== 'facilitator') return;
    
    const container = document.getElementById('facilitator-submissions-grid');
    container.innerHTML = '';
    
    const pendingSubmissions = submissions
        .filter(s => s.status === 'pending')
        .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    
    if (pendingSubmissions.length === 0) {
        container.innerHTML = '<p>No pending submissions to review.</p>';
        return;
    }
    
    pendingSubmissions.forEach(sub => {
        const task = tasks.find(t => t.id === sub.taskId);
        const student = students.find(s => s.id === sub.studentId);
        if (!task || !student) return;
        
        const subCard = document.createElement('div');
        subCard.className = `submission-card ${sub.status}`;
        
        subCard.innerHTML = `
            <div class="submission-header">
                <span class="submission-task">${task.title} (${student.name})</span>
                <span class="submission-status ${sub.status}">${sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}</span>
            </div>
            <div class="submission-meta">
                <small>Submitted: ${formatDate(sub.submittedAt)}</small>
            </div>
            <div class="submission-proof">
                <strong>Proof:</strong> ${sub.proof}
            </div>
            <div class="submission-actions">
                <button class="approve-btn" data-submission-id="${sub.id}">Approve</button>
                <button class="reject-btn" data-submission-id="${sub.id}">Reject</button>
            </div>
        `;
        
        container.appendChild(subCard);
    });
    
    // Add event listeners to approve/reject buttons
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const submissionId = parseInt(e.target.dataset.submissionId);
            approveSubmission(submissionId, true);
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const submissionId = parseInt(e.target.dataset.submissionId);
            approveSubmission(submissionId, false);
        });
    });
}

function approveSubmission(submissionId, approve) {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;
    
    submission.status = approve ? 'approved' : 'rejected';
    submission.reviewedBy = currentUser.email;
    submission.reviewedAt = new Date();
    
    if (!approve) {
        const feedback = prompt('Please provide feedback for rejection:');
        if (feedback) {
            submission.feedback = feedback;
        }
    } else {
        // Update student points if approved
        const student = students.find(s => s.id === submission.studentId);
        const task = tasks.find(t => t.id === submission.taskId);
        
        if (student && task) {
            student.points += task.points;
            student.tasksCompleted += 1;
            
            // Update the current user points if they're the student
            if (currentUser.id === student.id) {
                currentUser.points = student.points;
                currentUser.tasksCompleted = student.tasksCompleted;
            }
        }
    }
    
    renderFacilitatorSubmissions();
    updateDashboard();
    renderLeaderboard();
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-body');
    container.innerHTML = '';
    
    // Sort students by points (descending)
    const sortedStudents = [...students].sort((a, b) => b.points - a.points);
    
    if (sortedStudents.length === 0) {
        container.innerHTML = '<tr><td colspan="4">No student data available.</td></tr>';
        return;
    }
    
    sortedStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        if (index === 0) row.className = 'rank-1';
        else if (index === 1) row.className = 'rank-2';
        else if (index === 2) row.className = 'rank-3';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.points}</td>
            <td>${student.tasksCompleted}</td>
        `;
        
        container.appendChild(row);
    });
}

function renderUserManagement() {
    if (!currentUser || currentUser.role !== 'facilitator') return;
    
    const container = document.getElementById('users-table-body');
    container.innerHTML = '';
    
    if (users.length === 0) {
        container.innerHTML = '<tr><td colspan="6">No users found.</td></tr>';
        return;
    }
    
    users.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
            <td>${user.points || '-'}</td>
            <td class="user-actions">
                <button class="edit-user-btn" data-user-id="${user.id}">Edit</button>
                <button class="delete-user-btn" data-user-id="${user.id}">Delete</button>
            </td>
        `;
        
        container.appendChild(row);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.edit-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = parseInt(e.target.dataset.userId);
            editUser(userId);
        });
    });
    
    document.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = parseInt(e.target.dataset.userId);
            deleteUser(userId);
        });
    });
}

function addUser(name, email, password, role) {
    // Validate inputs
    if (!name || !email || !password || !role) {
        alert('Please fill all fields');
        return false;
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('User with this email already exists');
        return false;
    }
    
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email,
        password,
        role,
        points: role === 'student' ? 0 : undefined,
        tasksCompleted: role === 'student' ? 0 : undefined
    };
    
    users.push(newUser);
    
    // Update students array if the new user is a student
    if (role === 'student') {
        students.push(newUser);
        renderLeaderboard();
    }
    
    renderUserManagement();
    return true;
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    const newName = prompt('Edit name:', user.name);
    if (newName) user.name = newName;
    
    const newRole = prompt('Edit role (student/facilitator):', user.role);
    if (newRole && ['student', 'facilitator'].includes(newRole)) {
        // If role changed from student to facilitator or vice versa
        if (user.role !== newRole) {
            if (newRole === 'facilitator') {
                // Remove from students array
                students = students.filter(s => s.id !== user.id);
                delete user.points;
                delete user.tasksCompleted;
            } else {
                // Add to students array
                user.points = 0;
                user.tasksCompleted = 0;
                students.push(user);
            }
            user.role = newRole;
        }
    }
    
    renderUserManagement();
    renderLeaderboard();
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        // Remove from users array
        users = users.filter(u => u.id !== userId);
        
        // Remove from students array if applicable
        students = students.filter(s => s.id !== userId);
        
        renderUserManagement();
        renderLeaderboard();
    }
}

function updateTaskStatuses() {
    const now = new Date();
    tasks.forEach(task => {
        if (new Date(task.deadline) < now && task.status === 'active') {
            task.status = 'expired';
        }
    });
    
    // Re-render tasks if the tasks section is currently visible
    if (tasksSection.style.display === 'block') {
        renderTasks();
    }
}