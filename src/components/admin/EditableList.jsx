// // src/components/EditableList.jsx
// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Box, List, ListItem, ListItemText, TextField, IconButton, Button } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import DeleteIcon from '@mui/icons-material/Delete';

// const EditableList = ({ items, onSave }) => {
//   const [editingIndex, setEditingIndex] = useState(-1);
//   const [editText, setEditText] = useState('');

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     setEditText(items[index]);
//   };

//   const handleSave = (index) => {
//     const newItems = [...items];
//     newItems[index] = editText;
//     onSave(newItems);
//     setEditingIndex(-1);
//   };

//   const handleAddItem = () => {
//     onSave([...items, 'New item - click to edit']);
//   };
  
//   const handleRemoveItem = (index) => {
//     onSave(items.filter((_, i) => i !== index));
//   }

//   return (
//     <Box>
//       <List dense>
//         {items.map((item, index) => (
//           <ListItem key={index} disablePadding>
//             {editingIndex === index ? (
//               <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
//                 <TextField 
//                   value={editText} 
//                   onChange={(e) => setEditText(e.target.value)} 
//                   fullWidth 
//                   variant="standard" 
//                   autoFocus 
//                   onKeyDown={(e) => e.key === 'Enter' && handleSave(index)}
//                 />
//                 <IconButton onClick={() => handleSave(index)}><SaveIcon fontSize="small" /></IconButton>
//               </Box>
//             ) : (
//               <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', '&:hover .edit-icon': { opacity: 1 } }}>
//                 <ListItemText primary={`• ${item}`} />
//                 <IconButton className="edit-icon" sx={{ opacity: 0 }} onClick={() => handleEdit(index)}><EditIcon fontSize="small" /></IconButton>
//                 <IconButton className="edit-icon" sx={{ opacity: 0 }} onClick={() => handleRemoveItem(index)}><DeleteIcon fontSize="small" color="error" /></IconButton>
//               </Box>
//             )}
//           </ListItem>
//         ))}
//       </List>
//       <Button startIcon={<AddCircleIcon />} onClick={handleAddItem} sx={{ mt: 1 }}>
//         Add Item
//       </Button>
//     </Box>
//   );
// };

// EditableList.propTypes = {
//   // items: PropTypes.arrayOf(PropTypes.string).isRequired,
//   items: PropTypes.arrayOf(PropTypes.string),
//   onSave: PropTypes.func.isRequired,
// };

// // Add default props to handle null/undefined
// EditableList.defaultProps = {
//   items: [], // <--- ADD THIS
// };

// export default EditableList;


// src/components/EditableList.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemText, TextField, IconButton, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const EditableList = ({ items, onSave }) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(items[index]);
  };

  const handleSave = (index) => {
    // Prevent saving an empty string
    if (editText.trim() === '') {
      handleRemoveItem(index);
      return;
    }
    const newItems = [...items];
    newItems[index] = editText;
    onSave(newItems);
    setEditingIndex(-1);
    setEditText('');
  };

  const handleAddItem = () => {
    const newItems = [...items, 'New item...'];
    onSave(newItems);
    // Automatically enter edit mode for the new item
    setEditingIndex(newItems.length - 1);
    setEditText('New item...');
  };

  const handleRemoveItem = (index) => {
    onSave(items.filter((_, i) => i !== index));
    // If we were editing the item we are now deleting, exit edit mode
    if (editingIndex === index) {
      setEditingIndex(-1);
      setEditText('');
    }
  };

  return (
    <Box>
      <List dense>
        {items.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              '&:hover .delete-icon': { opacity: 1 },
              paddingY: '4px',
            }}
          >
            {editingIndex === index ? (
              <TextField
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleSave(index)} // Save when user clicks away
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave(index);
                  if (e.key === 'Escape') setEditingIndex(-1);
                }}
                fullWidth
                variant="outlined"
                size="small"
                autoFocus
              />
            ) : (
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <ListItemText
                  primary={`• ${item}`}
                  onClick={() => startEditing(index)}
                  sx={{ cursor: 'pointer', flexGrow: 1 }}
                />
                <IconButton
                  className="delete-icon"
                  size="small"
                  sx={{ opacity: 0, transition: 'opacity 0.2s' }}
                  onClick={() => handleRemoveItem(index)}
                  title="Delete item"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      <Button startIcon={<AddCircleIcon />} onClick={handleAddItem} sx={{ mt: 1 }}>
        Add Item
      </Button>
    </Box>
  );
};

// --- Keep the propTypes and defaultProps from the previous fix ---
EditableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func.isRequired,
};

EditableList.defaultProps = {
  items: [],
};

export default EditableList;