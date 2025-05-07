import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const POST = async ({ request }) => {
    const { username } = await request.json();

    if (!username) {
        return json({ error: 'Username is required' }, { status: 400 });
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!usernameRegex.test(username)) {
        return json(
            { error: 'Username can only contain letters, numbers, underscores, dots, or hyphens' },
            { status: 400 }
        );
    }

    const db = getDb();
    const existingUser = await db.collection('users').findOne({ username });

    if (existingUser) {
        return json({ available: false }, { status: 200 });
    }

    return json({ available: true }, { status: 200 });
};