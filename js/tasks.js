// tasks.js - Task management functionality
function displayTasks(){
  const list = document.getElementById('task-list');
  const tasks = StorageManager.loadTasks();
  
  if(!tasks.length) {
    list.innerHTML = '<p>No tasks yet.</p>';
  } else {
    list.innerHTML = tasks.map(task => `<div class="mealplan-item">${task}</div>`).join('');
  }
}

function initializeTasks() {
  const taskForm = document.getElementById('task-form');
  
  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('task-input');
    const value = input.value.trim();
    
    if(!value) return;
    
    const tasks = StorageManager.loadTasks();
    tasks.push(value);
    StorageManager.saveTasks(tasks);
    
    input.value = '';
    displayTasks();
  });
}

// Export functions for global access
window.displayTasks = displayTasks;
window.initializeTasks = initializeTasks;
