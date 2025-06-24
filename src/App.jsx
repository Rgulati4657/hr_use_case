
import { Routes, Route, Router } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';

// Admin Pages
import AdminHomePage from './pages/admin/HomePage.jsx';
import JobManagementPage from './pages/admin/JobManagementPage.jsx';

// Public Pages & Reusable Components
import PublicJobListPage from './pages/applicant/PublicJobListPage.jsx';
import PublicJobDetailPage from './pages/applicant/PublicJobDetailPage.jsx';
import JobDetailView from './components/admin/JobDetailView.jsx'; // This is used by both admin and public
import ApplyPage from './pages/applicant/ApplyPage';
function App() {
  return (
    <Routes>
     <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicJobListPage />} />
          <Route path="/jobs" element={<PublicJobListPage />} />
          <Route path="/jobs/:jobId" element={<PublicJobDetailPage />} />
          <Route path="/apply/:jobId" element={<ApplyPage />} />
          {/* You would add the apply page route here too */}
          {/* <Route path="/apply/:jobId" element={<ApplyPage />} /> */}
        </Route>

        {/* Admin Recruiter Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="jobs" element={<JobManagementPage />} />
        </Route>

    </Routes>
  );
}

export default App;