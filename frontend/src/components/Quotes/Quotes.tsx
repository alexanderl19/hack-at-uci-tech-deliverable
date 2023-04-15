import React from "react";

import useSWR from "swr";
import Quote from "./Quote";

import styles from "./Quotes.module.css";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const Quotes = () => {
  type Quote = {
    name: string;
    message: string;
    time: string;
  };
  const { data, error, isLoading } = useSWR<Quote[]>(
    `http://localhost:8000/quotes?after=2022-11-03T20:23:54`,
    fetcher
  );

  return (
    <>
      <h2>Previous Quotes</h2>
      <div className={styles.quotes}>
        {data
          // Sort messages in decending order.
          ?.sort(
            (quoteA, quoteB) =>
              new Date(quoteB.time).valueOf() - new Date(quoteA.time).valueOf()
          )
          .map((quote) => (
            <Quote {...quote} />
          ))}
      </div>
    </>
  );
};

export default Quotes;
