import {
    Box,
    Container,
    Typography,

    Avatar,
    Stack
} from '@mui/joy';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import ImagenSection_2 from "../../assets/Section_2.jpg";

export default function Section2() {
    return (
        <Container maxWidth="lg">
            {/* Sección principal */}
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 4,
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '50%' },
                }}>
                    <img
                        src={ImagenSection_2}
                        alt="Espacio moderno con sofá y decoración"
                        style={{
                            width: '100%',
                            height: '400px',
                            borderRadius: '25px',
                            objectFit: 'cover'
                        }}
                    />
                </Box>

                <Box sx={{
                    width: { xs: '100%', md: '40%' },
                    minWidth: '300px'
                }}>
                    <Typography
                        level="h2"
                        sx={{
                            fontWeight: 'bold',
                            color: '#2c3e50',
                            fontSize: { xs: '2rem', md: '2.3rem' },
                            lineHeight: 1.2,
                            marginBottom: 2
                        }}
                    >
                        Tu nuevo espacio, cerca de todo
                    </Typography>

                    <Typography
                        level="body-lg"
                        sx={{
                            color: '#5a6c7d',
                            fontSize: '1.1rem',
                            lineHeight: 1.6,
                            marginBottom: 4
                        }}
                    >
                        Desde habitaciones cómodas hasta residencias con todo incluido,
                        te acompañamos en cada paso para que encuentres el espacio ideal
                        y vivas al máximo tu vida universitaria.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: { xs: 1, md: 2 },
                        paddingTop: 2,
                        flexWrap: 'wrap'
                    }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                level="h2"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2c3e50',
                                    fontSize: { xs: '1.8rem', md: '2.2rem' }
                                }}
                            >
                                8 MIL
                            </Typography>
                            <Typography
                                level="body-sm"
                                sx={{
                                    color: '#7a8b9a',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}
                            >
                                Cuartos disponibles
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                level="h2"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2c3e50',
                                    fontSize: { xs: '1.8rem', md: '2.2rem' }
                                }}
                            >
                                6 MIL
                            </Typography>
                            <Typography
                                level="body-sm"
                                sx={{
                                    color: '#7a8b9a',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}
                            >
                                Alquiladas
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                level="h2"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2c3e50',
                                    fontSize: { xs: '1.8rem', md: '2.2rem' }
                                }}
                            >
                                2 MIL
                            </Typography>
                            <Typography
                                level="body-sm"
                                sx={{
                                    color: '#7a8b9a',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}
                            >
                                Alquileres
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Sección "Por qué elegirnos" */}
            <Box sx={{ marginTop: 8, marginBottom: 6 }}>
                <Typography
                    level="h3"
                    sx={{
                        marginBottom: 6,
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        textAlign: 'center'
                    }}
                >
                    Por qué elegirnos
                </Typography>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: { xs: 4, md: 20 },
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        width: { xs: '100%', sm: '300px', md: '250px' }
                    }}>
                        <Stack direction="column" alignItems="center" spacing={2}>
                            <Avatar sx={{
                                bgcolor: '#4285f4',
                                width: 80,
                                height: 80,
                                boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)'
                            }}>
                                <SecurityRoundedIcon sx={{ fontSize: 40, color: "white" }} />
                            </Avatar>
                            <Typography
                                level="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2c3e50',
                                    fontSize: '1.3rem'
                                }}
                            >
                                Seguridad garantizada
                            </Typography>
                            <Typography
                                level="body-md"
                                sx={{
                                    color: '#5a6c7d',
                                    maxWidth: '250px',
                                    lineHeight: 1.6,
                                    textAlign: 'center'
                                }}
                            >
                                Verificamos todos los propietarios y habitaciones para tu tranquilidad
                            </Typography>
                        </Stack>
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        width: { xs: '100%', sm: '300px', md: '250px' }
                    }}>
                        <Stack direction="column" alignItems="center" spacing={2}>
                            <Avatar sx={{
                                bgcolor: '#34a853',
                                width: 80,
                                height: 80,
                                boxShadow: '0 4px 12px rgba(52, 168, 83, 0.3)'
                            }}>
                                <SearchRoundedIcon sx={{ fontSize: 40, color: "white" }} />
                            </Avatar>
                            <Typography
                                level="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2c3e50',
                                    fontSize: '1.3rem'
                                }}
                            >
                                Búsqueda rápida y sencilla
                            </Typography>
                            <Typography
                                level="body-md"
                                sx={{
                                    color: '#5a6c7d',
                                    maxWidth: '250px',
                                    lineHeight: 1.6,
                                    textAlign: 'center'
                                }}
                            >
                                Encuentra tu habitación ideal en minutos con nuestros filtros inteligentes
                            </Typography>
                        </Stack>
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        width: { xs: '100%', sm: '300px', md: '250px' }
                    }}>
                        <Stack direction="column" alignItems="center" spacing={2}>
                            <Avatar sx={{
                                bgcolor: '#4285f4',
                                width: 80,
                                height: 80,
                                boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)'
                            }}>
                                <HandshakeRoundedIcon sx={{ fontSize: 40, color: "white" }} />
                            </Avatar>
                            <Typography
                                level="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2c3e50',
                                    fontSize: '1.3rem'
                                }}
                            >
                                Sin contratos complicados
                            </Typography>
                            <Typography
                                level="body-md"
                                sx={{
                                    color: '#5a6c7d',
                                    maxWidth: '250px',
                                    lineHeight: 1.6,
                                    textAlign: 'center'
                                }}
                            >
                                Procesos simples y transparentes, sin letra pequeña ni sorpresas
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Container>
        
    );
}