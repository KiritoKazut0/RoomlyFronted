import React, { useState } from 'react';
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
  InputAdornment
} from '@mui/material';
import { CloudUpload, Close, Add } from '@mui/icons-material';

const FormPublication = () => {
  
  const theme = useTheme();
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

  const [services, setServices] = useState({
    baño: true,
    wifi: true,
    amueblado: true,
    cocina: true,
    clima: true
  });

  const [additionalService, setAdditionalService] = useState('');

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
      {/* Header */}
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

      {/* Detailed Location Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ 
          fontWeight: 600,
          mb: 2,
          color: theme.palette.text.primary
        }}>
          Ubicación exacta
        </Typography>
        
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
            <TextField
              fullWidth
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              label="Colonia o Barrio"
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              label="Código Postal"
              variant="outlined"
              required
              inputProps={{ pattern: "\\d{5}", title: "Debe contener 5 dígitos" }}
            />
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="Ciudad"
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="state"
              value={formData.state}
              onChange={handleChange}
              label="Estado"
              variant="outlined"
              required
            />
          </Box>
        </Box>
      </Box>

      {/* Description Section */}
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
          placeholder="Describe detalladamente el espacio (tamaño, distribución, iluminación, etc.)"
          variant="outlined"
          required
        />
      </Box>

      {/* Price Section */}
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

      {/* Services Section */}
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
            placeholder="Ej: Lavadora, Estacionamiento, etc."
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
              sx={{ backgroundColor: theme.palette.action.selected }}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Image Upload Section */}
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
              '&:hover': {
                borderColor: formData.images.length < 10 ? theme.palette.primary.main : theme.palette.divider
              }
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
                ? "Arrastra fotos aquí o haz clic para seleccionar" 
                : "Has alcanzado el límite de 10 fotos"}
            </Typography>
            <Typography variant="caption" sx={{ 
              color: theme.palette.text.disabled
            }}>
              {formData.images.length}/10 fotos subidas
            </Typography>
          </Paper>
        </label>

        {/* Image Previews */}
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
              bgcolor: theme.palette.action.hover,
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
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'background.default'
                  }
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

      {/* Submit Button */}
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
    </Paper>
  );
};

export default FormPublication;