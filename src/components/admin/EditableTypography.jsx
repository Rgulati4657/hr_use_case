// // src/components/EditableTypography.jsx
// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Typography, TextField, Box } from '@mui/material';

// const EditableTypography = ({ variant, text, onSave, multiline = false, rows = 1 }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentText, setCurrentText] = useState(text);

//   const handleSave = () => {
//     onSave(currentText);
//     setIsEditing(false);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !multiline) {
//       handleSave();
//     }
//     if (e.key === 'Escape') {
//       setCurrentText(text); // Revert changes
//       setIsEditing(false);
//     }
//   };

//   if (isEditing) {
//     return (
//       <TextField
//         fullWidth
//         variant="outlined"
//         value={currentText}
//         onChange={(e) => setCurrentText(e.target.value)}
//         onBlur={handleSave} // Save when user clicks away
//         onKeyDown={handleKeyDown}
//         multiline={multiline}
//         rows={multiline ? rows : 1}
//         autoFocus // Automatically focus the input field
//       />
//     );
//   }

//   return (
//     <Box onClick={() => setIsEditing(true)} sx={{ cursor: 'pointer', width: '100%', minHeight: '1.5em' }}>
//       <Typography variant={variant} sx={{ whiteSpace: multiline ? 'pre-wrap' : 'normal' }}>
//         {text || `(Click to add ${variant})`}
//       </Typography>
//     </Box>
//   );
// };

// EditableTypography.propTypes = {
//   variant: PropTypes.string.isRequired,
//   text: PropTypes.string,
//   onSave: PropTypes.func.isRequired,
//   multiline: PropTypes.bool,
//   rows: PropTypes.number,
// };

// // Add default props to handle null/undefined
// EditableTypography.defaultProps = {
//   text: '', // <--- ADD THIS
//   multiline: false,
//   rows: 1,
// };

// export default EditableTypography;
// src/components/EditableTypography.jsx

import { useState, useEffect } from 'react'; // <-- Make sure useEffect is imported
import PropTypes from 'prop-types';
import { Typography, TextField, Box } from '@mui/material';

const EditableTypography = ({ variant, text, onSave, multiline, rows }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState('');

  // THIS IS THE CORRECT WAY TO SYNC THE PROP TO THE STATE
  useEffect(() => {
    // This code runs when the component first loads,
    // and ONLY when the 'text' prop changes later.
    setCurrentText(text ?? '');
  }, [text]); // The dependency array [text] is the key to preventing loops.

  const handleSave = () => {
    onSave(currentText);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setCurrentText(text ?? ''); // Revert changes on escape
    }
  };

  if (isEditing) {
    return (
      <TextField
        fullWidth
        variant="outlined"
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        onBlur={handleSave} // Save when user clicks away
        onKeyDown={handleKeyDown}
        multiline={multiline}
        rows={multiline ? rows : 1}
        autoFocus
      />
    );
  }

  return (
    <Box onClick={() => setIsEditing(true)} sx={{ cursor: 'pointer', width: '100%', minHeight: '1.5em' }}>
      <Typography variant={variant} sx={{ whiteSpace: multiline ? 'pre-wrap' : 'normal' }}>
        {/* Use currentText which is synced to the prop. If it's empty, show the placeholder. */}
        {currentText || `(Click to add ${variant})`}
      </Typography>
    </Box>
  );
};

// Prop types and default props remain the same and are correct.
EditableTypography.propTypes = {
  variant: PropTypes.string.isRequired,
  text: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

EditableTypography.defaultProps = {
  text: '',
  multiline: false,
  rows: 1,
};

export default EditableTypography;