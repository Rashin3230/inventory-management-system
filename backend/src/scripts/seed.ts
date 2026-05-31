import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, "../../.env.local") });

const ADMIN_EMAIL = "admin@inventory.com";
const ADMIN_PASSWORD = "Admin@123";

async function seed() {
  const { connectDB, disconnectDB } = await import("@/lib/mongodb");
  const { User } = await import("@/models/User");
  const { Product } = await import("@/models/Product");
  const { hashPassword } = await import("@/lib/auth/password");
  const { USER_ROLES, PRODUCT_STATUS } = await import("@/utils/constants");

  console.log("Connecting to database...");
  await connectDB();

  const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

  if (existingAdmin) {
    console.log(`Admin user already exists: ${ADMIN_EMAIL}`);
  } else {
    const admin = await User.create({
      name: "System Administrator",
      email: ADMIN_EMAIL,
      password: await hashPassword(ADMIN_PASSWORD),
      role: USER_ROLES.ADMIN,
      isActive: true,
    });

    console.log("Admin user created successfully:");
    console.log(`  Email:    ${admin.email}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log(`  Role:     ${admin.role}`);
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany([
      {
        sku: "PRD-001",
        name: "Wireless Mouse",
        category: "Electronics",
        description: "Ergonomic wireless mouse",
        unit: "pcs",
        costPrice: 450,
        sellingPrice: 799,
        currentStock: 120,
        minimumStock: 20,
        status: PRODUCT_STATUS.ACTIVE,
      },
      {
        sku: "PRD-002",
        name: "A4 Paper Ream",
        category: "Office Supplies",
        description: "500 sheets A4 paper",
        unit: "ream",
        costPrice: 180,
        sellingPrice: 250,
        currentStock: 8,
        minimumStock: 15,
        status: PRODUCT_STATUS.ACTIVE,
      },
      {
        sku: "PRD-003",
        name: "Office Chair",
        category: "Furniture",
        description: "Adjustable office chair",
        unit: "pcs",
        costPrice: 3500,
        sellingPrice: 4999,
        currentStock: 5,
        minimumStock: 10,
        status: PRODUCT_STATUS.ACTIVE,
      },
      {
        sku: "PRD-004",
        name: "Screwdriver Set",
        category: "Hardware",
        description: "12-piece screwdriver set",
        unit: "set",
        costPrice: 320,
        sellingPrice: 499,
        currentStock: 3,
        minimumStock: 8,
        status: PRODUCT_STATUS.ACTIVE,
      },
    ]);
    console.log("Sample products seeded for dashboard demo");
  }

  const userCount = await User.countDocuments();
  console.log(`\nTotal users in database: ${userCount}`);
  console.log(`Total products in database: ${await Product.countDocuments()}`);

  await disconnectDB();
  console.log("\nSeed completed.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
