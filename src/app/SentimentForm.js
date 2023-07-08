import React, { useState, useEffect } from "react";
import styles from "./SentimentForm.module.css";

const sentiments = ["Happy", "Sad", "Angry", "Relaxed", "Excited"];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SentimentForm = ({ onFormSubmit }) => {
  const [form, setForm] = useState(
    days.reduce((obj, day) => {
      obj[day] = sentiments.reduce((o, sentiment, index) => {
        o[sentiment] = index === 0 ? 1 : 0; // Set the first sentiment as initial state
        return o;
      }, {});
      return obj;
    }, {})
  );

  useEffect(() => {
    onFormSubmit(form);
  }, [form, onFormSubmit]);

  const handleInputChange = (day, sentiment, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [day]: { ...prevForm[day], [sentiment]: Number(value) },
    }));
  };

  return (
    <form className={styles.form}>
      {days.map((day) => (
        <div key={day} className={styles.dayContainer}>
          <h2 className={styles.day}>{day}</h2>
          {sentiments.map((sentiment) => (
            <div key={sentiment} className={styles.sentimentContainer}>
              <label>
                {sentiment}:
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={form[day][sentiment]}
                  onChange={(e) =>
                    handleInputChange(day, sentiment, e.target.value)
                  }
                />
                <span>{form[day][sentiment]}</span>
              </label>
            </div>
          ))}
        </div>
      ))}
    </form>
  );
};

export default SentimentForm;
