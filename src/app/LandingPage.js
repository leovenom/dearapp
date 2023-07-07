"use client";
import React, { useState } from "react";
import SentimentForm from "./SentimentForm";
import SentimentChart from "./SentimentChart";

const LandingPage = () => {
  const [data, setData] = useState(null);
  const handleFormSubmit = (formData) => {
    setData(formData);
  };

  return (
    <div>
      <h1>Sentiment Tracker</h1>
      <SentimentForm onFormSubmit={handleFormSubmit} />
      {data && <SentimentChart data={data} />}
    </div>
  );
};

export default LandingPage;
