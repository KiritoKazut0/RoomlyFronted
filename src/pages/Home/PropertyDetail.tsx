import { Box, Typography, Grid, Card, AspectRatio, Chip, Button } from '@mui/joy';
import { 
  Wifi, 
  AcUnit, 
  Kitchen, 
  Bathtub, 
  Chair,
  Pool,
  Star
} from '@mui/icons-material';
import Navbar from '../../components/layout/Nav/Navbar';

// Importar el homes.json
import homemock from '../../mocks/homes.json';

// Helper function para convertir string de icono a componente
const getIconByName = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Pool: <Pool />,
    Wifi: <Wifi />,
    AcUnit: <AcUnit />,
    Kitchen: <Kitchen />,
    Bathtub: <Bathtub />,
    Chair: <Chair />
  };
  return icons[iconName] || <Chair />;
};

// Usar la primera propiedad del homes.json
const mockPropertyData = homemock[0];

// Servicios por defecto
const defaultServices = [
  { label: "Wi-Fi", icon: "Wifi" },
  { label: "Aire Acondicionado", icon: "AcUnit" },
  { label: "Cocina", icon: "Kitchen" },
  { label: "Baños", icon: "Bathtub" },
  { label: "Amueblado", icon: "Chair" }
];

export default function PropertyDetail() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3, overflow: 'hidden' }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography level="h1" sx={{ mb: 1 }}>
            {mockPropertyData.estado}
          </Typography>
          <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
            📍 {mockPropertyData.direccion}
          </Typography>
        </Box>

        {/* Gallery Section - Main + Side Layout */}
        <Box sx={{ mb: 4, width: '100%', overflow: 'hidden' }}>
          <Grid container spacing={1} sx={{ height: 300 }}>
            {/* Main Image - Left Side */}
            <Grid xs={12} md={8}>
              <Card 
                sx={{ 
                  width: '100%', 
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: 'md'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${mockPropertyData.image_main})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              </Card>
            </Grid>

            {/* Photo Album - Right Side Grid */}
            <Grid xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
                {mockPropertyData.photo_album.slice(0, 3).map((photo, index) => (
                  <Card
                    key={index}
                    sx={{
                      flex: 1,
                      overflow: 'hidden',
                      borderRadius: 'md',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${photo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Content Section - Todo junto */}
        <Grid container spacing={4}>
          {/* Left Column - Description and Services */}
          <Grid xs={12} md={6}>
            {/* Description */}
            <Box sx={{ mb: 4 }}>
              <Typography level="h2" sx={{ mb: 2 }}>
                Descripción
              </Typography>
              <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.6 }}>
                {mockPropertyData.descripcion}
              </Typography>
              <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.6 }}>
                Este espacioso alojamiento cuenta con todas las comodidades modernas para garantizar una estancia confortable. 
                Perfecto para huéspedes que buscan una ubicación conveniente con fácil acceso a las principales atracciones de la ciudad.
              </Typography>
              <Typography level="body-md" sx={{ lineHeight: 1.6 }}>
                La propiedad se encuentra en una zona estratégica con excelente conectividad de transporte público, 
                cerca de restaurantes locales, centros comerciales y puntos de interés turístico.
              </Typography>
            </Box>

            {/* Services Section */}
            <Box>
              <Typography level="h2" sx={{ mb: 2 }}>
                Servicios
              </Typography>
              <Grid container spacing={2}>
                {defaultServices.map((servicio, index) => (
                  <Grid xs={6} sm={4} key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      p: 1
                    }}>
                      <Box sx={{ color: 'primary.main' }}>
                        {getIconByName(servicio.icon)}
                      </Box>
                      <Typography level="body-sm">
                        {servicio.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Right Column - Booking Info + Reviews */}
          <Grid xs={12} md={6}>
            {/* Booking Info Card */}
            <Card 
              variant="outlined" 
              sx={{ 
                p: 3,
                mb: 3,
                bgcolor: 'background.level1'
              }}
            >
              <Grid container spacing={3} alignItems="center">
                {/* Price Section */}
                <Grid xs={12} sm={6}>
                  <Box>
                    <Typography level="body-sm" sx={{ mb: 1, color: 'text.secondary' }}>
                      Precio por noche
                    </Typography>
                    <Typography level="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      ${mockPropertyData.precio}
                    </Typography>
                  </Box>
                </Grid>

                {/* Availability */}
                <Grid xs={12} sm={6}>
                  <Box>
                    <Typography level="body-sm" sx={{ mb: 1, color: 'text.secondary' }}>
                      Disponibilidad
                    </Typography>
                    <Chip color="success" variant="soft" size="md">
                      Disponible
                    </Chip>
                  </Box>
                </Grid>

                {/* Action Buttons */}
                <Grid xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      size="lg" 
                      sx={{ 
                        fontWeight: 600,
                        py: 1.5,
                        flex: 1
                      }}
                    >
                      Reservar ahora
                    </Button>

                    <Button 
                      variant="outlined" 
                      size="lg" 
                      sx={{ 
                        fontWeight: 600,
                        py: 1.5,
                        flex: 1
                      }}
                    >
                      Contactar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>

            {/* Reviews Card */}
            <Card 
              variant="outlined" 
              sx={{ 
                p: 3,
                minHeight: 'fit-content'
              }}
            >
              <Typography level="h3" sx={{ mb: 2 }}>
                Reseñas
              </Typography>
              {mockPropertyData.reviews.slice(0, 2).map((review, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.level1', borderRadius: 'md' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
                      {review.user.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {[...Array(parseInt(review.qualification))].map((_, i) => (
                        <Star key={i} sx={{ fontSize: 14, color: 'warning.main' }} />
                      ))}
                    </Box>
                  </Box>
                  <Typography level="body-xs" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
                    {review.comment}
                  </Typography>
                </Box>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}