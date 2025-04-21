import { json } from '@sveltejs/kit';
import { getDb } from '@/server/db';

export async function GET({ url }) {
    // const newi = url.searchParams.get("n");

    const limit = parseInt(url.searchParams.get('limit') || '10'); 
    // const skip = parseInt(url.searchParams.get('skip') || '0');

    const db = getDb();

    // if (!newi) {
    //     return json({ error: "Category is required" }, { status: 400 });
    // }

    // if(new === 'all') {
    //     return json(await db.collection('images').find().skip(skip).limit(limit).toArray())
    // }

    const images = await db.collection("images").find({}, { sort: { created_at: -1 }, limit: limit }).toArray();

    return json(images);
}