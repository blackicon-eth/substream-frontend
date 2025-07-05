import { db } from "../index";
import { eq } from "drizzle-orm";
import { User, userTable } from "../schemas/db.schema";

/**
 * Get a user from their EVM address (which is the primary key)
 * @param address - The EVM address of the user
 * @returns The user item
 */
export const getUserFromAddress = async (address: string): Promise<User | undefined> => {
  const result = await db.query.user.findFirst({
    where: eq(userTable.evmAddress, address),
  });

  return result;
};

/**
 * Get a user from their subdomain
 * @param subdomain - The subdomain of the user
 * @returns The user item
 */
export const getUserFromSubdomain = async (subdomain: string): Promise<User | undefined> => {
  const result = await db.query.user.findFirst({
    where: eq(userTable.subdomain, subdomain),
  });

  return result;
};

/**
 * Get a user from their Intmax address
 * @param intmaxAddress - The Intmax address of the user
 * @returns The user item
 */
export const getUserFromIntmaxAddress = async (
  intmaxAddress: string
): Promise<User | undefined> => {
  const result = await db.query.user.findFirst({
    where: eq(userTable.intmaxAddress, intmaxAddress),
  });

  return result;
};

/**
 * Create a user in the database
 * @param user - The user to create
 * @returns The created user
 */
export const createUser = async (
  user: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> => {
  const result = await db.insert(userTable).values(user).returning();

  return result[0];
};

/**
 * Update a user in the database
 * @param address - The EVM address of the user
 * @param updates - The updates to apply to the user
 * @returns The updated user
 */
export const updateUser = async (address: string, updates: Partial<User>): Promise<User> => {
  const result = await db
    .update(userTable)
    .set(updates)
    .where(eq(userTable.evmAddress, address))
    .returning();

  return result[0];
};
