import { Box, Typography, Grid, Card, AspectRatio, Chip, Button, Input, Textarea, FormControl, FormLabel } from '@mui/joy';
import { useState } from 'react';
import { 
  Wifi, 
  AcUnit, 
  Kitchen, 
  Bathtub, 
  Chair,
  Pool,
  Star,
  StarBorder,
  Send
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

const mockPropertyData = homemock[0];

const defaultServices = [
  { label: "Wi-Fi", icon: "Wifi" },
  { label: "Aire Acondicionado", icon: "AcUnit" },
  { label: "Cocina", icon: "Kitchen" },
  { label: "Baños", icon: "Bathtub" },
  { label: "Amueblado", icon: "Chair" }
];

// Componente para el rating con estrellas
const StarRating = ({ rating, onRatingChange, readonly = false }: { 
  rating: number; 
  onRatingChange?: (rating: number) => void; 
  readonly?: boolean 
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          sx={{
            cursor: readonly ? 'default' : 'pointer',
            color: star <= rating ? 'warning.main' : 'text.disabled',
            '&:hover': !readonly ? {
              color: 'warning.main'
            } : {}
          }}
        >
          {star <= rating ? <Star sx={{ fontSize: 20 }} /> : <StarBorder sx={{ fontSize: 20 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default function PropertyDetail() {
  // Estados para el formulario de reseñas
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Información del usuario logueado (obtienes esto de tu contexto/estado global)
  // Reemplaza esto con tu método real para obtener el usuario logueado
  const currentUser = {
    id: "user123", // Obtener del contexto de autenticación
    name: "Usuario Logueado" // Obtener del contexto de autenticación
  };

  // Función para enviar la reseña
  const handleSubmitReview = async () => {
    if (!comment.trim() || rating === 0) {
      alert('Por favor escribe un comentario y selecciona una calificación');
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí llamas a tu servicio/API
      const newReview = {
        user: {
          id: currentUser.id,
          name: currentUser.name
        },
        comment: comment,
        qualification: rating.toString()
      };

      // Ejemplo de llamada a tu API (reemplaza con tu servicio real)
      // await reviewService.addReview(propertyId, newReview);
      
      console.log('Nueva reseña:', newReview);
      
      // Limpiar formulario después del envío exitoso
      setComment('');
      setRating(0);
      
      alert('¡Reseña enviada exitosamente!');
      
    } catch (error) {
      console.error('Error al enviar reseña:', error);
      alert('Error al enviar la reseña. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Typography level="h3" sx={{ mb: 3 }}>
                Reseñas
              </Typography>
              
              {/* Existing Reviews */}
              {mockPropertyData.reviews.slice(0, 2).map((review, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, bgcolor: 'background.level1', borderRadius: 'md' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
                      {review.user.name}
                    </Typography>
                    <StarRating rating={parseInt(review.qualification)} readonly />
                  </Box>
                  <Typography level="body-xs" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
                    {review.comment}
                  </Typography>
                </Box>
              ))}

              {/* Add Review Form */}
              <Box sx={{ mt: 4, p: 3, bgcolor: 'background.surface', borderRadius: 'md', border: '1px solid', borderColor: 'divider' }}>
                <Typography level="h4" sx={{ mb: 2 }}>
                  Agregar Reseña
                </Typography>
                
                <Grid container spacing={2}>
                  {/* Comment */}
                  <Grid xs={12}>
                    <FormControl>
                      <FormLabel>Comentario</FormLabel>
                      <Textarea
                        placeholder="Comparte tu experiencia..."
                        minRows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </Grid>

                  {/* Rating */}
                  <Grid xs={12}>
                    <FormControl>
                      <FormLabel>Calificación</FormLabel>
                      <Box sx={{ mt: 1 }}>
                        <StarRating 
                          rating={rating} 
                          onRatingChange={setRating}
                          readonly={isSubmitting}
                        />
                      </Box>
                    </FormControl>
                  </Grid>

                  {/* Submit Button */}
                  <Grid xs={12}>
                    <Button
                      onClick={handleSubmitReview}
                      loading={isSubmitting}
                      disabled={!comment.trim() || rating === 0}
                      startDecorator={<Send />}
                      sx={{ 
                        width: '100%',
                        mt: 1
                      }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}