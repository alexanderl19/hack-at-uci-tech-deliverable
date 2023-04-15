import React from "react";

import useSWR from "swr";
import Quote from "./Quote";

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
      {data?.map((quote) => (
        <Quote {...quote} />
      ))}
    </>
  );
};

export default Quotes;
