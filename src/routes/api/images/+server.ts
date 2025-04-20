import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const GET = async ({url}) => {
	const limit = parseInt(url.searchParams.get('limit') || '10'); // default 10
	const skip = parseInt(url.searchParams.get('skip') || '0');
	const db = getDb();
	const images = await db.collection('images').find().skip(skip).limit(limit).toArray();
	return json(images);
};

export const POST = async ({ request }) => {
	const { image } = await request.json();
	const db = getDb();

	const imageWithTimestamp = {
		...image,
		created_at: new Date() // Adds timestamp in ISO format
	};

	const result = await db.collection('images').insertOne(imageWithTimestamp);
	return json(result);
};

