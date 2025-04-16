import { fail, redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()

    if (!res.ok) {
      return fail(res.status, { message: data.message })
    }
    
    cookies.set('session', data.token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24
    })

    return {data}
    // throw redirect(302, '/')

  }
}
