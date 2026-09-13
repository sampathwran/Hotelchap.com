import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, 
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"HotelChap" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to HotelChap! Unlocked Secret Deals Inside 🤫',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 10px;">
          <div style="text-align: center; padding-bottom: 20px;">
            <h1 style="color: #673AB7; margin: 0;">HotelChap.</h1>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h2 style="color: #1f2937; margin-top: 0;">Welcome to the Club! 🎉</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">Hi there,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">Thank you for subscribing to HotelChap! You're now officially on the list to receive our secret deals, member-only prices, and hand-picked travel inspiration sent straight to your inbox.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">Get ready to discover your perfect stay, flight, or rental car at the absolute best prices.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.hotelchap.com" style="background-color: #673AB7; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Start Exploring</a>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 0;">Happy Travels,<br/><strong>The HotelChap Team</strong></p>
          </div>
          <div style="text-align: center; padding-top: 20px; font-size: 12px; color: #9ca3af;">
            <p>© ${new Date().getFullYear()} HotelChap. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
