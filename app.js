const form = document.querySelector('form');
const taskInput = document.querySelector('#new-task');
const pendingTasksList = document.querySelector('#pending-tasks');
const completedTasksList = document.querySelector('#completed-tasks');
const tasks = [];

// Add task to the list
function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;
  const task = {
    text: taskText,
    completed: false,
    dateAdded: new Date(),
    dateCompleted: null
  };
  tasks.push(task);
  updatePendingTasks();
  taskInput.value = '';
}

// Update pending tasks list
function updatePendingTasks() {
  pendingTasksList.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (!task.completed) {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () =>{
        task.completed = true;
        task.dateCompleted = new Date();
        updateCompletedTasks();
        updatePendingTasks();
      });
      const span = document.createElement('span');
      span.textContent = task.text;
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        tasks.splice(i, 1);
        updatePendingTasks();
      });
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      pendingTasksList.appendChild(li);
    }
  }
}

// Update completed tasks list
function updateCompletedTasks() {
  completedTasksList.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.completed) {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = true;
      checkbox.addEventListener('change', () => {
        task.completed = false;
        task.dateCompleted = null;
        updateCompletedTasks();
        updatePendingTasks();
      });
      const span = document.createElement('span');
      span.textContent = task.text;
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        tasks.splice(i, 1);
        updateCompletedTasks();
      });
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      completedTasksList.appendChild(li);
    }
  }
}

// Initialize the app
function init() {
  form.addEventListener('submit', addTask);
  updatePendingTasks();
  updateCompletedTasks();
}

init();