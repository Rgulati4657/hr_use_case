

// import { Grid, Paper, Typography, Box } from '@mui/material';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import PeopleIcon from '@mui/icons-material/People';
// import WorkIcon from '@mui/icons-material/Work';
// import VisibilityIcon from '@mui/icons-material/Visibility'; // <-- ADD THIS LINE
// import TimerIcon from '@mui/icons-material/Timer';   

// // ADD THIS IMPORT LINE:
// import ApplicantFunnelChart from './charts/ApplicantFunnelChart';
// import ApplicantSourceChart from './charts/ApplicantSourceChart';
// import ApplicantsTrendChart from './charts/ApplicantsTrendChart';

// // A simple component for our statistic cards
// const StatCard = ({ title, value, icon, color }) => (
//   <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
//     <Box sx={{ p: 1.5, borderRadius: '50%', backgroundColor: color, color: 'white', mr: 2 }}>
//       {icon}
//     </Box>
//     <Box>
//       <Typography color="text.secondary">{title}</Typography>
//       <Typography variant="h5" component="div" fontWeight="bold">{value}</Typography>
//     </Box>
//   </Paper>
// );

// const HomePage = () => {

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Dashboard Analytics
//       </Typography>

//       {/* Top Row: The Key Metrics */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard title="Active Jobs" value="12" icon={<WorkIcon />} color="primary.main" />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard title="New Applicants (7d)" value="28" icon={<PeopleIcon />} color="success.main" />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard title="Pending Review" value="15" icon={<VisibilityIcon />} color="warning.main" />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard title="Avg. Time to Hire" value="21 days" icon={<TimerIcon />} color="error.main" />
//         </Grid>
//       </Grid>

//       {/* Main Content Area with all charts */}
//       <Grid container spacing={3}>
        
//         {/* Main large chart: Trend over time */}
//         <Grid item xs={12} lg={8}>
//           <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
//             <Typography variant="h6" gutterBottom>Applicants per Month</Typography>
//             <ApplicantsTrendChart /> {/* UPDATED to use Line Chart */}
//           </Paper>
//         </Grid>

//         {/* Right-side smaller chart: Applicant Sources */}
//         <Grid item xs={12} lg={4}>
//           <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
//             <Typography variant="h6" gutterBottom>Applicant Sources</Typography>
//             <ApplicantSourceChart /> {/* NEW Pie Chart */}
//           </Paper>
//         </Grid>

//         {/* Bottom full-width chart: The Funnel */}
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 2, height: '350px' }}>
//             <Typography variant="h6" gutterBottom>Hiring Funnel</Typography>
//             <ApplicantFunnelChart /> {/* MOVED the Funnel Chart here */}
//           </Paper>
//         </Grid>

//       </Grid>
//     </Box>
//   );
// };

// export default HomePage;





// import { Grid, Paper, Typography, Box } from '@mui/material';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import PeopleIcon from '@mui/icons-material/People';
// import WorkIcon from '@mui/icons-material/Work';
// import VisibilityIcon from '@mui/icons-material/Visibility'; // <-- ADD THIS LINE
// import TimerIcon from '@mui/icons-material/Timer';   

// // ADD THIS IMPORT LINE:
// import ApplicantFunnelChart from './charts/ApplicantFunnelChart';
// import ApplicantSourceChart from './charts/ApplicantSourceChart';
// import ApplicantsTrendChart from './charts/ApplicantsTrendChart';

// // A simple component for our statistic cards


// const HomePage = () => {
// const StatCard = ({ title, value, icon, color }) => (
//   <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
//     <Box sx={{ p: 1.5, borderRadius: '50%', backgroundColor: color, color: 'white', mr: 2 }}>
//       {icon}
//     </Box>
//     <Box>
//       <Typography color="text.secondary">{title}</Typography>
//       <Typography variant="h5" component="div" fontWeight="bold">{value}</Typography>
//     </Box>
//   </Paper>
// );
// //    return (
// //     <Box>
// //       <Typography variant="h4" fontWeight="bold" gutterBottom>
// //         Dashboard Analytics
// //       </Typography>

