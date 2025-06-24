// import { useState, useEffect } from 'react';
// import { Box, Tabs, Tab, IconButton, Button, TextField, InputAdornment, ToggleButtonGroup, ToggleButton, Typography, Paper } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import SearchIcon from '@mui/icons-material/Search';

// // --- FIXED: onDragStart and onDragEnd are removed from the import ---
// import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { arrayMove } from '@dnd-kit/sortable';

// import { getAllJobs, updateJobById } from '../../api/apiService';
// import JobList from '../../components/admin/JobList.jsx';
// import JobDetailView from '../../components/admin/JobDetailView.jsx';
// import JobForm from '../../components/admin/JobForm.jsx';

// const baseTab = { id: 'job-list', label: 'Job Management', type: 'job-list', closable: false };

// const JobManagementPage = () => {
//   const [openTabs, setOpenTabs] = useState([baseTab]);
//   const [activeTabId, setActiveTabId] = useState(baseTab.id);
//   const [allJobs, setAllJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [draggingItemId, setDraggingItemId] = useState(null);

//   const sensors = useSensors(useSensor(PointerSensor));

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await getAllJobs();
//         setAllJobs(data);
//       } catch (err) {
//         setError("Could not connect to the backend.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleTabChange = (event, newValue) => setActiveTabId(newValue);
//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) {
//       setStatusFilter(newFilter);
//     }
//   };

//   const handleOpenTab = (newTab) => {
//     if (!openTabs.some(tab => tab.id === newTab.id)) {
//       setOpenTabs(prev => [...prev, newTab]);
//     }
//     setActiveTabId(newTab.id);
//   };

//   const handleCreateNew = () => {
//     handleOpenTab({ id: 'create-new-job', label: 'Create New JD', type: 'create-job', closable: true });
//   };

//   const handleCloseTab = (e, tabIdToClose) => {
//     e.stopPropagation();
//     const tabIndex = openTabs.findIndex(tab => tab.id === tabIdToClose);
//     let newActiveTabId = activeTabId;
//     if (activeTabId === tabIdToClose) {
//       newActiveTabId = openTabs[tabIndex - 1]?.id || baseTab.id;
//     }
//     setOpenTabs(prev => prev.filter(tab => tab.id !== tabIdToClose));
//     setActiveTabId(newActiveTabId);
//   };

//   const handleDragStart = (event) => {
//     setDraggingItemId(event.active.id);
//   };

//   const handleDragEnd = (event) => {
//     setDraggingItemId(null);
//     const { active, over } = event;
//     if (over && active.id !== over.id) {
//       setAllJobs((items) => {
//         const oldIndex = items.findIndex(item => item.id === active.id);
//         const newIndex = items.findIndex(item => item.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };
  
//   const handleStatusChange = async (jobId, newStatus) => {
//     const originalJobs = [...all.jobs];
//     setAllJobs(prevJobs => prevJobs.map(job => 
//         job.id === jobId ? { ...job, status: newStatus } : job
//     ));
//     try {
//         await updateJobById(jobId, { status: newStatus });
//     } catch (error) {
//         console.error("Failed to update status:", error);
//         setAllJobs(originalJobs);
//     }
//   };

//   const activeTab = openTabs.find(tab => tab.id === activeTabId);

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h5" fontWeight="600">
//           Job Management
//         </Typography>
//         <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNew}>
//           Create New Job
//         </Button>
//       </Box>

//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={activeTabId} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
//           {openTabs.map(tab => (
//             <Tab key={tab.id} value={tab.id} label={
//               <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
//                 {tab.label} {tab.closable && <IconButton component="span" size="small" sx={{ ml: 1.5 }} onClick={(e) => handleCloseTab(e, tab.id)}><CloseIcon fontSize="small" /></IconButton>}
//               </Box>
//             } />
//           ))}
//         </Tabs>
//       </Box>

