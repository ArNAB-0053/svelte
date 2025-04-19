import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '$env/static/private';

export const POST = async ({ request }) => {
	const { first_name, last_name, email, username, password } = await request.json();

	if (!first_name || !last_name || !email || !username || !password) {
		return json({ error: 'All fields are required' }, { status: 400 });
	}

	// Email format validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return json({ error: 'Invalid email format' }, { status: 400 });
	}

	// Username format validation
	/*
		Numbers (0-9)
		English letters (a-z, A-Z)
		Underscore (_)
		Dot (.)
		Hyphen (-)
	*/
	const usernameRegex = /^[a-zA-Z0-9_.-]+$/;

	if (!usernameRegex.test(username)) {
		return json(
			{ error: 'Username can only contain letters, numbers, underscores, dots, or hyphens' },
			{ status: 400 }
		);
	}

	const db = getDb();
	const existingUser = await db.collection('users').findOne({ email });

	if (existingUser) {
		return json({ error: 'User already exists' }, { status: 409 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	await db
		.collection('users')
		.insertOne({ first_name, last_name, email, username, password: hashedPassword });

	const token = jwt.sign({ email, username }, JWT_SECRET, { expiresIn: '1h' });

	return json({ message: 'User created successfully', token }, { status: 201 });
};
