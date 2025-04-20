import { json } from "@sveltejs/kit";
import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';

export const GET = async ({ url }) => {
    const id = url.searchParams.get('id');
    const db = getDb();

    if (!id || !ObjectId.isValid(id)) {
        return new Response('Invalid or missing id', { status: 400 });
    }

    const image = await db.collection('images').findOne({ _id: new ObjectId(id) });

    if (!image) {
        return new Response('Image not found', { status: 404 });
    }

    return json(image);
};
