// app/Services/AddressService.ts
import Address from '#models/address'
export default class AddressService {
  async createAddress(userId: number, payload: {
    phoneNo: string
    houseNo: string
    street: string
    city: string
    pincode: string 
  }) {
    return Address.create({
      userId,
      phoneNo: payload.phoneNo,
      houseNo: payload.houseNo,
      street: payload.street,
      city: payload.city,
      pincode: payload.pincode,
    })
  }

  async showAddress(userId: number){
    return Address.query().where("user_id",userId)
  }
}