import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run() {
    const categories = await Category.createMany([
      {
        name: 'Fruits & Vegetables',
        description: 'Fresh seasonal fruits and vegetables',
      },
      {
        name: 'Dairy Products',
        description: 'Milk, curd, paneer, butter and other dairy items',
      },
      {
        name: 'Snacks & Namkeen',
        description: 'Biscuits, chips, namkeen and sweets',
      },
      {
        name: 'Grains, Pulses & Atta',
        description: 'Rice, dals, flours and whole grains',
      },
      {
        name: 'Beverages & Juices',
        description: 'Juices, tea, coffee, soft drinks and health drinks',
      },
    ])

    const productsData = [
      // Fruits & Vegetables
      { name: 'Apple (Shimla)', price: 180, stock: 150, unit: 'kg', description: 'Crisp and juicy red apples', Imageurl:"https://images.everydayhealth.com/images/diet-nutrition/apples-101-about-1440x810.jpg?w=508",categoryId: categories[0].id },
      { name: 'Banana (Robusta)', price: 50, stock: 400, unit: 'dozen', description: 'Sweet and ripe bananas', categoryId: categories[0].id },
      { name: 'Tomato (Organic)', price: 40, stock: 500, unit: 'kg', description: 'Farm-fresh hybrid tomatoes', categoryId: categories[0].id },
      { name: 'Onion (Nasik)', price: 35, stock: 700, unit: 'kg', description: 'Medium size, good for daily use', categoryId: categories[0].id },
      { name: 'Potato (Fresh)', price: 28, stock: 800, unit: 'kg', description: 'Best for curries and fries', categoryId: categories[0].id },

      // Dairy Products
      { name: 'Amul Taaza Milk 1L', price: 72, stock: 600, unit: 'litre', description: 'Toned milk – pure & fresh', categoryId: categories[1].id },
      { name: 'Amul Butter 500g', price: 295, stock: 180, unit: 'pack', description: 'Salted table butter', categoryId: categories[1].id },
      { name: 'Fresh Paneer 500g', price: 240, stock: 250, unit: 'pack', description: 'Soft, homemade style paneer', categoryId: categories[1].id },
      { name: 'Curd (Dahi) 500g', price: 65, stock: 400, unit: 'cup', description: 'Thick and creamy homemade curd', categoryId: categories[1].id },
      { name: 'Ghee (Desi) 1L', price: 850, stock: 120, unit: 'jar', description: 'Pure cow ghee', categoryId: categories[1].id },

      // Snacks & Namkeen 
      { name: 'Lays Classic Salted 52g', price: 25, stock: 1200, unit: 'pack', description: 'Crispy potato chips', categoryId: categories[2].id },
      { name: 'Parle-G Biscuits 800g', price: 120, stock: 700, unit: 'pack', description: 'The original glucose biscuit', categoryId: categories[2].id },
      { name: 'Haldiram’s Aloo Bhujia 400g', price: 195, stock: 350, unit: 'pack', description: 'Spicy & crunchy namkeen', categoryId: categories[2].id },
      { name: 'Bourbon Chocolate Biscuits', price: 35, stock: 800, unit: 'pack', description: 'Creamy chocolate sandwich biscuit', categoryId: categories[2].id },

      // Grains, Pulses & Atta
      { name: 'Basmati Rice (Premium) 1kg', price: 260, stock: 300, unit: 'kg', description: 'Long grain aromatic rice', categoryId: categories[3].id },
      { name: 'Toor Dal (Arhar) 1kg', price: 195, stock: 400, unit: 'kg', description: 'Polished and clean', categoryId: categories[3].id },
      { name: 'Moong Dal (Yellow) 1kg', price: 150, stock: 350, unit: 'kg', description: 'Split & skinless', categoryId: categories[3].id },
      { name: 'Chakki Fresh Atta 5kg', price: 270, stock: 200, unit: 'bag', description: 'Whole wheat flour', categoryId: categories[3].id },

      // Beverages & Juices 
      { name: 'Real Mango Juice 1L', price: 110, stock: 300, unit: 'bottle', description: 'Made from real mango pulp', categoryId: categories[4].id },
      { name: 'Coca Cola 1L', price: 75, stock: 500, unit: 'bottle', description: 'Refreshing cola drink', categoryId: categories[4].id },
      { name: 'Tata Tea Gold 1kg', price: 330, stock: 250, unit: 'pack', description: 'Rich & aromatic CTC tea', categoryId: categories[4].id },
      { name: 'Boost Health Drink 500g', price: 240, stock: 180, unit: 'jar', description: 'Energy & stamina drink', categoryId: categories[4].id },
    ]
    await Product.createMany(productsData)

    console.log('Vegetarian Categories + Products seeded successfully!')
  }
}