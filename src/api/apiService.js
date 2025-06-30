// import axios from 'axios';

// // Create a pre-configured instance of axios
// const apiClient = axios.create({
//   // baseURL: 'http://192.168.1.9:8085', // Your backend's base URL
//   baseURL: '/', // Your backend's base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // --- API Functions ---

// // GET /api/jd - Fetches the list of all jobs
// export const getAllJobs = async () => {
//   try {
//     const response = await apiClient.get('/api/jd');
//     return response.data;
//   } catch (error) {
//     // We can handle errors more gracefully here later (e.g., logging)
//     console.error('Error fetching all jobs:', error);
//     throw error; // Re-throw the error so the component can catch it
//   }
// };

// // DELETE /api/jd/{job_id} - Deletes a job by its ID
// export const deleteJobById = async (jobId) => {
//     try {
//         const response = await apiClient.delete(`/api/jd/${jobId}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Error deleting job ${jobId}:`, error);
//         throw error;
//     }
// }


// // ... (keep apiClient, getAllJobs, deleteJobById)

// // POST /api/jd/generate - Sends initial details to the AI
// export const generateJD = async (jobInput) => {
//   try {
//     const response = await apiClient.post('/api/jd/generate', jobInput);
//     return response.data;
//   } catch (error) {
//     console.error('Error generating JD:', error);
//     throw error;
//   }
// };

// // POST /api/jd - Creates the final JD in the database
// export const createJD = async (jobData) => {
//   try {
//     const response = await apiClient.post('/api/jd', jobData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating JD:', error);
//     throw error;
//   }
// };



// // GET /api/jd/{job_id} - Fetches a single job by its ID
// export const getJobById = async (jobId) => {
//   try {
//     const response = await apiClient.get(`/api/jd/${jobId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching job ${jobId}:`, error);
//     throw error;
//   }
// };

// // PUT /api/jd/{job_id} - Updates an existing job
// export const updateJobById = async (jobId, jobData) => {
//   try {
//     const response = await apiClient.put(`/api/jd/${jobId}`, jobData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating job ${jobId}:`, error);
//     throw error;
//   }
// };
// // We will add more functions here later (getJobById, createJob, etc.)

// const atsApiClient = axios.create({
//   baseURL: 'http://192.168.1.3:8080', // Connect directly to the ATS server
//   headers: { 'Content-Type': 'application/json' },
// });


// /**
//  * Creates a new applicant with their resume.
//  * This uses multipart/form-data.
//  * @param {object} applicantData - The applicant's details (fullName, email, etc.).
//  * @param {File} resumeFile - The resume file object from the input.
//  * @returns {Promise<object>} The created applicant object.
//  */
// export const createApplicant = async (applicantData, resumeFile) => {
//   const formData = new FormData();
  
//   // 1. Append the JSON data as a string, as required by the backend
//   formData.append('data', JSON.stringify(applicantData));
  
//   // 2. Append the resume file
//   formData.append('resume', resumeFile);

//   // Make the request with the correct headers for multipart data
//   const response = await atsApiClient.post('/api/applicants', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };


// /**
//  * Creates an application, linking an applicant to a job.
//  * @param {string} applicantUid - The unique ID of the applicant.
//  * @param {number} jobId - The ID of the job.
//  * @returns {Promise<object>} The created application object.
//  */
// export const createApplication = async (applicantUid, jobId) => {
//   const payload = {
//     applicant_uid: applicantUid,
//     job_id: jobId,
//   };
//   const response = await atsApiClient.post('/api/applications', payload);
//   return response.data;
// };


// /**
//  * Retrieves a list of all applications for a specific job.
//  * @param {number} jobId - The ID of the job.
//  * @returns {Promise<Array>} An array of application objects.
//  */
// export const getApplicationsForJob = async (jobId) => {
//   const response = await atsApiClient.get(`/api/applications/job/${jobId}`);
//   return response.data;
// };

// /**
//  * Gets the recruitment funnel analytics for a specific job.
//  * @param {number} jobId - The ID of the job.
//  * @returns {Promise<object>} The funnel analytics object.
//  */
// export const getJobFunnelAnalytics = async (jobId) => {
//   const response = await atsApiClient.get(`/api/analytics/funnel/job/${jobId}`);
//   console.log(`Analytics Data ${response.data}`)
//   return response.data;
// };





// /**
//  * Updates the status of a specific application.
//  * @param {number} appId - The ID of the application.
//  * @param {string} status - The new status (e.g., 'screening', 'hired').
//  * @returns {Promise<object>} The updated application object.
//  */
// export const updateApplicationStatus = async (appId, status) => {
//   try {
//     const response = await atsApiClient.patch(`/api/applications/${appId}/status`, { status });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating status for application ${appId}:`, error);
//     throw error;
//   }
// };







// /**
//  * Retrieves the details of a single applicant using their unique ID.
//  * @param {string | number} applicantId - The unique identifier of the applicant.
//  * @returns {Promise<object>} The full applicant object.
//  */
// export const getApplicantById = async (applicantId) => {
//   try {
//     const response = await atsApiClient.get(`/api/applicants/${applicantId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching applicant ${applicantId}:`, error);
//     throw error;
//   }
// };

