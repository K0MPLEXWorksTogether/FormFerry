import { timestamp, uuid, pgTable, pgEnum } from "drizzle-orm/pg-core";
import { plans } from "./Plan";

export const subscriptionStatus = pgEnum("subscriptionStatus", [
  "active",
  "pastDue",
  "cancelled",
]);

export const subscriptions = pgTable("subscriptions", {
  id: uuid().primaryKey(),
  userId: uuid().notNull(),
  planId: uuid()
    .notNull()
    .references(() => plans.id),
  startDate: timestamp({ precision: 6, withTimezone: true })
    .notNull()
    .$default(() => new Date()),
  cancelAt: timestamp({ precision: 6, withTimezone: true }).notNull(),
  cancelledAt: timestamp({ precision: 6, withTimezone: true }).notNull(),
  status: subscriptionStatus().notNull(),
  createdAt: timestamp({ precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({ precision: 6, withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
