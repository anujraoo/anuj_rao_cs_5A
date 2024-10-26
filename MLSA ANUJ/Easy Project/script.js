// Select DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Function to create a new to-do item
function createTodoItem(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');

    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = task;

    // Toggle completion
    todoText.addEventListener('click', () => {
        listItem.classList.toggle('completed');
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(listItem);
    });

    listItem.appendChild(todoText);
    listItem.appendChild(deleteBtn);
    return listItem;
}

// Add task function
function addTask() {
    const task = todoInput.value.trim();
    if (task) {
        const todoItem = createTodoItem(task);
        todoList.appendChild(todoItem);
        todoInput.value = '';
    }
}

// Event listeners
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
