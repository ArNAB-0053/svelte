import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import { UserModel } from '@/server/models';
import { JWT_SECRET } from '$env/static/private';

// export const POST = async ({ request }) => {
// 	const { first_name, last_name, email, username,password } = await request.json();
// 	if (!first_name || !last_name || !email || !username || !password) {
// 		return json({ error: 'Email and password required' }, { status: 400 });
// 	}

// 	const db = getDb();
// 	const existingUser = await db.collection('users').findOne({ email });

// 	if (existingUser) {
// 		return json({ error: 'User already exists' }, { status: 409 });
// 	}

// 	const hashedPassword = await bcrypt.hash(password, 10);

// 	await db.collection('users').insertOne({ first_name, last_name, email, username, hashedPassword });
// 	return json({ message: 'User created successfully' }, { status: 201 });
// };


export const POST = async ({ request }) => {
	const { first_name, last_name, email, username, password } = await request.json();
	if (!first_name || !last_name || !email || !username || !password) {
		return json({ error: 'Email and password required' }, { status: 400 });
	}

	const db = getDb();
	const existingUser = await db.collection('users').findOne({ email });

	if (existingUser) {
		return json({ error: 'User already exists' }, { status: 409 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	// const hashedPassword = password;
	await db.collection('users').insertOne({ first_name, last_name, email, username, password: hashedPassword });

	const token = jwt.sign({ email, username }, JWT_SECRET, { expiresIn: '1h' });

	return json({ message: 'User created successfully', token }, { status: 201 });
};
