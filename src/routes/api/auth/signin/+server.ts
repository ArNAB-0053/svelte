import { error, json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const POST = async ({ request }) => {
  const { email, username, password } = await request.json();
  if (!email || !username || !password) {
    return json({ error: 'Email and password required' }, { status: 400 });
  }

  const db = getDb();
  const user = await db.collection('users').findOne({ email });
  // console.log(user)
  // console.log(user?._id)
  // console.log(user?.first_name)
  // console.log(user?.last_name)
  // console.log(user?.email)
  // console.log(user?.username)
  // console.log(user?.password)

  if (!user) {
    return json({ error: "User not found" }, { status: 404 });
  }

  // const isMatch = password === user?.password;

  // console.log("pass: " + password + " || " + "user pass: " + user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return json({ error: "Invalid credentials" }, { status: 404 });
  }

  const token = jwt.sign({ email, username }, JWT_SECRET, { expiresIn: '1h' });
  // await db.collection('users').insertOne({ email, username, password });
  return json(
    {
      message: 'User logged in successfully',
      token
    },
    { status: 201 });
};
