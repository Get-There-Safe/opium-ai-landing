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

    // const MAILCHIMP_FORM_URL = process.env.NEXT_PUBLIC_MAILCHIMP_FORM_URL;

    const data = {
      email_address: email,
      status: 'subscribed',
    };

    const FORM_URL = "https://gmail.us9.list-manage.com/subscribe/post?u=c02fd1fa78b04cfac7318bf05&amp;id=fdb22433db&amp;f_id=00dadce1f0";

    const response = await fetch(FORM_URL,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    if (response.status >= 400) {
      const { detail } = await response.json();
      return res.status(400).json({ error: detail });
    }

    return res.status(201).json({ error: null });
  } catch (error) {
    return res.status(500).json({ msg: `error processing req ${error}` });
  }
}