// //       {/* --- TOP ROW: KEY METRICS --- */}
// //       <Grid container spacing={3} sx={{ mb: 4 }}>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <StatCard title="Active Jobs" value="12" icon={<WorkIcon />} color="error.main" />
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <StatCard title="New Applicants (7d)" value="28" icon={<PeopleIcon />} color="success.main" />
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <StatCard title="Pending Review" value="15" icon={<VisibilityIcon />} color="warning.main" />
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <StatCard title="Avg. Time to Hire" value="21 days" icon={<TimerIcon />} color="info.main" />
// //         </Grid>
// //       </Grid>

// //       {/* --- MAIN CHARTING AREA --- */}
// //       <Grid container spacing={3}>

// //         {/* --- Left Column: Trend Chart (Takes more space) --- */}
// //         <Grid item xs={12} lg={8}>
// //           <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
// //             <Typography variant="h6" gutterBottom>Applicants per Month</Typography>
// //             <ApplicantsTrendChart />
// //           </Paper>
// //         </Grid>

// //         {/* --- Right Column: Sources Chart --- */}
// //         <Grid item xs={12} lg={4}>
// //           <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
// //             <Typography variant="h6" gutterBottom>Applicant Sources</Typography>
// //             <ApplicantSourceChart />
// //           </Paper>
// //         </Grid>

// //         {/* --- Bottom Full-Width Row: Hiring Funnel --- */}
// //         <Grid item xs={12}>
// //           <Paper elevation={3} sx={{ p: 2, height: '350px' }}>
// //             <Typography variant="h6" gutterBottom>Hiring Funnel</Typography>
// //             <ApplicantFunnelChart />
// //           </Paper>
// //         </Grid>

// //       </Grid>
// //     </Box>
// //   );

// // =================== A MORE BALANCED LAYOUT FOR HomePage.jsx ===================
// return (
//     <Box>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         Dashboard Analytics
//       </Typography>

//       {/* --- TOP ROW: KEY METRICS (No change here) --- */}
//       <Grid container spacing={4} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}><StatCard title="Active Jobs" value="12" icon={<WorkIcon />} color="error.main" />
// </Grid>
//         <Grid item xs={12} sm={6} md={3}><StatCard title="New Applicants (7d)" value="28" icon={<PeopleIcon />} color="success.main" />
// </Grid>
//         <Grid item xs={12} sm={6} md={3}><StatCard title="Pending Review" value="15" icon={<VisibilityIcon />} color="warning.main" />
// </Grid>
//         <Grid item xs={12} sm={6} md={3}><StatCard title="Avg. Time to Hire" value="21 days" icon={<TimerIcon />} color="info.main" />
// </Grid>
//       </Grid>

//       {/* --- MAIN CONTENT AREA: TWO-COLUMN LAYOUT --- */}
//       <Grid container spacing={4}>

//         {/* --- LEFT (MAIN) COLUMN --- */}
//         <Grid item xs={12} lg={8}>
//           <Grid container spacing={3}>
//             {/* Top-Left: Trend Chart */}
//             <Grid item xs={12}>
//               <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
//                 <Typography variant="h6" gutterBottom>Applicants per Month</Typography>
//                 <ApplicantsTrendChart />
//               </Paper>
//             </Grid>
//             {/* Bottom-Left: Hiring Funnel */}
//             <Grid item xs={12}>
//               <Paper elevation={3} sx={{ p: 2, height: '350px' }}>
//                 <Typography variant="h6" gutterBottom>Hiring Funnel</Typography>
//                 <ApplicantFunnelChart />
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* --- RIGHT (SIDEBAR) COLUMN --- */}
//         <Grid item xs={12} lg={4}>
//           <Grid container spacing={3}>
//             {/* Top-Right: Sources Pie Chart */}
//             <Grid item xs={12}>
//               <Paper elevation={3} sx={{ p: 2, height: '370px' }}>
//                 <Typography variant="h6" gutterBottom>Applicant Sources</Typography>
//                 <ApplicantSourceChart />
//               </Paper>
//             </Grid>
//             {/* Bottom-Right: A new placeholder for an activity feed */}
//             <Grid item xs={12}>
//               <Paper elevation={3} sx={{ p: 2, height: '355px' }}>
//                 <Typography variant="h6" gutterBottom>Recent Activity</Typography>
//                 <Box sx={{ mt: 2, color: 'text.secondary' }}>
//                   <p>• Jane Doe applied for Software Engineer.</p>
//                   <p>• John Smith was moved to the interview stage.</p>
//                   <p>• New Job "UX Designer" was posted.</p>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>

