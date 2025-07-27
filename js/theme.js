// theme.js - Theme management functionality
(function() {
  function setTheme(dark) {
    if (dark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  function initializeTheme() {
    document.addEventListener('DOMContentLoaded', function() {
      // Always start in light mode
      setTheme(false);
      
      // Attach event listeners to all theme toggle buttons
      document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          setTheme(!document.body.classList.contains('dark-theme'));
        });
      });
    });
  }

  // Initialize theme on load
  initializeTheme();
})();
