import { getDb } from "@/server/db";
import { json } from "@sveltejs/kit";

export async function GET ({url}) {
    const email = url.searchParams.get('email')
    
    const db = getDb();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
        return json({ message: "User not found" }, {status : 404});
    }
    
    return json(user)
}