import Welcome from './Welcome';
import Section2 from './Section2';
import ResidentsPopulars from './ResidentsPopulars';
import Support from './Support';
import { Box } from '@mui/joy';

export default function Home() {
    return (
       <Box>
        <Welcome/>
         <Section2 />
        <ResidentsPopulars />
        <Support/>
       </Box>

    );
}