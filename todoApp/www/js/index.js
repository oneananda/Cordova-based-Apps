document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    renderTask(task);
    saveTask(task);

    taskInput.value = '';
}

function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.className = task.completed ? 'completed' : '';

    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
    `;

    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.querySelector(`li[data-id="${id}"]`).remove();
}

function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    const taskElement = document.querySelector(`li[data-id="${id}"]`);
    taskElement.classList.toggle('completed');
}
