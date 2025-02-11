import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || !email.length) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate subscriber hash for idempotency
    const subscriberHash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    // Your Mailchimp datacenter is 'us9' based on your URL
    const DC = 'us9';
    const LIST_ID = 'fdb22433db';
    
    // You'll need to add this to your environment variables
    const API_KEY = process.env.MAILCHIMP_API_KEY;

    if (!API_KEY) {
      throw new Error('MAILCHIMP_API_KEY is not set');
    }

    console.log('Attempting to subscribe:', email);

    const response = await fetch(
      `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}`,
      {
        method: 'PUT', // Using PUT for upsert
        headers: {
          'Authorization': `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: 'subscribed',
          status: 'subscribed'
        }),
      }
    );

    const data = await response.json();
    console.log('Mailchimp API response:', data);

    if (!response.ok) {
      return res.status(400).json({ 
        error: 'Failed to subscribe',
        details: data.detail || 'Unknown error'
      });
    }

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}