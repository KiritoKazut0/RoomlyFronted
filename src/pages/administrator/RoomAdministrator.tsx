import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  Paper, 
  Button,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  styled,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Collapse
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Add, 
  CheckCircle, 
  Pending, 
  Cancel,
  MonetizationOn,
  CalendarToday,
  LocationOn,
  KingBed,
  AccountCircle,
  Home,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';

type RoomStatus = 'disponible' | 'ocupado' | 'En Revision';

interface Room {
  id: number;
  title: string;
  description: string;
  status: RoomStatus;
  price: number;
  date: string;
  image: string;
  street: string;
  number: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
  services: {
    bathroom: boolean;
    wifi: boolean;
    electricity: boolean;
    water: boolean;
    furnished: boolean;
    kitchen: boolean;
    ac: boolean;
    laundry: boolean;
  };
}

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.12)'
  }
}));

const AdminDashboard = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState<'all' | RoomStatus>('all');
  const [expandedServices, setExpandedServices] = useState<{[key: number]: boolean}>({});
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      title: "Habitación Premium en Centro Histórico",
      description: "Amplia habitación con baño privado, excelente iluminación natural y mobiliario moderno. Ideal para estudiantes o profesionales.",
      status: "disponible",
      price: 3500,
      date: "2023-06-15",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      street: "Av. Juárez",
      number: "123",
      neighborhood: "Centro Histórico",
      postalCode: "06000",
      city: "Ciudad de México",
      state: "CDMX",
      services: {
        bathroom: true,
        wifi: true,
        electricity: true,
        water: true,
        furnished: true,
        kitchen: false,
        ac: true,
        laundry: true
      }
    },
    {
      id: 2,
      title: "Departamento compartido Zona Norte",
      description: "Habitación privada en departamento con áreas comunes amplias. Incluye servicios básicos y acceso a cocina compartida.",
      status: "ocupado",
      price: 2800,
      date: "2023-06-22",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      street: "Calle Sierra Nevada",
      number: "45",
      neighborhood: "Lomas de Chapultepec",
      postalCode: "11000",
      city: "Ciudad de México",
      state: "CDMX",
      services: {
        bathroom: true,
        wifi: true,
        electricity: true,
        water: true,
        furnished: true,
        kitchen: true,
        ac: false,
        laundry: false
      }
    },
    {
      id: 3,
      title: "Casa completa en Colonia Roma",
      description: "Casa estilo colonial con 3 recámaras, jardín y cocina equipada. Excelente ubicación cerca de parques y transporte público.",
      status: "En Revision",
      price: 8000,
      date: "2023-07-05",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      street: "Calle Oaxaca",
      number: "78",
      neighborhood: "Roma Norte",
      postalCode: "06700",
      city: "Ciudad de México",
      state: "CDMX",
      services: {
        bathroom: true,
        wifi: true,
        electricity: true,
        water: true,
        furnished: true,
        kitchen: true,
        ac: true,
        laundry: true
      }
    }
  ]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const toggleServices = (roomId: number) => {
    setExpandedServices(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

  const getStatusIcon = (status: RoomStatus) => {
    switch(status) {
      case 'disponible': 
        return <CheckCircle color="success" sx={{ mr: 1 }} />;
      case 'ocupado':
        return <Cancel color="error" sx={{ mr: 1 }} />;
      case 'En Revision':
        return <Pending color="warning" sx={{ mr: 1 }} />;
    }
  };

  const handleEdit = (roomId: number) => {
    console.log("Editar publicación:", roomId);
  };

  const handleDeleteClick = (room: Room) => {
    setSelectedRoom(room);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRoom) {
      setRooms(rooms.filter(room => room.id !== selectedRoom.id));
    }
    setOpenDeleteDialog(false);
    setSelectedRoom(null);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedRoom(null);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const filteredRooms = filter === 'all' 
    ? rooms 
    : rooms.filter(room => room.status === filter);

  return (
    <>
      <AppBar position="static" sx={{ 
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        boxShadow: 'none',
        mb: 4
      }}>
        <Toolbar sx={{ 
          px: { xs: 2, md: 4 }, 
          maxWidth: '1400px', 
          margin: '0 auto', 
          width: '100%' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <KingBed fontSize="large" sx={{ 
              color: 'white',
              mr: 2
            }} />
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              color: 'white'
            }}>
              Roomly
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <AccountCircle sx={{ fontSize: 32 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        p: { xs: 2, md: 4 },
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Encabezado y controles */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Mis Propiedades ({filteredRooms.length})
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
            <Button
              variant={filter === 'disponible' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => setFilter('disponible')}
              startIcon={<CheckCircle />}
            >
              Disponibles
            </Button>
            <Button
              variant={filter === 'ocupado' ? 'contained' : 'outlined'}
              color="error"
              onClick={() => setFilter('ocupado')}
              startIcon={<Cancel />}
            >
              Ocupadas
            </Button>
            <Button
              variant={filter === 'En Revision' ? 'contained' : 'outlined'}
              color="warning"
              onClick={() => setFilter('En Revision')}
              startIcon={<Pending />}
            >
             En Revision
            </Button>
            
            <Button 
              variant="contained" 
              startIcon={<Add />}
              sx={{
                ml: { sm: 2 },
                backgroundColor: theme.palette.primary.main,
                borderRadius: '8px',
                px: 3,
                py: 1.5,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Nueva Propiedad
            </Button>
          </Box>
        </Box>

        {/* Lista de propiedades */}
        {filteredRooms.map((room) => (
          <StyledCard key={room.id}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Imagen de la propiedad */}
              <Box sx={{ 
                width: { xs: '100%', md: 300 },
                height: 220,
                borderRadius: '8px',
                overflow: 'hidden',
                mr: { md: 3 },
                mb: { xs: 2, md: 0 }
              }}>
                <img 
                  src={room.image} 
                  alt={room.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover'
                  }} 
                />
              </Box>
              
              {/* Detalles de la propiedad */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 1.5
                }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    {room.title}
                  </Typography>
                  <Chip
                    label={room.status === 'disponible' ? 'Disponible' : 
                          room.status === 'ocupado' ? 'Ocupado' : 'En Revision'}
                    icon={getStatusIcon(room.status)}
                    sx={{
                      backgroundColor: room.status === 'disponible' ? theme.palette.success.light : 
                                      room.status === 'ocupado' ? theme.palette.error.light : 
                                      theme.palette.warning.light,
                      color: room.status === 'disponible' ? theme.palette.success.dark : 
                            room.status === 'ocupado' ? theme.palette.error.dark : 
                            theme.palette.warning.dark,
                      fontWeight: 500
                    }}
                  />
                </Box>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {room.description}
                </Typography>
                
                {/* Ubicación */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    <LocationOn color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Ubicación exacta:
                  </Typography>
                  <Typography variant="body2">
                    {room.street} #{room.number}, {room.neighborhood}
                  </Typography>
                  <Typography variant="body2">
                    C.P. {room.postalCode}, {room.city}, {room.state}
                  </Typography>
                </Box>
                
                {/* Precio */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    <MonetizationOn color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Precio mensual:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${room.price.toLocaleString('es-MX')} MXN
                  </Typography>
                </Box>
                
                {/* Servicios incluidos */}
                <Box sx={{ mb: 2 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                    onClick={() => toggleServices(room.id)}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      <Home color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Servicios incluidos:
                    </Typography>
                    {expandedServices[room.id] ? 
                      <ExpandLess color="primary" /> : 
                      <ExpandMore color="primary" />}
                  </Box>
                  
                  <Collapse in={expandedServices[room.id]}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      <Box sx={{ width: { xs: '100%', sm: '48%', md: '48%' } }}>
                        <FormControlLabel
                          control={<Checkbox checked={room.services.bathroom} color="primary" />}
                          label="Baño privado"
                          disabled
                        />
                      </Box>
                      <Box sx={{ width: { xs: '100%', sm: '48%', md: '48%' } }}>
                        <FormControlLabel
                          control={<Checkbox checked={room.services.wifi} color="primary" />}
                          label="WiFi"
                          disabled
                        />
                      </Box>
                      <Box sx={{ width: { xs: '100%', sm: '48%', md: '48%' } }}>
                        <FormControlLabel
                          control={<Checkbox checked={room.services.electricity} color="primary" />}
                          label="Luz"
                          disabled
                        />
                      </Box>
                      <Box sx={{ width: { xs: '100%', sm: '48%', md: '48%' } }}>
                        <FormControlLabel
                          control={<Checkbox checked={room.services.water} color="primary" />}
                          label="Agua"
                          disabled
                        />
                      </Box>
                      <Box sx={{ width: { xs: '100%', sm: '48%', md: '48%' } }}>
                        <FormControlLabel
                          control={<Checkbox checked={room.services.furnished} color="primary" />}
                          label="Amueblado"
                          disabled
                        />
                      </Box>
                      <Box sx={{ width: { xs: '100%', sm: '48%', md: '48%' } }}>
                        <FormControlLabel
                          control={<Checkbox checked={room.services.kitchen} color="primary" />}
                          label="Cocina"
                          disabled
                        />
                      </Box>
                      <Box sx={{ width: { xs: '100%', sm: '48%', md: '48%' } }}>
                        <FormControlLabel
                          control={<Checkbox checked={room.services.ac} color="primary" />}
                          label="Aire acond."
                          disabled
                        />
                      </Box>
                      <Box sx={{ width: { xs: '100%', sm: '48%', md: '48%' } }}>
                        <FormControlLabel
                          control={<Checkbox checked={room.services.laundry} color="primary" />}
                          label="Lavandería"
                          disabled
                        />
                      </Box>
                    </Box>
                  </Collapse>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                {/* Fecha y acciones */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Publicado el {formatDate(room.date)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: { xs: 2, md: 0 }, display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => handleEdit(room.id)}
                      sx={{ minWidth: 120 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteClick(room)}
                      sx={{ minWidth: 120 }}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </StyledCard>
        ))}

        {/* Diálogo de confirmación para eliminar */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteCancel}
          maxWidth="xs"
          fullWidth
          PaperProps={{ sx: { borderRadius: '12px' } }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>
            Confirmar Eliminación
          </DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro que deseas eliminar la propiedad "{selectedRoom?.title}"?
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Esta acción no se puede deshacer y se perderán todos los datos asociados.
            </Typography>
           <Typography variant="body2" sx={{ mt: 1 }}>
              <span style={{ color: 'blue', fontWeight: 'bold' }}>ROOMLY</span> te agradece por tu confianza y apoyo que nos brindaste, si piensas en volver, aquí estaremos.
         </Typography>


          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleDeleteCancel} 
              sx={{ 
                borderRadius: '8px',
                px: 3,
                py: 1
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error"
              variant="contained"
              sx={{ 
                borderRadius: '8px',
                px: 3,
                py: 1
              }}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AdminDashboard;