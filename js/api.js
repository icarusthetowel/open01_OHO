// api.js - API handling and AI functionality
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

// Export functions for global access
window.getApiKey = getApiKey;
window.askAI = askAI;
