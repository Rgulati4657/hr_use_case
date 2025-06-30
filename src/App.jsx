
// import { Routes, Route } from 'react-router-dom';

// // Layouts
// import DashboardLayout from './layouts/DashboardLayout.jsx';
// import PublicLayout from './layouts/PublicLayout.jsx';

// // Admin Pages
// // import AdminHomePage from './pages/admin/HomePage.jsx';
// import JobManagementPage from './pages/admin/JobManagementPage.jsx';
// import AdminLoginPage from './pages/admin/AdminLoginPage';
// import HomePage from './pages/admin/HomePage.jsx';
// import PublicAuthLayout from './layouts/PublicAuthLayout'; // IMPORT NEW LAYOUT
// import LoginPage from './pages/applicant/LoginPage';       // IMPORT NEW PAGE
// import SignupPage from './pages/applicant/SignupPage';  
// // Public Pages & Reusable Components
// import PublicJobListPage from './pages/applicant/PublicJobListPage.jsx';
// import PublicJobDetailPage from './pages/applicant/PublicJobDetailPage.jsx';
// import JobDetailView from './components/admin/JobDetailView.jsx'; // This is used by both admin and public
// import ApplyPage from './pages/applicant/ApplyPage';
// // function App() {
// //   return (
// //     <Routes>
// //       {/* === Public Job Board Routes === */}
// //       <Route path="/" element={<PublicLayout />}>
// //         {/* ... your job board routes like PublicJobListPage, etc. ... */}
// //       </Route>

// //       {/* === Public Authentication Routes === */}
// //       {/* These use the new stylish layout */}
// //       <Route element={<PublicAuthLayout />}>
// //         <Route path="/login" element={<LoginPage />} />
// //         <Route path="/signup" element={<SignupPage />} />
// //       </Route>

// //       {/* === Admin Routes === */}
// //       <Route path="/admin/login" element={<AdminLoginPage />} />
// //       <Route path="/admin" element={<DashboardLayout />}>
// //         {/* ... your protected admin routes ... */}
// //       </Route>
// //     </Routes>
// //   );
// // }

// // export default App;

// // src/App.jsx
// import ProtectedRoute from './components/auth/ProtectedRoute';
// // import SuperAdminDashboard from './layouts/SuperAdminDashboard';
// import SuperAdminLayout from './layouts/SuperAdminLayout';
// import CompanyManagementPage from './pages/superadmin/CompanyManagementPage'; // The page for the superadmin
// import UserManagementPage from './pages/admin/UserManagementPage'; // The page for the admin


// function App() {
//   return (
//     <Routes>
//       {/* --- Public and Auth Routes (no protection needed) --- */}
//             <Route element={<PublicLayout />}>
//         <Route path="/jobs" element={<PublicJobListPage />} />
//         <Route path="/jobs/:jobId" element={<JobDetailView />} />
//       </Route>

//       <Route element={<PublicAuthLayout />}>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//       </Route>
//       <Route path="/admin/login" element={<AdminLoginPage />} />
//       <Route path="/unauthorized" element={<h1>403: Unauthorized</h1>} />

//       {/* --- SUPERADMIN Routes --- */}
//       <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
//         <Route path="/superadmin" element={<SuperAdminLayout />}>
//           <Route index element={<CompanyManagementPage />} />
//         </Route>
//       </Route>
      
//       {/* --- ADMIN & HR Routes (They share the same layout) --- */}
//       <Route element={<ProtectedRoute allowedRoles={['admin', 'hr']} />}>
//         <Route path="/admin" element={<DashboardLayout />}>
//           {/* HR-specific page */}
//           <Route path="jobs" element={<JobManagementPage />} />
          
//           {/* Admin-only page (nested check) */}
//           <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
//             <Route path="users" element={<UserManagementPage />} />
//           </Route>
//         </Route>
//       </Route>
//     </Routes>
//   );
// }

// export default App;





// src/App.jsx

import { Routes, Route } from 'react-router-dom'; // FIX: Removed unused 'Router' import

// --- Layouts ---
import DashboardLayout from './layouts/DashboardLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import PublicAuthLayout from './layouts/PublicAuthLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';

// --- Pages ---
import HomePage from './pages/admin/HomePage.jsx'; // FIX: Removed duplicate AdminHomePage import
import JobManagementPage from './pages/admin/JobManagementPage.jsx';
import UserManagementPage from './pages/admin/UserManagementPage';
import CompanyManagementPage from './pages/superadmin/CompanyManagementPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import LoginPage from './pages/applicant/LoginPage';
import SignupPage from './pages/applicant/SignupPage';
import PublicJobListPage from './pages/applicant/PublicJobListPage.jsx';
import JobDetailView from './components/admin/JobDetailView.jsx';
import ApplicantManagementPage from './pages/admin/ApplicantManagementPage'; // <-- IMPORT NEW PAGE

// --- Auth ---
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* --- Public and Guest Auth Routes --- */}
      <Route element={<PublicLayout />}>
        <Route path="/jobs" element={<PublicJobListPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailView />} />
      </Route>
      
      <Route element={<PublicAuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/unauthorized" element={<h1>403: Unauthorized Access</h1>} />

      {/* --- SUPERADMIN Routes (Protected) --- */}
      <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<CompanyManagementPage />} />
          {/* Add other superadmin-specific routes here, e.g., <Route path="settings" ... /> */}
        </Route>
      </Route>
      
      {/* --- ADMIN & HR Routes (Protected) --- */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'hr']} />}>
        <Route path="/admin" element={<DashboardLayout />}>
          {/* FIX: Added an index route to show a default page for /admin */}
          <Route index element={<HomePage />} />
          
          {/* Route accessible to both 'admin' and 'hr' */}
          <Route path="jobs" element={<JobManagementPage />} />
            <Route path="applicants" element={<ApplicantManagementPage />} />
          {/* Nested Protected Route, accessible ONLY to 'admin' */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="users" element={<UserManagementPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;