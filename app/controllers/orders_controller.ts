import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import OrderItem from '#models/order_item'
import Cart from '#models/cart'
import Address from '#models/address'
import exceljs from 'exceljs'
import PDFDocument from 'pdfkit'
import { DateTime } from 'luxon'

export default class OrderController {
  // async store({ params, request, response }: HttpContext) {
  //   const userId = Number(params.userId)
  //   if (isNaN(userId)) {
  //     return response.badRequest({ error: 'Invalid user id' })
  //   }

  //   const addressId = Number(request.input('addressId'))
  //   if (!addressId || isNaN(addressId)) {
  //     return response.badRequest({ error: 'Valid addressId is required' })
  //   }

  //   try {
  //     const address = await Address.query()
  //       .where({ id: addressId, user_id: userId })
  //       .firstOrFail()
  //       if(!address){
  //         response.badRequest({ error: 'Invalid or unauthorized address' })
  //       }

  //     const cart = await Cart.query()
  //       .where('user_id', userId)
  //       .preload('items', (q) => q.preload('product'))
  //       .firstOrFail()
  //      if(!cart){
  //        response.badRequest({ error: 'Cart not found or empty' })
  //      }

  //     if (cart.items.length === 0) {
  //       return response.badRequest({ error: 'Cart is empty' })
  //     }

  //     let totalAmount = 0
  //     for (const item of cart.items) {
  //       const product = item.product!
  //       if (product.stock < item.quantity) {
  //         return response.unprocessableEntity({
  //           error: `Insufficient stock for ${product.name}. Only ${product.stock} available`
  //         })
  //       }
  //       totalAmount += item.quantity * product.price
  //     }

  //     if (totalAmount <= 0) {
  //       return response.badRequest({ error: 'Total amount must be positive' })
  //     }

  //     const order = await Order.transaction(async (trx) => {
  //       const newOrder = await Order.create({
  //         userId: userId,
  //         cartId: cart.id,
  //         AddressId: address.id,
  //         TotalAmount: totalAmount,
  //         status: 'pending',
  //       }, { client: trx })

  //       for (const item of cart.items) {
  //         await OrderItem.create({
  //           orderId: newOrder.id,
  //           productId: item.productId,
  //           quantity: item.quantity,
  //         }, { client: trx })

  //         await trx
  //           .from('products')
  //           .where('id', item.productId)
  //           .decrement('stock', item.quantity)
  //       }

  //       await cart.related('items').query().useTransaction(trx).delete()
  //       await cart.useTransaction(trx).delete()

  //       await newOrder.load('items', (q) => q.preload('product'))
  //       await newOrder.load('address')

  //       return newOrder
  //     })

  //     return response.created({
  //       message: 'Order placed successfully',
  //       data: order
  //     })
  //   } catch (error) {
  //     console.error('Order creation failed:', error)

  //     if (error.status && error.messages) {
  //       return response.badRequest({ error: 'Validation failed', details: error.messages })
  //     }

  //     if (error.code === 'ER_NO_REFERENCED_ROW' || error.message?.includes('foreign key')) {
  //       return response.badRequest({ error: 'Invalid reference (product/address/cart)' })
  //     }

  //     return response.internalServerError({
  //       error: 'Something went wrong while placing order'
  //     })
  //   }
  // }

  async store({ params, request, response }: HttpContext) {
    const userId = Number(params.userId)
    if (isNaN(userId)) {
      return response.badRequest({ error: 'Invalid user id' })
    }

    const addressId = Number(request.input('addressId'))
    if (!addressId || isNaN(addressId)) {
      return response.badRequest({ error: 'Valid addressId is required' })
    }

    try {
      const address = await Address.query()
        .where('id', addressId)
        .where('userId', userId)
        .first()

      if (!address) {
        return response.badRequest({ error: 'Invalid or unauthorized address' })
      }

      const cart = await Cart.query()
        .where('userId', userId)
        .preload('items', (q) => q.preload('product'))
        .first()

      if (!cart) {
        return response.badRequest({ error: 'Cart not found' })
      }

      if (cart.items.length === 0) {
        return response.badRequest({ error: 'Cart is empty' })
      }

      let totalAmount = 0
      for (const item of cart.items) {
        const product = item.product
        if (!product) continue
        if (product.stock < item.quantity) {
          return response.unprocessableEntity({
            error: `Insufficient stock for ${product.name}. Only ${product.stock} available`
          })
        }
        totalAmount += item.quantity * product.price
      }

      if (totalAmount <= 0) {
        return response.badRequest({ error: 'Total amount must be positive' })
      }

      const order = await Order.transaction(async (trx) => {
        const newOrder = await Order.create({
          userId: userId,
          cartId: cart.id,
          AddressId: address.id,
          TotalAmount: totalAmount,
          status: 'pending',
        }, { client: trx })

        for (const item of cart.items) {
          if (!item.product) continue
          await OrderItem.create({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.product.price
          }, { client: trx })

          await trx
            .from('products')
            .where('id', item.productId)
            .decrement('stock', item.quantity)
        }

        await cart.related('items').query().useTransaction(trx).delete()
        await cart.useTransaction(trx).delete()

        await newOrder.load('items', (q) => q.preload('product'))
        await newOrder.load('address')

        return newOrder
      })

      return response.created({
        message: 'Order placed successfully',
        data: order
      })
    } catch (error: any) {
      console.error('Order creation failed:', error)

      return response.internalServerError({
        error: 'Something went wrong while placing order'
      })
    }
  }

