// app/api/subscribe/route.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAILCHIMP_FORM_URL = process.env.NEXT_PUBLIC_MAILCHIMP_FORM_URL;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.length) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
      const FORM_URL = "https://gmail.us9.list-manage.com/subscribe/post?u=c02fd1fa78b04cfac7318bf05&amp;id=fdb22433db&amp;f_id=00dadce1f0";

      if(!FORM_URL) {
        throw new Error('Form URL Key Missing')
      }

      const data = {
        email_address: email,
        status: 'subscribed',
      };

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
        const text = await response.text();
        throw new Error(text);
      }

      return NextResponse.json(
        { message: 'Success! You are now subscribed.' },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: `There was an error subscribing to the newsletter. ${JSON.stringify(error)}` },
        { status: 500 }
      );
    }
}