//       <Box sx={{ pt: 3 }}>
//         {activeTab?.type === 'job-list' && (
//           <Box>
//             <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
//               <TextField fullWidth placeholder="Search all jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
//               <ToggleButtonGroup value={statusFilter} exclusive onChange={handleFilterChange} aria-label="job status filter">
//                 <ToggleButton value="all" aria-label="all jobs">All</ToggleButton>
//                 <ToggleButton value="active" aria-label="active jobs">Active</ToggleButton>
//                 <ToggleButton value="inactive" aria-label="inactive jobs">Inactive</ToggleButton>
//               </ToggleButtonGroup>
//             </Paper>
//             <DndContext
//               sensors={sensors}
//               collisionDetection={closestCenter}
//               onDragStart={handleDragStart}
//               onDragEnd={handleDragEnd}
//             >
//               <JobList
//                 jobs={allJobs}
//                 loading={loading}
//                 error={error}
//                 searchTerm={searchTerm}
//                 statusFilter={statusFilter}
//                 onOpenTab={handleOpenTab}
//                 onStatusChange={handleStatusChange}
//                 draggingItemId={draggingItemId}
//               />
//             </DndContext>
//           </Box>
//         )}
//         {activeTab?.type === 'view-job' && <JobDetailView jobId={activeTab.jobId} />}
//         {activeTab?.type === 'create-job' && <JobForm />}
//         {activeTab?.type === 'edit-job' && <JobForm jobId={activeTab.jobId} />}
//       </Box>
//     </Box>
//   );
// };

// export default JobManagementPage;


// import { useState, useEffect } from 'react';
// import { Box, Tabs, Tab, IconButton, Button, TextField, InputAdornment, ToggleButtonGroup, ToggleButton, Typography, Paper } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import SearchIcon from '@mui/icons-material/Search';

// // --- UPDATED DND-KIT IMPORTS ---
// import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { arrayMove } from '@dnd-kit/sortable';

// import { getAllJobs, updateJobById } from '../../api/apiService';
// import JobList from '../../components/admin/JobList.jsx';
// import JobDetailView from '../../components/admin/JobDetailView.jsx';
// import JobForm from '../../components/admin/JobForm.jsx';
// import JobCard from '../../components/admin/JobCard.jsx'; // We need JobCard here for the overlay

// const baseTab = { id: 'job-list', label: 'Job Management', type: 'job-list', closable: false };

// const JobManagementPage = () => {
//   const [openTabs, setOpenTabs] = useState([baseTab]);
//   const [activeTabId, setActiveTabId] = useState(baseTab.id);
//   const [allJobs, setAllJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
  
//   // --- STATE FOR DRAG OVERLAY ---
//   const [activeJob, setActiveJob] = useState(null); // To hold the data of the card being dragged

//   // For a smoother feel, we only activate drag after moving the pointer a bit
//   const sensors = useSensors(useSensor(PointerSensor, {
//     activationConstraint: {
//       distance: 8,
//     },
//   }));

//   useEffect(() => {
//     // This useEffect hook is unchanged
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await getAllJobs();
//         setAllJobs(data);
//       } catch (err) {
//         setError("Could not connect to the backend. Remember to update your GET /api/jd endpoint to include 'status' and 'created_at'.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleTabChange = (event, newValue) => setActiveTabId(newValue);
//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) setStatusFilter(newFilter);
//   };
//   const handleOpenTab = (newTab) => {
//     if (!openTabs.some(tab => tab.id === newTab.id)) setOpenTabs(prev => [...prev, newTab]);
//     setActiveTabId(newTab.id);
//   };
//   const handleCreateNew = () => handleOpenTab({ id: 'create-new-job', label: 'Create New JD', type: 'create-job', closable: true });
//   const handleCloseTab = (e, tabIdToClose) => {{
//     e.stopPropagation();
//     const tabIndex = openTabs.findIndex(tab => tab.id === tabIdToClose);
//     let newActiveTabId = activeTabId;
//     if (activeTabId === tabIdToClose) {
//       newActiveTabId = openTabs[tabIndex - 1]?.id || baseTab.id;
//     }
//     setOpenTabs(prev => prev.filter(tab => tab.id !== tabIdToClose));
//     setActiveTabId(newActiveTabId);
//   };
  
