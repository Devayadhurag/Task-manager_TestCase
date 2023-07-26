// Function to create the task object
function createTask(title, description, dueDate, priority, category) {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        category: category,
        completed: false,
    };
}

// Function to display the task list in the table
function displayTaskList(tasks) {
    const tableBody = document.querySelector('#taskList tbody');
    tableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.dueDate}</td>
            <td>${task.priority}</td>
            <td>${task.category}</td>
            <td>
                <button id="view__button" onclick="openTaskDetailModal(${index})">View</button>
                <button id="edit__button" onclick="editTask(${index})">Edit</button>
                <button id="delete__button" onclick="deleteTask(${index})">Delete</button>
                <button id="complete__button" onclick="markAsCompleted(${index})">Mark Completed</button>
            </td>
        `;
    });
}

// Function to add a new task
function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const category = document.getElementById('category').value;

    const task = createTask(title, description, dueDate, priority, category);
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTaskList(tasks);
    document.getElementById('taskForm').reset();
}

// Function to open the task detail modal
function openTaskDetailModal(index) {
    const task = tasks[index];

    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <h2>${task.title}</h2>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Due Date:</strong> ${task.dueDate}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Category:</strong> ${task.category}</p>
    `;

    const modal = document.getElementById('taskDetailModal');
    modal.style.display = 'block';
}

// Function to edit a task
function editTask(index) {
    const task = tasks[index];

    const title = prompt('Enter the new title:', task.title);
    if (title !== null && title.trim() !== '') {
        const description = prompt('Enter the new description:', task.description);
        const dueDate = prompt('Enter the new due date:', task.dueDate);
        const priority = prompt('Enter the new priority (Low, Medium, High):', task.priority);
        const category = prompt('Enter the new category:', task.category);

        tasks[index] = {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            category: category,
            completed: task.completed,
        };

        
        localStorage.setItem('tasks', JSON.stringify(tasks));

        displayTaskList(tasks);
    }
}

// Function to delete a task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        displayTaskList(tasks);
    }
}

// Function to mark a task as completed
function markAsCompleted(index) {
    if (confirm('Are you sure you have completed the task')){
        tasks.splice(index, 1);
        console.log('Task Completed!!');

        localStorage.setItem('tasks', JSON.stringify(tasks));

        displayTaskList(tasks);
    }
}


const storedTasks = JSON.parse(localStorage.getItem('tasks'));
const tasks = storedTasks ? storedTasks : [];


displayTaskList(tasks);


const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', addTask);
