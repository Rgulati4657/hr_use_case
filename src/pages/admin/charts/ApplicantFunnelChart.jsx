// // src/components/admin/charts/ApplicantFunnelChart.jsx
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Applied', value: 134 },
//   { name: 'Screened', value: 98 },
//   { name: 'Interview', value: 45 },
//   { name: 'Offered', value: 15 },
//   { name: 'Hired', value: 8 },
// ];

// const ApplicantFunnelChart = () => {
//   return (
//     // ResponsiveContainer makes the chart fit its parent container's size
//     <ResponsiveContainer width="100%" height="90%">
//       <BarChart
//         data={data}
//         layout="vertical" // Makes it a horizontal bar chart which works well for funnels
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis type="number" />
//         <YAxis dataKey="name" type="category" width={80} />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="value" fill="#8884d8" name="Candidates" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default ApplicantFunnelChart;

// src/components/admin/charts/ApplicantFunnelChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Applied', value: 134 },
  { name: 'Screened', value: 98 },
  { name: 'Interview', value: 45 },
  { name: 'Offered', value: 15 },
  { name: 'Hired', value: 8 },
];

const ApplicantFunnelChart = () => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={80} />
        <Tooltip wrapperStyle={{ zIndex: 100, background: '#fff', border: '1px solid #ccc', padding: '10px' }}/>
        <Legend />
        <Bar dataKey="value" fill="#8884d8" name="Candidates" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ApplicantFunnelChart;