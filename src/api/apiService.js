import axios from 'axios';

// Create a pre-configured instance of axios
const apiClient = axios.create({
  // baseURL: 'http://192.168.1.9:8085', // Your backend's base URL
  baseURL: '/', // Your backend's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- API Functions ---

// GET /api/jd - Fetches the list of all jobs
export const getAllJobs = async () => {
  try {
    const response = await apiClient.get('/api/jd');
    return response.data;
  } catch (error) {
    // We can handle errors more gracefully here later (e.g., logging)
    console.error('Error fetching all jobs:', error);
    throw error; // Re-throw the error so the component can catch it
  }
};

// DELETE /api/jd/{job_id} - Deletes a job by its ID
export const deleteJobById = async (jobId) => {
    try {
        const response = await apiClient.delete(`/api/jd/${jobId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting job ${jobId}:`, error);
        throw error;
    }
}


// ... (keep apiClient, getAllJobs, deleteJobById)

// POST /api/jd/generate - Sends initial details to the AI
export const generateJD = async (jobInput) => {
  try {
    const response = await apiClient.post('/api/jd/generate', jobInput);
    return response.data;
  } catch (error) {
    console.error('Error generating JD:', error);
    throw error;
  }
};

// POST /api/jd - Creates the final JD in the database
export const createJD = async (jobData) => {
  try {
    const response = await apiClient.post('/api/jd', jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating JD:', error);
    throw error;
  }
};



// GET /api/jd/{job_id} - Fetches a single job by its ID
export const getJobById = async (jobId) => {
  try {
    const response = await apiClient.get(`/api/jd/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job ${jobId}:`, error);
    throw error;
  }
};

// PUT /api/jd/{job_id} - Updates an existing job
export const updateJobById = async (jobId, jobData) => {
  try {
    const response = await apiClient.put(`/api/jd/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    console.error(`Error updating job ${jobId}:`, error);
    throw error;
  }
};
// We will add more functions here later (getJobById, createJob, etc.)