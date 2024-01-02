import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const db = drizzle(sql);

// Types for Users table
export const Users = pgTable("Users", {
  user_id: serial("user_id").primaryKey(),
  username: text("username"),
  google_account_id: text("google_account_id"),
});

export type User = InferSelectModel<typeof Users>;
export type NewUser = InferInsertModel<typeof Users>;

// Types for Events table
export const Events = pgTable("Events", {
  event_id: serial("event_id").primaryKey(),
  event_name: text("event_name"),
  description: text("description"),
  week: integer("week"),
  imagepath: text("imagepath"),
  location: text("location"),
  url: text("url"),
  event_time: text("event_time"),
});

export type Event = InferSelectModel<typeof Events>;
export type NewEvent = InferInsertModel<typeof Events>;

// Types for Movies table
export const Movies = pgTable("Movies", {
  movie_id: serial("movie_id").primaryKey(),
  movie_title: text("movie_title").notNull(),
  url: text("url"),
  week: integer("week"),
});

export type Movie = InferSelectModel<typeof Movies>;
export type NewMovie = InferInsertModel<typeof Movies>;

// Types for Votes table
export const Votes = pgTable("Votes", {
  vote_id: serial("vote_id").primaryKey(),
  user_id: integer("user_id").references(() => Users.user_id),
  event_id: integer("event_id").references(() => Events.event_id),
  movie_id: integer("movie_id").references(() => Movies.movie_id),
  preferred_event_time: text("preferred_event_time"),
});

export type Vote = InferSelectModel<typeof Votes>;
export type NewVote = InferInsertModel<typeof Votes>;
