const CLIENT_ID = '667860237728-i3qogfps37rluq1n39euuitvj0vc1ecr.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

// Function to get OAuth 2.0 access token
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN, // You might be using this if your token expired
      grant_type: 'refresh_token',  // Use 'refresh_token' if you're refreshing; otherwise use 'client_credentials' for non-user flow
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    return data.access_token;
  } else {
    throw new Error('Failed to get access token');
  }
};

// Function to call Google API with access token
const callGenerativeLanguageAPI = async () => {
  try {
    // Get the access token
    const accessToken = await getAccessToken();

    // Now call the API with the access token
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Use the obtained access token here
      },
      body: JSON.stringify({
        contents: [{ text: "Hi Doctor" }], // Your input message here
      }),
    });

    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the function
callGenerativeLanguageAPI();
