// // src/pages/admin/UserManagementPage.jsx
// import React from 'react';
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   Paper, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   IconButton 
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// // MOCK DATA: This simulates the data you would get from your backend API.
// // We will replace this later.
// const mockUsers = [
//   { id: 1, name: 'Bob Johnson', email: 'bob.j@examplecorp.com', role: 'HR' },
//   { id: 2, name: 'Carol Williams', email: 'carol.w@examplecorp.com', role: 'HR' },
//   { id: 3, name: 'David Smith', email: 'david.s@examplecorp.com', role: 'HR' },
//   { id: 4, name: 'Eve Brown', email: 'eve.b@examplecorp.com', role: 'HR' },
// ];

// const UserManagementPage = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       {/* =======================
//           HEADER SECTION
//       ======================== */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" component="h1" fontWeight="bold">
//           User Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{
//             bgcolor: '#d32f2f', // Your brand's red color
//             '&:hover': {
//               bgcolor: '#b71c1c', // Darker red for hover
//             },
//             textTransform: 'none',
//             fontSize: '1rem',
//             px: 3,
//             py: 1,
//           }}
//         >
//           Add New HR User
//         </Button>
//       </Box>

//       {/* =======================
//           USERS TABLE
//       ======================== */}
//       <TableContainer component={Paper} elevation={3}>
//         <Table sx={{ minWidth: 650 }} aria-label="user management table">
//           <TableHead sx={{ bgcolor: 'grey.100' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {mockUsers.map((user) => (
//               <TableRow
//                 key={user.id}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'grey.50' } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {user.name}
//                 </TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   <Box component="span" sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', px: 1, py: 0.5, borderRadius: '12px', fontSize: '0.75rem' }}>
//                     {user.role}
//                   </Box>
//                 </TableCell>
//                 <TableCell align="right">
//                   <IconButton aria-label="edit" color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton aria-label="delete" color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default UserManagementPage;

// // src/pages/admin/UserManagementPage.jsx
// import React, { useState } from 'react';
// import { 
//   Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Slide 
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import UserForm from '../../components/admin/UserForm'; // <-- IMPORT THE NEW FORM

// // MOCK DATA
// const mockUsers = [
//   { id: 1, name: 'Bob Johnson', email: 'bob.j@examplecorp.com', role: 'HR' },
//   { id: 2, name: 'Carol Williams', email: 'carol.w@examplecorp.com', role: 'HR' },
//   { id: 3, name: 'David Smith', email: 'david.s@examplecorp.com', role: 'HR' },
//   { id: 4, name: 'Eve Brown', email: 'eve.b@examplecorp.com', role: 'HR' },
// ];

