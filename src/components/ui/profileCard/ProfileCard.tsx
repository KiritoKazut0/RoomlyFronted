import { Box, Card, Typography, Button, Chip } from '@mui/joy';
import { 
  Edit, 
  Logout, 
  Phone, 
  LocationOn,
  Star,
  CalendarToday
} from '@mui/icons-material';
import ProfileIcon from '../../ui/profileIcon/ProfileIcon';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  location?: string;
  memberSince: string;
  totalReservations: number;
  rating: number;
  maxRating: number;
}

interface ProfileCardProps {
  user: UserProfile;
  onEditProfile?: () => void;
  onLogout?: () => void;
}

export default function ProfileCard({ 
  user, 
  onEditProfile, 
  onLogout 
}: ProfileCardProps) {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Card sx={{ overflow: 'hidden', borderRadius: 'lg', p: 0 }}>
        {/* Header con fondo azul - Completamente al borde */}
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
            height: 140,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            m: 0,
            borderRadius: 0
          }}
        >
          <Box sx={{ 
            '& .MuiAvatar-root': { 
              width: 100, 
              height: 100,
              border: '4px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }
          }}>
            <ProfileIcon
              name={user.name}
              email={user.email}
              image={user.avatar}
              compact={true}
            />
          </Box>
        </Box>

        {/* Contenido principal */}
        <Box sx={{ p: 3, pt: 2 }}>
          {/* Nombre y email */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography level="h2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '2rem' }}>
              {user.name}
            </Typography>
            <Typography level="body-md" sx={{ color: 'text.secondary', mb: 1 }}>
              {user.email}
            </Typography>
            <Chip 
              variant="soft" 
              color="neutral" 
              size="sm"
              startDecorator={<CalendarToday sx={{ fontSize: 16 }} />}
            >
              Miembro desde {user.memberSince}
            </Chip>
          </Box>

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
            <Button
              variant="solid"
              startDecorator={<Edit />}
              onClick={onEditProfile}
              sx={{ flex: 1, maxWidth: 200 }}
            >
              Editar Perfil
            </Button>
            <Button
              variant="outlined"
              color="danger"
              startDecorator={<Logout />}
              onClick={onLogout}
              sx={{ flex: 1, maxWidth: 200 }}
            >
              Cerrar Sesión
            </Button>
          </Box>

          {/* Información en dos columnas */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {/* Columna izquierda - Información Personal */}
            <Box>
              <Typography level="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                Información Personal
              </Typography>
              
              {user.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Phone sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Box>
                    <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                      Teléfono
                    </Typography>
                    <Typography level="body-md" sx={{ fontWeight: 'medium' }}>
                      {user.phone}
                    </Typography>
                  </Box>
                </Box>
              )}

              {user.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Box>
                    <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                      Ubicación
                    </Typography>
                    <Typography level="body-md" sx={{ fontWeight: 'medium' }}>
                      {user.location}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Columna derecha - Estadísticas */}
            <Box>
              <Typography level="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                Estadísticas
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CalendarToday sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Reservas Totales
                  </Typography>
                </Box>
                <Typography level="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {user.totalReservations}
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Star sx={{ fontSize: 20, color: 'warning.main' }} />
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Puntuación
                  </Typography>
                </Box>
                <Typography level="h3" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  {user.rating}/{user.maxRating}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}