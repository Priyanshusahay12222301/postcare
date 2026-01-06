const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Suggestion = require('./models/Suggestion');
const FlashCard = require('./models/FlashCard');
const Coupon = require('./models/Coupon');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/postcare-plus';

// Sample Products
const products = [
  {
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    subcategory: 'Smartphone',
    price: 999,
    brand: 'Apple',
    description: 'The latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
    imageUrl: 'https://placehold.co/300x300/3b82f6/ffffff?text=iPhone+15+Pro',
    features: ['A17 Pro chip', '48MP camera', 'Titanium design', '5G connectivity'],
    inStock: true
  },
  {
    name: 'MacBook Pro 14"',
    category: 'Electronics',
    subcategory: 'Laptop',
    price: 1999,
    brand: 'Apple',
    description: 'Powerful laptop with M3 chip, stunning Liquid Retina XDR display.',
    imageUrl: 'https://placehold.co/300x300/3b82f6/ffffff?text=MacBook+Pro',
    features: ['M3 chip', '14" Retina display', '18-hour battery', '16GB RAM'],
    inStock: true
  },
  {
    name: 'iPad Pro 12.9"',
    category: 'Electronics',
    subcategory: 'Tablet',
    price: 1099,
    brand: 'Apple',
    description: 'The ultimate iPad experience with M2 chip and ProMotion display.',
    imageUrl: 'https://placehold.co/300x300/3b82f6/ffffff?text=iPad+Pro',
    features: ['M2 chip', '12.9" Liquid Retina', 'Apple Pencil support', '5G'],
    inStock: true
  }
];

// Sample Suggestions (Care-based, Product-related)
const suggestions = [
  // iPhone Accessories & Care
  {
    name: 'AppleCare+ Protection',
    type: 'Care Plan',
    category: 'Electronics',
    subcategory: 'Smartphone',
    price: 199,
    description: 'Complete protection for your iPhone including accidental damage coverage.',
    imageUrl: 'https://placehold.co/200x200/3b82f6/ffffff?text=AppleCare',
    benefits: [
      'Accidental damage coverage',
      'Express replacement service',
      'Battery replacement',
      '24/7 priority support'
    ],
    priority: 10
  },
  {
    name: 'Premium Phone Case + Screen Protector',
    type: 'Accessory',
    category: 'Electronics',
    subcategory: 'Smartphone',
    price: 34.99,
    originalPrice: 49.99,
    description: 'All-in-one protection with military-grade case and tempered glass screen protector.',
    imageUrl: 'https://placehold.co/200x200/ef4444/ffffff?text=Phone+Case',
    benefits: [
      '10ft drop protection',
      'Scratch resistant',
      'Wireless charging compatible',
      'Lifetime warranty'
    ],
    priority: 9
  },
  {
    name: 'Fast Charging Kit',
    type: 'Accessory',
    category: 'Electronics',
    subcategory: 'Smartphone',
    price: 29.99,
    description: 'ONLY fast charging - Complete fast charging kit with 20W adapter and cable.',
    imageUrl: 'https://placehold.co/200x200/fbbf24/000000?text=Fast+Charger',
    benefits: [
      'Apple MFi certified',
      '20W fast charging',
      'Compact design',
      'Improves battery longevity'
    ],
    priority: 7
  },
  {
    name: 'iCloud+ Storage Plan (200GB)',
    type: 'Subscription',
    category: 'Electronics',
    subcategory: 'Smartphone',
    price: 2.99,
    priceType: '/month',
    description: 'ONLY cloud storage - Monthly cloud storage for photos, videos, and automatic backups.',
    imageUrl: 'https://placehold.co/200x200/06b6d4/ffffff?text=iCloud',
    benefits: [
      'Automatic photo backup',
      'Device backup protection',
      'Family sharing',
      'Cancel anytime'
    ],
    priority: 4
  },
  {
    name: 'AirPods Pro (2nd gen)',
    type: 'Accessory',
    category: 'Electronics',
    subcategory: 'Smartphone',
    price: 249,
    description: 'Premium wireless earbuds with active noise cancellation.',
    imageUrl: 'https://placehold.co/200x200/3b82f6/ffffff?text=AirPods+Pro',
    benefits: [
      'Active noise cancellation',
      'Spatial audio',
      'Seamless iPhone integration',
      '6-hour battery'
    ],
    priority: 6
  },
  {
    name: 'iCloud+ 200GB Plan',
    type: 'Subscription',
    category: 'Electronics',
    subcategory: 'Smartphone',
    price: 2.99,
    description: 'Monthly cloud storage for photos, videos, and automatic backups.',
    imageUrl: 'https://placehold.co/200x200/06b6d4/ffffff?text=iCloud',
    benefits: [
      'Automatic photo backup',
      'Device backup protection',
      'Family sharing',
      'Cancel anytime'
    ],
    priority: 5
  },
  // Laptop Care
  {
    name: 'AppleCare+ for Mac',
    type: 'Care Plan',
    category: 'Electronics',
    subcategory: 'Laptop',
    price: 379,
    description: 'Extended warranty and accidental damage protection for your MacBook.',
    imageUrl: 'https://placehold.co/200x200/3b82f6/ffffff?text=AppleCare+Mac',
    benefits: [
      '3 years of protection',
      'Accidental damage coverage',
      'Battery replacement',
      'Priority tech support'
    ],
    priority: 10
  },
  {
    name: 'Laptop Sleeve',
    type: 'Accessory',
    category: 'Electronics',
    subcategory: 'Laptop',
    price: 59,
    description: 'Premium padded sleeve to protect your MacBook from scratches and bumps.',
    imageUrl: 'https://placehold.co/200x200/8b4513/ffffff?text=Laptop+Sleeve',
    benefits: [
      'Shock absorption',
      'Water resistant',
      'Slim design',
      'Extra pocket for accessories'
    ],
    priority: 8
  },
  // Headphones Care
  {
    name: 'Extended Warranty (2 Years)',
    type: 'Extended Warranty',
    category: 'Electronics',
    subcategory: 'Headphones',
    price: 79,
    description: 'Extended warranty covering manufacturing defects and wear.',
    imageUrl: 'https://via.placeholder.com/200/FF6600/FFFFFF?text=Warranty',
    benefits: [
      'Full replacement coverage',
      'No questions asked',
      'Free shipping',
      'Expert support'
    ],
    priority: 9
  },
  {
    name: 'Headphone Travel Case',
    type: 'Accessory',
    category: 'Electronics',
    subcategory: 'Headphones',
    price: 39,
    description: 'Hard-shell case to protect your headphones while traveling.',
    imageUrl: 'https://via.placeholder.com/200/000000/FFFFFF?text=Travel+Case',
    benefits: [
      'Crush-proof protection',
      'Mesh pocket for cables',
      'Compact design',
      'TSA approved'
    ],
    priority: 7
  }
];

