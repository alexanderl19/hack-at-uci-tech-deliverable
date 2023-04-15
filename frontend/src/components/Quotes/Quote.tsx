import React from "react";

interface QuoteProps {
  name: string;
  message: string;
  time: string;
}
const Quote = ({ name, message, time }: QuoteProps) => {
  return (
    <div className="message">
      <p>{name}</p>
      <p>{message}</p>
      <p>{time}</p>
    </div>
  );
};

export default Quote;
