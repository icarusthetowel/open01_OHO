// forms.js - Form handling functionality
function initializeForms() {
  initializeHomeSearch();
  initializeContactForm();
  initializeRecipeForm();
  initializeAuthForms();
}

function initializeHomeSearch() {
  const homeSearchForm = document.getElementById('home-search-form');
  
  homeSearchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const prompt = document.getElementById('home-search-input').value.trim();
    const output = document.getElementById('home-ai-response');
    
    if (!output.classList.contains('active')) {
      output.classList.add('active');
    }
    
    const responseDiv = document.createElement('div');
    responseDiv.className = 'ai-response-item';
    
    const question = document.createElement('div');
    question.style.fontWeight = 'bold';
    question.style.marginBottom = '8px';
    question.textContent = 'Q: ' + prompt;
    responseDiv.appendChild(question);
    
    const answer = document.createElement('div');
    answer.textContent = 'A: Thinking…';
    responseDiv.appendChild(answer);
    
    output.insertBefore(responseDiv, output.firstChild);
    
    try {
      answer.textContent = 'A: ' + await askAI(prompt);
    } catch(err) {
      answer.textContent = 'Error: ' + err.message;
    }
    
    e.target.reset();
  });
}

function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    
    if (!name || !email) {
      alert('Please fill in both name and email fields.');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Build Google Form URL with pre-filled data
    const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdWgIaOL-iYaemjbxisVdpWAT2QoFjtsDp6zdKD_hg-S9p1ew/viewform';
    const params = new URLSearchParams({
      'usp': 'pp_url',
      'entry.2005620554': name,
      'entry.1045781291': email
    });
    
    // Open Google Form in new tab with pre-filled data
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
    
    // Reset form
    e.target.reset();
  });
}

function initializeRecipeForm() {
  const getRecipeBtn = document.getElementById('get-recipe');
  
  getRecipeBtn.addEventListener('click', async () => {
    const query = document.getElementById('recipe-query').value.trim();
    if(!query) {
      alert('Enter a query');
      return;
    }
    
    const resultDiv = document.getElementById('recipe-result');
    resultDiv.textContent = 'Thinking…';
    
    try {
      const answer = await askAI(`Provide a detailed recipe for: ${query}`);
      resultDiv.textContent = answer;
    } catch(err) {
      resultDiv.textContent = 'Error: ' + err.message;
    }
  });
}

function initializeAuthForms() {
  document.addEventListener('DOMContentLoaded', function() {
    // Signup form handling
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(signupForm);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password !== confirmPassword) {
          alert('Passwords do not match. Please try again.');
          return;
        }
        
        // Here you would typically send the data to your server
        console.log('Signup form submitted:', Object.fromEntries(formData));
        alert('Account created successfully! Please check your email for verification.');
        
        // Optionally redirect to login page
        showSection('section-login');
        scrollToTop();
      });
    }
    
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        
        // Here you would typically send the data to your server for authentication
        console.log('Login form submitted:', Object.fromEntries(formData));
        alert('Login successful! Welcome back.');
        
        // Optionally redirect to home page
        showSection('section-home');
        setActive(menuHome);
        scrollToTop();
      });
    }
  });
}

// Export functions for global access
window.initializeForms = initializeForms;
