import type { NextApiRequest, NextApiResponse } from 'next';

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

    // Create form data with the extracted parameters
    const formData = new URLSearchParams({
      'u': 'c02fd1fa78b04cfac7318bf05',
      'id': 'fdb22433db',
      'f_id': '00dadce1f0',
      'EMAIL': email,
      'b_c02fd1fa78b04cfac7318bf05_fdb22433db': '', // Anti-bot field (must be empty)
    });

    console.log('Attempting to subscribe with data:', formData.toString());

    const response = await fetch('https://gmail.us9.list-manage.com/subscribe/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
      },
      redirect: 'follow',
      body: formData.toString(),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Check if the subscription was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Subscription failed:', errorText);
      return res.status(400).json({ 
        error: 'Failed to subscribe',
        details: errorText
      });
    }

    const text = await response.text();
    console.log('Response text:', text);

    if (text.includes('already subscribed')) {
      return res.status(400).json({ error: 'Email already subscribed' });
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