import { json } from '@sveltejs/kit'
import { UserModel } from '$lib/server/models'
import bcrypt from 'bcryptjs'

export const POST = async ({ request }) => {
  const { email, password } = await request.json()
  const user = await UserModel.findOne({ email })
  if (!user) {
    return json({ message: 'Invalid credentials' }, { status: 401 })
  }
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return json({ message: 'Invalid credentials' }, { status: 401 })
  }
  return json({ token: user._id.toString() })
}
