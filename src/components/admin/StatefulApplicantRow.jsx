// src/components/admin/StatefulApplicantRow.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Link, Select, MenuItem, Button, Typography, Skeleton, Chip } from '@mui/material';
import { getApplicantProfileById } from '../../api/apiService'; // Use the NEW function

const StatefulApplicantRow = ({ application, onStatusChange, onReviewClick }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Destructure from the initial, minimal application object
  const { id, applicant_id, status, applied_at, resume_score, resume_review_summary } = application;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!applicant_id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getApplicantProfileById(applicant_id);
         console.log(`Profile data for applicant_id ${applicant_id}:`, data);
        setProfile(data);
      } catch (error) {
        console.error(`Failed to load profile for applicant ${applicant_id}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [applicant_id]);

  const allStatuses = ['applied', 'screening', 'assessment', 'interview_scheduled', 'hired', 'rejected'];
  
  // Now, get details from the fetched 'profile' state
  const applicantName = profile?.full_name;
  const applicantEmail = profile?.email;
  const resumeUrl = profile?.resume_gcs_uri;

  const truncateText = (text, length = 100) => {
    if (!text) return 'No review yet.';
    if (text.length <= length) return text;
    return text.substring(0, length) + '... (click to read more)';
  };

  if (loading) {
    return (
      <TableRow>
        <TableCell><Skeleton variant="text" width="80%" /><Skeleton variant="text" width="60%" /></TableCell>
        <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="rounded" height={30} /></TableCell>
        <TableCell align="right"><Skeleton variant="rounded" width={110} height={30} /></TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow hover>
      <TableCell>
        <Link component="button" variant="body2" sx={{fontWeight: '500'}}>{applicantName || 'N/A'}</Link>
        <Typography variant="caption" display="block">{applicantEmail || 'N/A'}</Typography>
      </TableCell>
      <TableCell>
        <Chip label={resume_score ? `${Math.round(resume_score * 1)}%` : 'N/A'} /* ... */ />
      </TableCell>
      <TableCell onClick={() => onReviewClick(applicantName, resume_review_summary)} sx={{ cursor: 'pointer' }}>
        <Typography variant="body2">{truncateText(resume_review_summary)}</Typography>
      </TableCell>
      <TableCell>{new Date(applied_at).toLocaleDateString()}</TableCell>
      <TableCell>
        <Select value={status} onChange={(e) => onStatusChange(id, e.target.value)} size="small" /* ... */ >
          {allStatuses.map(s => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)}
        </Select>
      </TableCell>
      <TableCell align="right">
        <Button component="a" href={resumeUrl} target="_blank" disabled={!resumeUrl} variant="outlined" size="small">
          View Resume
        </Button>
      </TableCell>
    </TableRow>
  );
};

StatefulApplicantRow.propTypes = {
  application: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onReviewClick: PropTypes.func.isRequired,
};

export default StatefulApplicantRow;