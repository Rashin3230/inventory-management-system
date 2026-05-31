import { config } from "dotenv";

config({ path: ".env.local" });

const ADMIN_EMAIL = "admin@inventory.com";
const ADMIN_PASSWORD = "Admin@123";

async function seed() {
  const { connectDB, disconnectDB } = await import("@/lib/mongodb");
  const { User } = await import("@/models/User");
  const { hashPassword } = await import("@/lib/auth/password");
  const { USER_ROLES } = await import("@/utils/constants");

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

  const userCount = await User.countDocuments();
  console.log(`\nTotal users in database: ${userCount}`);

  await disconnectDB();
  console.log("\nSeed completed.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
