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
const menuHome     = document.getElementById('menu-home'),
      menuMeal     = document.getElementById('menu-mealplans'),
      menuCal      = document.getElementById('menu-calorie'),
      menuRec      = document.getElementById('menu-recipes'),
      menuSave     = document.getElementById('menu-savedrecipes'),
      menuTasks    = document.getElementById('menu-tasks'),
      menuNotes    = document.getElementById('menu-notes'),
      menuAccount  = document.getElementById('menu-account'),
      sidebar      = document.querySelector('.sidebar'),
      toggle       = document.getElementById('sidebar-toggle'),
      abbrev       = document.getElementById('sidebar-abbrev');
function updateAbbrev() {
  if (sidebar.classList.contains('collapsed')) abbrev.style.display = 'block';
  else abbrev.style.display = 'none';
}
menuHome.onclick       = ()=>{ showSection('section-home'); setActive(menuHome); updateAbbrev(); };
menuMeal.onclick       = ()=>{ showSection('section-mealplans'); setActive(menuMeal); displayMealPlans(); updateAbbrev(); };
menuCal.onclick        = ()=>{ showSection('section-calorie'); setActive(menuCal); displayCalories(); updateAbbrev(); };
menuRec.onclick        = ()=>{ showSection('section-recipes'); setActive(menuRec); updateAbbrev(); };
menuSave.onclick       = ()=>{ showSection('section-savedrecipes'); setActive(menuSave); displaySavedRecipes(); updateAbbrev(); };
menuTasks.onclick      = ()=>{ showSection('section-tasks'); setActive(menuTasks); displayTasks(); updateAbbrev(); };
menuNotes.onclick      = ()=>{ showSection('section-notes'); setActive(menuNotes); displayNotes(); updateAbbrev(); };
menuAccount.onclick    = ()=>{ showSection('section-account'); setActive(menuAccount); loadAccount(); updateAbbrev(); };
function checkWidth(){
  window.innerWidth<=768 ? sidebar.classList.add('collapsed') : sidebar.classList.remove('collapsed');
  updateAbbrev();
}
window.addEventListener('resize',checkWidth);
window.addEventListener('load',()=>{
  checkWidth();
  menuHome.click();
});
toggle.addEventListener('click',()=>{
  sidebar.classList.toggle('collapsed');
  updateAbbrev();
});
document.querySelectorAll('.menu-item').forEach(it=>{
  it.addEventListener('click',()=>{
    if(window.innerWidth<=768) { sidebar.classList.add('collapsed'); updateAbbrev(); }
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
// -- Meal Plans --
function saveMealPlans(mp){ localStorage.setItem('mealPlans', JSON.stringify(mp)); }
function loadMealPlans(){ const m=localStorage.getItem('mealPlans'); return m?JSON.parse(m):[]; }
function displayMealPlans(){
  const list = document.getElementById('mealplan-list'), items = loadMealPlans();
  list.innerHTML = items.length
    ? items.map(m=>`<div class="mealplan-item"><strong>${m.date} – ${m.title}</strong><p>${m.desc}</p></div>`).join('')
    : '<p>No meal plans yet.</p>';
}
document.getElementById('mealplan-form').addEventListener('submit',e=>{
  e.preventDefault();
  const d=document.getElementById('mealplan-date').value,
        t=document.getElementById('mealplan-title').value.trim(),
        desc=document.getElementById('mealplan-description').value.trim();
  if(!d||!t||!desc){ alert('Fill all meal plan fields.'); return; }
  const arr=loadMealPlans(); arr.push({date:d,title:t,desc:desc}); saveMealPlans(arr);
  e.target.reset(); displayMealPlans();
});
// -- Calorie Counter --
function saveCalories(cl){ localStorage.setItem('calories', JSON.stringify(cl)); }
function loadCalories(){ const c=localStorage.getItem('calories'); return c?JSON.parse(c):[]; }
function displayCalories(){
  const log = document.getElementById('calorie-log'), arr = loadCalories();
  let total = arr.reduce((sum,i)=>sum+i.cals,0);
  if(!arr.length) log.innerHTML = '<p>No entries yet.</p>';
  else {
    log.innerHTML = arr.map(i=>`<div class="mealplan-item">${i.name}: ${i.cals} cal</div>`).join('') +
      `<p><strong>Total: ${total} cal</strong></p>`;
  }
}
document.getElementById('calorie-form').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('food-name').value.trim(),
        c=+document.getElementById('food-cals').value;
  if(!n||!c){ alert('Complete both fields.'); return; }
  const arr=loadCalories(); arr.push({name:n,cals:c}); saveCalories(arr);
  e.target.reset(); displayCalories();
});
document.getElementById('lookup-cals').addEventListener('click',async()=>{
  const food=document.getElementById('food-lookup').value.trim();
  if(!food){ alert('Enter a food to lookup.'); return; }
  const aiRes=await askAI(`How many calories are in 100g of ${food}?`);
  const match=aiRes.match(/(\d+)\s*cal/);
  const cals=match?+match[1]:NaN;
  if(isNaN(cals)){ alert('Could not parse calorie value.'); return; }
  const arr=loadCalories(); arr.push({name:food,cals:cals}); saveCalories(arr);
  document.getElementById('food-lookup').value=''; displayCalories();
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
