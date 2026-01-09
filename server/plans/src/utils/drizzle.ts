import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_PLANS!,
    ssl: false,
  },
});
