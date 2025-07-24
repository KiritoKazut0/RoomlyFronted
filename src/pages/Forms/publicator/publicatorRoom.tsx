import React from 'react';
import { Box, Typography, Button, Paper, useTheme, useMediaQuery } from '@mui/material';
import { HomeWork as HomeWorkIcon } from '@mui/icons-material';

const RentSpaceBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={0} sx={{
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #2c387e 0%, #1e2a78 100%)' 
        : 'linear-gradient(135deg, #eaf1f9ff 0%, #bed6eeff 100%)',
      borderRadius: 2,
      p: 4,
      my: 4,
      border: theme.palette.mode === 'dark' 
        ? '1px solid rgba(255, 255, 255, 0.12)' 
        : '1px solid rgba(0, 0, 0, 0.12)',
      position: 'relative',
      minHeight: isMobile ? 'auto' : '280px'
    }}>
      {/* Contenedor principal con todo el contenido */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between'
      }}>
        {/* Sección de texto superior */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mb: 2
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? 'common.white' : 'text.primary',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
            }}
          >
            ¿Tienes un espacio
          </Typography>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? 'common.white' : 'text.primary',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              mb: 0.2
            }}
          >
            para rentar?
          </Typography>
          
          <Typography 
            variant="h4" 
            component="h3" 
            sx={{ 
              fontWeight: 700,
              color: '#7CBEFF', // Color azul personalizado
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              mb: 4
            }}
          >
            Empieza hoy
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
              fontSize: '0.875rem',
              mb: -2
            }}
          >
            Fácil, seguro y sin complicaciones
          </Typography>
        </Box>

        {/* Sección del botón */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 2
        }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeWorkIcon />}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[4],
              },
              width: isMobile ? '100%' : 'auto',
            }}
          >
            Publicar mi espacio
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default RentSpaceBanner;