import { json } from '@sveltejs/kit';
import images from '../../../data/images.json';

export function GET({ url }) {
    const limit = parseInt(url.searchParams.get('limit')) || 10; 
    const skip = parseInt(url.searchParams.get('skip')) || 0;    

    const returnedImags = images.slice(skip, skip + limit);  

    return json(returnedImags);
}
