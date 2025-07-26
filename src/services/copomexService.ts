export interface CopomexResponse<T = any> {
  error: boolean;
  code_error: number;
  error_message: string | null;
  response: T;
}

export interface PostalCodeInfo {
  cp: string;
  asentamiento: string[];
  tipo_asentamiento: string;
  municipio: string;
  estado: string;
  ciudad: string;
  pais: string;
}

export interface EstadosResponse {
  estado: string[];
}

export interface MunicipiosResponse {
  municipios: string[];
}

export interface ColoniasResponse {
  colonia: string[];
}

export interface CodigosPostalesResponse {
  cp: string[];
}

class CopomexService {
  private readonly baseUrl = 'https://api.copomex.com/query';
  private readonly token: string;

  constructor(token: string = 'abe26bac-3232-4a3c-813d-a173dd90a179') {
    this.token = token;
  }

  private async makeRequest<T>(endpoint: string): Promise<CopomexResponse<T> | null> {
    try {
      const url = `${this.baseUrl}/${endpoint}&token=${this.token}`;
      console.log('COPOMEX Request:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CopomexResponse<T> = await response.json();
      
      if (data.error) {
        console.error('COPOMEX API Error:', data.error_message);
        throw new Error(data.error_message || `Error ${data.code_error}`);
      }

      return data;
    } catch (error) {
      console.error('Error en petición COPOMEX:', error);
      throw error;
    }
  }

  async getEstados(): Promise<string[]> {
    try {
      const response = await this.makeRequest<EstadosResponse>('get_estados?');
      return response?.response?.estado || [];
    } catch (error) {
      console.error('Error al obtener estados:', error);
      return [];
    }
  }

  async getMunicipiosPorEstado(estado: string): Promise<string[]> {
    try {
      if (!estado.trim()) return [];
      
      const response = await this.makeRequest<MunicipiosResponse>(
        `get_municipio_por_estado/${encodeURIComponent(estado)}?`
      );
      return response?.response?.municipios || [];
    } catch (error) {
      console.error('Error al obtener municipios:', error);
      return [];
    }
  }

  async getInfoCodigoPostal(codigoPostal: string, simplified: boolean = true): Promise<PostalCodeInfo | null> {
    try {
      if (!codigoPostal || codigoPostal.length !== 5) {
        throw new Error('Código postal debe tener 5 dígitos');
      }

      const endpoint = simplified 
        ? `info_cp/${codigoPostal}?type=simplified`
        : `info_cp/${codigoPostal}?`;

      const response = await this.makeRequest<PostalCodeInfo>(endpoint);
      return response?.response || null;
    } catch (error) {
      console.error('Error al obtener información del CP:', error);
      return null;
    }
  }

  async buscarCodigosPostales(busqueda: string, limit: number = 10): Promise<string[]> {
    try {
      if (!busqueda || busqueda.length < 2) return [];

      const response = await this.makeRequest<CodigosPostalesResponse>(
        `search_cp/${busqueda}?limit=${limit}`
      );
      return response?.response?.cp || [];
    } catch (error) {
      console.error('Error al buscar códigos postales:', error);
      return [];
    }
  }

  async getColoniasPorMunicipio(municipio: string): Promise<string[]> {
    try {
      if (!municipio.trim()) return [];

      const response = await this.makeRequest<ColoniasResponse>(
        `get_colonia_por_municipio/${encodeURIComponent(municipio)}?`
      );
      return response?.response?.colonia || [];
    } catch (error) {
      console.error('Error al obtener colonias por municipio:', error);
      return [];
    }
  }

  async autocompletarDireccion(codigoPostal: string): Promise<{
    estado: string;
    municipio: string;
    ciudad: string;
    colonias: string[];
  } | null> {
    try {
      const info = await this.getInfoCodigoPostal(codigoPostal);
      
      if (!info) return null;

      return {
        estado: info.estado,
        municipio: info.municipio,
        ciudad: info.ciudad,
        colonias: info.asentamiento
      };
    } catch (error) {
      console.error('Error al autocompletar dirección:', error);
      return null;
    }
  }

  async validarDireccion(direccion: {
    calle: string;
    numero: string;
    codigoPostal: string;
    colonia: string;
    municipio: string;
    estado: string;
  }): Promise<{
    valida: boolean;
    errores: string[];
    sugerencias?: PostalCodeInfo;
  }> {
    const errores: string[] = [];
    let sugerencias: PostalCodeInfo | undefined;

    try {
      const infoCP = await this.getInfoCodigoPostal(direccion.codigoPostal);
      
      if (!infoCP) {
        errores.push('Código postal no válido');
        return { valida: false, errores };
      }

      sugerencias = infoCP;

      if (infoCP.estado.toLowerCase() !== direccion.estado.toLowerCase()) {
        errores.push(`El estado no coincide. Debería ser: ${infoCP.estado}`);
      }

      if (infoCP.municipio.toLowerCase() !== direccion.municipio.toLowerCase() &&
          infoCP.ciudad.toLowerCase() !== direccion.municipio.toLowerCase()) {
        errores.push(`El municipio no coincide. Debería ser: ${infoCP.municipio} o ${infoCP.ciudad}`);
      }

      const coloniaValida = infoCP.asentamiento.some(
        col => col.toLowerCase() === direccion.colonia.toLowerCase()
      );
      
      if (!coloniaValida) {
        errores.push(`La colonia no coincide. Opciones válidas: ${infoCP.asentamiento.join(', ')}`);
      }

      return {
        valida: errores.length === 0,
        errores,
        sugerencias
      };
    } catch (error) {
      console.error('Error al validar dirección:', error);
      return {
        valida: false,
        errores: ['Error al validar la dirección']
      };
    }
  }
}

export const copomexService = new CopomexService();

export default copomexService;