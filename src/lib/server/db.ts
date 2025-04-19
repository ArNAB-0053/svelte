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

        const db = client.db(MONGO_DB_NAME || 'united');
        try {
            try {
                await db.collection('pending_users').dropIndex('createdAt_1');
                // console.log('Dropped existing TTL index on pending_users.createdAt');
            } catch (error) {
                console.log('No existing TTL index to drop');
				throw error;
            }

            // TTL - Time to Live index with 1800 seconds (30 minutes)
            await db.collection('pending_users').createIndex(
                { createdAt: 1 },
                { expireAfterSeconds: 100 }
            );
            // console.log('TTL index created on pending_users.createdAt with 1800 seconds');
        } catch (error) {
            console.error('Error setting up TTL index:', error);
            throw error;
        }
    }
}

export function getDb() {
	if (!isConnected) {
		throw new Error('❌ MongoDB not connected. Call startMongo() first.');
	}
	return client.db(MONGO_DB_NAME || 'united');
}
