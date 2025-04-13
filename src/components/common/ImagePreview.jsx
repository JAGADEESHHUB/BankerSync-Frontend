import { Box, Card, CardMedia, Typography } from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

const ImagePreview = ({ imageUrl, alt, height = 200 }) => {
  if (!imageUrl) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height,
          backgroundColor: '#f0f0f0',
          borderRadius: 1,
        }}
      >
        <BrokenImageIcon sx={{ fontSize: 40, color: '#9e9e9e' }} />
        <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
          No image available
        </Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: '100%', boxShadow: 'none' }}>
      <CardMedia
        component="img"
        height={height}
        image={imageUrl}
        alt={alt || 'Image'}
        sx={{ objectFit: 'contain' }}
      />
    </Card>
  );
};

export default ImagePreview;