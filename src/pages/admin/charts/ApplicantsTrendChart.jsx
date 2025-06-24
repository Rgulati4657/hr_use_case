// src/components/admin/charts/ApplicantsTrendChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', applicants: 35 },
  { name: 'Feb', applicants: 48 },
  { name: 'Mar', applicants: 60 },
  { name: 'Apr', applicants: 52 },
  { name: 'May', applicants: 81 },
  { name: 'Jun', applicants: 98 },
];

const ApplicantsTrendChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip wrapperStyle={{ zIndex: 100, background: '#fff', border: '1px solid #ccc', padding: '10px' }} />
        <Legend />
        <Line type="monotone" dataKey="applicants" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ApplicantsTrendChart;