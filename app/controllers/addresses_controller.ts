import type { HttpContext } from '@adonisjs/core/http'
import Address from '#models/address'

export default class AddressController {
  async store({ params, request, response }: HttpContext) {
    const userId = Number(params.userId)

    if (!userId || isNaN(userId)) {
      return response.badRequest({ message: 'Invalid userId' })
    }

    const addressData = request.only([
      'phoneNo',
      'houseNo',
      'street',
      'city',
      'pincode',
    ])

    if (
      !addressData.phoneNo ||
      !addressData.houseNo ||
      !addressData.street ||
      !addressData.city ||
      !addressData.pincode
    ) {
      return response.badRequest({
        message: 'All fields required: phoneNo, houseNo, street, city, pincode',
      })
    }

    const address = await Address.create({
      userId: userId,
      phoneNo: Number(addressData.phoneNo),
      houseNo: Number(addressData.houseNo),
      street: addressData.street,
      city: addressData.city,
      pincode: Number(addressData.pincode),
    })

    return response.created({
      message: 'Address added successfully',
      address,
    })
  }
}