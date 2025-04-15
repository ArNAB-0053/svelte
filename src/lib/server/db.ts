import {MongoClient} from 'mongodb';
import { MONGO_URI, MONGO_DB_NAME } from '$env/static/private';

const client = new MongoClient(MONGO_URI)

export function startMongo() {
    console.log('Starting MongoDB...');
    return client.connect();
}

export default client.db(MONGO_DB_NAME || 'united');