// // src/pages/superadmin/CompanyManagementPage.jsx
// import React, { useState, useMemo } from 'react';
// import { 
//   Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, IconButton, Tooltip, TextField, InputAdornment, Chip
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import BusinessIcon from '@mui/icons-material/Business'; // Icon for company name

// // We will use a placeholder for the form for now. We'll create it in the next task.
// // import CompanyForm from '../../components/superadmin/CompanyForm';
// // We will use the existing confirmation dialog.
// import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

// // MOCK DATA for companies
// const initialCompanies = [
//   { id: 'COMP-001', name: 'Innovate Inc.', admin: 'alice.admin@innovate.com', status: 'Active' },
//   { id: 'COMP-002', name: 'Tech Solutions LLC', admin: 'charlie.d@techllc.com', status: 'Active' },
//   { id: 'COMP-003', name: 'Synergy Corp', admin: 'frank.g@synergy.com', status: 'Inactive' },
//   { id: 'COMP-004', name: 'Quantum Enterprises', admin: 'heidi.k@quantum.com', status: 'Active' },
// ];

// const CompanyManagementPage = () => {
//   const [companies, setCompanies] = useState(initialCompanies);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [companyToDelete, setCompanyToDelete] = useState(null);

//   // --- Search and Filter Logic ---
//   const filteredCompanies = useMemo(() => {
//     if (!searchQuery) return companies;
//     const lowercasedQuery = searchQuery.toLowerCase();
//     return companies.filter(company => 
//       company.name.toLowerCase().includes(lowercasedQuery) ||
//       company.admin.toLowerCase().includes(lowercasedQuery)
//     );
//   }, [searchQuery, companies]);

//   // --- Dialog Handlers (we will add form dialog later) ---
//   const handleOpenConfirm = (company) => {
//     setCompanyToDelete(company);
//     setOpenConfirmDialog(true);
//   };
//   const handleCloseConfirm = () => {
//     setCompanyToDelete(null);
//     setOpenConfirmDialog(false);
//   };

