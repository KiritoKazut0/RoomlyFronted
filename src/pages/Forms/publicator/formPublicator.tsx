import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Paper,
  useTheme,
  IconButton,
  Chip,
  InputAdornment,
  Autocomplete,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  CloudUpload, 
  Close, 
  Add, 
  LocationOn, 
  CheckCircle 
} from '@mui/icons-material';
import copomexService from '../../../services/copomexService';

interface FormData {
  street: string;
  number: string;
  postalCode: string;
  neighborhood: string;
  city: string;
  state: string;
  description: string;
  price: string;
  additionalServices: string[];
  images: File[];
}

const FormPublication = () => {
  
  const theme = useTheme();
  
  const [formData, setFormData] = useState<FormData>({
    street: '',
    number: '',
    postalCode: '',
    neighborhood: '',
    city: '',
    state: '',
    description: '',
    price: '',
    additionalServices: [],
    images: []
  });

  const [estados, setEstados] = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [colonias, setColonias] = useState<string[]>([]);
  const [codigosPostales, setCodigosPostales] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning'>('success');

  const [services, setServices] = useState({
    baño: true,
    wifi: true,
    amueblado: true,
    cocina: true,
    clima: true
  });

  const [additionalService, setAdditionalService] = useState('');

  useEffect(() => {
    const loadEstados = async () => {
      try {
        const estadosData = await copomexService.getEstados();
        setEstados(estadosData);
      } catch (error) {
        console.error('Error loading estados:', error);
      }
    };
    loadEstados();
  }, []);

  const handlePostalCodeChange = async (value: string) => {
    setFormData(prev => ({ ...prev, postalCode: value }));
    
    if (value.length === 5 && /^\d{5}$/.test(value)) {
      setLoading(true);
      try {
        const info = await copomexService.autocompletarDireccion(value);
        if (info) {
          setFormData(prev => ({
            ...prev,
            state: info.estado,
            city: info.municipio
          }));
          setColonias(info.colonias);
          
          const municipiosData = await copomexService.getMunicipiosPorEstado(info.estado);
          setMunicipios(municipiosData);
          
          setMessage('✅ Información autocompletada');
          setMessageType('success');
        } else {
          setMessage('⚠️ Código postal no encontrado');
          setMessageType('warning');
        }
      } catch (error) {
        setMessage('❌ Error al consultar código postal');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    } else if (value.length >= 2) {
      try {
        const cps = await copomexService.buscarCodigosPostales(value);
        setCodigosPostales(cps);
      } catch (error) {
        console.error('Error searching postal codes:', error);
      }
    }
  };

  const handleStateChange = async (value: string | null) => {
    setFormData(prev => ({ 
      ...prev, 
      state: value || '',
      city: '',
      neighborhood: ''
    }));
    
    setMunicipios([]);
    setColonias([]);
    
    if (value) {
      try {
        const municipiosData = await copomexService.getMunicipiosPorEstado(value);
        setMunicipios(municipiosData);
      } catch (error) {
        console.error('Error loading municipios:', error);
      }
    }
  };

  const handleCityChange = async (value: string | null) => {
    setFormData(prev => ({ 
      ...prev, 
      city: value || '',
      neighborhood: ''
    }));
    
    setColonias([]);
    
    if (value) {
      try {
        const coloniasData = await copomexService.getColoniasPorMunicipio(value);
        setColonias(coloniasData);
      } catch (error) {
        console.error('Error loading colonias:', error);
      }
    }
  };

  const handleValidateAddress = async () => {
    if (!formData.postalCode || !formData.neighborhood || !formData.city || !formData.state) {
      setMessage('Complete los campos de ubicación');
      setMessageType('warning');
      return;
    }

    setLoading(true);
    try {
      const resultado = await copomexService.validarDireccion({
        calle: formData.street,
        numero: formData.number,
        codigoPostal: formData.postalCode,
        colonia: formData.neighborhood,
        municipio: formData.city,
        estado: formData.state
      });

      if (resultado.valida) {
        setMessage('✅ Dirección válida');
        setMessageType('success');
      } else {
        setMessage(`⚠️ ${resultado.errores.join(', ')}`);
        setMessageType('warning');
      }
    } catch (error) {
      setMessage('❌ Error al validar dirección');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAddService = () => {
    if (additionalService.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        additionalServices: [...prev.additionalServices, additionalService.trim()]
      }));
      setAdditionalService('');
    }
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.filter(service => service !== serviceToRemove)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(event.target.files as FileList);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.slice(0, 10 - prev.images.length)]
    }));
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  return (
    <Paper elevation={0} sx={{
      p: 4,
      maxWidth: 800,
      mx: 'auto',
      my: 4,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 2
    }}>
      <Box sx={{ 
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h5" component="h1" sx={{ 
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 1,
          fontSize: { xs: '1.5rem', sm: '1.75rem' }
        }}>
          Publica tu espacio
        </Typography>
        <Typography variant="body1" sx={{ 
          color: theme.palette.text.secondary,
          maxWidth: '80%'
        }}>
          Completa la información y llega a miles de interesados
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <LocationOn />
            Ubicación exacta
          </Typography>
          
          <Button
            variant="outlined"
            size="small"
            onClick={handleValidateAddress}
            disabled={loading || !formData.postalCode}
            startIcon={loading ? <CircularProgress size={16} /> : <CheckCircle />}
          >
            Validar
          </Button>
        </Box>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 2
        }}>
          <Box sx={{ flex: 2 }}>
            <TextField
              fullWidth
              name="street"
              value={formData.street}
              onChange={handleChange}
              label="Calle"
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="number"
              value={formData.number}
              onChange={handleChange}
              label="Número"
              variant="outlined"
              required
            />
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 2
        }}>
          <Box sx={{ flex: 1 }}>
            <Autocomplete
              freeSolo
              options={codigosPostales}
              value={formData.postalCode}
              onInputChange={(event, newValue) => {
                handlePostalCodeChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Código Postal"
                  variant="outlined"
                  required
                  helperText="5 dígitos para autocompletar"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Autocomplete
              options={colonias}
              value={formData.neighborhood}
              onChange={(event, newValue) => {
                setFormData(prev => ({ ...prev, neighborhood: newValue || '' }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Colonia"
                  variant="outlined"
                  required
                />
              )}
              disabled={colonias.length === 0}
            />
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Box sx={{ flex: 1 }}>
            <Autocomplete
              options={estados}
              value={formData.state}
              onChange={(event, newValue) => handleStateChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado"
                  variant="outlined"
                  required
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Autocomplete
              options={municipios}
              value={formData.city}
              onChange={(event, newValue) => handleCityChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ciudad/Municipio"
                  variant="outlined"
                  required
                />
              )}
              disabled={municipios.length === 0}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ 
          fontWeight: 600,
          mb: 2,
          color: theme.palette.text.primary
        }}>
          Descripción del espacio
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe detalladamente el espacio"
          variant="outlined"
          required
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ 
          fontWeight: 600,
          mb: 2,
          color: theme.palette.text.primary
        }}>
          Precio mensual
        </Typography>
        <TextField
          fullWidth
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Ej: 3500"
          variant="outlined"
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: { min: 0 }
          }}
        />
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ 
          fontWeight: 600,
          mb: 2,
          color: theme.palette.text.primary
        }}>
          Servicios incluidos
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          {Object.entries(services).map(([service, checked]) => (
            <FormControlLabel
              key={service}
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleServiceChange}
                  name={service}
                />
              }
              label={service.charAt(0).toUpperCase() + service.slice(1)}
            />
          ))}
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Agregar otros servicios
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            value={additionalService}
            onChange={(e) => setAdditionalService(e.target.value)}
            placeholder="Ej: Lavadora, Estacionamiento"
            variant="outlined"
            size="small"
          />
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddService}
            disabled={!additionalService.trim()}
          >
            Agregar
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {formData.additionalServices.map((service, index) => (
            <Chip
              key={index}
              label={service}
              onDelete={() => handleRemoveService(service)}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ 
          fontWeight: 600,
          mb: 2,
          color: theme.palette.text.primary
        }}>
          Fotos del espacio (Máximo 10)
        </Typography>
        
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-images"
          type="file"
          multiple
          onChange={handleImageUpload}
          disabled={formData.images.length >= 10}
        />
        <label htmlFor="upload-images">
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              border: `2px dashed ${theme.palette.divider}`,
              borderRadius: 1,
              textAlign: 'center',
              cursor: formData.images.length < 10 ? 'pointer' : 'default',
            }}
          >
            <CloudUpload fontSize="large" sx={{ 
              color: theme.palette.text.secondary,
              mb: 1
            }} />
            <Typography variant="body1" sx={{ 
              color: theme.palette.text.secondary,
              mb: 1
            }}>
              {formData.images.length < 10 
                ? "Haz clic para seleccionar fotos" 
                : "Límite alcanzado"}
            </Typography>
            <Typography variant="caption" sx={{ 
              color: theme.palette.text.disabled
            }}>
              {formData.images.length}/10 fotos
            </Typography>
          </Paper>
        </label>

        <Box sx={{ 
          mt: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1
        }}>
          {formData.images.map((image, index) => (
            <Box key={index} sx={{
              position: 'relative',
              width: 100,
              height: 100,
              borderRadius: 1,
              overflow: 'hidden'
            }}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <IconButton 
                size="small" 
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'background.paper'
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 6,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2
          }}
          disabled={
            !formData.street || 
            !formData.number || 
            !formData.neighborhood || 
            !formData.postalCode || 
            !formData.city || 
            !formData.state || 
            !formData.description || 
            !formData.price
          }
        >
          Publicar mi espacio
        </Button>
      </Box>

      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setMessage('')} 
          severity={messageType}
        >
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FormPublication;