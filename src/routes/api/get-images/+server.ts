import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { start_mongo } from '../../../db/mongo';
// import { ImagesSchema } from '../../../db/models/imagesSchema';
import images from '../../../data/images.json';

export function GET({ url }) {
    const limit = parseInt(url.searchParams.get('limit')) || 10; 
    const skip = parseInt(url.searchParams.get('skip')) || 0;    

    const returnedImags = images.slice(skip, skip + limit);  

    return json(returnedImags);
}

// export async function GET({ url }: RequestEvent) {
//     const limit = parseInt(url.searchParams.get('limit')) || 10;
//     const skip = parseInt(url.searchParams.get('skip')) || 0;

//     await start_mongo();
//     const returnedImags = await ImagesSchema.find().skip(skip).limit(limit).exec();
//     return json(returnedImags);
// }
