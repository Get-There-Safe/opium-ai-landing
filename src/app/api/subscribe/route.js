// app/api/subscribe/route.js
import { NextResponse } from 'next/server';

const MAILCHIMP_FORM_URL = process.env.NEXT_PUBLIC_MAILCHIMP_FORM_URL;

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.length) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    try {
      const FORM_URL = MAILCHIMP_FORM_URL;

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
        { error: 'There was an error subscribing to the newsletter.' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'There was an error subscribing to the newsletter.' },
      { status: 500 }
    );
  }
}