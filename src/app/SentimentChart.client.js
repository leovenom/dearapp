"use client";
import React, { useState } from "react";
import DayChart from "./DayChart";
import { PieChart, Pie, Cell, Sector, Circle, Legend } from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F", "#AF19FF"];

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
        stroke={fill}
        strokeWidth={2}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        stroke={fill}
        strokeWidth={2}
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

  const total = weekDataForChart.reduce((sum, entry) => sum + entry.value, 0);

  const weekDataWithPercentage = weekDataForChart.map((entry) => ({
    ...entry,
    percentage: ((entry.value / total) * 100).toFixed(2),
  }));

  const daysData = Object.keys(data).map((day) => ({
    day,
    data: data[day],
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "8px",
        }}
      >
        {daysData.map(({ day, data }) => (
          <DayChart key={day} day={day} data={data} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px",
          paddingTop: "60px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      >
        <h2>Week</h2>
        <PieChart width={600} height={400}>
          <Pie
            data={weekDataForChart}
            cx={200}
            cy={200}
            innerRadius={50}
            outerRadius={160}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
          >
            {weekDataForChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#color-${index})`}
                stroke={`url(#color-${index})`}
              />
            ))}
          </Pie>
          <Circle
            cx={200}
            cy={200}
            r={80}
            fill="#8884d8"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <defs>
            {weekDataForChart.map((entry, index) => (
              <linearGradient
                id={`color-${index}`}
                key={`gradient-${index}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={COLORS[index % COLORS.length]}
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor={COLORS[index % COLORS.length]}
                  stopOpacity={0.7}
                />
              </linearGradient>
            ))}
          </defs>
          <Legend
            iconSize={20}
            width={167}
            height={100}
            iconType="rect"
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value, entry) => {
              const sentimentEntry = weekDataWithPercentage.find(
                (item) => item.name === entry.payload.name
              );
              return `${value} (${
                sentimentEntry ? sentimentEntry.percentage : 0
              }%)`;
            }}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default SentimentChart;
