const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('../models/Plan');
const Reward = require('../models/Reward');
const Provider = require('../models/Provider');
const Deal = require('../models/Deal');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carsmartclub');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedPlans = async () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      billingCycle: 'monthly',
      features: [
        { name: 'Basic dashboard', description: 'Access to basic vehicle management' },
        { name: '1 offer/month', description: 'Limited deal access' },
        { name: '250 welcome points', description: 'Bonus points on signup' },
        { name: 'Access to evaluation tool', description: 'Car Smart Evaluation access' },
      ],
      pointsMultiplier: 1,
      maxVehicles: 1,
    },
    {
      name: 'Smart',
      price: 7.99,
      billingCycle: 'monthly',
      features: [
        { name: 'Unlimited deals', description: 'Access to all deals' },
        { name: 'Appointment booking', description: 'Book services directly' },
        { name: '1 free inspection/year', description: 'Annual vehicle inspection' },
        { name: 'Priority customer support', description: 'Faster response times' },
      ],
      pointsMultiplier: 1.1,
      maxVehicles: 2,
    },
    {
      name: 'Premium',
      price: 14.99,
      billingCycle: 'monthly',
      features: [
        { name: 'Everything in Smart', description: 'All Smart plan features' },
        { name: 'Priority booking', description: 'Book appointments first' },
        { name: 'Roadside assistance', description: '24/7 roadside help' },
        { name: 'Concierge service', description: 'Personalized assistance' },
        { name: 'Birthday rewards', description: 'Special birthday offers' },
      ],
      pointsMultiplier: 1.25,
      maxVehicles: 3,
    },
    {
      name: 'Family',
      price: 19.99,
      billingCycle: 'monthly',
      features: [
        { name: 'Everything in Premium', description: 'All Premium plan features' },
        { name: 'Covers up to 3 cars', description: 'Manage multiple vehicles' },
        { name: 'Loyalty points for each service', description: 'Points for every car' },
        { name: 'Family account management', description: 'Shared family dashboard' },
      ],
      pointsMultiplier: 1.3,
      maxVehicles: 3,
    },
  ];

  for (const plan of plans) {
    await Plan.findOneAndUpdate(
      { name: plan.name },
      plan,
      { upsert: true, new: true }
    );
  }
  console.log('Plans seeded');
};

const seedRewards = async () => {
  const rewards = [
    {
      name: 'Free Oil Change',
      description: 'Standard oil change service',
      category: 'Essential Maintenance',
      pointsRequired: 500,
      cashValue: 10,
      isActive: true,
    },
    {
      name: 'Tire Rotation',
      description: 'Professional tire rotation',
      category: 'Essential Maintenance',
      pointsRequired: 300,
      cashValue: 6,
      isActive: true,
    },
    {
      name: 'Car Wash & Vacuum',
      description: 'Full exterior wash and interior vacuum',
      category: 'Car Wash & Detailing',
      pointsRequired: 400,
      cashValue: 8,
      isActive: true,
    },
    {
      name: 'Premium Detailing',
      description: 'Full premium detailing service',
      category: 'Car Wash & Detailing',
      pointsRequired: 2000,
      cashValue: 40,
      isActive: true,
    },
    {
      name: '$10 Service Credit',
      description: 'Apply $10 credit to any service',
      category: 'Exclusive Discounts',
      pointsRequired: 500,
      cashValue: 10,
      isActive: true,
    },
    {
      name: '$25 Service Credit',
      description: 'Apply $25 credit to any service',
      category: 'Exclusive Discounts',
      pointsRequired: 1250,
      cashValue: 25,
      isActive: true,
    },
  ];

  for (const reward of rewards) {
    await Reward.findOneAndUpdate(
      { name: reward.name },
      reward,
      { upsert: true, new: true }
    );
  }
  console.log('Rewards seeded');
};

const seedProviders = async () => {
  const providers = [
    {
      name: 'AutoCare Plus',
      email: 'info@autocareplus.com',
      phone: '(555) 123-4567',
      address: {
        street: '123 Main St',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
      },
      services: ['Oil Change', 'Brake Service', 'Tire Service', 'Engine Repair'],
      rating: 4.9,
      reviewCount: 245,
      isVerified: true,
      description: 'Full-service auto repair shop with 20+ years of experience',
    },
    {
      name: 'Metro Tires & Service',
      email: 'contact@metrotires.com',
      phone: '(555) 234-5678',
      address: {
        street: '456 Oak Ave',
        city: 'Austin',
        state: 'TX',
        zipCode: '78702',
      },
      services: ['Tire Service', 'Brakes', 'Alignment', 'Wheel Balancing'],
      rating: 4.8,
      reviewCount: 189,
      isVerified: true,
      description: 'Specializing in tires, brakes, and wheel services',
    },
    {
      name: 'Elite Detailing',
      email: 'info@elitedetailing.com',
      phone: '(555) 345-6789',
      address: {
        street: '789 Pine Rd',
        city: 'Austin',
        state: 'TX',
        zipCode: '78703',
      },
      services: ['Car Wash', 'Detailing', 'Waxing', 'Interior Cleaning'],
      rating: 4.9,
      reviewCount: 312,
      isVerified: true,
      description: 'Premium car detailing and wash services',
    },
  ];

  for (const provider of providers) {
    await Provider.findOneAndUpdate(
      { email: provider.email },
      provider,
      { upsert: true, new: true }
    );
  }
  console.log('Providers seeded');
};

const seedDeals = async () => {
  const providers = await Provider.find();
  if (providers.length === 0) {
    console.log('No providers found. Please seed providers first.');
    return;
  }

  const deals = [
    {
      title: '20% off Oil Change',
      provider: providers[0]._id,
      description: 'Get 20% off your next oil change service',
      originalPrice: 89,
      discountPrice: 71,
      discountPercent: 20,
      category: 'Maintenance',
      isMemberExclusive: true,
      isActive: true,
    },
    {
      title: 'Free Car Wash with Brake Service',
      provider: providers[1]._id,
      description: 'Complimentary car wash with any brake service',
      originalPrice: 150,
      discountPrice: 120,
      discountPercent: 20,
      category: 'Maintenance',
      isMemberExclusive: false,
      isActive: true,
    },
    {
      title: '$30 Discount on Engine Diagnostics',
      provider: providers[0]._id,
      description: 'Save $30 on comprehensive engine diagnostics',
      originalPrice: 120,
      discountPrice: 90,
      discountPercent: 25,
      category: 'Diagnostics',
      isMemberExclusive: true,
      isActive: true,
    },
  ];

  for (const deal of deals) {
    await Deal.findOneAndUpdate(
      { title: deal.title, provider: deal.provider },
      deal,
      { upsert: true, new: true }
    );
  }
  console.log('Deals seeded');
};

const runSeed = async () => {
  await connectDB();
  await seedPlans();
  await seedRewards();
  await seedProviders();
  await seedDeals();
  console.log('Seeding completed!');
  process.exit(0);
};

runSeed();


