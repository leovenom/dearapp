import React, { useState } from "react";

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
      obj[day] = sentiments.reduce((o, sentiment) => {
        o[sentiment] = 0;
        return o;
      }, {});
      return obj;
    }, {})
  );

  const handleInputChange = (day, sentiment, value) => {
    setForm({ ...form, [day]: { ...form[day], [sentiment]: Number(value) } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {days.map((day) => (
        <div key={day}>
          <h2>{day}</h2>
          {sentiments.map((sentiment) => (
            <div key={sentiment}>
              <label>
                {sentiment}:
                <input
                  type="number"
                  value={form[day][sentiment]}
                  onChange={(e) =>
                    handleInputChange(day, sentiment, e.target.value)
                  }
                />
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
export default SentimentForm;
