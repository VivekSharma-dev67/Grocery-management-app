import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run() {
    const categories = await Category.createMany([
      { name: 'Fruits & Vegetables', description: 'Fresh seasonal fruits and vegetables' },
      { name: 'Dairy Products', description: 'Milk, curd, paneer, butter and other dairy items' },
      { name: 'Snacks & Namkeen', description: 'Biscuits, chips, namkeen and sweets' },
      { name: 'Grains, Pulses & Atta', description: 'Rice, dals, flours and whole grains' },
      { name: 'Beverages & Juices', description: 'Juices, tea, coffee, soft drinks and health drinks' },
    ])

    const productsData = [
      // 1. Fruits & Vegetables (10 items)
      { name: 'Apple (Shimla)', price: 180, stock: 150, unit: 'kg', description: 'Crisp and juicy red apples', Imageurl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800", categoryId: categories[0].id },
      { name: 'Banana (Robusta)', price: 50, stock: 400, unit: 'dozen', description: 'Sweet and ripe bananas', Imageurl: "https://images.unsplash.com/photo-1601001435828-419e309a2f53?w=800", categoryId: categories[0].id },
      { name: 'Tomato (Organic)', price: 40, stock: 500, unit: 'kg', description: 'Farm-fresh hybrid tomatoes', Imageurl: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=800", categoryId: categories[0].id },
      { name: 'Onion (Nasik)', price: 35, stock: 700, unit: 'kg', description: 'Medium size, good for daily use', Imageurl: "https://images.unsplash.com/photo-1587049352846-4a222e4c0b5e?w=800", categoryId: categories[0].id },
      { name: 'Potato (Fresh)', price: 28, stock: 800, unit: 'kg', description: 'Best for curries and fries', Imageurl: "https://images.unsplash.com/photo-1590165482779-0d9f8b1b4d2f?w=800", categoryId: categories[0].id },
      { name: 'Carrot (Organic)', price: 45, stock: 300, unit: 'kg', description: 'Sweet and crunchy carrots', Imageurl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800", categoryId: categories[0].id },
      { name: 'Cauliflower', price: 60, stock: 200, unit: 'piece', description: 'Fresh white cauliflower', Imageurl: "https://images.unsplash.com/photo-1601039641847-91cfdded5a7a?w=800", categoryId: categories[0].id },
      { name: 'Spinach (Palak)', price: 35, stock: 400, unit: 'bunch', description: 'Green leafy spinach', Imageurl: "https://images.unsplash.com/photo-1588005576346-8b2d6d1b8b0e?w=800", categoryId: categories[0].id },
      { name: 'Green Peas', price: 80, stock: 250, unit: 'kg', description: 'Fresh green peas', Imageurl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800", categoryId: categories[0].id },
      { name: 'Mango (Kesar)', price: 220, stock: 100, unit: 'kg', description: 'Sweet Alphonso mangoes', Imageurl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800", categoryId: categories[0].id },

      // 2. Dairy Products (10 items)
      { name: 'Amul Taaza Milk 1L', price: 72, stock: 600, unit: 'litre', description: 'Toned milk – pure & fresh', Imageurl: "https://images.unsplash.com/photo-1563636610-9a1f6d8c9d1d?w=800", categoryId: categories[1].id },
      { name: 'Amul Butter 500g', price: 295, stock: 180, unit: 'pack', description: 'Salted table butter', Imageurl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800", categoryId: categories[1].id },
      { name: 'Fresh Paneer 500g', price: 240, stock: 250, unit: 'pack', description: 'Soft, homemade style paneer', Imageurl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800", categoryId: categories[1].id },
      { name: 'Curd (Dahi) 500g', price: 65, stock: 400, unit: 'cup', description: 'Thick and creamy homemade curd', Imageurl: "https://images.unsplash.com/photo-1571211508465-0d6c8a4c8f2f?w=800", categoryId: categories[1].id },
      { name: 'Ghee (Desi) 1L', price: 850, stock: 120, unit: 'jar', description: 'Pure cow ghee', Imageurl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800", categoryId: categories[1].id },
      { name: 'Amul Cheese Slices 200g', price: 140, stock: 300, unit: 'pack', description: 'Processed cheese slices', Imageurl: "https://images.unsplash.com/photo-1555088991-5b7e6f0c2e0d?w=800", categoryId: categories[1].id },
      { name: 'Amul Fresh Cream 200ml', price: 60, stock: 250, unit: 'pack', description: 'Fresh whipping cream', Imageurl: "https://images.unsplash.com/photo-1622203692403-7e9a8c3c4c4a?w=800", categoryId: categories[1].id },
      { name: 'Mother Dairy Lassi 200ml', price: 25, stock: 500, unit: 'bottle', description: 'Sweet & creamy lassi', Imageurl: "https://images.unsplash.com/photo-1622203692403-7e9a8c3c4c4a?w=800", categoryId: categories[1].id },
      { name: 'Amul Masti Buttermilk 200ml', price: 20, stock: 600, unit: 'bottle', description: 'Spiced buttermilk', Imageurl: "https://images.unsplash.com/photo-1622203692403-7e9a8c3c4c4a?w=800", categoryId: categories[1].id },
      { name: 'Amul Kool Kafe 200ml', price: 25, stock: 400, unit: 'bottle', description: 'Chocolate flavored milk', Imageurl: "https://images.unsplash.com/photo-1570545887596-6e5d6d6d6d6d?w=800", categoryId: categories[1].id },

      // 3. Snacks & Namkeen (10 items)
      { name: 'Lays Classic Salted 52g', price: 25, stock: 1200, unit: 'pack', description: 'Crispy potato chips', Imageurl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800", categoryId: categories[2].id },
      { name: 'Parle-G Biscuits 800g', price: 120, stock: 700, unit: 'pack', description: 'The original glucose biscuit', Imageurl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800", categoryId: categories[2].id },
      { name: 'Haldiram’s Aloo Bhujia 400g', price: 195, stock: 350, unit: 'pack', description: 'Spicy & crunchy namkeen', Imageurl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800", categoryId: categories[2].id },
      { name: 'Bourbon Chocolate Biscuits', price: 35, stock: 800, unit: 'pack', description: 'Creamy chocolate sandwich biscuit', Imageurl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800", categoryId: categories[2].id },
      { name: 'Kurkure Masala Munch 90g', price: 30, stock: 900, unit: 'pack', description: 'Spicy crunchy corn puffs', Imageurl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800", categoryId: categories[2].id },
      { name: 'Haldiram’s Moong Dal 400g', price: 210, stock: 300, unit: 'pack', description: 'Roasted moong dal namkeen', Imageurl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800", categoryId: categories[2].id },
      { name: 'Parle Monaco Cheese 75g', price: 40, stock: 600, unit: 'pack', description: 'Salty cheese crackers', Imageurl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800", categoryId: categories[2].id },
      { name: 'Bingo Mad Angles 66g', price: 25, stock: 1000, unit: 'pack', description: 'Spicy masala snack', Imageurl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800", categoryId: categories[2].id },
      { name: 'Haldiram’s Khatta Meetha 400g', price: 185, stock: 280, unit: 'pack', description: 'Sweet & sour namkeen mix', Imageurl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800", categoryId: categories[2].id },
      { name: 'Cadbury Oreo 114g', price: 45, stock: 500, unit: 'pack', description: 'Chocolate sandwich cookies', Imageurl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800", categoryId: categories[2].id },

      // 4. Grains, Pulses & Atta (10 items)
      { name: 'Basmati Rice (Premium) 1kg', price: 260, stock: 300, unit: 'kg', description: 'Long grain aromatic rice', Imageurl: "https://images.unsplash.com/photo-1586201838290-2b3e2c7c3f9d?w=800", categoryId: categories[3].id },
      { name: 'Toor Dal (Arhar) 1kg', price: 195, stock: 400, unit: 'kg', description: 'Polished and clean', Imageurl: "https://images.unsplash.com/photo-1598514981903-3d7c4b3c5f5c?w=800", categoryId: categories[3].id },
      { name: 'Moong Dal (Yellow) 1kg', price: 150, stock: 350, unit: 'kg', description: 'Split & skinless', Imageurl: "https://images.unsplash.com/photo-1598514981903-3d7c4b3c5f5c?w=800", categoryId: categories[3].id },
      { name: 'Chakki Fresh Atta 5kg', price: 270, stock: 200, unit: 'bag', description: 'Whole wheat flour', Imageurl: "https://images.unsplash.com/photo-1586201838290-2b3e2c7c3f9d?w=800", categoryId: categories[3].id },
      { name: 'Chana Dal 1kg', price: 120, stock: 500, unit: 'kg', description: 'Split chickpeas', Imageurl: "https://images.unsplash.com/photo-1598514981903-3d7c4b3c5f5c?w=800", categoryId: categories[3].id },
      { name: 'Rajma (Red Kidney Beans) 1kg', price: 160, stock: 250, unit: 'kg', description: 'High quality rajma', Imageurl: "https://images.unsplash.com/photo-1598514981903-3d7c4b3c5f5c?w=800", categoryId: categories[3].id },
      { name: 'Urad Dal (Black) 1kg', price: 180, stock: 300, unit: 'kg', description: 'Whole black lentils', Imageurl: "https://images.unsplash.com/photo-1598514981903-3d7c4b3c5f5c?w=800", categoryId: categories[3].id },
      { name: 'Masoor Dal (Red) 1kg', price: 130, stock: 400, unit: 'kg', description: 'Split red lentils', Imageurl: "https://images.unsplash.com/photo-1598514981903-3d7c4b3c5f5c?w=800", categoryId: categories[3].id },
      { name: 'Poha (Flattened Rice) 1kg', price: 80, stock: 600, unit: 'kg', description: 'Thin poha for breakfast', Imageurl: "https://images.unsplash.com/photo-1586201838290-2b3e2c7c3f9d?w=800", categoryId: categories[3].id },
      { name: 'Sooji (Semolina) 1kg', price: 70, stock: 350, unit: 'kg', description: 'Fine sooji for upma', Imageurl: "https://images.unsplash.com/photo-1586201838290-2b3e2c7c3f9d?w=800", categoryId: categories[3].id },

      // 5. Beverages & Juices (10 items)
      { name: 'Real Mango Juice 1L', price: 110, stock: 300, unit: 'bottle', description: 'Made from real mango pulp', Imageurl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800", categoryId: categories[4].id },
      { name: 'Coca Cola 1L', price: 75, stock: 500, unit: 'bottle', description: 'Refreshing cola drink', Imageurl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800", categoryId: categories[4].id },
      { name: 'Tata Tea Gold 1kg', price: 330, stock: 250, unit: 'pack', description: 'Rich & aromatic CTC tea', Imageurl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800", categoryId: categories[4].id },
      { name: 'Boost Health Drink 500g', price: 240, stock: 180, unit: 'jar', description: 'Energy & stamina drink', Imageurl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800", categoryId: categories[4].id },
      { name: 'Tropicana Orange Juice 1L', price: 120, stock: 280, unit: 'bottle', description: '100% pure orange juice', Imageurl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800", categoryId: categories[4].id },
      { name: 'Nescafe Classic Coffee 100g', price: 220, stock: 200, unit: 'jar', description: 'Instant coffee powder', Imageurl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800", categoryId: categories[4].id },
      { name: 'Maaza Mango Drink 1L', price: 90, stock: 400, unit: 'bottle', description: 'Refreshing mango drink', Imageurl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800", categoryId: categories[4].id },
      { name: 'Frooti Mango Drink 1L', price: 85, stock: 350, unit: 'bottle', description: 'Fresh & juicy mango drink', Imageurl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800", categoryId: categories[4].id },
      { name: 'Bisleri Water 1L', price: 20, stock: 1000, unit: 'bottle', description: 'Pure & safe drinking water', Imageurl: "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=800", categoryId: categories[4].id },
      { name: 'Sprite 1L', price: 75, stock: 450, unit: 'bottle', description: 'Lemon-lime refreshing drink', Imageurl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800", categoryId: categories[4].id },
    ]

    await Product.createMany(productsData)

    console.log('Vegetarian Categories + Products seeded successfully!')
  }
}