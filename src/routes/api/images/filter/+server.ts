import { json } from '@sveltejs/kit';
import { getDb } from '@/server/db';

export async function GET({ url }) {
	const category = url.searchParams.get("category");

	const limit = parseInt(url.searchParams.get('limit') || '10'); 
	const skip = parseInt(url.searchParams.get('skip') || '0');

	const db = getDb();

	if (!category) {
		return json({ error: "Category is required" }, { status: 400 });
	}

	if(category === 'all') {
		return json(await db.collection('images').find().skip(skip).limit(limit).toArray())
	}

	const images = await db.collection("images").find({
		categories: { $in: [category.toLowerCase()] }
	}).skip(skip).limit(limit).toArray();

	return json(images);
}