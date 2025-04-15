import { startMongo } from "@/server/db";

export async function handle({ event, resolve }) {
	try {
	  await startMongo();
	} catch (error) {
	  console.error('Failed to connect to MongoDB:', error);
	}
  
	return resolve(event);  
  }