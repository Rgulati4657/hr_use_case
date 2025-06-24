// src/components/admin/charts/ApplicantSourceChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Company Website', value: 400 },
  { name: 'LinkedIn', value: 300 },
  { name: 'Indeed', value: 300 },
  { name: 'Referrals', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ApplicantSourceChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip wrapperStyle={{ zIndex: 100, background: '#fff', border: '1px solid #ccc', padding: '10px' }}/>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ApplicantSourceChart;