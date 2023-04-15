import type { FormEvent } from "react";
import React from "react";
import { useSWRConfig } from "swr";
import { useState } from "react";

import styles from "./NewQuote.module.css";

const NewQuote = () => {
  const { mutate } = useSWRConfig();
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

    mutate(
      (key) =>
        typeof key === "string" &&
        key.startsWith("http://localhost:8000/quotes")
    );

    e.preventDefault();
  };

  return (
    <>
      <h2 className={styles.heading}>Submit a quote</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
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
