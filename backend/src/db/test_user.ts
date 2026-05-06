import { db } from "./index.ts";
import { usersTable } from "./schema.ts";
import bcrypt from "bcryptjs";

async function testUser() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  try {
    await db.insert(usersTable).values({
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: hashedPassword,
    });
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Failed to add admin user:", error);
  }
  process.exit();
}

testUser();