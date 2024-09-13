const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer AIzaSyAjKyV_EA_A5TP_HWxFomQ9kkx6AIyJyEc', 
    },
    body: JSON.stringify({
      contents: [{ text: "Hi Doctor" }], 
    }),
  });

const data = await response.json();
console.log(data);