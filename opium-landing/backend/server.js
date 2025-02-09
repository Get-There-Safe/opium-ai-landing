const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

// Initialize Express app
const app = express();
const port = 5001;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Mailchimp setup (replace with your API Key and Server prefix)
mailchimp.setConfig({
  apiKey: 'ec6a8721511bf7e3291e095fec7d282d-us10', // Replace with your Mailchimp API key
  server: 'us10', // Replace with your Mailchimp server prefix (e.g., 'us19')
});

// POST route for subscribing emails
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  try {
    // Add email to Mailchimp list (replace with your Mailchimp list ID)
    const response = await mailchimp.lists.addListMember('your-list-id', {
      email_address: email,
      status: 'subscribed',
    });

    res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Error subscribing to Mailchimp:', error);
    res.status(500).json({ message: 'Error subscribing to Mailchimp' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
