import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  evmAddress: text("evm_address").primaryKey(),

  subdomain: text("subdomain"),
  intmaxAddress: text("intmax_address"),

  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export type User = typeof userTable.$inferSelect;
