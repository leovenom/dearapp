"use client";
import React, { useState } from "react";
import SentimentForm from "./SentimentForm";
import SentimentChart from "./SentimentChart";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const [data, setData] = useState(null);
  const handleFormSubmit = (formData) => {
    setData(formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sentiment Tracker</h1>
      <br />
      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          <SentimentForm onFormSubmit={handleFormSubmit} />
          {/* {data && <SentimentChart data={data} />} */}
        </div>
      </div>
      <div className={styles.chartContainer}>
        {data && <SentimentChart data={data} />}
      </div>
    </div>
  );
};

export default LandingPage;
