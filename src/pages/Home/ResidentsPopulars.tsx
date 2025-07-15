import { Box, Button, Typography } from "@mui/joy";
import CardHome from "../../components/ui/card/Card";
import { Container } from "@mui/material";
import HomsPopulars from "../../mocks/homsPopulars.json";

export default function ResidentsPopulars() {
    return (
        <Box textAlign='center'>
            <Typography
                level="h3"
                sx={{
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    fontSize: { xs: '2rem', md: '2rem' },
                    lineHeight: 1.2,
                    marginBottom: 6,

                }}
            >
                Nuestras Residencias Populares
            </Typography>

            <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, mt: 2, mb: 4, alignItems: 'center', justifyContent: 'center' }}>
                {HomsPopulars.map((home) => (
                    <CardHome
                        key={home.id}
                        direccion={home.direccion}
                        estado={home.estado}
                        precio={home.precio}
                        imagen_main={home.image_main}
                    />
                ))}
            </Container>

            <Button variant="outlined" size="md"> Ver más</Button>
        </Box>
    );
}
