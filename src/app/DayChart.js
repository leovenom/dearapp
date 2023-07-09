import React, { useState } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import styles from "./Daychart.module.css";

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

function DayChart({ day, data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const dataForChart = Object.keys(data).map((sentiment) => {
    return {
      name: sentiment,
      value: data[sentiment] || 0,
    };
  });

  const data01 = dataForChart.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length],
  }));

  const data02 = dataForChart.map((entry, index) => ({
    ...entry,
    fill: "#82ca9d",
  }));

  return (
    <div className={styles.dayContainer}>
      <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>{day}</h2>
      <PieChart width={220} height={220}>
        <Pie
          data={dataForChart}
          cx={110}
          cy={110}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
        >
          {dataForChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default DayChart;
