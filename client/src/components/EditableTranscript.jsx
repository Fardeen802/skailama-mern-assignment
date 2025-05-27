import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditableTranscript = ({ initialText, onBack }) => {
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleDiscard = () => {
    setTempText(text);
    setIsEditing(false);
  };

  const handleSave = () => {
    setText(tempText);
    setIsEditing(false);
    // add save logic if needed
  };

  const sharedStyles = {
    width: '100%',
    height: '75vh',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '30px',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    resize: 'vertical',
    border: isEditing ? '2px solid #3f51b5' : '2px solid transparent',
    backgroundColor: isEditing ? '#fff' : '#f9f9f9',
    cursor: isEditing ? 'text' : 'default',
    color: isEditing ? 'inherit' : 'black',
    
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={onBack} >
            <ArrowBackIcon sx={{
            height:'42px',
            width:'42px',
            color:'black'
          }} />
          </IconButton>
          <Typography variant="h4" fontWeight="bold" fontFamily="sans-serif">
  Edit Transcript
</Typography>
        </Box>

        <Box>
          {isEditing ? (
            <>
            <Button
              variant="outlined"
              onClick={handleDiscard}
              sx={{
                mr: 1,
                borderColor: 'red',
                color: 'red',
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: '#ffe6e6', // optional light red background on hover
                  borderColor: 'red',
                },
              }}
            >
            Discard
           </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#222', // a slightly lighter black for hover effect
                  },
                }}
              >
                Save
              </Button>
              
            </>
          ) : (
            <Button variant="outlined" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <textarea
          ref={textareaRef}
          value={isEditing ? tempText : text}
          onChange={isEditing ? (e) => setTempText(e.target.value) : undefined}
          readOnly={!isEditing}
          style={sharedStyles}
          spellCheck={false}
        />
      </Box>
    </Box>
  );
};

export default EditableTranscript;
