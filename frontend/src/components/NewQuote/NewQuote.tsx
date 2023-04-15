import type { FormEvent } from "react";
import React from "react";
import { useState } from "react";

const NewQuote = () => {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);

    fetch("http://localhost:8000/quotes", {
      method: "POST",
      body: formData,
    });

    e.preventDefault();
  };

  return (
    <>
      <h2>Submit a quote</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-name">Name</label>
        <input
          id="input-name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="input-message">Quote</label>
        <input
          id="input-message"
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NewQuote;
