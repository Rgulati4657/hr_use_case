// import { useState, useEffect ,useMemo} from 'react';
// import { 
//     Box, 
//     Tabs, 
//     Tab, 
//     IconButton, 
//     Button, 
//     TextField, 
//     InputAdornment, 
//     ToggleButtonGroup, 
//     ToggleButton, 
//     Typography, 
//     Paper 
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import SearchIcon from '@mui/icons-material/Search';

// // Import everything needed for smooth Drag & Drop
// import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { arrayMove } from '@dnd-kit/sortable';

// // Import your project's components and API services
// import { getAllJobs, updateJobById, deleteJobById } from '../../api/apiService';
// import JobList from '../../components/admin/JobList.jsx';
// import JobDetailView from '../../components/admin/JobDetailView.jsx';
// import JobForm from '../../components/admin/JobForm.jsx';
// import JobCard from '../../components/admin/JobCard.jsx'; // Needed for the DragOverlay

// import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

// const baseTab = { id: 'job-list', label: 'Job Management', type: 'job-list', closable: false };

// const JobManagementPage = () => {
//     // State for UI and Tabs
//     const [openTabs, setOpenTabs] = useState([baseTab]);
//     const [activeTabId, setActiveTabId] = useState(baseTab.id);

//     // State for Data, Filtering, and Searching
//     const [allJobs, setAllJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [statusFilter, setStatusFilter] = useState('all');

//     // State for smooth Drag & Drop
//     const [activeJob, setActiveJob] = useState(null);
//    const [jobToDelete, setJobToDelete] = useState(null);

//     // DND-Kit sensors for a better drag experience
//     const sensors = useSensors(useSensor(PointerSensor, {
//         activationConstraint: {
//             distance: 8, // User must drag 8px before a drag starts
//         },
//     }));

//     // Fetch initial data
//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const data = await getAllJobs();

//                   console.log('API RESPONSE from GET /api/jd:', data);

                  
//                 setAllJobs(data || []);
//             } catch (err) {
//                 setError("Could not connect to the backend. Reminder: Update your GET /api/jd endpoint to include 'status' and 'created_at' for all jobs.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchJobs();
//     }, []);

  

//  const filteredJobs = useMemo(() => {
//         return allJobs
//             .filter(job => {
//                 // Status filter
//                 if (statusFilter === 'all') return true;
//                 return job.status === statusFilter;
//             })
//             .filter(job => {
//                 // Search term filter (searches in job title)
//                 if (!searchTerm) return true;
//                 return job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
//             });
//     }, [allJobs, statusFilter, searchTerm]);


//     // --- All Handlers ---
//     const handleTabChange = (event, newValue) => setActiveTabId(newValue);

//     const handleFilterChange = (event, newFilter) => {
//         if (newFilter !== null) setStatusFilter(newFilter);
//     };

//     const handleOpenTab = (newTab) => {
//         if (!openTabs.some(tab => tab.id === newTab.id)) {
//             setOpenTabs(prev => [...prev, newTab]);
//         }
//         setActiveTabId(newTab.id);
//     };

//     const handleCreateNew = () => {
//         handleOpenTab({ id: 'create-new-job', label: 'Create New JD', type: 'create-job', closable: true });
//     };

//     const handleCloseTab = (e, tabIdToClose) => {
//         e.stopPropagation();
//         const tabIndex = openTabs.findIndex(tab => tab.id === tabIdToClose);
//         let newActiveTabId = activeTabId;
//         if (activeTabId === tabIdToClose) {
//             newActiveTabId = openTabs[tabIndex - 1]?.id || baseTab.id;
//         }
//         setOpenTabs(prev => prev.filter(tab => tab.id !== tabIdToClose));
//         setActiveTabId(newActiveTabId);
//     };

//     const handleDragStart = (event) => {
//         const { active } = event;
//         setActiveJob(allJobs.find(job => job.id === active.id));
//     };

//     const handleDragEnd = (event) => {
//         const { active, over } = event;
//         if (over && active.id !== over.id) {
//             setAllJobs((items) => {
//                 const oldIndex = items.findIndex(item => item.id === active.id);
//                 const newIndex = items.findIndex(item => item.id === over.id);
//                 return arrayMove(items, oldIndex, newIndex);
//             });
//         }
//         setActiveJob(null);
//     };
    
