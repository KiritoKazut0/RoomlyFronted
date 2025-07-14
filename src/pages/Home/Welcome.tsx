import { Box, Button, Container, Typography, } from '@mui/joy';
import WelcomeImage from "../../assets/welcome.png"
import PublicNav from "../../components/layout/Nav/PublicNav";

export default function Welcome() {
    return (
        <Box>
            <PublicNav />
            <Container maxWidth="lg">
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 4,
                }}>

                    <Box sx={{
                        width: { xs: '100%', md: '30%' },
                        minWidth: '300px'
                    }}>
                        <Typography
                            level="h2"
                            sx={{
                                fontWeight: 'bold',
                                color: '#2c3e50',
                                fontSize: { xs: '2rem', md: '3.3rem' },
                                lineHeight: 1.2,
                                marginBottom: 2
                            }}
                        >
                            Encuentra Tu Habitación Ideal
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
                            <span style={{ color: '#1875d3', fontWeight: 'bold' }}>
                                Roomly
                            </span> es una plataforma digital innovadora desarrollada por Softvana CA, DE CV,
                            diseñada para simplificar y agilizar la búsqueda de habitaciones de alquiler.
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: { xs: 1, md: 2 },
                            paddingTop: 2,
                            flexWrap: 'wrap'
                        }}>

                            <Button variant='solid' color='neutral'>Comenzar</Button>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', md: '60%' },
                    }}>
                        <img
                            src={WelcomeImage}
                            alt="Espacio moderno con sofá y decoración"
                            style={{
                                width: '100%',
                                height: '400px',
                                borderRadius: '25px',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>

    );
}