import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const POST = async ({ request }) => {
    const { email, otp, tempToken } = await request.json();

    if (!email || !otp || !tempToken) {
        // console.log('Missing required fields:', { email, otp, tempToken });
        return json({ error: 'Email, OTP, and temporary token are required' }, { status: 400 });
    }

    // Verify the temporary token
    try {
        jwt.verify(tempToken, JWT_SECRET);
    } catch (error) {
        // console.log('Invalid tempToken:', { email, error: error.message });
        return json({ error: 'Invalid or expired temporary token' }, { status: 401 });
    }

    const db = getDb();
    // console.log('Querying pending_users:', { email, otp: String(otp) });
    const pendingUser = await db.collection('pending_users').findOne({ email, otp: String(otp) });

    if (!pendingUser) {
        await db.collection('pending_users').findOne({ email });
        // console.log('OTP Verification Failed:', {
        //     email,
        //     receivedOTP: String(otp),
        //     storedOTP: emailMatch ? emailMatch.otp : 'No record',
        //     emailExists: !!emailMatch
        // });
        return json({ error: 'Invalid OTP or email' }, { status: 400 });
    }

    if (pendingUser.otpExpires < new Date()) {
        // console.log('OTP Expired:', { email, otpExpires: pendingUser.otpExpires });
        return json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Create user in the users collection
    const { first_name, last_name, username, password } = pendingUser;

    const users= {
        first_name,
        last_name,
        email,
        username,
        password,
        isVerified: true,
        createdAt: new Date()
    }
    await db.collection('users').insertOne(users);

    // Delete the pending user record
    await db.collection('pending_users').deleteOne({ email });

    // Generate a permanent JWT token
    const token = jwt.sign({ email, username, isVerified: true }, JWT_SECRET, { expiresIn: '1h' });

    // console.log('Verification Successful:', { email });
    return json(
        {
            message: 'Email verified successfully. User created.',
            token
        },
        { status: 200 }
    );
};