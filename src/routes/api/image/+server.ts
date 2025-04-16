import { json } from "@sveltejs/kit";
import { getDb } from '$lib/server/db';

export const GET = async ({ url }) => {
    const id = parseInt(url.searchParams.get('id'));
    const db = getDb();
    const image = await db.collection('images').findOne({ id: id });
    return json(image);
};