// Educational Flash Cards
const flashCards = [
  // Electronics - Smartphone
  {
    category: 'Electronics',
    subcategory: 'Smartphone',
    message: 'Most phone damage happens in the first 30 days of ownership.',
    icon: '📱',
    priority: 1
  },
  {
    category: 'Electronics',
    subcategory: 'Smartphone',
    message: 'Screen replacements cost 10x more than screen protectors.',
    icon: '💸',
    priority: 2
  },
  {
    category: 'Electronics',
    subcategory: 'Smartphone',
    message: 'Certified chargers improve battery health and device longevity.',
    icon: '🔋',
    priority: 3
  },
  {
    category: 'Electronics',
    subcategory: 'Smartphone',
    message: 'Cloud backups protect your photos and data if your phone is lost or damaged.',
    icon: '☁️',
    priority: 4
  },
  // Electronics - Laptop
  {
    category: 'Electronics',
    subcategory: 'Laptop',
    message: 'Laptop repairs can cost up to 50% of the device price without coverage.',
    icon: '💻',
    priority: 1
  },
  {
    category: 'Electronics',
    subcategory: 'Laptop',
    message: 'Protective sleeves prevent 90% of cosmetic damage during transport.',
    icon: '🛡️',
    priority: 2
  },
  {
    category: 'Electronics',
    subcategory: 'Laptop',
    message: 'Regular backups are essential - hard drives can fail without warning.',
    icon: '💾',
    priority: 3
  },
  // Electronics - Headphones
  {
    category: 'Electronics',
    subcategory: 'Headphones',
    message: 'Premium headphones last 2x longer with proper storage and care.',
    icon: '🎧',
    priority: 1
  },
  {
    category: 'Electronics',
    subcategory: 'Headphones',
    message: 'Travel cases prevent cable damage and maintain sound quality.',
    icon: '🧳',
    priority: 2
  },
  // General
  {
    category: 'General',
    message: 'Protection plans save an average of $200 per year in repair costs.',
    icon: '💡',
    priority: 1
  },
  {
    category: 'General',
    message: 'Investing in quality accessories extends product lifespan by 40%.',
    icon: '🌟',
    priority: 2
  }
];

// Sample Coupons
const coupons = [
  {
    code: 'WELCOME10',
    discountPercentage: 10,
    description: 'Welcome! Enjoy 10% off your first accessory purchase.',
    validFor: 'All accessories',
    expiryDate: new Date('2026-12-31'),
    isActive: true,
    usageLimit: 100,
    usedCount: 0
  },
  {
    code: 'THANKYOU15',
    discountPercentage: 15,
    description: 'Thank you for your purchase! 15% off your next order.',
    validFor: 'All products',
    expiryDate: new Date('2026-06-30'),
    isActive: true,
    usageLimit: 50,
    usedCount: 0
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Suggestion.deleteMany({});
    await FlashCard.deleteMany({});
    await Coupon.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new data
    await Product.insertMany(products);
    console.log('✅ Products seeded');

    await Suggestion.insertMany(suggestions);
    console.log('✅ Suggestions seeded');

    await FlashCard.insertMany(flashCards);
    console.log('✅ Flash cards seeded');

    await Coupon.insertMany(coupons);
    console.log('✅ Coupons seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log(`📦 ${products.length} products`);
    console.log(`💡 ${suggestions.length} suggestions`);
    console.log(`💳 ${flashCards.length} flash cards`);
    console.log(`🎟️  ${coupons.length} coupons`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
