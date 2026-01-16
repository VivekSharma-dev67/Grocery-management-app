import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'fullName']) 
    const user = await User.create({
      ...data,
    })

    const token = await User.accessTokens.create(user)

    return response.ok({
      type: 'bearer',
      token: token.value!.release(),  
      expires_at: token.expiresAt,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findBy('email', email)

    if(!user){
        return response.unauthorized({ message: "Email is not found"})
    }

    const isValid = await hash.verify(user.password, password)

    if(!isValid){
        return response.unauthorized({message: "Invalid Password"})
    }

    const token = await User.accessTokens.create(user)

    return response.ok({
      type: 'bearer',
      token: token.value!.release(),  
      expires_at: token.expiresAt,
      user:user
    })
  }


async logout({ auth, response }: HttpContext) {
  const user = auth.getUserOrFail()  

  if (!user.currentAccessToken) {
    return response.ok({ message: 'Already logged out or invalid token' })
  }

  const tokenId = user.currentAccessToken.identifier
  await User.accessTokens.delete(user, tokenId)

  return response.ok({ message: 'Logged out successfully' })
}
  async me({ auth,response }: HttpContext) {
      const user = auth.getUserOrFail()     
      console.log(auth.user);
  return response.json({
    message: "User is authenticated",
    data: user,
  })
}
}