import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import GoogleIcon from '../../components/icons/GoogleIcon';
import BedIcon from '@mui/icons-material/Bed';
import ImageLoginForm from '../../assets/ImageLoginForm.jpg';

type UserRole = 'Estudiante' | 'Propietario';

interface RegisterFormData {
  name: string;
  lastName: string;
  phone: string;
  rol: UserRole;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export default function RegisterForm() {
  const [selectedRole, setSelectedRole] = React.useState<UserRole>('Estudiante');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const data: RegisterFormData = {
      name: formData.get('name') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      rol: selectedRole,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    if (!data.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    const submitData = {
      name: data.name,
      lastName: data.lastName,
      phone: data.phone,
      rol: data.rol,
      email: data.email,
      password: data.password
    };

    alert(JSON.stringify(submitData, null, 2));
  };

  const handleRoleChange = (
    _event: React.SyntheticEvent | null,
    newValue: UserRole | null,
  ) => {
    if (newValue) {
      setSelectedRole(newValue);
    }
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={{
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BedIcon />
              </IconButton>
              <Typography level="title-lg">Roomly</Typography>
            </Box>
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already have an account?{' '}
                  <Link href="#replace-with-a-link" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={{
                color: { xs: '#FFF', md: 'text.tertiary' },
              }}
            >
              or
            </Divider>
            <Stack sx={{ gap: 4, mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <Stack sx={{ gap: 2 }}>
                  {/* Nombre y Apellido */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl required sx={{ flex: 1 }}>
                      <FormLabel>Nombre</FormLabel>
                      <Input 
                        type="text" 
                        name="name" 
                        placeholder="Carlos"
                      />
                    </FormControl>
                    <FormControl required sx={{ flex: 1 }}>
                      <FormLabel>Apellido</FormLabel>
                      <Input 
                        type="text" 
                        name="lastName" 
                        placeholder="Ramírez"
                      />
                    </FormControl>
                  </Box>

                  {/* Teléfono */}
                  <FormControl required>
                    <FormLabel>Teléfono</FormLabel>
                    <Input 
                      type="tel" 
                      name="phone" 
                      placeholder="+5215512345678"
                    />
                  </FormControl>

                  {/* Rol */}
                  <FormControl required>
                    <FormLabel>Tipo de usuario</FormLabel>
                    <Select
                      value={selectedRole}
                      onChange={handleRoleChange}
                      placeholder="Selecciona tu rol"
                    >
                      <Option value="Estudiante">Estudiante</Option>
                      <Option value="Propietario">Propietario</Option>
                    </Select>
                  </FormControl>

                  {/* Email */}
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      type="email" 
                      name="email" 
                      placeholder="carlos.ramirez@example.com"
                    />
                  </FormControl>

                  {/* Contraseña */}
                  <FormControl required>
                    <FormLabel>Contraseña</FormLabel>
                    <Input 
                      type="password" 
                      name="password" 
                      placeholder="Mínimo 6 caracteres"
                    />
                  </FormControl>

                  {/* Términos y condiciones */}
                  <FormControl>
                    <Checkbox 
                      size="sm" 
                      name="acceptTerms"
                      label={
                        <Typography level="body-sm">
                          Acepto los{' '}
                          <Link level="title-sm">términos y condiciones</Link>
                          {' '}y la{' '}
                          <Link level="title-sm">política de privacidad</Link>
                        </Typography>
                      }
                      required
                    />
                  </FormControl>

                  {/* Botón de registro */}
                  <Button type="submit" fullWidth sx={{ mt: 2 }}>
                    Crear cuenta
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(' + ImageLoginForm + ')',
        }}
      />
    </CssVarsProvider>
  );
}