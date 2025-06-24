import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';

import { generateJD, createJD, getJobById, updateJobById } from '../../api/apiService';

// Import the in-place editing components you have from your previous project
import EditableTypography from './EditableTypography';
import EditableList from './EditableList';

// --- INITIAL STATE DEFINITIONS ---
const initialGenerationInput = {
  job_title_input: '',
  key_responsibilities_input: '',
  required_skills_input: '',
  company_description_input: '',
};

const initialJobState = {
  job_title: '',
  status: 'active',
  expires_at: '',
  jd_content: {
    company_summary: '',
    role_summary: '',
    key_responsibilities: '',
    required_qualifications: '',
    preferred_qualifications: '',
    benefits: '',
  },
};

const JobForm = ({ jobId }) => {
  const [mode, setMode] = useState(jobId ? 'edit' : 'create');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [generationInput, setGenerationInput] = useState(initialGenerationInput);
  const [jobData, setJobData] = useState(initialJobState);

  useEffect(() => {
    if (mode === 'edit') {
      setLoading(true);
      setError('');
      getJobById(jobId)
        .then(data => {
          const formattedContent = {
            ...data.jd_content,
            key_responsibilities: data.jd_content.key_responsibilities.join('\n'),
            required_qualifications: data.jd_content.required_qualifications.join('\n'),
            preferred_qualifications: data.jd_content.preferred_qualifications.join('\n'),
            benefits: data.jd_content.benefits.join('\n'),
          };
          setJobData({ ...data, jd_content: formattedContent });
        })
        .catch(err => {
          setError('Failed to load job data. Please try again.');
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [jobId, mode]);
  
  const handleGenerationInputChange = (e) => {
    setGenerationInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleJobDataChange = (e) => {
    const { name, value } = e.target;
    if (name in jobData.jd_content) {
      setJobData((prev) => ({ ...prev, jd_content: { ...prev.jd_content, [name]: value } }));
    } else {
      setJobData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleContentUpdate = (field, value) => {
      const processedValue = Array.isArray(value) ? value.join('\n') : value;
      setJobData(prev => ({
          ...prev,
          jd_content: { ...prev.jd_content, [field]: processedValue }
      }));
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    try {
      const payload = {
        ...generationInput,
        key_responsibilities_input: generationInput.key_responsibilities_input.split('\n').filter(Boolean),
        required_skills_input: generationInput.required_skills_input.split('\n').filter(Boolean),
      };
      const generatedData = await generateJD(payload);
      const formattedContent = {
        ...generatedData,
        key_responsibilities: generatedData.key_responsibilities.join('\n'),
        required_qualifications: generatedData.required_qualifications.join('\n'),
        preferred_qualifications: generatedData.preferred_qualifications.join('\n'),
        benefits: generatedData.benefits.join('\n'),
      };
      setJobData((prev) => ({ ...prev, job_title: generatedData.job_title, jd_content: formattedContent }));
      setSnackbar({ open: true, message: 'JD generated successfully!' });
    } catch (err) {
      setError('Failed to generate JD from AI. Check your inputs and try again.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...jobData,
      jd_content: {
        ...jobData.jd_content,
        job_title: jobData.job_title,
        key_responsibilities: jobData.jd_content.key_responsibilities.split('\n').filter(Boolean),
        required_qualifications: jobData.jd_content.required_qualifications.split('\n').filter(Boolean),
        preferred_qualifications: jobData.jd_content.preferred_qualifications.split('\n').filter(Boolean),
        benefits: jobData.jd_content.benefits.split('\n').filter(Boolean),
      },
    };
    if (!payload.expires_at) payload.expires_at = null;
    try {
      if (mode === 'create') {
        await createJD(payload);
        setSnackbar({ open: true, message: 'Job created successfully!' });
      } else {
        await updateJobById(jobId, payload);
        setSnackbar({ open: true, message: 'Job updated successfully!' });
      }
    } catch (err) {
      setError(`Failed to ${mode} job. Please check the fields and try again.`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }
  const showFullForm = mode === 'edit' || jobData.jd_content.role_summary;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {mode === 'create' ? 'Create New Job Description' : `Edit: ${jobData.job_title}`}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {mode === 'create' && !showFullForm && (
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
            Step 1: Provide Initial Details for AI
          </Typography>
          <Stack spacing={3}>
            <TextField fullWidth name="job_title_input" label="Job Title" value={generationInput.job_title_input} onChange={handleGenerationInputChange} />
            <TextField fullWidth multiline rows={4} name="key_responsibilities_input" label="Key Responsibilities" helperText="Enter one responsibility per line" value={generationInput.key_responsibilities_input} onChange={handleGenerationInputChange} />
            <TextField fullWidth multiline rows={4} name="required_skills_input" label="Required Skills & Qualifications" helperText="Enter one skill per line" value={generationInput.required_skills_input} onChange={handleGenerationInputChange} />
            <TextField fullWidth name="company_description_input" label="Brief Company Description" value={generationInput.company_description_input} onChange={handleGenerationInputChange} />
            <Box>
              <LoadingButton variant="contained" onClick={handleGenerate} loading={generating} startIcon={<AutoFixHighIcon />} size="large">Generate with AI</LoadingButton>
            </Box>
          </Stack>
        </Paper>
      )}

      {showFullForm && (
        <Box component="form" onSubmit={handleSubmit}>
           <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {mode === 'create' ? 'Step 2: Review and Finalize' : 'Edit Job Details'}
          </Typography>

          <Accordion defaultExpanded variant="outlined" sx={{ '&.Mui-expanded': { margin: 0 }, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><SettingsIcon sx={{mr: 1.5, color: 'text.secondary'}}/> <Typography variant="subtitle1" fontWeight={600}>Core Details</Typography></AccordionSummary>
            <AccordionDetails sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}><TextField fullWidth variant="filled" name="job_title" label="Job Title" value={jobData.job_title} onChange={handleJobDataChange} required /></Grid>
                <Grid item xs={12} sm={6} md={3}><FormControl fullWidth variant="filled"><InputLabel>Status</InputLabel><Select name="status" value={jobData.status} label="Status" onChange={handleJobDataChange}><MenuItem value="active">Active</MenuItem><MenuItem value="inactive">Inactive</MenuItem></Select></FormControl></Grid>
                <Grid item xs={12} sm={6} md={3}><TextField fullWidth variant="filled" type="datetime-local" name="expires_at" label="Expires At" value={jobData.expires_at ? jobData.expires_at.substring(0, 16) : ''} onChange={handleJobDataChange} InputLabelProps={{ shrink: true }} /></Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion defaultExpanded variant="outlined" sx={{ '&.Mui-expanded': { margin: 0 } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><DescriptionIcon sx={{mr: 1.5, color: 'text.secondary'}}/> <Typography variant="subtitle1" fontWeight={600}>Job Description Content</Typography></AccordionSummary>
            <AccordionDetails sx={{ pt: 1 }}>
              <Stack spacing={3} sx={{p: 1}}>
                <Box>
                  <Typography variant="overline" color="text.secondary">Company Summary</Typography>
                  <EditableTypography variant="body1" text={jobData.jd_content.company_summary} onSave={(value) => handleContentUpdate('company_summary', value)} multiline />
                </Box>
                <Box>
                  <Typography variant="overline" color="text.secondary">Role Summary</Typography>
                  <EditableTypography variant="body1" text={jobData.jd_content.role_summary} onSave={(value) => handleContentUpdate('role_summary', value)} multiline />
                </Box>
                <Box>
                  <Typography variant="overline" color="text.secondary">Key Responsibilities</Typography>
                  <EditableList items={jobData.jd_content.key_responsibilities.split('\n')} onSave={(value) => handleContentUpdate('key_responsibilities', value)} />
                </Box>
                <Box>
                  <Typography variant="overline" color="text.secondary">Required Qualifications</Typography>
                  <EditableList items={jobData.jd_content.required_qualifications.split('\n')} onSave={(value) => handleContentUpdate('required_qualifications', value)} />
                </Box>
                <Box>
                  <Typography variant="overline" color="text.secondary">Preferred Qualifications</Typography>
                  <EditableList items={jobData.jd_content.preferred_qualifications.split('\n')} onSave={(value) => handleContentUpdate('preferred_qualifications', value)} />
                </Box>
                 <Box>
                  <Typography variant="overline" color="text.secondary">Benefits</Typography>
                  <EditableList items={jobData.jd_content.benefits.split('\n')} onSave={(value) => handleContentUpdate('benefits', value)} />
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton type="submit" variant="contained" size="large" loading={saving} startIcon={<SaveIcon />}>
              {mode === 'create' ? 'Save New Job' : 'Save Changes'}
            </LoadingButton>
          </Box>
        </Box>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
    </Box>
  );
};

JobForm.propTypes = {
  jobId: PropTypes.string,
};

export default JobForm;