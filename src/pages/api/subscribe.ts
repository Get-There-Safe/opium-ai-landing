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

    const response = await fetch('https://gmail.us9.list-manage.com/subscribe/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    // Check if the subscription was successful
    if (!response.ok) {
      return res.status(400).json({ error: 'Failed to subscribe' });
    }

    const text = await response.text();
    if (text.includes('already subscribed')) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}