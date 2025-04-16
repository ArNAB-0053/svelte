// src/lib/server/db.ts
import { MongoClient } from 'mongodb';
import { MONGO_URI, MONGO_DB_NAME } from '$env/static/private';

const client = new MongoClient(MONGO_URI);

let isConnected = false;

export async function startMongo() {
	if (!isConnected) {
		console.log('⏳ Connecting to MongoDB...');
		await client.connect();
		isConnected = true;
		console.log('✅ MongoDB connected');
	}
}

export function getDb() {
	if (!isConnected) {
		throw new Error('❌ MongoDB not connected. Call startMongo() first.');
	}
	return client.db(MONGO_DB_NAME || 'united');
}
