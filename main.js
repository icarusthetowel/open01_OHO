// main.js - extracted from index.html
// -- API helper --
let API_KEY = null;
async function getApiKey() {
  if (API_KEY) return API_KEY;
  const res = await fetch('api/config.php', {
    method: 'POST',
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  });
  const json = await res.json();
  if (json.key) {
    API_KEY = json.key;
    return API_KEY;
  } else {
    throw new Error('API key not available');
  }
}
async function askAI(prompt) {
  const key = await getApiKey();
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${key}`
    },
    body: JSON.stringify({
      model:'gpt-3.5-turbo',
      messages:[{role:'user',content:prompt}]
    })
  });
  const json = await res.json();
  return json.choices[0].message.content;
}
// -- Navigation & Sidebar Collapse --
function showSection(id) {
  document.querySelectorAll('.section').forEach(s=>s.style.display='none');
  const el = document.getElementById(id);
  el.style.display = el.classList.contains('homepage') ? 'flex' : 'block';
}
function setActive(item) {
  document.querySelectorAll('.menu-item').forEach(i=>i.classList.remove('active'));
  item.classList.add('active');
}
const menuHome     = document.getElementById('menu-section-home'),
      menuMeal     = document.getElementById('menu-section-mealplans'),
      menuCal      = document.getElementById('menu-section-calorie'),
      menuRec      = document.getElementById('menu-section-recipes'),
      menuSave     = document.getElementById('menu-section-savedrecipes'),
      menuTasks    = document.getElementById('menu-section-tasks'),
      menuNotes    = document.getElementById('menu-section-notes'),
      menuAccount  = document.getElementById('menu-section-account'),
      sidebar      = document.querySelector('.sidebar'),
      toggle       = document.getElementById('sidebar-toggle'),
      abbrev       = document.getElementById('sidebar-abbrev');
function updateAbbrev() {
  if (sidebar.classList.contains('collapsed')) abbrev.style.display = 'block';
  else abbrev.style.display = 'none';
}
menuHome.onclick       = ()=>{ showSection('section-home'); setActive(menuHome); updateAbbrev(); scrollToTop(); };
menuMeal.onclick       = ()=>{ showSection('section-mealplans'); setActive(menuMeal); displayMealPlans(); updateAbbrev(); scrollToTop(); };
menuCal.onclick        = ()=>{ showSection('section-calorie'); setActive(menuCal); updateAbbrev(); scrollToTop(); };
menuRec.onclick        = ()=>{ showSection('section-recipes'); setActive(menuRec); updateAbbrev(); scrollToTop(); };
menuSave.onclick       = ()=>{ showSection('section-savedrecipes'); setActive(menuSave); displaySavedRecipes(); updateAbbrev(); scrollToTop(); };
menuTasks.onclick      = ()=>{ showSection('section-tasks'); setActive(menuTasks); displayTasks(); updateAbbrev(); scrollToTop(); };
menuNotes.onclick      = ()=>{ showSection('section-notes'); setActive(menuNotes); displayNotes(); updateAbbrev(); scrollToTop(); };
menuAccount.onclick    = ()=>{ showSection('section-account'); setActive(menuAccount); loadAccount(); updateAbbrev(); scrollToTop(); };
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
window.addEventListener('resize',checkWidth);
window.addEventListener('load',()=>{
  checkWidth();
  menuHome.click();
});
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
document.querySelectorAll('.menu-item').forEach(it=>{
  it.addEventListener('click',()=>{
    if(window.innerWidth<=768) {
      sidebar.classList.add('collapsed');
      document.body.classList.remove('sidebar-open');
      updateAbbrev();
    }
  });
});
// -- Home AI Search --
document.getElementById('home-search-form').addEventListener('submit',async e=>{
  e.preventDefault();
  const prompt = document.getElementById('home-search-input').value.trim();
  const out = document.getElementById('home-ai-response');
  if (!out.classList.contains('active')) out.classList.add('active');
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
  out.insertBefore(responseDiv, out.firstChild);
  try {
    answer.textContent = 'A: ' + await askAI(prompt);
  } catch(err) {
    answer.textContent = 'Error: ' + err.message;
  }
  e.target.reset();
});

// -- Contact Form --
document.getElementById('contact-form').addEventListener('submit', e => {
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
    'entry.2005620554': name,  // You may need to adjust these entry IDs based on your form
    'entry.1045781291': email
  });
  
  // Open Google Form in new tab with pre-filled data
  window.open(`${baseUrl}?${params.toString()}`, '_blank');
  
  // Reset form
  e.target.reset();
});
// -- Recipes & Saved Recipes --
function saveRecipes(r){ localStorage.setItem('recipes', JSON.stringify(r)); }
function loadRecipes(){ const r=localStorage.getItem('recipes'); return r?JSON.parse(r):[]; }
function displaySavedRecipes(){
  const list = document.getElementById('savedrecipes-list'), arr = loadRecipes();
  list.innerHTML = arr.length
    ? arr.map(r=>`<div class="mealplan-item"><strong>${r.query}</strong><pre>${r.recipe}</pre></div>`).join('')
    : '<p>No saved recipes.</p>';
}
document.getElementById('get-recipe').addEventListener('click',async()=>{
  const q=document.getElementById('recipe-query').value.trim();
  if(!q){ alert('Enter a query'); return; }
  const resDiv=document.getElementById('recipe-result');
  resDiv.textContent='Thinking…';
  const ans=await askAI(`Provide a detailed recipe for: ${q}`);
  resDiv.textContent=ans;
  const btn=document.getElementById('save-recipe');
  btn.style.display='inline-block'; btn.dataset.q=q;
});
document.getElementById('save-recipe').addEventListener('click',()=>{
  const btn=document.getElementById('save-recipe'),
        q=btn.dataset.q, rec=document.getElementById('recipe-result').textContent;
  const arr=loadRecipes(); arr.push({query:q,recipe:rec}); saveRecipes(arr);
  alert('Recipe saved!'); btn.style.display='none';
});
// -- Task List --
function saveTasks(ts){ localStorage.setItem('tasks', JSON.stringify(ts)); }
function loadTasks(){ const t=localStorage.getItem('tasks'); return t?JSON.parse(t):[]; }
function displayTasks(){
  const list = document.getElementById('task-list'), arr = loadTasks();
  if(!arr.length) list.innerHTML = '<p>No tasks yet.</p>';
  else list.innerHTML = arr.map(t => `<div class="mealplan-item">${t}</div>`).join('');
}
document.getElementById('task-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('task-input'), val = input.value.trim();
  if(!val) return;
  const arr = loadTasks(); arr.push(val); saveTasks(arr);
  input.value = ''; displayTasks();
});
// -- Notes --
function saveNotes(n){ localStorage.setItem('notes', JSON.stringify(n)); }
function loadNotes(){ const n=localStorage.getItem('notes'); return n?JSON.parse(n):[]; }
function displayNotes(){
  const list=document.getElementById('notes-list'), arr=loadNotes();
  list.innerHTML = arr.length
    ? arr.map((m,i)=>`<div class="note"><div class="note-title">${m.title}</div><div class="note-content">${m.content}</div><button class="delete-note" data-index="${i}">Delete</button></div>`).join('')
    : '<p>No notes yet.</p>';
  document.querySelectorAll('.delete-note').forEach(btn=>{
    btn.onclick=()=>{const i=+btn.dataset.index, a=loadNotes(); a.splice(i,1); saveNotes(a); displayNotes();};
  });
}
document.getElementById('new-note-form').addEventListener('submit',e=>{
  e.preventDefault();
  const t=document.getElementById('note-title').value.trim(),
        c=document.getElementById('note-content').value.trim();
  if(!t||!c){ alert('Fill both fields'); return; }
  const arr=loadNotes(); arr.push({title:t,content:c}); saveNotes(arr);
  e.target.reset(); displayNotes();
});
// -- Account --
function saveAccount(a){ localStorage.setItem('account', JSON.stringify(a)); }
function loadAccount(){
  const a=localStorage.getItem('account');
  if(a){ const ad=JSON.parse(a); document.getElementById('account-name').value=ad.name||''; document.getElementById('account-email').value=ad.email||''; }
}
document.getElementById('account-form').addEventListener('submit', e=>{
  e.preventDefault();
  const n=document.getElementById('account-name').value.trim(),
        em=document.getElementById('account-email').value.trim(),
        pw=document.getElementById('account-password').value.trim();
  if(!n||!em||!pw){ alert('Fill all fields'); return; }
  saveAccount({name:n,email:em,password:pw});
  alert('Account saved!');
});
// Sidebar collapse button functionality
const collapseBtn = document.getElementById('sidebar-collapse-btn');
collapseBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  collapseBtn.innerHTML = sidebar.classList.contains('collapsed') ? '&#x25B6;' : '&#x25C0;';
});
function updateCollapseBtnIcon() {
  collapseBtn.innerHTML = sidebar.classList.contains('collapsed') ? '&#x25B6;' : '&#x25C0;';
}
window.addEventListener('resize', updateCollapseBtnIcon);
window.addEventListener('load', updateCollapseBtnIcon);
// Theme toggle functionality (no localStorage, default light)
(function() {
  function setTheme(dark) {
    if (dark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
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
})();
// -- Scroll to Top Function --
function scrollToTop() {
  // Scroll the main content area to the top
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
  // Also scroll the window to the top as a fallback
  window.scrollTo(0, 0);
}
