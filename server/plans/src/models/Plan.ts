import {
  timestamp,
  varchar,
  uuid,
  pgTable,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const interval = pgEnum("planInterval", ["month", "year"]);

export const plans = pgTable("plans", {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  quota: integer().notNull(),
  price: integer().notNull(),
  interval: interval().$default(() => "month"),
  currency: varchar({ length: 255 })
    .notNull()
    .$default(() => "USD"),
  createdAt: timestamp({ precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({ precision: 6, withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