//       </Grid>
//     </Box>
// );
// // =================== END OF REPLACEMENT ===================

// };

// export default HomePage;











// src/pages/admin/HomePage.jsx

import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TimerIcon from '@mui/icons-material/Timer';

// Import our new API functions
import { getJobFunnelAnalytics } from '../../api/apiService.js';

// Import your chart components
import ApplicantFunnelChart from './charts/ApplicantFunnelChart';
import ApplicantSourceChart from './charts/ApplicantSourceChart';
import ApplicantsTrendChart from './charts/ApplicantsTrendChart';

// Reusable StatCard component
const StatCard = ({ title, value, icon, color }) => (
  <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
    <Box sx={{ p: 1.5, borderRadius: '50%', backgroundColor: color, color: 'white', mr: 2 }}>{icon}</Box>
    <Box>
      <Typography color="text.secondary">{title}</Typography>
      <Typography variant="h5" component="div" fontWeight="bold">{value}</Typography>
    </Box>
  </Paper>
);

const HomePage = () => {
    // State to hold our fetched data
    const [funnelData, setFunnelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // For now, let's fetch analytics for a hardcoded job ID (e.g., job 1).
                // In the future, this could be a dropdown or based on the most active job.
                const funnelResult = await getJobFunnelAnalytics(1); 
                setFunnelData(funnelResult.funnel);
                
            } catch (err) {
                setError("Could not load dashboard analytics. Is the ATS server running?");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty array ensures this runs only once on mount

    // We can derive some stats from the funnel data
    const newApplicants = funnelData?.APPLIED || 0;
    const pendingReview = (funnelData?.APPLIED || 0) - (funnelData?.SCREENING || 0);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
    }
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dashboard Analytics
            </Typography>

            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}><StatCard title="Active Jobs" value="12" icon={<WorkIcon />} color="error.main" /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard title="New Applicants" value={newApplicants} icon={<PeopleIcon />} color="success.main" /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard title="Pending Review" value={pendingReview} icon={<VisibilityIcon />} color="warning.main" /></Grid>
                <Grid item xs={12} sm={6} md={3}><StatCard title="Avg. Time to Hire" value="21 days" icon={<TimerIcon />} color="info.main" /></Grid>
            </Grid>

            <Grid container spacing={4}>
                {/* --- LEFT (MAIN) COLUMN --- */}
                <Grid item xs={12} lg={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
                                <Typography variant="h6" gutterBottom>Applicants per Month</Typography>
                                {/* Pass real data when available */}
                                <ApplicantsTrendChart /> 
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, height: '350px' }}>
                                <Typography variant="h6" gutterBottom>Hiring Funnel (for Job ID: 1)</Typography>
                                {/* Pass the fetched funnel data to the chart component */}
                                <ApplicantFunnelChart data={funnelData} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* --- RIGHT (SIDEBAR) COLUMN --- */}
                <Grid item xs={12} lg={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, height: '370px' }}>
                                <Typography variant="h6" gutterBottom>Applicant Sources</Typography>
                                <ApplicantSourceChart />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, height: '355px' }}>
                                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                                <Box sx={{ mt: 2, color: 'text.secondary' }}>
                                    {/* This can be made dynamic later */}
                                    <p>• Jane Doe applied for Software Engineer.</p>
                                    <p>• John Smith was moved to the interview stage.</p>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;