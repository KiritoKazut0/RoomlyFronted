import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
  Share as ShareIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const SuccessPage: React.FC = () => {
  // Datos básicos del plan
  const planData = {
    name: 'Plan Premium',
    features: [
      'Publicación ilimitada de propiedades',
      'Contacto prioritario con arrendatarios',
      'Soporte premium 24/7',
      'Destacado en búsquedas',
      'Verificación de perfil',
      'Contratos digitales integrados'
    ]
  };

  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 100,
    height: 100,
    margin: '0 auto 20px',
    backgroundColor: green[500],
    color: theme.palette.common.white,
  }));

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        {/* Icono de confirmación */}
        <StyledAvatar>
          <CheckCircleIcon sx={{ fontSize: 60 }} />
        </StyledAvatar>

        {/* Títulos */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          ¡Gracias por tu compra!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Tu {planData.name} ha sido activado exitosamente
        </Typography>
        
        {/* Estado del plan */}
        <Chip
          label="ACTIVO"
          color="success"
          sx={{ 
            mb: 4,
            px: 3,
            py: 1,
            fontSize: '0.9rem',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}
        />

        {/* Beneficios del plan */}
        <Typography variant="h6" gutterBottom sx={{ 
          fontWeight: 'bold', 
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }}>
          <HomeIcon color="primary" />
          Beneficios de tu plan:
        </Typography>
        
        <List dense sx={{ textAlign: 'left', mb: 4 }}>
          {planData.features.map((feature, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText 
                primary={feature} 
                primaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
          ))}
        </List>

        {/* Acciones */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          gap: 2,
          mt: 4
        }}>
         
          <Button
            variant="contained"
            size="large"
            href="/dashboard"
            sx={{ flex: { xs: 1, sm: 'none' } }}
          >
            Comenzar a usar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SuccessPage;