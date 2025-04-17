
// Reference -> https://scriptraccoon.dev/blog/authentication-mongodb-sveltekit

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	first_name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	last_name: { type: String, required: true },
}, {timestamps: true})

export const UserModel = mongoose.model('User', UserSchema)
