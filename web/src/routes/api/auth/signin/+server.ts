import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const POST = async ({ request }) => {
	const { identifier, password } = await request.json();

	// Validate input
	if (!identifier || !password) {
		return json(
			{ error: 'Identifier (email or username) and password are required' },
			{ status: 400 }
		);
	}

	const db = getDb();
	// Searching for user by email or username
	const user = await db.collection('users').findOne({
		$or: [{ email: identifier }, { username: identifier }]
	});

	if (!user) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	// Verify password
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	// JWT token
	const token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET, {
		expiresIn: '1h'
	});

	return json(
		{
			message: 'User logged in successfully',
			token
		},
		{ status: 200 }
	);
};
