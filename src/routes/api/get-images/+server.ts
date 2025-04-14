import { json } from '@sveltejs/kit';
import images from '../../../data/images.json';

export function GET() {
    return json(images);
}
