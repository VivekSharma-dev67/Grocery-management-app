import type { HttpContext } from '@adonisjs/core/http'
import { createAddressValidator } from '../validators/address.js'
import AddressService from '#services/address_service'

export default class AddressController {
  async store({ params, request, response }: HttpContext) {
  const userId = Number(params.userId)
  if (isNaN(userId)) return response.badRequest({ error: 'Invalid userId' })

  try {
    const payload = await request.validateUsing(createAddressValidator)
    
    const addressService = new AddressService()
    const address = await addressService.createAddress(userId, payload)

    return response.created({
      message: 'Address added successfully',
      data: address
    })
  } catch (error) {
    if (error.status === 422) {
      return response.unprocessableEntity({
        error: 'Validation failed',
        details: error.messages
      })
    }
    console.error(error)
    return response.internalServerError({ error: 'Something went wrong' })
  }
}

public async showAddress({ params, response }: HttpContext){
  const userId = Number(params.userId)
  if (isNaN(userId)) return response.badRequest({ error: 'Invalid userId' })

  try{

    const addressService = new AddressService()
    const address = await addressService.showAddress(userId)

    return response.json({
      data:address
    })

  }catch(err){
    return response.internalServerError({ error: 'Something went wrong' })
  }
}
}