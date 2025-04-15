import { json } from '@sveltejs/kit';
import images from '../../../data/images.json';

export function GET({ url }) {
    const id = parseInt(url.searchParams.get('id')) 
    return json(images.find(image => image.id === id));
}
