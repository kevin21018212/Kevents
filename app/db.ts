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
  week: integer("week").notNull(),
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
  week: integer("week").notNull(),
});

export type Movie = InferSelectModel<typeof Movies>;
export type NewMovie = InferInsertModel<typeof Movies>;

// Types for EventVotes table
export const EventVotes = pgTable("EventVotes", {
  event_vote_id: serial("event_vote_id").primaryKey(),
  user_id: integer("user_id").references(() => Users.user_id),
  event_id: integer("event_id").references(() => Events.event_id),
  preferred_event_time: text("preferred_event_time"),
  week: integer("week").notNull(),
});

export type EventVote = InferSelectModel<typeof EventVotes>;
export type NewEventVote = InferInsertModel<typeof EventVotes>;

// Types for MovieVotes table
export const MovieVotes = pgTable("MovieVotes", {
  movie_vote_id: serial("movie_vote_id").primaryKey(),
  user_id: integer("user_id").references(() => Users.user_id),
  movie_id: integer("movie_id").references(() => Movies.movie_id),
  week: integer("week").notNull(),
});

export type MovieVote = InferSelectModel<typeof MovieVotes>;
export type NewMovieVote = InferInsertModel<typeof MovieVotes>;
