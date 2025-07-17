import { Box } from '@mui/joy';
import Navbar from '../../components/layout/Nav/Navbar';
import ProfileCard from '../../components/ui/profileCard/ProfileCard';

import userProfileMock from '../../mocks/userProfile.json';

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

const mockUserData: UserProfile = {
  id: userProfileMock.id,
  name: userProfileMock.name,
  email: userProfileMock.email,
  avatar: userProfileMock.avatar,
  phone: userProfileMock.phone,
  location: userProfileMock.location,
  memberSince: userProfileMock.memberSince,
  totalReservations: userProfileMock.totalReservations,
  rating: userProfileMock.rating,
  maxRating: userProfileMock.maxRating
};

export default function Profile() {
  const handleEditProfile = () => {
    console.log('Editar perfil clickeado');

  };

  const handleLogout = () => {
    console.log('Cerrar sesión clickeado');

  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.level1', 
        py: 4 
      }}>
        <ProfileCard
          user={mockUserData}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </Box>
    </>
  );
}