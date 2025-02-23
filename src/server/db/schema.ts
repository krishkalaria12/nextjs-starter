// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `next-starter_${name}`);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const user = createTable(
  "user",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: varchar("image", { length: 1024 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    emailIndex: index("email_idx").on(example.email),
  })
);

export const account = createTable(
  "account",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    accountId: varchar("account_id", { length: 256 }).notNull(),
    providerId: varchar("provider_id", { length: 256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull().references(() => user.id),
    accessToken: varchar("access_token", { length: 256 }),
    refreshToken: varchar("refresh_token", { length: 256 }),
    idToken: varchar("id_token", { length: 256 }),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
    scope: varchar("scope", { length: 256 }),
    password: varchar("password", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    accountIdIndex: index("account_id_idx").on(example.accountId),
    providerIdIndex: index("provider_id_idx").on(example.providerId),
    userIdIndex: index("user_id_idx").on(example.userId),
  })
);

export const session = createTable(
  "session",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    token: varchar("token", { length: 256 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    ipAddress: varchar("ip_address", { length: 256 }),
    userAgent: varchar("user_agent", { length: 512 }),
    userId: varchar("user_id", { length: 256 }).notNull().references(() => user.id),
  },
  (example) => ({
    tokenIndex: index("token_idx").on(example.token),
    userIdIndex: index("user_id_idx").on(example.userId),
  })
);

export const verification = createTable(
  "verification",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    identifier: varchar("identifier", { length: 256 }).notNull(),
    value: varchar("value", { length: 256 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    identifierIndex: index("identifier_idx").on(example.identifier),
  })
);