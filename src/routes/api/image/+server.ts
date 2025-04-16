import { json } from "@sveltejs/kit";
import db from '$lib/server/db';

export const GET = async ({ url }) => {
    const id = parseInt(url.searchParams.get('id'));
    const image = await db.collection('images').findOne({ id: id });
    return json(image);
};