// // src/api/apiService.js

// // ... (keep all your existing functions)

// /**
//  * Fetches the complete applicant profile, including their applications.
//  * Uses the new /manage/applicants/by-id/{id} endpoint.
//  * @param {string | number} applicantId - The applicant's ID.
//  * @returns {Promise<object>} The full applicant profile.
//  */
// export const getApplicantProfileById = async (applicantId) => {
//   try {
//     // NOTE: This uses the NEW endpoint.
//     const response = await atsApiClient.get(`/api/manage/applicants/by-id/${applicantId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching full applicant profile for ID ${applicantId}:`, error);
//     throw error;
//   }
// };









// ------------------------------------




import axios from 'axios';

// =======================================================================
// --- Client 1: JD Server (No Change) ---
// This client handles everything related to Job Descriptions.
// =======================================================================
// const apiClient = axios.create({
//   // Using '/' assumes the JD server is on the same domain as the frontend.
//   // Change to 'http://192.168.1.9:8085' if needed.
//   baseURL: '/',
//   headers: { 'Content-Type': 'application/json' },
// });
// ✅ Correctly points to the deployed backend
const apiClient = axios.create({
 baseURL: import.meta.env.VITE_JD_API_URL, // The URL from your proxy target
  headers: { 'Content-Type': 'application/json' },
});
// --- JD Server API Functions ---

export const getAllJobs = async () => {
  try {
    const response = await apiClient.get('/api/jd');
    return response.data;
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    throw error;
  }
};

export const deleteJobById = async (jobId) => {
    try {
        const response = await apiClient.delete(`/api/jd/${jobId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting job ${jobId}:`, error);
        throw error;
    }
};

export const generateJD = async (jobInput) => {
  try {
    const response = await apiClient.post('/api/jd/generate', jobInput);
    return response.data;
  } catch (error) {
    console.error('Error generating JD:', error);
    throw error;
  }
};

export const createJD = async (jobData) => {
  try {
    const response = await apiClient.post('/api/jd', jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating JD:', error);
    throw error;
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await apiClient.get(`/api/jd/${jobId}`);
    return response.data;
  } catch (error)
    {
    console.error(`Error fetching job ${jobId}:`, error);
    throw error;
  }
};

export const updateJobById = async (jobId, jobData) => {
  try {
    const response = await apiClient.put(`/api/jd/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    console.error(`Error updating job ${jobId}:`, error);
    throw error;
  }
};


// =======================================================================
// --- ATS Clients: One for each port ---
// =======================================================================

// --- Client 2: Main ATS Server (Port 8080) ---
// This handles creating applicants, applications, and getting the list of applications for a job.
const atsApiClient = axios.create({
  baseURL:import.meta.env.VITE_ATS_MAIN_API_URL ,
  headers: { 'Content-Type': 'application/json' },
});

// --- Client 3: ATS Management Server (Port 8082) ---
// This handles the new endpoint for getting detailed applicant profiles.
const atsManagementApiClient = axios.create({

  baseURL:  import.meta.env.VITE_ATS_MANAGE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});


// --- ATS API Functions (using the correct client for each) ---

export const createApplicant = async (applicantData, resumeFile) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(applicantData));
  formData.append('resume', resumeFile);
  // This uses the main client on port 8080
  const response = await atsApiClient.post('/api/applicants', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const createApplication = async (applicantUid, jobId) => {
  const payload = { applicant_uid: applicantUid, job_id: jobId };
  // This uses the main client on port 8080
  const response = await atsApiClient.post('/api/applications', payload);
  return response.data;
};

export const getApplicationsForJob = async (jobId) => {
  // This uses the main client on port 8080
  const response = await atsApiClient.get(`/api/applications/job/${jobId}`);
  return response.data;
};

export const updateApplicationStatus = async (appId, status) => {
  try {
    // This uses the main client on port 8080
    const response = await atsApiClient.patch(`/api/applications/${appId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for application ${appId}:`, error);
    throw error;
  }
};

export const getJobFunnelAnalytics = async (jobId) => {
  // This uses the main client on port 8080
  const response = await atsApiClient.get(`/api/analytics/funnel/job/${jobId}`);
  return response.data;
};


// --- THIS IS THE NEW FUNCTION USING THE NEW CLIENT ---
/**
 * Fetches the complete applicant profile, including their applications.
 * Uses the new /manage/applicants/by-id/{id} endpoint.
 * @param {string | number} applicantId - The applicant's ID.
 * @returns {Promise<object>} The full applicant profile.
 */
export const getApplicantProfileById = async (applicantId) => {
  try {
    // This uses the MANAGEMENT client on port 8082
    const response = await atsManagementApiClient.get(`/api/manage/applicants/by-id/${applicantId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching full applicant profile for ID ${applicantId}:`, error);
    throw error;
  }
};