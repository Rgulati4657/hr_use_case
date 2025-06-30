// src/components/applicant/ApplicationModal.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, TextField, Stack, Typography, Box, CircularProgress 
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoadingButton } from '@mui/lab';

const ApplicationModal = ({ open, onClose, onSubmit, jobTitle, loading }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] =useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setResumeFile(file);
        }
    };

    const handleSubmit = () => {
        if (!fullName || !email || !resumeFile) {
            setError('Please fill out all required fields and upload your resume.');
            return;
        }
        setError('');
        const applicantData = { full_name: fullName, email: email };
        onSubmit(applicantData, resumeFile);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
                Apply for {jobTitle}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ pt: 1 }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField 
                        required 
                        label="Full Name" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                    <TextField 
                        required 
                        label="Email Address" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Box>
                        <Button 
                            variant="outlined" 
                            component="label" 
                            fullWidth
                            startIcon={<FileUploadIcon />}
                        >
                            Upload Resume
                            <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                        </Button>
                        {resumeFile && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: 'success.main' }}>
                                <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                                <Typography variant="body2">{resumeFile.name}</Typography>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <LoadingButton 
                    variant="contained" 
                    onClick={handleSubmit} 
                    loading={loading}
                >
                    Submit Application
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

ApplicationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    jobTitle: PropTypes.string,
    loading: PropTypes.bool,
};

export default ApplicationModal;