//   const handleDragStart = (event) => {
//     const { active } = event;
//     setActiveJob(allJobs.find(job => job.id === active.id));
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (over && active.id !== over.id) {
//       setAllJobs((items) => {
//         const oldIndex = items.findIndex(item => item.id === active.id);
//         const newIndex = items.findIndex(item => item.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//     setActiveJob(null); // Clear the active job
//   };
  
//   const handleStatusChange = async (jobId, newStatus) =>  {
//     const originalJobs = [...all.jobs];
//     setAllJobs(prevJobs => prevJobs.map(job => 
//         job.id === jobId ? { ...job, status: newStatus } : job
//     ));
//     try {
//         await updateJobById(jobId, { status: newStatus });
//     } catch (error) {
//         console.error("Failed to update status:", error);
//         setAllJobs(originalJobs);
//     }
//   };

//   const activeTab = openTabs.find(tab => tab.id === activeTabId);

//   return (
//     <Box sx={{ width: '100%' }}>
//      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //         <Typography variant="h5" fontWeight="600">
// //           Job Management
// //         </Typography>
// //         <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNew}>
// //           Create New Job
// //         </Button>
// //       </Box>

// //       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
// //         <Tabs value={activeTabId} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
// //           {openTabs.map(tab => (
//             <Tab key={tab.id} value={tab.id} label={
//               <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
//                 {tab.label} {tab.closable && <IconButton component="span" size="small" sx={{ ml: 1.5 }} onClick={(e) => handleCloseTab(e, tab.id)}><CloseIcon fontSize="small" /></IconButton>}
//               </Box>
//             } />
//           ))}
//         </Tabs>
//       </Box>
//       <Box sx={{ pt: 3 }}>
//         {activeTab?.type === 'job-list' && (
//           <Box>
//            <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
// //               <TextField fullWidth placeholder="Search all jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
// //               <ToggleButtonGroup value={statusFilter} exclusive onChange={handleFilterChange} aria-label="job status filter">
// //                 <ToggleButton value="all" aria-label="all jobs">All</ToggleButton>
// //                 <ToggleButton value="active" aria-label="active jobs">Active</ToggleButton>
// //                 <ToggleButton value="inactive" aria-label="inactive jobs">Inactive</ToggleButton>
// //               </ToggleButtonGroup>
// //             </Paper>
//             <DndContext
//               sensors={sensors}
//               collisionDetection={closestCenter}
//               onDragStart={handleDragStart}
//               onDragEnd={handleDragEnd}
//             >
//               <JobList
//                 jobs={allJobs}
//                 loading={loading}
//                 error={error}
//                 searchTerm={searchTerm}
//                 statusFilter={statusFilter}
//                 onOpenTab={handleOpenTab}
//                 onStatusChange={handleStatusChange}
//                 activeJobId={activeJob?.id} // Pass down the ID of the active job
//               />
//               {/* --- THE DRAG OVERLAY --- */}
//               <DragOverlay>
//                 {activeJob ? (
//                   // Render a copy of the JobCard in the overlay
//                   <JobCard
//                     job={activeJob}
//                     isOverlay={true} // A prop to tell the card it's a clone
//                   />
//                 ) : null}
//               </DragOverlay>
//             </DndContext>
//           </Box>
//         )}
//        {activeTab?.type === 'view-job' && <JobDetailView jobId={activeTab.jobId} />}
// //         {activeTab?.type === 'create-job' && <JobForm />}
// //         {activeTab?.type === 'edit-job' && <JobForm jobId={activeTab.jobId} />}
// //       
//       </Box>
//     </Box>
//   );
// };

// export default JobManagementPage;

import { useState, useEffect } from 'react';
import { 
    Box, 
    Tabs, 
    Tab, 
    IconButton, 
    Button, 
    TextField, 
    InputAdornment, 
    ToggleButtonGroup, 
    ToggleButton, 
    Typography, 
    Paper 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

// Import everything needed for smooth Drag & Drop
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

// Import your project's components and API services
import { getAllJobs, updateJobById } from '../../api/apiService';
import JobList from '../../components/admin/JobList.jsx';
import JobDetailView from '../../components/admin/JobDetailView.jsx';
import JobForm from '../../components/admin/JobForm.jsx';
import JobCard from '../../components/admin/JobCard.jsx'; // Needed for the DragOverlay

const baseTab = { id: 'job-list', label: 'Job Management', type: 'job-list', closable: false };

const JobManagementPage = () => {
    // State for UI and Tabs
    const [openTabs, setOpenTabs] = useState([baseTab]);
    const [activeTabId, setActiveTabId] = useState(baseTab.id);

    // State for Data, Filtering, and Searching
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // State for smooth Drag & Drop
    const [activeJob, setActiveJob] = useState(null);

    // DND-Kit sensors for a better drag experience
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8, // User must drag 8px before a drag starts
        },
    }));

    // Fetch initial data
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllJobs();

                  console.log('API RESPONSE from GET /api/jd:', data);

                  
                setAllJobs(data);
            } catch (err) {
                setError("Could not connect to the backend. Reminder: Update your GET /api/jd endpoint to include 'status' and 'created_at' for all jobs.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // --- All Handlers ---
    const handleTabChange = (event, newValue) => setActiveTabId(newValue);

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) setStatusFilter(newFilter);
    };

    const handleOpenTab = (newTab) => {
        if (!openTabs.some(tab => tab.id === newTab.id)) {
            setOpenTabs(prev => [...prev, newTab]);
        }
        setActiveTabId(newTab.id);
    };

    const handleCreateNew = () => {
        handleOpenTab({ id: 'create-new-job', label: 'Create New JD', type: 'create-job', closable: true });
    };

    const handleCloseTab = (e, tabIdToClose) => {
        e.stopPropagation();
        const tabIndex = openTabs.findIndex(tab => tab.id === tabIdToClose);
        let newActiveTabId = activeTabId;
        if (activeTabId === tabIdToClose) {
            newActiveTabId = openTabs[tabIndex - 1]?.id || baseTab.id;
        }
        setOpenTabs(prev => prev.filter(tab => tab.id !== tabIdToClose));
        setActiveTabId(newActiveTabId);
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveJob(allJobs.find(job => job.id === active.id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setAllJobs((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveJob(null);
    };
    
    const handleStatusChange = async (jobId, newStatus) => {
        const originalJobs = [...allJobs];
        setAllJobs(prevJobs => prevJobs.map(job => 
            job.id === jobId ? { ...job, status: newStatus } : job
        ));
        try {
            await updateJobById(jobId, { status: newStatus });
        } catch (error) {
            console.error("Failed to update status:", error);
            setAllJobs(originalJobs);
        }
    };

    const activeTab = openTabs.find(tab => tab.id === activeTabId);

    return (
        <Box sx={{ width: '100%' }}>
            {/* --- TOP HEADER SECTION --- */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" fontWeight="600">
                    Job Management
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNew}>
                    Create New Job
                </Button>
            </Box>

            {/* --- TABS SECTION --- */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTabId} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                    {openTabs.map(tab => (
                        <Tab key={tab.id} value={tab.id} label={
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                {tab.label}
                                {tab.closable && <IconButton component="span" size="small" sx={{ ml: 1.5 }} onClick={(e) => handleCloseTab(e, tab.id)}><CloseIcon fontSize="small" /></IconButton>}
                            </Box>
                        } />
                    ))}
                </Tabs>
            </Box>

            {/* --- TAB CONTENT SECTION --- */}
            <Box sx={{ pt: 3 }}>
                {activeTab?.type === 'job-list' && (
                    <Box>
                        {/* --- SEARCH AND FILTER BAR --- */}
                        <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                            <TextField fullWidth placeholder="Search all jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
                            <ToggleButtonGroup value={statusFilter} exclusive onChange={handleFilterChange} aria-label="job status filter">
                                <ToggleButton value="all" aria-label="all jobs">All</ToggleButton>
                                <ToggleButton value="active" aria-label="active jobs">Active</ToggleButton>
                                <ToggleButton value="inactive" aria-label="inactive jobs">Inactive</ToggleButton>
                            </ToggleButtonGroup>
                        </Paper>

                        {/* --- DRAG & DROP CONTEXT FOR JOB LIST --- */}
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <JobList
                                jobs={allJobs}
                                loading={loading}
                                error={error}
                                searchTerm={searchTerm}
                                statusFilter={statusFilter}
                                onOpenTab={handleOpenTab}
                                onStatusChange={handleStatusChange}
                                activeJobId={activeJob?.id}
                            />
                            <DragOverlay>
                                {activeJob ? <JobCard job={activeJob} isOverlay={true} /> : null}
                            </DragOverlay>
                        </DndContext>
                    </Box>
                )}
                {activeTab?.type === 'view-job' && <JobDetailView jobId={activeTab.jobId} />}
                {activeTab?.type === 'create-job' && <JobForm />}
                {activeTab?.type === 'edit-job' && <JobForm jobId={activeTab.jobId} />}
            </Box>
        </Box>
    );
};

export default JobManagementPage;