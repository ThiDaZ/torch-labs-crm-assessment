import { db } from "./index.ts";
import { usersTable } from "./schema.ts";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");
  const hashedPassword = await bcrypt.hash("password123", 10);

  try {
    await db.insert(usersTable).values({
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: hashedPassword,
    });
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Failed to seed. User might already exist.");
  }
  process.exit();
}

seed();