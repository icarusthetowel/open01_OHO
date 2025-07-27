// notes.js - Notes management functionality
function displayNotes(){
  const list = document.getElementById('notes-list');
  const notes = StorageManager.loadNotes();
  
  if (!notes.length) {
    list.innerHTML = '<p>No notes yet.</p>';
  } else {
    list.innerHTML = notes.map((note, index) => 
      `<div class="note">
        <div class="note-title">${note.title}</div>
        <div class="note-content">${note.content}</div>
        <button class="delete-note" data-index="${index}">Delete</button>
      </div>`
    ).join('');
    
    // Attach delete handlers
    document.querySelectorAll('.delete-note').forEach(btn => {
      btn.onclick = () => {
        const index = +btn.dataset.index;
        const notes = StorageManager.loadNotes();
        notes.splice(index, 1);
        StorageManager.saveNotes(notes);
        displayNotes();
      };
    });
  }
}

function initializeNotes() {
  const noteForm = document.getElementById('new-note-form');
  
  noteForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    
    if(!title || !content) {
      alert('Fill both fields');
      return;
    }
    
    const notes = StorageManager.loadNotes();
    notes.push({title: title, content: content});
    StorageManager.saveNotes(notes);
    
    e.target.reset();
    displayNotes();
  });
}

// Export functions for global access
window.displayNotes = displayNotes;
window.initializeNotes = initializeNotes;