//     const handleStatusChange = async (jobId, newStatus) => {
//         const originalJobs = [...allJobs];
//         setAllJobs(prevJobs => prevJobs.map(job => 
//             job.id === jobId ? { ...job, status: newStatus } : job
//         ));
//         try {
//             await updateJobById(jobId, { status: newStatus });
//         } catch (error) {
//             console.error("Failed to update status:", error);
//             setAllJobs(originalJobs);
//         }
//     };
//       // --- NEW: Function to open the dialog ---
//     // This is passed to JobList, which passes it to JobCard
//     const handleDeleteClick = (jobId) => {
//         const job = allJobs.find(j => j.id === jobId);
//         if (job) {
//             setJobToDelete(job);
//         }
//     };

//     // --- NEW: Function to handle the actual deletion on confirmation ---
//     const handleConfirmDelete = async () => {
//         if (!jobToDelete) return;

//         const jobIdToDelete = jobToDelete.id;
//         const originalJobs = [...allJobs];
        
//         // Optimistic UI update
//         setAllJobs(prevJobs => prevJobs.filter(job => job.id !== jobIdToDelete));
//         setJobToDelete(null); // Close the dialog

//         try {
//             await deleteJobById(jobIdToDelete);
//         } catch (error) {
//             console.error("Failed to delete job:", error);
//             setError("Could not delete the job. Please try again.");
//             setAllJobs(originalJobs); // Revert on failure
//         }
//     };


//     const activeTab = openTabs.find(tab => tab.id === activeTabId);

//     return (
//         <Box sx={{ width: '100%' }}>
//             {/* --- TOP HEADER SECTION --- */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h5" fontWeight="600">
//                     Job Management
//                 </Typography>
//                 <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNew}>
//                     Create New Job
//                 </Button>
//             </Box>

//             {/* --- TABS SECTION --- */}
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <Tabs value={activeTabId} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
//                     {openTabs.map(tab => (
//                         <Tab key={tab.id} value={tab.id} label={
//                             <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
//                                 {tab.label}
//                                 {tab.closable && <IconButton component="span" size="small" sx={{ ml: 1.5 }} onClick={(e) => handleCloseTab(e, tab.id)}><CloseIcon fontSize="small" /></IconButton>}
//                             </Box>
//                         } />
//                     ))}
//                 </Tabs>
//             </Box>

//             {/* --- TAB CONTENT SECTION --- */}
//             <Box sx={{ pt: 3 }}>
//                 {activeTab?.type === 'job-list' && (
//                     <Box>
//                         {/* --- SEARCH AND FILTER BAR --- */}
//                         <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
//                             <TextField fullWidth placeholder="Search all jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
//                             <ToggleButtonGroup value={statusFilter} exclusive onChange={handleFilterChange} aria-label="job status filter">
//                                 <ToggleButton value="all" aria-label="all jobs">All</ToggleButton>
//                                 <ToggleButton value="active" aria-label="active jobs">Active</ToggleButton>
//                                 <ToggleButton value="inactive" aria-label="inactive jobs">Inactive</ToggleButton>
//                             </ToggleButtonGroup>
//                         </Paper>

//                         {/* --- DRAG & DROP CONTEXT FOR JOB LIST --- */}
//                         <DndContext
//                             sensors={sensors}
//                             collisionDetection={closestCenter}
//                             onDragStart={handleDragStart}
//                             onDragEnd={handleDragEnd}
//                         >
//                               <JobList
//                                 jobs={filteredJobs} 
//                                 loading={loading}
//                                 onOpenTab={handleOpenTab}
//                                 onStatusChange={handleStatusChange}
//                                 // --- FIX: Pass the correct handler ---
//                                 onDeleteJob={handleDeleteClick} 
//                                 activeJobId={activeJob?.id}
//                             />
//                             <DragOverlay>
//                                 {activeJob ? <JobCard job={activeJob} isOverlay={true} /> : null}
//                             </DragOverlay>
//                         </DndContext>
//                     </Box>
//                 )}
//                 {activeTab?.type === 'view-job' && <JobDetailView jobId={activeTab.jobId} />}
//                 {activeTab?.type === 'create-job' && <JobForm />}
//                 {activeTab?.type === 'edit-job' && <JobForm jobId={activeTab.jobId} />}
//             </Box>
//               <ConfirmationDialog
//                 open={!!jobToDelete}
//                 onClose={() => setJobToDelete(null)}
//                 onConfirm={handleConfirmDelete}
//                 title="Confirm Deletion"
//                 contentText={jobToDelete ? `Are you sure you want to permanently delete the job posting for "${jobToDelete.job_title}"? This action cannot be undone.` : ''}
//             />
//         </Box>
//     );
// };

// export default JobManagementPage;