//   // --- CRUD Logic (Simulated) ---
//   const handleDeleteCompany = () => {
//     setCompanies(companies.filter(c => c.id !== companyToDelete.id));
//     handleCloseConfirm();
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       {/* HEADER SECTION */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" component="h1" fontWeight="bold">Company Management</Typography>
//         <Button 
//           variant="contained" 
//           color="primary" // Use the theme's primary color
//           startIcon={<AddIcon />}
//         >
//           Add New Company
//         </Button>
//       </Box>

//       {/* SEARCH BAR */}
//       <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center' }} elevation={2}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search by company name or admin email..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Paper>

//       {/* COMPANIES TABLE */}
//       <TableContainer component={Paper} elevation={3}>
//         <Table sx={{ minWidth: 650 }} aria-label="company management table">
//           <TableHead sx={{ bgcolor: 'grey.100' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold' }}>Company ID</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Company Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Primary Admin</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredCompanies.map((company) => (
//               <TableRow key={company.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
//                 <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{company.id}</TableCell>
//                 <TableCell>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <BusinessIcon sx={{ mr: 1.5, color: 'action.active' }} />
//                     <Typography variant="body1" fontWeight="500">{company.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell>{company.admin}</TableCell>
//                 <TableCell>
//                   <Chip 
//                     label={company.status}
//                     color={company.status === 'Active' ? 'success' : 'error'}
//                     size="small"
//                   />
//                 </TableCell>
//                 <TableCell align="right">
//                   <Tooltip title="Edit Company">
//                     <IconButton aria-label="edit" color="primary"><EditIcon /></IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete Company">
//                     <IconButton onClick={() => handleOpenConfirm(company)} aria-label="delete" color="error"><DeleteIcon /></IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* CONFIRM DELETE MODAL */}
//       <ConfirmationDialog
//         open={openConfirmDialog}
//         onClose={handleCloseConfirm}
//         onConfirm={handleDeleteCompany}
//         title="Confirm Deletion"
//         contentText={`Are you sure you want to delete the company "${companyToDelete?.name}"? This action is permanent.`}
//       />
//     </Box>
//   );
// };

// export default CompanyManagementPage;



// src/pages/superadmin/CompanyManagementPage.jsx
import React, { useState, useMemo } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, Tooltip, TextField, InputAdornment, Chip,
  Dialog, DialogTitle, DialogContent, Slide
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import CompanyForm from '../../components/superadmin/CompanyForm'; // <-- IMPORT THE NEW FORM
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

const initialCompanies = [
  { id: 'COMP-001', name: 'Innovate Inc.', admin: 'alice.admin@innovate.com', status: 'Active' },
  { id: 'COMP-002', name: 'Tech Solutions LLC', admin: 'charlie.d@techllc.com', status: 'Active' },
  { id: 'COMP-003', name: 'Synergy Corp', admin: 'frank.g@synergy.com', status: 'Inactive' },
  { id: 'COMP-004', name: 'Quantum Enterprises', admin: 'heidi.k@quantum.com', status: 'Active' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CompanyManagementPage = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companies;
    const lowercasedQuery = searchQuery.toLowerCase();
    return companies.filter(company => 
      company.name.toLowerCase().includes(lowercasedQuery) ||
      company.admin.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, companies]);

  // --- Form Dialog Handlers ---
  const handleOpenForm = (company = null) => {
    setEditingCompany(company);
    setOpenFormDialog(true);
  };
  const handleCloseForm = () => {
    setOpenFormDialog(false);
    setEditingCompany(null);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Company form submitted!');
    // Add/edit logic would go here
    handleCloseForm();
  };

  // --- Confirmation Dialog Handlers ---
  const handleOpenConfirm = (company) => {
    setCompanyToDelete(company);
    setOpenConfirmDialog(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirmDialog(false);
    setCompanyToDelete(null);
  };
  const handleDeleteCompany = () => {
    setCompanies(companies.filter(c => c.id !== companyToDelete.id));
    handleCloseConfirm();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">Company Management</Typography>
        <Button onClick={() => handleOpenForm()} variant="contained" color="primary" startIcon={<AddIcon />}>
          Add New Company
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
        <TextField fullWidth variant="outlined" placeholder="Search by company name or admin email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>)}}/>
      </Paper>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.100' }}><TableRow><TableCell>Company ID</TableCell><TableCell>Company Name</TableCell><TableCell>Primary Admin</TableCell><TableCell>Status</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ fontFamily: 'monospace' }}>{company.id}</TableCell>
                <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}><BusinessIcon sx={{ mr: 1.5, color: 'action.active' }} /><Typography variant="body1">{company.name}</Typography></Box></TableCell>
                <TableCell>{company.admin}</TableCell>
                <TableCell><Chip label={company.status} color={company.status === 'Active' ? 'success' : 'error'} size="small" /></TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Company"><IconButton onClick={() => handleOpenForm(company)} color="primary"><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete Company"><IconButton onClick={() => handleOpenConfirm(company)} color="error"><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ADD/EDIT COMPANY MODAL */}
      <Dialog open={openFormDialog} onClose={handleCloseForm} TransitionComponent={Transition} PaperProps={{ sx: { borderRadius: '12px' } }} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
          {editingCompany ? 'Edit Company' : 'Add New Company'}
          <IconButton onClick={handleCloseForm}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <CompanyForm handleSubmit={handleFormSubmit} initialData={editingCompany || {}} />
        </DialogContent>
      </Dialog>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmationDialog open={openConfirmDialog} onClose={handleCloseConfirm} onConfirm={handleDeleteCompany} title="Confirm Deletion" contentText={`Are you sure you want to delete "${companyToDelete?.name}"? This is permanent.`}/>
    </Box>
  );
};

export default CompanyManagementPage;