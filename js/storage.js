// storage.js - Local storage utilities
const StorageManager = {
  // Task management
  saveTasks: function(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },

  loadTasks: function() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  },

  // Notes management
  saveNotes: function(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
  },

  loadNotes: function() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  },

  // Account management
  saveAccount: function(account) {
    localStorage.setItem('account', JSON.stringify(account));
  },

  loadAccountData: function() {
    const account = localStorage.getItem('account');
    return account ? JSON.parse(account) : null;
  }
};

// Export for global access
window.StorageManager = StorageManager;