  async Allorder({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    if (isNaN(userId)) {
      return response.badRequest({ error: 'Invalid user id' })
    }

    try {
      const orders = await Order.query()
        .where('user_id', userId)
        .preload('items', (q) => q.preload('product'))
        .preload('address')
        .orderBy('created_at', 'desc')

      return response.ok(orders)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      return response.internalServerError({
        error: 'Something went wrong while fetching orders'
      })
    }
  }

  async show({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    const orderId = Number(params.id)

    if (isNaN(userId)) {
      return response.badRequest({ error: 'Invalid user id' })
    }

    if (isNaN(orderId)) {
      return response.badRequest({ error: 'Invalid order id' })
    }

    try {
      const order = await Order.query()
        .where('id', orderId)
        .where('user_id', userId)
        .preload('items', (q) => q.preload('product'))
        .preload('address')
        .first()

      if (!order) {
        return response.notFound({ error: 'Order not found' })
      }

      return response.ok(order)
    } catch (error) {
      console.error('Failed to fetch order:', error)
      return response.internalServerError({
        error: 'Something went wrong while fetching the order'
      })
    }
  }

  async exportUserOrdersExcel({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const orders = await Order.query()
      .where('user_id', user.id)
      .preload('items', (q) => q.preload('product'))
      .orderBy('created_at', 'desc')

    const workbook = new exceljs.Workbook()
    const worksheet = workbook.addWorksheet('My Orders')

    worksheet.addRow(['My All Orders']).font = { bold: true, size: 16 }
    worksheet.addRow([])

    // Header
    worksheet.addRow(['Order ID', 'Date', 'Status', 'Total', 'Items Count']).font = { bold: true }

    for (const order of orders) {
      worksheet.addRow([
        order.id,
        order.createdAt.toFormat('dd-MM-yyyy hh:mm a'),
        order.status,
        `₹${order.TotalAmount}`,
        order.items.length,
      ])
    }

    worksheet.columns = [
      { width: 10 },
      { width: 20 },
      { width: 15 },
      { width: 15 },
      { width: 12 },
    ]

    const buffer = await workbook.xlsx.writeBuffer()

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', `attachment; filename=My_Orders.xlsx`)

    return response.send(buffer)
  }

  async exportAllOrdersPdf({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const orders = await Order.query()
      .where('user_id', user.id)
      .preload('items', (q) => q.preload('product'))
      .preload('address')
      .orderBy('created_at', 'desc')

    if (orders.length === 0) {
      return response.notFound({ message: 'Aapke koi orders nahi hain' })
    }

    const doc = new PDFDocument({ margin: 50, size: 'A4', layout: 'portrait' })

    response.header('Content-Type', 'application/pdf')
    response.header('Content-Disposition', `attachment; filename=My_Orders_${DateTime.now().toFormat('dd-MM-yyyy')}.pdf`)

    doc.pipe(response.response)

    // Title...
    doc
      .fontSize(22)
      .text(`My Orders - ${user.fullName || 'User'}`, { align: 'center' })
      .moveDown(0.5)
      .fontSize(12)
      .text(`Generated on: ${DateTime.now().toFormat('dd-MM-yyyy hh:mm a')}`, { align: 'center' })
      .moveDown(2)

    let pageCount = 1
    for (const [index, order] of orders.entries()) {
      if (doc.y > 650) {
        doc.addPage()
        pageCount++
      }

      // Order header...
      doc
        .fontSize(16)
        .text(`Order #${order.id}`, { underline: true })
        .moveDown(0.3)

      doc
        .fontSize(11)
        .text(`Date: ${order.createdAt.toFormat('dd-MM-yyyy hh:mm a')}`)
        .text(`Status: ${order.status.toUpperCase()}`)
        .text(`Total: ₹${order.TotalAmount.toFixed(2)}`)
        .text(`Items: ${order.items.length}`)
        .moveDown(0.5)

      if (order.address) {
        doc
          .fontSize(12)
          .text(`Delivry Address `, { align: 'center' })
          .fontSize(10)
          .text(`${order.address.houseNo}, ${order.address.street}`)
          .text(`${order.address.city} - ${order.address.pincode}`)
          .text(`Phone: ${order.address.phoneNo}`)
          .moveDown(1)
      }

      doc
        .fontSize(12)
        .text('Items:', { underline: true })
        .moveDown(0.3)

      const tableTop = doc.y
      doc
        .fontSize(10)
        .text('Product', 50, tableTop)
        .text('Qty', 280, tableTop)
        .text('Price', 340, tableTop)
        .text('Total', 420, tableTop)

      doc.moveTo(50, tableTop + 12).lineTo(550, tableTop + 12).lineWidth(0.5).stroke()

      let y = tableTop + 20
      for (const item of order.items) {
        const productName = item.product?.name || 'Unknown'
        const price = item.product?.price || 0
        const total = item.quantity * price

        doc
          .fontSize(10)
          .text(productName, 50, y, { width: 220 })
          .text(item.quantity.toString(), 280, y)
          .text(`₹${price.toFixed(2)}`, 340, y)
          .text(`₹${total.toFixed(2)}`, 420, y)

        y += 18

        if (y > 680) {
          doc.addPage()
          y = 50
          pageCount++
        }
      }

      doc.moveDown(2)
      if (index < orders.length - 1) {
        doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(0.3).stroke()
        doc.moveDown(1)
      }
    }

    doc
      .fontSize(9)
      .moveDown(2)
      .text('Thank you for shopping with us!', { align: 'center' })
      .text(`Total Orders: ${orders.length} | Pages: ${pageCount}`, { align: 'center' })

    doc.end()

    return response
  }
}