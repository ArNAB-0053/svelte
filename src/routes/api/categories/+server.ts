import { json } from '@sveltejs/kit';
import db from '$lib/server/db';

export const GET = async ({url}) => {
    const limit = parseInt(url.searchParams.get('limit') || '10'); // default 10
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const categories = await db.collection('categories').find().skip(skip).limit(limit).toArray();
    return json(categories);
};

export const POST = async ({ request }) => {
    const { image } = await request.json();
    const result = await db.collection('categories').insertOne(image);
    return json(result);
};
