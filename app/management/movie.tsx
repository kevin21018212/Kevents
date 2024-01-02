"use client";
import { useState } from "react";

const CreateMovie = () => {
  const [formData, setFormData] = useState({
    movie_title: "",
    week: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addMovie = async () => {
    try {
      const queryParams = new URLSearchParams({
        title: formData.movie_title,
        week: formData.week,
      });

      const response = await fetch(`api/add/movie?${queryParams.toString()}`, {
        method: "GET",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h3>Add Movie</h3>
          <p>Add a new movie with the details below</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addMovie();
          }}
        >
          <label>
            Movie Title:
            <input
              type="text"
              name="movie_title"
              value={formData.movie_title}
              onChange={handleChange}
            />
          </label>
          <br />
          {/* URL input removed from the form */}
          <label>
            Week:
            <input
              type="text"
              name="week"
              value={formData.week}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;
