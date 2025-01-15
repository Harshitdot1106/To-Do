import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const TaskProgress = ({ progress }) => {
  // Calculate values from progress
  const completed = progress || 0;
  const remaining = 100 - completed;

  const data = [
    { name: "Remaining", value: remaining },
    { name: "Completed", value: completed }
  ];

  const COLORS = ["#4ade80", "#166534"];

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-sm font-medium mb-2">Task Progress</div>
      <div className="text-2xl font-bold mb-4">{`${completed}%`}</div>
      <div style={{ width: '200px', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};