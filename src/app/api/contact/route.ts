import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Configure Nodemailer transporter using existing environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, 
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"HotelChap Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'support@hotelchap.com', // Send directly to the support email
      replyTo: email, // So when they hit reply, it goes to the user who filled the form
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #673AB7; border-bottom: 2px solid #673AB7; padding-bottom: 10px;">New Contact Message</h2>
          <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6; margin: 0;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">This message was sent from the HotelChap Contact Us page.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
