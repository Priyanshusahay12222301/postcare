# PostCare+ 🛡️

**A Trust-First, Context-Aware Post-Purchase Monetisation Experience**

## 🎯 Overview

PostCare+ transforms the traditional e-commerce Thank You page into a meaningful post-purchase experience that focuses on trust, product care, and responsible monetisation.

### Core Principles

✅ **Monetisation ONLY on the Thank You Page**
- No upselling during checkout
- No interruptions before payment
- Respects user psychology and trust

✅ **Product-Related & Care-Based Suggestions**
- Help users protect what they bought
- Relevant accessories and care plans
- Educational approach, not force-selling

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and Install Dependencies**
```bash
npm run install-all
```

2. **Set Up Environment Variables**
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

3. **Seed the Database (Optional)**
```bash
npm run seed
```

4. **Start Development Servers**
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

## 📁 Project Structure

```
postcare-plus/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── utils/             # Helper functions
│   ├── seed.js            # Database seeding
│   └── index.js           # Server entry
├── .env.example
├── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 🎨 Features

### 1. Product Pages (No Monetisation)
- Clean product listings
- Simple add to cart
- No upselling or distractions

### 2. Checkout Page (No Monetisation)
- Straightforward checkout process
- No interruptions
- Focus on completing purchase

### 3. Thank You Page (Trust-First Monetisation)
- ✅ Order confirmation and tracking
- ✅ Educational flash cards
- ✅ Optional care-based suggestions
- ✅ Product-related accessories
- ✅ Protection plans
- ✅ Thank-you coupon

## 🧪 Example Flow

**iPhone Purchase Example:**

After buying an iPhone, users see:

1. **Order Confirmation** - Order ID, delivery date, tracking
2. **Educational Flash Cards** - Why protection matters
3. **Helpful Suggestions** (Optional):
   - 🛡️ AppleCare protection plan
   - 📱 Phone case & screen protector
   - 🔌 Certified charger
   - ☁️ iCloud storage subscription
4. **Thank-You Coupon** - 10% off future accessory purchases

## 📊 Success Metrics

- Opt-in rate for care plans & accessories
- Coupon redemption rate
- Repeat purchase rate
- User trust feedback

## 🔒 Privacy & Trust

- No forced upsells
- Clear, transparent pricing
- Easy to skip or dismiss
- Secure data handling
- GDPR compliant

## 🤝 Contributing

This is a hackathon project demonstrating ethical post-purchase monetisation.

## 📝 License

MIT License - See LICENSE file for details

---

**Built with trust and care** ❤️
