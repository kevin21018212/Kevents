"use client";
import React, { useState, useEffect } from "react";
import styles from "./event.module.css";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    event_name: "",
    description: "",
    imagepath: "",
    week: 0,
    url: null,
    event_time: null,
    location: null,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addEvent = async () => {
    try {
      const queryParams = new URLSearchParams({
        name: formData.event_name,
        description: formData.description,
        imagepath: formData.imagepath,
        week: formData.week.toString(),
        url: formData.url || "",
        event_time: formData.event_time || "",
        location: formData.location || "",
      });

      const response = await fetch(`api/add/event?${queryParams.toString()}`, {
        method: "GET",
      });

      if (response.ok) {
        console.log("Event added successfully");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Add Event</h3>
        <p>Add a new event with the details below</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addEvent();
        }}
      >
        <label>
          Event Name:
          <input
            type="text"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image Path:
          <input
            type="text"
            name="imagepath"
            value={formData.imagepath}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Week:
          <input
            type="number"
            name="week"
            value={formData.week}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
