import { json } from '@sveltejs/kit'
import { UserModel } from '$lib/server/models'
import bcrypt from 'bcryptjs'

export const POST = async ({ request }) => {
    const { name, email, password } = await request.json()
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        return json({ message: 'User already exists' }, { status: 409 })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })
        return json({ token: user._id.toString() }, { status: 201 })
    } catch (er) {
        console.log(er)
    }
}
