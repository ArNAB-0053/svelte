import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const GET = async ({ url }) => {
	const query = url.searchParams.get('q');
	const db = getDb();

	if (!query) {
		return new Response('Missing search query', { status: 400 });
	}

	// Case-insensitive, partial match using RegExp
	const images = await db.collection('images').find({
		title: { $regex: query, $options: 'i' }
	}).toArray();

	return json(images);
};
