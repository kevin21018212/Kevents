"use client";
import React, { useState } from "react";
import { db, Movies } from "../db"; // Adjust the path

const CreateMovie = () => {
  const [movieData, setMovieData] = useState({
    movie_title: "",
    url: "",
    week: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  ("use server");
  const handleCreateMovie = async () => {
    try {
      // Validate input fields as needed
      if (!movieData.movie_title) {
        console.error("Movie title is required");
        return;
      }

      // Insert the new movie into the database
      await db.insert(Movies).values(movieData);

      // Optionally, you can redirect or perform other actions after creating the movie
      console.log("Movie created successfully!");

      // Clear the form fields after creating the movie
      setMovieData({
        movie_title: "",
        url: "",
        week: "",
      });
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div>
      <h2>Create Movie</h2>
      <form>
        <label>
          Movie Title:
          <input
            type="text"
            name="movie_title"
            value={movieData.movie_title}
            onChange={handleInputChange}
          />
        </label>
        {/* Add input fields for other properties like url, week, etc. */}
        <button type="button" onClick={handleCreateMovie}>
          Create Movie
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
