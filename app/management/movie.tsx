"use client";
import { useState } from "react";

const CreateMovie = () => {
  const [formData, setFormData] = useState({
    movie_title: "",
    url: "",
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
        url: formData.url,
        week: formData.week,
      });

      const response = await fetch(`api/add/movie?${queryParams.toString()}`, {
        method: "GET",
      });

      if (response.ok) {
        // Movie added successfully, handle accordingly (e.g., show success message, redirect)
        console.log("Movie added successfully");
      } else {
        // Handle errors (e.g., show error message)
        console.error(response);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Add Movie</h3>
          <p className="text-sm text-gray-500">
            Add a new movie with the details below
          </p>
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
              required
            />
          </label>
          <br />
          <label>
            URL:
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </label>
          <br />
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
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;
