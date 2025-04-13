import { Button, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useRef } from 'react';

const FileUpload = ({ onFileSelect, label, accept = "image/*", name = "file" }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create a preview URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    
    // Pass the file to parent component
    onFileSelect(file, name);
  };
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{label}</Typography>
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
        sx={{ mb: 2 }}
      >
        Upload {label}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        style={{ display: 'none' }}
      />
      {previewUrl && (
        <Box sx={{ mt: 2 }}>
          <img 
            src={previewUrl} 
            alt="Preview" 
            style={{ maxWidth: '100%', maxHeight: '200px' }} 
          />
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;