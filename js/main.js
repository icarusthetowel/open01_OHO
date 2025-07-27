// main.js - Main application initialization and coordination
// Import all modules by referencing them in the HTML
// This file coordinates the initialization of all modules

function initializeApp() {
  // Initialize all modules in the correct order
  initializeSidebar();
  initializeNavigation();
  initializeForms();
  initializeTasks();
  initializeNotes();
  initializeAccount();
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Placeholder for displayMealPlans function referenced in navigation
// This should be implemented when meal plans functionality is added
function displayMealPlans() {
  // Placeholder for meal plans display functionality
  console.log('Meal plans display functionality to be implemented');
}

// Make displayMealPlans available globally
window.displayMealPlans = displayMealPlans;
