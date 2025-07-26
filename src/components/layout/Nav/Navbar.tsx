import { AppBar, Toolbar, Typography, InputBase, Box, useMediaQuery, useTheme } from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material';
import BedIcon from '@mui/icons-material/Bed';
import ProfileIcon from '../../ui/profileIcon/ProfileIcon';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: { xs: '0 10px', sm: '0 15px', md: '0 20px' },
                minHeight: { xs: '56px', sm: '64px', md: '70px' },
                gap: { xs: 1, sm: 2, md: 3 }
            }}>

                {/* Logo Section */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.5, sm: 1 },
                    minWidth: 'fit-content'
                }}>
                    <BedIcon sx={{ 
                        fontSize: { xs: 24, sm: 28, md: 32 }, 
                        color: '#ffffff'
                    }} />
                    <Typography
                        variant={isMobile ? "h6" : "h5"}
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            color: '#ffffff',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                        }}
                    >
                        Roomly
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#1565c0',
                    borderRadius: '25px',
                    padding: { xs: '4px 10px', sm: '5px 15px' },
                    flex: 1,
                    maxWidth: { xs: '180px', sm: '300px', md: '400px' },
                    minWidth: { xs: '120px', sm: '200px' },
                    mx: { xs: 1, sm: 2 }
                }}>
                    <SearchIcon sx={{
                        color: '#bbdefb',
                        marginRight: { xs: 0.5, sm: 1 },
                        fontSize: { xs: 18, sm: 20, md: 24 }
                    }} />
                    <InputBase
                        placeholder={isSmall ? "Buscar..." : "Buscar cuartos..."}
                        sx={{
                            color: '#ffffff',
                            width: '100%',
                            fontSize: { xs: '12px', sm: '14px' },
                            '& input::placeholder': {
                                color: '#bbdefb',
                                opacity: 1
                            }
                        }}
                    />
                </Box>

                
                <Box sx={{ minWidth: 'fit-content' }}>
                    <ProfileIcon 
                        email='norbertolopez291@gmail.com'
                        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn06STZg493koTKQBmngvHdQq4S9uejNTDrw&s'
                        name='Norberto Lopez'
                        compact={isMobile}

                    />
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;