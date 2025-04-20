import { json } from '@sveltejs/kit';
import { getDb } from '@/server/db';

export async function GET({ url }) {
	const category = url.searchParams.get("category");

	if (!category) {
		return json({ error: "Category is required" }, { status: 400 });
	}
	const db = getDb();
	const images = await db.collection("images").find({
		categories: { $in: [category.toLowerCase()] }
	}).toArray();

	return json(images);
}