// // For the slide-up transition of the modal
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const UserManagementPage = () => {
//   const [open, setOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   const handleOpen = (user = null) => {
//     setEditingUser(user); // If user is null, it's 'Add' mode. Otherwise, 'Edit' mode.
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingUser(null);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const userData = {
//       name: formData.get('name'),
//       email: formData.get('email'),
//     };
//     if (editingUser) {
//       console.log('UPDATING USER:', { id: editingUser.id, ...userData });
//     } else {
//       console.log('CREATING NEW USER:', userData);
//     }
//     handleClose(); // Close the modal after submission
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* HEADER SECTION - no changes here */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" component="h1" fontWeight="bold">
//           User Management
//         </Typography>
//         <Button onClick={() => handleOpen()} variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' }, textTransform: 'none', fontSize: '1rem', px: 3, py: 1 }}>
//           Add New HR User
//         </Button>
//       </Box>

//       {/* USERS TABLE - added onClick to the edit button */}
//       <TableContainer component={Paper} elevation={3}>
//         <Table sx={{ minWidth: 650 }} aria-label="user management table">
//           <TableHead sx={{ bgcolor: 'grey.100' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {mockUsers.map((user) => (
//               <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'grey.50' } }}>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   <Box component="span" sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', px: 1, py: 0.5, borderRadius: '12px', fontSize: '0.75rem' }}>{user.role}</Box>
//                 </TableCell>
//                 <TableCell align="right">
//                   <IconButton onClick={() => handleOpen(user)} aria-label="edit" color="primary"><EditIcon /></IconButton>
//                   <IconButton aria-label="delete" color="error"><DeleteIcon /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* =======================
//           ADD/EDIT USER DIALOG (MODAL)
//       ======================== */}
//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-describedby="add-edit-user-dialog"
//       >
//         <DialogTitle sx={{ fontWeight: 'bold' }}>
//           {editingUser ? 'Edit HR User' : 'Add New HR User'}
//         </DialogTitle>
//         <DialogContent>
//           <UserForm 
//             handleSubmit={handleFormSubmit} 
//             initialData={editingUser || {}} 
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default UserManagementPage;

// src/pages/admin/UserManagementPage.jsx// src/pages/admin/UserManagementPage.jsx
import React, { useState, useMemo } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, Slide,
  Avatar, Tooltip, TextField, InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LockResetIcon from '@mui/icons-material/LockReset'; // Icon for Reset Password
import SearchIcon from '@mui/icons-material/Search'; // Icon for Search Bar
import UserForm from '../../components/admin/UserForm'; 
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

// MOCK DATA
const initialUsers = [
  { id: 'USR-001', name: 'Bob Johnson', email: 'bob.j@examplecorp.com', role: 'HR' },
  { id: 'USR-002', name: 'Carol Williams', email: 'carol.w@examplecorp.com', role: 'HR' },
  { id: 'USR-003', name: 'David Smith', email: 'david.s@examplecorp.com', role: 'HR' },
  { id: 'USR-004', name: 'Eve Brown', email: 'eve.b@examplecorp.com', role: 'HR' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserManagementPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToReset, setUserToReset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Search and Filter Logic ---
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const lowercasedQuery = searchQuery.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(lowercasedQuery) ||
      user.email.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, users]);

  // --- Dialog Handlers ---
  const handleOpenForm = (user = null) => { setEditingUser(user); setOpenFormDialog(true); };
  const handleCloseForm = () => { setOpenFormDialog(false); setEditingUser(null); };
  const handleOpenConfirm = (user) => { setUserToDelete(user); setOpenConfirmDialog(true); };
  const handleCloseConfirm = () => { setOpenConfirmDialog(false); setUserToDelete(null); };
  const handleOpenResetPassword = (user) => { setUserToReset(user); setOpenResetPasswordDialog(true); };
  const handleCloseResetPassword = () => { setOpenResetPasswordDialog(false); setUserToReset(null); };

  // --- CRUD Logic (Simulated) ---
  const handleFormSubmit = (event) => { event.preventDefault(); console.log('Form submitted!'); handleCloseForm(); };
  const handleDeleteUser = () => { setUsers(users.filter(u => u.id !== userToDelete.id)); handleCloseConfirm(); };
  const handleResetPasswordSubmit = (event) => { event.preventDefault(); console.log(`Password reset for ${userToReset.name}`); handleCloseResetPassword(); };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">User Management</Typography>
        <Button onClick={() => handleOpenForm()} variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' }, textTransform: 'none', fontSize: '1rem', px: 3, py: 1 }}>
          Add New HR User
        </Button>
      </Box>

      {/* SEARCH AND FILTERS BAR */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center' }} elevation={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        {/* Filter buttons can be added here in the future */}
      </Paper>

      {/* USERS TABLE */}
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{user.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: 'primary.light' }}><PersonIcon fontSize="small" /></Avatar>
                    <Typography variant="body1" fontWeight="500">{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Reset Password">
                    <IconButton onClick={() => handleOpenResetPassword(user)} aria-label="reset password" color="secondary"><LockResetIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Edit User">
                    <IconButton onClick={() => handleOpenForm(user)} aria-label="edit" color="primary"><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton onClick={() => handleOpenConfirm(user)} aria-label="delete" color="error"><DeleteIcon /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ADD/EDIT MODAL */}
      <Dialog open={openFormDialog} onClose={handleCloseForm} TransitionComponent={Transition} PaperProps={{ sx: { borderRadius: '12px' } }} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', pb: 1.5 }}>
          {editingUser ? 'Edit HR User' : 'Add New HR User'}
          <IconButton onClick={handleCloseForm}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent><UserForm handleSubmit={handleFormSubmit} initialData={editingUser || {}} /></DialogContent>
      </Dialog>
      
      {/* RESET PASSWORD MODAL */}
      <Dialog open={openResetPasswordDialog} onClose={handleCloseResetPassword} PaperProps={{ sx: { borderRadius: '12px' } }} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Reset Password</DialogTitle>
        <DialogContent>
          <Typography sx={{mb: 2}}>Enter a new password for <strong>{userToReset?.name}</strong>.</Typography>
          <Box component="form" onSubmit={handleResetPasswordSubmit}>
            <TextField autoFocus required fullWidth name="newPassword" label="New Password" type="password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}>Set New Password</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmationDialog open={openConfirmDialog} onClose={handleCloseConfirm} onConfirm={handleDeleteUser} title="Confirm Deletion" contentText={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}/>
    </Box>
  );
};

export default UserManagementPage;