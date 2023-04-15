import React from "react";

import styles from "./Quote.module.css";

interface QuoteProps {
  name: string;
  message: string;
  time: string;
}
const Quote = ({ name, message, time }: QuoteProps) => {
  return (
    <div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <time className={styles.time} dateTime={time}>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "medium",
          }).format(new Date(time))}
        </time>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Quote;
