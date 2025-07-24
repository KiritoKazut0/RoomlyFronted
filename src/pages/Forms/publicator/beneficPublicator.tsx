import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  Speed as SpeedIcon,
  Payment as PaymentIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

const BeneficiosArrendadores = () => {
  const theme = useTheme();

  const beneficios = [
    {
      icon: <PeopleIcon color="primary" />,
      title: "Llega a miles de interesados",
      description: "Tu anuncio será visto por estudiantes y profesionales"
    },
    {
      icon: <SpeedIcon color="primary" />,
      title: "Publicación fácil y rápida",
      description: "Publica en minutos con nuestro formulario intuitivo"
    },
    {
      icon: <PaymentIcon color="primary" />,
      title: "Gestión segura de pagos",
      description: "Procesamos los pagos de forma transparente"
    },
    {
      icon: <DescriptionIcon color="primary" />,
      title: "Sin contratos complicados",
      description: "Proceso simple sin papeleo innecesario"
    }
  ];

  return (
    <Box sx={{
      py: 4,
      px: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <Typography variant="h4" component="h2" sx={{
        textAlign: 'center',
        mb: 4,
        fontWeight: 600,
        color: theme.palette.text.primary,
        width: '100%'
      }}>
        Beneficios para arrendadores
      </Typography>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 3,
        width: '100%'
      }}>
        {beneficios.map((beneficio, index) => (
          <Box 
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: 2,
              width: '100%',
              maxWidth: '220px',
              minHeight: '200px',
              boxSizing: 'border-box',
              borderRadius: '8px',
              backgroundColor: theme.palette.background.default,
              flex: '1 1 200px'
            }}
          >
            <Box sx={{ 
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}>
              {beneficio.icon}
            </Box>
            <Typography variant="h6" component="h3" sx={{
              mb: 2,
              fontWeight: 500,
              color: theme.palette.text.primary,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {beneficio.title}
            </Typography>
            <Typography variant="body1" sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.9rem'
            }}>
              {beneficio.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BeneficiosArrendadores;