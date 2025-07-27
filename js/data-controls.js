// data-controls.js - Data Controls page functionality

// Default preferences configuration
const DEFAULT_PREFERENCES = {
  // Cache Preferences
  enableCache: true,
  cacheSearchHistory: true,
  cachePreferences: false,
  
  // Data Collection & Analytics
  analyticsCollection: false,
  errorReporting: false,
  performanceMonitoring: false,
  
  // AI Model Training & Improvement
  aiTrainingConsent: false,
  featureImprovement: false,
  researchParticipation: false,
  
  // Privacy & Security
  dataEncryption: true, // Always enabled
  thirdPartySharing: false,
  marketingCommunications: false,
  
  // Data Retention
  retentionPeriod: '180',
  autoCleanup: true
};

// Storage key for preferences
const STORAGE_KEY = 'oho_data_preferences';

/**
 * Load preferences from localStorage or use defaults
 */
function loadPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn('Error loading preferences, using defaults:', error);
  }
  return { ...DEFAULT_PREFERENCES };
}

/**
 * Save preferences to localStorage
 */
function savePreferences(preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving preferences:', error);
    return false;
  }
}

/**
 * Get current preferences from form inputs
 */
function getCurrentPreferences() {
  return {
    // Cache Preferences
    enableCache: document.getElementById('enable-cache').checked,
    cacheSearchHistory: document.getElementById('cache-search-history').checked,
    cachePreferences: document.getElementById('cache-preferences').checked,
    
    // Data Collection & Analytics
    analyticsCollection: document.getElementById('analytics-collection').checked,
    errorReporting: document.getElementById('error-reporting').checked,
    performanceMonitoring: document.getElementById('performance-monitoring').checked,
    
    // AI Model Training & Improvement
    aiTrainingConsent: document.getElementById('ai-training-consent').checked,
    featureImprovement: document.getElementById('feature-improvement').checked,
    researchParticipation: document.getElementById('research-participation').checked,
    
    // Privacy & Security
    dataEncryption: document.getElementById('data-encryption').checked,
    thirdPartySharing: document.getElementById('third-party-sharing').checked,
    marketingCommunications: document.getElementById('marketing-communications').checked,
    
    // Data Retention
    retentionPeriod: document.getElementById('retention-period').value,
    autoCleanup: document.getElementById('auto-cleanup').checked
  };
}

/**
 * Apply preferences to form inputs
 */
function applyPreferences(preferences) {
  // Cache Preferences
  document.getElementById('enable-cache').checked = preferences.enableCache;
  document.getElementById('cache-search-history').checked = preferences.cacheSearchHistory;
  document.getElementById('cache-preferences').checked = preferences.cachePreferences;
  
  // Data Collection & Analytics
  document.getElementById('analytics-collection').checked = preferences.analyticsCollection;
  document.getElementById('error-reporting').checked = preferences.errorReporting;
  document.getElementById('performance-monitoring').checked = preferences.performanceMonitoring;
  
  // AI Model Training & Improvement
  document.getElementById('ai-training-consent').checked = preferences.aiTrainingConsent;
  document.getElementById('feature-improvement').checked = preferences.featureImprovement;
  document.getElementById('research-participation').checked = preferences.researchParticipation;
  
  // Privacy & Security
  document.getElementById('data-encryption').checked = preferences.dataEncryption;
  document.getElementById('third-party-sharing').checked = preferences.thirdPartySharing;
  document.getElementById('marketing-communications').checked = preferences.marketingCommunications;
  
  // Data Retention
  document.getElementById('retention-period').value = preferences.retentionPeriod;
  document.getElementById('auto-cleanup').checked = preferences.autoCleanup;
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
  // Remove any existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

/**
 * Handle save preferences
 */
function handleSavePreferences() {
  const preferences = getCurrentPreferences();
  
  if (savePreferences(preferences)) {
    showNotification('Preferences saved successfully!', 'success');
    
    // Optional: Send preferences to server
    // This would be where you'd make an API call to save to your backend
    console.log('Saved preferences:', preferences);
  } else {
    showNotification('Error saving preferences. Please try again.', 'error');
  }
}

/**
 * Handle reset to defaults
 */
function handleResetDefaults() {
  if (confirm('Are you sure you want to reset all preferences to their default values? This action cannot be undone.')) {
    applyPreferences(DEFAULT_PREFERENCES);
    
    // Save defaults to localStorage
    if (savePreferences(DEFAULT_PREFERENCES)) {
      showNotification('Preferences reset to defaults successfully!', 'success');
    } else {
      showNotification('Error resetting preferences. Please try again.', 'error');
    }
  }
}

/**
 * Add smooth scroll animations to sections
 */
function addSmoothScrollAnimations() {
  const sections = document.querySelectorAll('.control-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

/**
 * Initialize the Data Controls page
 */
function initializeDataControls() {
  // Load and apply saved preferences
  const preferences = loadPreferences();
  applyPreferences(preferences);
  
  // Add event listeners
  document.getElementById('save-preferences').addEventListener('click', handleSavePreferences);
  document.getElementById('reset-defaults').addEventListener('click', handleResetDefaults);
  
  // Add smooth scroll animations
  addSmoothScrollAnimations();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 's':
          e.preventDefault();
          handleSavePreferences();
          break;
        case 'r':
          e.preventDefault();
          handleResetDefaults();
          break;
      }
    }
  });
  
  console.log('Data Controls page initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDataControls);
} else {
  initializeDataControls();
}

// Export functions for testing or external use
window.DataControls = {
  loadPreferences,
  savePreferences,
  getCurrentPreferences,
  applyPreferences,
  DEFAULT_PREFERENCES
};
