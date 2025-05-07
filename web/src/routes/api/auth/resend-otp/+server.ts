import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } from '$env/static/private';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: EMAIL_PORT === '465',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// Generate a 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const POST = async ({ request }) => {
    const { email } = await request.json();

    if (!email) {
        return json({ error: 'Email is required' }, { status: 400 });
    }

    const db = getDb();
    const pendingUser = await db.collection('pending_users').findOne({ email });

    if (!pendingUser) {
        return json({ error: 'No pending verification found for this email' }, { status: 404 });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update pending user with new OTP and reset createdAt for TTL
    await db.collection('pending_users').updateOne(
        { email },
        { $set: { otp, otpExpires, createdAt: new Date() } }
    );

    // Send OTP email
    const mailOptions = {
        from: `"Your App Name" <${EMAIL_USER}>`,
        to: email,
        subject: 'Your New OTP for Email Verification',
        html: `
            <h2>Hello, ${pendingUser.first_name}!</h2>
            <p>Your new OTP for email verification is:</p>
            <h3 style="font-size: 24px; color: #007bff;">${otp}</h3>
            <p>This code is valid for 10 minutes. Please enter it to verify your account.</p>
            <p>If you did not request this, please ignore this email.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return json({ message: 'New OTP sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return json({ error: 'Failed to send OTP email' }, { status: 500 });
    }
};