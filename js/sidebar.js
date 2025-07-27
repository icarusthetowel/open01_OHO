// sidebar.js - Sidebar functionality and mobile responsiveness
const sidebar = document.querySelector('.sidebar');
const toggle = document.getElementById('sidebar-toggle');
const abbrev = document.getElementById('sidebar-abbrev');
const collapseBtn = document.getElementById('sidebar-collapse-btn');

function updateAbbrev() {
  if (sidebar.classList.contains('collapsed')) abbrev.style.display = 'block';
  else abbrev.style.display = 'none';
}

function checkWidth(){
  if(window.innerWidth<=768) {
    if (!sidebar.classList.contains('collapsed')) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
    document.body.classList.remove('sidebar-open');
  }
  updateAbbrev();
}

function updateCollapseBtnIcon() {
  if (sidebar.classList.contains('collapsed')) {
    collapseBtn.innerHTML = '&#x25B6;'; // Right arrow to expand
    collapseBtn.title = 'Expand sidebar';
  } else {
    collapseBtn.innerHTML = '&#x25C0;'; // Left arrow to collapse
    collapseBtn.title = 'Collapse sidebar';
  }
}

function updateCollapseBtnPosition() {
  if (sidebar.classList.contains('collapsed')) {
    collapseBtn.style.left = '16px'; // Stay visible on left edge when collapsed
  } else {
    collapseBtn.style.left = '250px'; // Position at sidebar edge when open
  }
}

function initializeSidebar() {
  // Mobile toggle button functionality
  toggle.addEventListener('click',()=>{
    sidebar.classList.toggle('collapsed');
    if(window.innerWidth<=768) {
      if (!sidebar.classList.contains('collapsed')) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }
    }
    updateAbbrev();
  });

  // Sidebar collapse button functionality
  collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    updateCollapseBtnIcon();
    updateCollapseBtnPosition();
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    checkWidth();
    updateCollapseBtnIcon();
    updateCollapseBtnPosition();
  });

  // Initialize on load
  window.addEventListener('load', () => {
    updateCollapseBtnIcon();
    updateCollapseBtnPosition();
  });
}

// Export functions for global access
window.updateAbbrev = updateAbbrev;
window.checkWidth = checkWidth;
window.sidebar = sidebar;
window.initializeSidebar = initializeSidebar;
