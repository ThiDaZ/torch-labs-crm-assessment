import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";

export const getAllUsersService = async () => {
  const users = await db.select(
    {
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    }
  ).from(usersTable);
  return users;
};