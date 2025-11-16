export interface UserProfile {
  name: string;
  phone?: string;
  email?: string;
  dob: string;
  weight: number;
  height: number;
  waist?: number;
  hip?: number;
  bust?: number;
  arm?: number;
  leg?: number;
  shoulders?: number;
  shoeSize?: number;
  clothingSize?: number;
  skinTone?: string;
  personalColor?: string;
  profilePhoto?: string;
}

export interface ClothingItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  modelImageUrl: string;
  sizes: string[];
  colors: string[];
  fabric: 'Poliamida Premium' | 'Suplex' | 'Tule';
  category: 'Body' | 'Cropped' | 'Saia' | 'Top' | 'Vestido' | 'Macacão' | 'Conjunto';
  tags?: ('Novidade' | 'Promoção' | 'Mais Vendidos' | 'Últimas Peças')[];
  isAvailable?: boolean;
}

export interface Consultant {
  id: string;
  name: string;
  photoUrl: string;
  whatsapp: string; // Phone number for wa.me link
  welcomeMessage: string;
  hours: string;
}

export interface Review {
  id: number;
  customerName: string;
  photoUrl: string;
  rating: number;
  comment: string;
}