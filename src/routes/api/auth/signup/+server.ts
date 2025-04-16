import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const POST = async ({ request }) => {
	const { email, password } = await request.json();

	if (!email || !password) {
		return json({ error: 'Email and password required' }, { status: 400 });
	}

	const db = getDb();
	const existingUser = await db.collection('users').findOne({ email });

	if (existingUser) {
		return json({ error: 'User already exists' }, { status: 409 });
	}

	await db.collection('users').insertOne({ email, password });

	return json({ message: 'User created successfully' }, { status: 201 });
};
