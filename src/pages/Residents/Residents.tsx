import { Box } from "@mui/joy";
import CardHome from "../../components/ui/card/Card";
import rentsMocks from "../../mocks/homes.json"
import NavBar from "../../components/layout/Nav/Navbar";

export default function ResidentsPages() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <NavBar />
            <br /><br />
            <Box sx={{
                width: "100%",
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center'
            }}>
                {
                    rentsMocks.map((rent) => {
                        return <CardHome
                            direccion={rent.direccion}
                            estado={rent.estado}
                            precio={rent.precio}
                            imagen={rent.imagen}
                            key={rent.id}
                        />
                    })
                }
            </Box>
        </Box>
    );
}