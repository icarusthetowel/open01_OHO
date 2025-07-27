// account.js - Account management functionality
function loadAccount(){
  const accountData = StorageManager.loadAccountData();
  if(accountData) {
    document.getElementById('account-name').value = accountData.name || '';
    document.getElementById('account-email').value = accountData.email || '';
  }
}

function initializeAccount() {
  const accountForm = document.getElementById('account-form');
  
  accountForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('account-name').value.trim();
    const email = document.getElementById('account-email').value.trim();
    const password = document.getElementById('account-password').value.trim();
    
    if(!name || !email || !password) {
      alert('Fill all fields');
      return;
    }
    
    StorageManager.saveAccount({
      name: name,
      email: email,
      password: password
    });
    
    alert('Account saved!');
  });
}

// Export functions for global access
window.loadAccount = loadAccount;
window.initializeAccount = initializeAccount;
