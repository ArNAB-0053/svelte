import { startMongo } from '$lib/server/db';

let mongoStarted = false;

export async function handle({ event, resolve }) {
	if (!mongoStarted) {
		try {
			await startMongo();
			mongoStarted = true;
		} catch (error) {
			console.error('❌ Failed to connect to MongoDB:', error);
		}
	}

	return resolve(event);
}
