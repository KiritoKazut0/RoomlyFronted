import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  Container,
  Grid,
  Chip,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RoomlySubscription = () => {
  const plans = [
    {
      title: "Plan Básico",
      price: "Gratis",
      color: "secondary",
      isRecommended: false,
      benefits: [
        "Publica 1 cuarto",
        "Acceso limitado a filtros",
        "Soporte básico vía correo",
      ],
    },
    {
      title: "Plan Premium",
      price: "$120 MXN",
      color: "primary",
      isRecommended: true,
      benefits: [
        "Publica múltiples cuartos",
        "Filtros avanzados",
        "Mayor visibilidad en búsquedas",
        "Soporte prioritario",
        "Agendar visitas desde la app",
      ],
    },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Planes de suscripción Roomly
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan, idx) => (
          <Grid item xs={12} md={5} key={idx}>
            <Card variant="outlined" sx={{ borderColor: plan.color === 'primary' ? '#1976d2' : 'grey' }}>
              <CardContent>
                <Typography variant="h5">{plan.title}</Typography>
                <Typography variant="h6" color="textSecondary">{plan.price} / mes</Typography>

                {plan.isRecommended && (
                  <Chip label="Recomendado" color="primary" sx={{ mt: 1, mb: 2 }} />
                )}

                <List>
                  {plan.benefits.map((benefit, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <CheckCircleIcon color={plan.color === 'primary' ? 'primary' : 'secondary'} />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {plan.color === 'primary' ? 'Suscribirme al Premium' : 'Usar Plan Básico'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoomlySubscription;