import React, { useMemo, useState } from "react";

import useSWR from "swr";
import Quote from "./Quote";

import styles from "./Quotes.module.css";

type Quote = {
  name: string;
  message: string;
  time: string;
};

const calculateOffset = (days: number) => {
  const date = new Date();
  const offsetDate = new Date();
  offsetDate.setDate(date.getDate() + days);
  return offsetDate.toISOString().slice(0, -1);
};

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const Quotes = () => {
  const [after, setAfter] = useState<number>(7);
  const searchParams = useMemo(
    () => (after < 0 ? "" : "after=" + calculateOffset(-after)),
    [after]
  );

  const { data, error, isLoading } = useSWR<Quote[]>(
    `${import.meta.env.VITE_API}/quotes?${searchParams}`,
    fetcher
  );

  return (
    <>
      <div className={styles.info}>
        <h2 className={styles.heading}>Previous Quotes</h2>
        <select
          value={after}
          onChange={(e) => setAfter(parseInt(e.target.value))}
        >
          <option value={1}>Last Day</option>
          <option value={7}>Last Week</option>
          <option value={30}>Last Month</option>
          <option value={-1}>All Time</option>
        </select>
      </div>
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
