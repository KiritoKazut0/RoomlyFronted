import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const sections = [
    {
      title: "Roomly",
      items: [
        <React.Fragment>
          La plataforma más fácil<br />
          para encontrar y publicar espacios de renta.
        </React.Fragment>
      ],
      isDescription: true,
      align: 'left'
    },
    {
      title: "Para inquilinos",
      items: [
        "Buscar espacios",
        "Cómo funciona",
        "Consejos"
      ],
      align: 'left'
    },
    {
      title: "Para arrendadores",
      items: [
        "Publicar espacio",
        "Gestionar anuncios",
        "Recursos"
      ],
      align: 'center',
      sx: { mx: 'auto' }
    },
    {
      title: "Soporte",
      items: [
        "Centro de ayuda",
        "Contacto",
        "Términos"
      ],
      align: 'right',
      sx: { ml: 'auto', pr: 4 }
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, url: "#" },
    { icon: <Twitter />, url: "#" },
    { icon: <Instagram />, url: "#" },
    { icon: <LinkedIn />, url: "#" }
  ];

  return (
    <Box 
      component="footer"
      sx={{
        py: 8,
        px: { xs: 3, md: 6 },
        backgroundColor: '#0a1f3a',
        color: '#ffffff',
        width: '100%'
      }}
    >
      <Box sx={{ 
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'space-between',
          mb: 6
        }}>
          {sections.map((section, index) => (
            <Box 
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 200px',
                maxWidth: '280px',
                minWidth: '200px',
                alignItems: section.align === 'center' ? 'center' : 
                        section.align === 'right' ? 'flex-end' : 'flex-start',
                textAlign: section.align === 'center' ? 'center' : 
                         section.align === 'right' ? 'right' : 'left',
                ...section.sx
              }}
            >
              <Typography 
                variant="h6" 
                component="h3"
                sx={{ 
                  mb: 2,
                  fontWeight: 700,
                  color: '#ffffff',
                  width: '100%'
                }}
              >
                {section.title}
              </Typography>
              
              <Box component="ul" sx={{ 
                listStyle: 'none', 
                p: 0, 
                m: 0,
                width: '100%'
              }}>
                {section.items.map((item, itemIndex) => (
                  <Typography 
                    key={itemIndex} 
                    component="li"
                    sx={{ 
                      mb: 1.5,
                      '&:last-child': { mb: 0 },
                      display: 'flex',
                      justifyContent: section.align === 'center' ? 'center' : 
                                  section.align === 'right' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Link 
                      href="#" 
                      underline="none"
                      sx={{
                        color: section.isDescription ? '#e0e0e0' : '#ffffff',
                        '&:hover': {
                          color: '#4fc3f7'
                        }
                      }}
                    >
                      {item}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ 
          mt: 6,
          pt: 4,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="body2" sx={{ color: '#b0bec5' }}>
            © {new Date().getFullYear()} Roomly. Todos los derechos reservados.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            {socialLinks.map((social, index) => (
              <Link 
                key={index} 
                href={social.url} 
                sx={{ color: '#ffffff', '&:hover': { color: '#4fc3f7' } }}
              >
                {social.icon}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;