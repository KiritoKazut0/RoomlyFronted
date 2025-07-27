export enum RoomServiceType {
  BATHROOM = 'Baño',
  WIFI = 'Wifi',
  FURNISHED = 'Amueblado',
  KITCHEN = 'Cocina',
  AIR_CONDITIONING = 'Clima'
}

export type RoomStatus = 'Ocupado' | 'Disponible' | 'En revision';

export interface ICreateRoom {
  id_user: string;
  zone: string;
  images: string[];
  description: string;
  status: RoomStatus;
  price_monthly: number;
  services?: RoomServiceType[];
  other_services?: string[];
  location_street: string;
  location_number: number;
  location_postal_code: string;
  city: string;
  state: string;
}

export interface IRoom extends ICreateRoom {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface IRoomFilters {
  city?: string;
  state?: string;
  zone?: string;
  min_price?: number;
  max_price?: number;
  services?: RoomServiceType[];
  status?: RoomStatus;
}

export interface IRoomsResponse {
  rooms: IRoom[];
  total: number;
  page: number;
  limit: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

class RoomService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log('Room API Request:', url);

      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const token = localStorage.getItem('authToken');
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<T> = await response.json();
      return data;
    } catch (error) {
      console.error('Error in room API request:', error);
      throw error;
    }
  }

  async createRoom(roomData: ICreateRoom): Promise<IRoom> {
    try {
      const response = await this.makeRequest<IRoom>('/rooms', {
        method: 'POST',
        body: JSON.stringify(roomData),
      });

      if (!response.success) {
        throw new Error(response.error || 'Error al crear el cuarto');
      }

      return response.data!;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  }

  async getRooms(filters?: IRoomFilters, page: number = 1, limit: number = 10): Promise<IRoomsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(item => queryParams.append(key, item));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());

      const endpoint = `/rooms?${queryParams.toString()}`;
      const response = await this.makeRequest<IRoomsResponse>(endpoint);

      if (!response.success) {
        throw new Error(response.error || 'Error al obtener los cuartos');
      }

      return response.data!;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }

  async getRoomById(id: string): Promise<IRoom> {
    try {
      const response = await this.makeRequest<IRoom>(`/rooms/${id}`);

      if (!response.success) {
        throw new Error(response.error || 'Error al obtener el cuarto');
      }

      return response.data!;
    } catch (error) {
      console.error('Error fetching room:', error);
      throw error;
    }
  }

  async updateRoom(id: string, roomData: Partial<ICreateRoom>): Promise<IRoom> {
    try {
      const response = await this.makeRequest<IRoom>(`/rooms/${id}`, {
        method: 'PUT',
        body: JSON.stringify(roomData),
      });

      if (!response.success) {
        throw new Error(response.error || 'Error al actualizar el cuarto');
      }

      return response.data!;
    } catch (error) {
      console.error('Error updating room:', error);
      throw error;
    }
  }

  async deleteRoom(id: string): Promise<boolean> {
    try {
      const response = await this.makeRequest(`/rooms/${id}`, {
        method: 'DELETE',
      });

      if (!response.success) {
        throw new Error(response.error || 'Error al eliminar el cuarto');
      }

      return true;
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  }

  async getUserRooms(userId: string): Promise<IRoom[]> {
    try {
      const response = await this.makeRequest<IRoom[]>(`/users/${userId}/rooms`);

      if (!response.success) {
        throw new Error(response.error || 'Error al obtener los cuartos del usuario');
      }

      return response.data!;
    } catch (error) {
      console.error('Error fetching user rooms:', error);
      throw error;
    }
  }

  async uploadRoomImages(roomId: string, images: File[]): Promise<string[]> {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      const response = await fetch(`${this.baseUrl}/rooms/${roomId}/images`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error al subir las imágenes');
      }

      return data.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }
}

export const roomService = new RoomService();

export default roomService;