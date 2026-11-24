import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char] || char));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!emailRegex.test(email) || email.length > 254 || /[\r\n]/.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }
    if (!message || message.length > 10000) {
      return NextResponse.json({ error: 'Enter a message (up to 10,000 characters).' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT || '465');
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS;
    // Always deliver the original enquiry to the brand's support mailbox.
    // CONTACT_EMAIL can receive an additional copy, never replace the mailbox.
    const recipient = 'hello@unikmo.com';
    const copyRecipient = process.env.CONTACT_EMAIL?.trim().toLowerCase();
    const bcc = copyRecipient && copyRecipient !== recipient ? copyRecipient : undefined;

    // No unrelated email API fallback: never claim success if SMTP is unavailable.
    if (!host || !user || !pass || ![465, 587].includes(port)) {
      console.error('UNIKMO contact SMTP not configured');
      return NextResponse.json({ error: 'Message delivery is temporarily unavailable. Please try again later.' }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host, port, secure: port === 465, auth: { user, pass },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    });

    try {
      await transporter.sendMail({
        from: { name: 'UNIKMO Contact', address: user },
        to: recipient,
        ...(bcc ? { bcc } : {}),
        replyTo: email,
        subject: 'UNIKMO contact form message',
        text: `From: ${email}\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      });
      return NextResponse.json({ success: true });
    } catch (error: unknown) {
      const failure = error as { code?: unknown; responseCode?: unknown };
      const code = typeof failure?.code === 'string' ? failure.code : '';
      const responseCode = typeof failure?.responseCode === 'number' ? failure.responseCode : 0;
      console.error('UNIKMO contact SMTP rejected', {
        code: /^[A-Z_]{2,25}$/.test(code) ? code : 'UNKNOWN',
        responseCode,
      });
      return NextResponse.json({ error: 'Message could not be delivered. Please try again later.' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
