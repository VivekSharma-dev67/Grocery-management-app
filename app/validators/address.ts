import vine from '@vinejs/vine'

export const createAddressValidator = vine.compile(
    vine.object({
        phoneNo: vine.string().trim().minLength(10).maxLength(15).regex(/^[0-9+\-\s()]*$/), 
        houseNo: vine.string().trim().minLength(1).maxLength(50),
        street: vine.string().trim().minLength(3).maxLength(100),
        city: vine.string().trim().minLength(2).maxLength(50),
        pincode: vine.string().trim().fixedLength(6).regex(/^[1-9][0-9]{5}$/),
    })
)