// navigation.js - Navigation and section management
function showSection(id) {
  document.querySelectorAll('.section').forEach(s=>s.style.display='none');
  const el = document.getElementById(id);
  el.style.display = el.classList.contains('homepage') ? 'flex' : 'block';
}

function setActive(item) {
  document.querySelectorAll('.menu-item').forEach(i=>i.classList.remove('active'));
  item.classList.add('active');
}

function clearActiveMenuItems() {
  document.querySelectorAll('.menu-item').forEach(i=>i.classList.remove('active'));
}

function scrollToTop() {
  // Scroll the main content area to the top
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
  // Also scroll the window to the top as a fallback
  window.scrollTo(0, 0);
}

function initializeNavigation() {
  // Get menu elements
  const menuHome     = document.getElementById('menu-section-home'),
        menuMeal     = document.getElementById('menu-section-mealplans'),
        menuCal      = document.getElementById('menu-section-calorie'),
        menuRec      = document.getElementById('menu-section-recipes'),
        menuSave     = document.getElementById('menu-section-savedrecipes'),
        menuTasks    = document.getElementById('menu-section-tasks'),
        menuNotes    = document.getElementById('menu-section-notes'),
        menuAccount  = document.getElementById('menu-section-account');

  // Get auth buttons
  const signupBtn = document.querySelector('.signup-btn'),
        loginBtn = document.querySelector('.login-btn'),
        switchToLogin = document.getElementById('switch-to-login'),
        switchToSignup = document.getElementById('switch-to-signup');

  // Menu click handlers
  menuHome.onclick       = ()=>{ showSection('section-home'); setActive(menuHome); updateAbbrev(); scrollToTop(); };
  menuMeal.onclick       = ()=>{ showSection('section-mealplans'); setActive(menuMeal); displayMealPlans(); updateAbbrev(); scrollToTop(); };
  menuCal.onclick        = ()=>{ showSection('section-calorie'); setActive(menuCal); updateAbbrev(); scrollToTop(); };
  menuRec.onclick        = ()=>{ showSection('section-recipes'); setActive(menuRec); updateAbbrev(); scrollToTop(); };
  menuSave.onclick       = ()=>{ showSection('section-savedrecipes'); setActive(menuSave); updateAbbrev(); scrollToTop(); };
  menuTasks.onclick      = ()=>{ showSection('section-tasks'); setActive(menuTasks); displayTasks(); updateAbbrev(); scrollToTop(); };
  menuNotes.onclick      = ()=>{ showSection('section-notes'); setActive(menuNotes); displayNotes(); updateAbbrev(); scrollToTop(); };
  menuAccount.onclick    = ()=>{ showSection('section-account'); setActive(menuAccount); loadAccount(); updateAbbrev(); scrollToTop(); };

  // Auth button handlers
  signupBtn.onclick = ()=>{ showSection('section-signup'); clearActiveMenuItems(); updateAbbrev(); scrollToTop(); };
  loginBtn.onclick = ()=>{ showSection('section-login'); clearActiveMenuItems(); updateAbbrev(); scrollToTop(); };

  // Handle switching between signup and login pages
  if (switchToLogin) {
    switchToLogin.onclick = (e)=>{ e.preventDefault(); showSection('section-login'); scrollToTop(); };
  }
  if (switchToSignup) {
    switchToSignup.onclick = (e)=>{ e.preventDefault(); showSection('section-signup'); scrollToTop(); };
  }

  // Auto-close sidebar when clicking menu items on mobile
  document.querySelectorAll('.menu-item').forEach(it=>{
    it.addEventListener('click',()=>{
      if(window.innerWidth<=768) {
        sidebar.classList.add('collapsed');
        document.body.classList.remove('sidebar-open');
        updateAbbrev();
      }
    });
  });

  // Initialize home section on load
  window.addEventListener('load',()=>{
    checkWidth();
    menuHome.click();
  });

  // Store menu references globally for other modules
  window.menuHome = menuHome;
}

// Export functions for global access
window.showSection = showSection;
window.setActive = setActive;
window.clearActiveMenuItems = clearActiveMenuItems;
window.scrollToTop = scrollToTop;
window.initializeNavigation = initializeNavigation;