import { useState, useEffect ,useMemo, useCallback} from 'react';
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
import { getAllJobs, updateJobById, deleteJobById } from '../../api/apiService';
import JobList from '../../components/admin/JobList.jsx';
import JobDetailView from '../../components/admin/JobDetailView.jsx';
import JobForm from '../../components/admin/JobForm.jsx';
import JobCard from '../../components/admin/JobCard.jsx'; // Needed for the DragOverlay

import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

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
   const [jobToDelete, setJobToDelete] = useState(null);

    // DND-Kit sensors for a better drag experience
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8, // User must drag 8px before a drag starts
        },
    }));


    // Refactored 
    const fetchJobs = useCallback(async () => {
        // You can show a loading indicator if you want
        setLoading(true); 
        setError(null);
        try {
            const data = await getAllJobs();
            console.log('API RESPONSE from GET /api/jd:', data);
            setAllJobs(data || []);
        } catch (err) {
            setError("Could not connect to the backend or fetch jobs.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array means this function is created once

    // --- ORIGINAL useEffect ---
    // Now it just calls our reusable function on component mount.
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]); 



     const handleJobSaveSuccess = (savedJob, tabIdToClose) => {
        // 1. REFRESH the list using our reusable function
        fetchJobs();

        // 2. Close the form tab
        setOpenTabs(prev => prev.filter(tab => tab.id !== tabIdToClose));

        // 3. Set the active tab back to the main job list
        setActiveTabId(baseTab.id);
    };







    // Fetch initial data
    // useEffect(() => {
    //     const fetchJobs = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null);
    //             const data = await getAllJobs();

    //               console.log('API RESPONSE from GET /api/jd:', data);

                  
    //             setAllJobs(data || []);
    //         } catch (err) {
    //             setError("Could not connect to the backend. Reminder: Update your GET /api/jd endpoint to include 'status' and 'created_at' for all jobs.");
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchJobs();
    // }, []);

  

 const filteredJobs = useMemo(() => {
        return allJobs
            .filter(job => {
                // Status filter
                if (statusFilter === 'all') return true;
                return job.status === statusFilter;
            })
            .filter(job => {
                // Search term filter (searches in job title)
                if (!searchTerm) return true;
                return job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
            });
    }, [allJobs, statusFilter, searchTerm]);


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
      // --- NEW: Function to open the dialog ---
    // This is passed to JobList, which passes it to JobCard
    const handleDeleteClick = (jobId) => {
        const job = allJobs.find(j => j.id === jobId);
        if (job) {
            setJobToDelete(job);
        }
    };

    // --- NEW: Function to handle the actual deletion on confirmation ---
    const handleConfirmDelete = async () => {
        if (!jobToDelete) return;

        const jobIdToDelete = jobToDelete.id;
        const originalJobs = [...allJobs];
        
        // Optimistic UI update
        setAllJobs(prevJobs => prevJobs.filter(job => job.id !== jobIdToDelete));
        setJobToDelete(null); // Close the dialog

        try {
            await deleteJobById(jobIdToDelete);
        } catch (error) {
            console.error("Failed to delete job:", error);
            setError("Could not delete the job. Please try again.");
            setAllJobs(originalJobs); // Revert on failure
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
                                jobs={filteredJobs} 
                                loading={loading}
                                onOpenTab={handleOpenTab}
                                onStatusChange={handleStatusChange}
                                // --- FIX: Pass the correct handler ---
                                onDeleteJob={handleDeleteClick} 
                                activeJobId={activeJob?.id}
                            />
                            <DragOverlay>
                                {activeJob ? <JobCard job={activeJob} isOverlay={true} /> : null}
                            </DragOverlay>
                        </DndContext>
                    </Box>
                )}
                {activeTab?.type === 'view-job' && <JobDetailView jobId={activeTab.jobId} />}
                {activeTab?.type === 'create-job' && <JobForm  onSaveSuccess={(savedJob) => handleJobSaveSuccess(savedJob, activeTab.id)} />}
                {activeTab?.type === 'edit-job' && <JobForm jobId={activeTab.jobId}  onSaveSuccess={(savedJob) => handleJobSaveSuccess(savedJob, activeTab.id)}/>}
            </Box>
              <ConfirmationDialog
                open={!!jobToDelete}
                onClose={() => setJobToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                contentText={jobToDelete ? `Are you sure you want to permanently delete the job posting for "${jobToDelete.job_title}"? This action cannot be undone.` : ''}
            />
        </Box>
    );
};

export default JobManagementPage;