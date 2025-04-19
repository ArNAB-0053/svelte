import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } from '$env/static/private';
import nodemailer from 'nodemailer';

// Nodemailer transporter config
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: EMAIL_PORT === '465', 
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const POST = async ({ request }) => {
    const { first_name, last_name, email, username, password } = await request.json();

    if (!first_name || !last_name || !email || !username || !password) {
        // console.log('Missing signup fields:', { first_name, last_name, email, username, password });
        return json({ error: 'All fields are required' }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // console.log('Invalid email format:', { email });
        return json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Username format validation
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!usernameRegex.test(username)) {
        // console.log('Invalid username format:', { username });
        return json(
            { error: 'Username can only contain letters, numbers, underscores, dots, or hyphens' },
            { status: 400 }
        );
    }

    const db = getDb();
    const existingUser = await db.collection('users').findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
        // console.log('User already exists:', { email, username });
        return json({ error: 'Email or username already exists' }, { status: 409 });
    }

    const existingPendingUser = await db.collection('pending_users').findOne({ email });
    if (existingPendingUser) {
        const tempToken = jwt.sign({ email, username }, JWT_SECRET, { expiresIn: '15m' });
        // console.log('Pending verification found, returning existing data:', { email, tempToken });
        return json(
            {
                message: 'Please verify your email with the OTP sent.',
                tempToken,
                email
            },
            { status: 201 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Storing pending user data
    const pendingUser = {
        first_name,
        last_name,
        email,
        username,
        password: hashedPassword,
        otp,
        otpExpires,
        createdAt: new Date()
    };
    await db.collection('pending_users').insertOne(pendingUser);
    // console.log('Stored pending user:', { email, otp, otpExpires });

    // Sending OTP email
    const mailOptions = {
        from: `"Your App Name" <${EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP for Email Verification',
        html: `
            <h2>Welcome, ${first_name}!</h2>
            <p>Your OTP for email verification is:</p>
            <h3 style="font-size: 24px; color: #007bff;">${otp}</h3>
            <p>This code is valid for 10 minutes. Please enter it to verify your account.</p>
            <p>If you did not sign up, please ignore this email.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        // console.error('Error sending OTP email:', error);
        return json({ error: 'Failed to send OTP email' }, { status: 500 });
    }

    // a temporary token for the signup session
    const tempToken = jwt.sign({ email, username }, JWT_SECRET, { expiresIn: '15m' });

    // console.log('Signup response:', { email, tempToken });
    return json(
        {
            message: 'Please verify your email with the OTP sent.',
            tempToken,
            email
        },
        { status: 201 }
    );
};