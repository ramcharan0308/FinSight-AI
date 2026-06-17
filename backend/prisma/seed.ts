import { PrismaClient, UserRole, TransactionType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.info('Starting database seeding...');

  // 1. Clean existing records in reverse dependency order
  console.info('Cleaning old database records...');
  await prisma.budget.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Hash passwords for deterministic security
  const saltRounds = 10;
  const adminPasswordHash = bcrypt.hashSync('adminsecret123', saltRounds);
  const userPasswordHash = bcrypt.hashSync('usersecret123', saltRounds);
  const testPasswordHash = bcrypt.hashSync('Test@123456', saltRounds);

  // 3. Create Sample Users
  console.info('Creating users...');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@finsight.ai',
      password: adminPasswordHash,
      name: 'System Admin',
      role: UserRole.ADMIN,
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'john.doe@finsight.ai',
      password: userPasswordHash,
      name: 'John Doe',
      role: UserRole.USER,
    },
  });

  const testUser = await prisma.user.create({
    data: {
      email: 'test@finsight.ai',
      password: testPasswordHash,
      name: 'Test User',
      role: UserRole.USER,
    },
  });

  console.info(`Created Users: Admin (ID: ${adminUser.id}), User (ID: ${regularUser.id}), Test User (ID: ${testUser.id})`);

  // 4. Create 10+ Categories
  console.info('Creating categories...');
  const categoriesData = [
    { name: 'Salary', icon: 'dollar-sign', color: '#10B981' },
    { name: 'Groceries', icon: 'shopping-cart', color: '#3B82F6' },
    { name: 'Rent & Housing', icon: 'home', color: '#6B7280' },
    { name: 'Utilities', icon: 'zap', color: '#F59E0B' },
    { name: 'Dining Out', icon: 'utensils', color: '#EF4444' },
    { name: 'Transport', icon: 'car', color: '#06B6D4' },
    { name: 'Entertainment', icon: 'film', color: '#8B5CF6' },
    { name: 'Health & Wellness', icon: 'heart', color: '#EC4899' },
    { name: 'Shopping', icon: 'shopping-bag', color: '#F472B6' },
    { name: 'Investments', icon: 'trending-up', color: '#10B981' },
    { name: 'Miscellaneous', icon: 'help-circle', color: '#9CA3AF' },
  ];

  const categoriesMap: Record<string, string> = {};

  for (const cat of categoriesData) {
    const createdCat = await prisma.category.create({
      data: cat,
    });
    categoriesMap[cat.name] = createdCat.id;
  }

  console.info(`Created ${Object.keys(categoriesMap).length} categories.`);

  // 5. Create 5+ Budgets for John Doe (Regular User)
  // We set budgets for the active period (April, May, June 2026)
  console.info('Creating budgets...');
  const budgetsData = [
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 500.00,
      startDate: new Date('2026-04-01T00:00:00Z'),
      endDate: new Date('2026-06-30T23:59:59Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Dining Out'],
      amount: 300.00,
      startDate: new Date('2026-04-01T00:00:00Z'),
      endDate: new Date('2026-06-30T23:59:59Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Transport'],
      amount: 200.00,
      startDate: new Date('2026-04-01T00:00:00Z'),
      endDate: new Date('2026-06-30T23:59:59Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Utilities'],
      amount: 150.00,
      startDate: new Date('2026-04-01T00:00:00Z'),
      endDate: new Date('2026-06-30T23:59:59Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Entertainment'],
      amount: 250.00,
      startDate: new Date('2026-04-01T00:00:00Z'),
      endDate: new Date('2026-06-30T23:59:59Z'),
    },
  ];

  for (const budget of budgetsData) {
    await prisma.budget.create({
      data: budget,
    });
    await prisma.budget.create({
      data: {
        ...budget,
        userId: testUser.id,
      },
    });
  }

  console.info('Created budgets.');

  // 6. Create 30+ Transactions across 3 months (April, May, and June 2026) for John Doe
  console.info('Creating transactions...');
  const transactionsData = [
    // --- APRIL 2026 ---
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Salary'],
      amount: 4500.00,
      type: TransactionType.INCOME,
      description: 'Monthly Paycheck April',
      date: new Date('2026-04-01T09:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Rent & Housing'],
      amount: 1200.00,
      type: TransactionType.EXPENSE,
      description: 'April Apartment Rent',
      date: new Date('2026-04-02T10:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 124.50,
      type: TransactionType.EXPENSE,
      description: 'Weekly Organic Mart run',
      date: new Date('2026-04-04T15:30:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Transport'],
      amount: 45.00,
      type: TransactionType.EXPENSE,
      description: 'Monthly Subway pass reload',
      date: new Date('2026-04-05T08:30:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Dining Out'],
      amount: 72.80,
      type: TransactionType.EXPENSE,
      description: 'Weekend sushi dinner with family',
      date: new Date('2026-04-08T20:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Utilities'],
      amount: 85.20,
      type: TransactionType.EXPENSE,
      description: 'Electricity & Gas bill',
      date: new Date('2026-04-10T12:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 110.20,
      type: TransactionType.EXPENSE,
      description: 'Mid-month grocery pickup',
      date: new Date('2026-04-12T14:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Entertainment'],
      amount: 14.99,
      type: TransactionType.EXPENSE,
      description: 'Streaming service subscription',
      date: new Date('2026-04-15T06:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Dining Out'],
      amount: 32.50,
      type: TransactionType.EXPENSE,
      description: 'Office lunch salads',
      date: new Date('2026-04-18T13:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Investments'],
      amount: 250.00,
      type: TransactionType.EXPENSE,
      description: 'Automated ETF index stock buy',
      date: new Date('2026-04-20T08:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Shopping'],
      amount: 89.90,
      type: TransactionType.EXPENSE,
      description: 'Running shoes discount sale',
      date: new Date('2026-04-22T17:45:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Health & Wellness'],
      amount: 60.00,
      type: TransactionType.EXPENSE,
      description: 'Monthly gym membership',
      date: new Date('2026-04-25T07:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 95.10,
      type: TransactionType.EXPENSE,
      description: 'Weekend fresh produce market',
      date: new Date('2026-04-28T10:15:00Z'),
    },

    // --- MAY 2026 ---
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Salary'],
      amount: 4500.00,
      type: TransactionType.INCOME,
      description: 'Monthly Paycheck May',
      date: new Date('2026-05-01T09:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Rent & Housing'],
      amount: 1200.00,
      type: TransactionType.EXPENSE,
      description: 'May Apartment Rent',
      date: new Date('2026-05-02T10:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 145.00,
      type: TransactionType.EXPENSE,
      description: 'Weekly wholefoods inventory',
      date: new Date('2026-05-03T11:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Transport'],
      amount: 52.00,
      type: TransactionType.EXPENSE,
      description: 'Rideshare services to airport',
      date: new Date('2026-05-05T05:30:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Dining Out'],
      amount: 120.00,
      type: TransactionType.EXPENSE,
      description: 'Birthday celebration dinner',
      date: new Date('2026-05-09T20:30:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Utilities'],
      amount: 92.40,
      type: TransactionType.EXPENSE,
      description: 'Power and internet bills',
      date: new Date('2026-05-11T12:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 112.90,
      type: TransactionType.EXPENSE,
      description: 'Pantry restocking run',
      date: new Date('2026-05-15T15:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Entertainment'],
      amount: 14.99,
      type: TransactionType.EXPENSE,
      description: 'Streaming service subscription',
      date: new Date('2026-05-15T06:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Entertainment'],
      amount: 45.00,
      type: TransactionType.EXPENSE,
      description: 'Cinema tickets and snacks',
      date: new Date('2026-05-18T19:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Investments'],
      amount: 250.00,
      type: TransactionType.EXPENSE,
      description: 'Automated ETF index stock buy',
      date: new Date('2026-05-20T08:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Shopping'],
      amount: 140.00,
      type: TransactionType.EXPENSE,
      description: 'New mechanical keyboard build',
      date: new Date('2026-05-22T14:30:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Health & Wellness'],
      amount: 60.00,
      type: TransactionType.EXPENSE,
      description: 'Monthly gym membership',
      date: new Date('2026-05-25T07:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 88.40,
      type: TransactionType.EXPENSE,
      description: 'Farmers market veggies',
      date: new Date('2026-05-29T10:00:00Z'),
    },

    // --- JUNE 2026 (Active/Current Month) ---
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Salary'],
      amount: 4500.00,
      type: TransactionType.INCOME,
      description: 'Monthly Paycheck June',
      date: new Date('2026-06-01T09:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Rent & Housing'],
      amount: 1200.00,
      type: TransactionType.EXPENSE,
      description: 'June Apartment Rent',
      date: new Date('2026-06-02T10:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 135.20,
      type: TransactionType.EXPENSE,
      description: 'Stocking up kitchen items',
      date: new Date('2026-06-03T16:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Transport'],
      amount: 45.00,
      type: TransactionType.EXPENSE,
      description: 'Subway pass card refill',
      date: new Date('2026-06-04T08:15:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Dining Out'],
      amount: 84.10,
      type: TransactionType.EXPENSE,
      description: 'Bistro restaurant client lunch',
      date: new Date('2026-06-06T13:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Utilities'],
      amount: 98.70,
      type: TransactionType.EXPENSE,
      description: 'Water and Heating bills',
      date: new Date('2026-06-10T12:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Groceries'],
      amount: 98.40,
      type: TransactionType.EXPENSE,
      description: 'Mid-week produce purchase',
      date: new Date('2026-06-12T17:30:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Entertainment'],
      amount: 14.99,
      type: TransactionType.EXPENSE,
      description: 'Streaming service subscription',
      date: new Date('2026-06-15T06:00:00Z'),
    },
    {
      userId: regularUser.id,
      categoryId: categoriesMap['Investments'],
      amount: 250.00,
      type: TransactionType.EXPENSE,
      description: 'Automated ETF index stock buy',
      date: new Date('2026-06-20T08:00:00Z'),
    },
  ];

  for (const trans of transactionsData) {
    await prisma.transaction.create({
      data: trans,
    });
    await prisma.transaction.create({
      data: {
        ...trans,
        userId: testUser.id,
      },
    });
  }

  console.info(`Created ${transactionsData.length} transactions.`);
  console.info('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding process encountered an error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
