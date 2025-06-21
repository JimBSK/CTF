import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <CircularProgress 
        size={80}
        thickness={4}
        sx={{ color: '#ff2e63' }}
      />
    </Box>
  );
}


import { Parallax } from 'react-parallax';

<Parallax 
  bgImage="/images/ctf-bg.jpg" 
  strength={300}
  style={{ height: '100vh' }}
>
  {/* Контент поверх фона */}
</Parallax>

