import React, { useState } from "react";
import DayChart from "./DayChart";
import { PieChart } from "react-minimal-pie-chart";
import { Pie, Cell, Sector } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <text x={cx} y={cy} dy={-8} textAnchor="middle" fill={fill}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export const SentimentChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const weekData = {};

  for (const day in data) {
    for (const sentiment in data[day]) {
      weekData[sentiment] = (weekData[sentiment] || 0) + data[day][sentiment];
    }
  }

  const weekDataForChart = Object.keys(weekData).map((sentiment) => {
    return {
      name: sentiment,
      value: weekData[sentiment] || 0,
    };
  });

  const daysData = Object.keys(data).map((day) => ({
    day,
    data: data[day],
  }));

  return (
    <div>
      {daysData.map(({ day, data }) => (
        <DayChart key={day} day={day} data={data} />
      ))}
      <h2>Week</h2>
      <PieChart width={400} height={200}>
        <Pie
          data={weekDataForChart}
          cx={120}
          cy={100}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
        >
          {weekDataForChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
export default SentimentChart;
