import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import Product from './src/models/Product.js';
import { connectDB } from './src/config/db.js';

dotenv.config();

const mockProducts = [
  {
    name: 'iPhone 12',
    category: 'Electronics',
    condition: 'Excellent',
    price: 45000,
    images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'],
    description: 'Well maintained, 1 year old. Comes with original charger and box.',
    age: '1 year',
    deliveryCharge: 500,
  },
  {
    name: 'Dell XPS 15 Laptop',
    category: 'Electronics',
    condition: 'Excellent',
    price: 85000,
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'],
    description: 'Barely used Dell XPS. 16GB RAM, 512GB SSD. Perfect for programming.',
    age: '6 months',
    deliveryCharge: 250,
  },
  {
    name: 'Modern Wooden Sofa',
    category: 'Furniture',
    condition: 'Good',
    price: 15000,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
    description: 'Comfortable 3-seater wooden sofa with premium fabric cushions.',
    age: '2 years',
    deliveryCharge: 1500,
  },
  {
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    condition: 'Excellent',
    price: 6000,
    images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80'],
    description: 'Mesh back ergonomic chair with adjustable lumbar support and armrests.',
    age: '8 months',
    deliveryCharge: 300,
  },
  {
    name: 'Trek Mountain Bike',
    category: 'Vehicles',
    condition: 'Good',
    price: 12000,
    images: ['https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80'],
    description: '21-speed Trek mountain bike. Recently serviced. Tires are in great shape.',
    age: '1.5 years',
    deliveryCharge: 800,
  },
  {
    name: 'Honda Activa 6G',
    category: 'Vehicles',
    condition: 'Excellent',
    price: 55000,
    images: ['https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&q=80'],
    description: 'Single owner, strictly city driven. Full service history available.',
    age: '2 years',
    deliveryCharge: 2000,
  },
  {
    name: 'Vintage Leather Jacket',
    category: 'Fashion',
    condition: 'Good',
    price: 3500,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'],
    description: 'Genuine brown leather jacket. Size Medium. Classic timeless look.',
    age: '3 years',
    deliveryCharge: 100,
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    category: 'Fashion',
    condition: 'Excellent',
    price: 4500,
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'],
    description: 'Original Ray-Ban Aviators. Polarized lenses. Includes case and cleaning cloth.',
    age: '3 months',
    deliveryCharge: 50,
  },
  {
    name: 'The Alchemist by Paulo Coelho',
    category: 'Books',
    condition: 'Excellent',
    price: 250,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'],
    description: 'Paperback edition. No torn pages or highlights.',
    age: '1 year',
    deliveryCharge: 40,
  },
  {
    name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    category: 'Books',
    condition: 'Good',
    price: 800,
    images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80'],
    description: 'A must-read for any software developer. Hardcover edition.',
    age: '2 years',
    deliveryCharge: 60,
  },
  {
    name: 'Sony PlayStation 5',
    category: 'Electronics',
    condition: 'Excellent',
    price: 49000,
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80'],
    description: 'Hardly used, includes 1 dualsense controller and all cables.',
    age: '3 months',
    deliveryCharge: 300,
  },
  {
    name: 'Canon EOS R5 Camera',
    category: 'Electronics',
    condition: 'Good',
    price: 150000,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'],
    description: 'Mirrorless camera body. Great for professional photography.',
    age: '2 years',
    deliveryCharge: 500,
  },
  {
    name: 'Minimalist Coffee Table',
    category: 'Furniture',
    condition: 'Excellent',
    price: 3500,
    images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80'],
    description: 'Sleek glass and wood finish coffee table.',
    age: '1 year',
    deliveryCharge: 200,
  },
  {
    name: 'King Size Bed Frame',
    category: 'Furniture',
    condition: 'Good',
    price: 18000,
    images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80'],
    description: 'Solid oak wood bed frame. Mattress not included.',
    age: '3 years',
    deliveryCharge: 1000,
  },
  {
    name: 'Hyundai i20',
    category: 'Vehicles',
    condition: 'Good',
    price: 450000,
    images: ['https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80'],
    description: 'Asta Top Model. Non-accidental, comprehensive insurance.',
    age: '4 years',
    deliveryCharge: 5000,
  },
  {
    name: 'Royal Enfield Classic 350',
    category: 'Vehicles',
    condition: 'Excellent',
    price: 120000,
    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80'],
    description: 'Gunmetal grey, regularly serviced, 15000 kms done.',
    age: '2 years',
    deliveryCharge: 1500,
  },
  {
    name: 'Nike Air Max Sneakers',
    category: 'Fashion',
    condition: 'Excellent',
    price: 4000,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
    description: 'Size 10 UK. Worn only twice, perfectly clean.',
    age: '1 month',
    deliveryCharge: 100,
  },
  {
    name: 'Designer Denim Jeans',
    category: 'Fashion',
    condition: 'Good',
    price: 1200,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'],
    description: 'Slim fit blue denim. Size 32 waist.',
    age: '6 months',
    deliveryCharge: 50,
  },
  {
    name: 'The Great Gatsby',
    category: 'Books',
    condition: 'Excellent',
    price: 150,
    images: ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80'],
    description: 'Classic novel by F. Scott Fitzgerald. Hardcover.',
    age: '1 year',
    deliveryCharge: 30,
  },
  {
    name: 'Sapiens: A Brief History',
    category: 'Books',
    condition: 'Good',
    price: 350,
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'],
    description: 'Fascinating read by Yuval Noah Harari.',
    age: '2 years',
    deliveryCharge: 40,
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Find or create admin seller
    let admin = await User.findOne({ email: 'admin@recart.com' });
    if (!admin) {
      admin = await User.create({
        name: 'System Admin',
        email: 'admin@recart.com',
        password: 'password123',
        role: 'seller'
      });
      console.log('Created Admin Seller.');
    }

    // Attach admin id to products
    const productsWithSeller = mockProducts.map(p => ({
      ...p,
      seller: admin._id
    }));

    await Product.insertMany(productsWithSeller);
    console.log(`Seeded ${productsWithSeller.length} products successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
