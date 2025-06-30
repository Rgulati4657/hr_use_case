// src/components/shared/ReviewPopup.jsx
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ReviewPopup = ({ open, onClose, title, content }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* 'pre-wrap' is crucial to respect newlines from the AI's response */}
        <DialogContentText sx={{ whiteSpace: 'pre-wrap' }}>
          {content || "No review content available."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

ReviewPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default ReviewPopup;