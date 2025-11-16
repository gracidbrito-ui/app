import { ClothingItem, Consultant, Review } from './types';

export const clothingItems: ClothingItem[] = [
  {
    id: 1,
    name: 'Vestido Gringa Pink',
    price: 'R$ 149,90',
    imageUrl: 'https://picsum.photos/id/1011/400/600',
    modelImageUrl: 'https://picsum.photos/id/1011/400/600',
    sizes: ['P', 'M', 'G'],
    colors: ['#FF1493', '#000000', '#FFFFFF'],
    fabric: 'Poliamida Premium',
    category: 'Vestido',
    tags: ['Novidade', 'Mais Vendidos'],
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Top Modern Chic',
    price: 'R$ 89,90',
    imageUrl: 'https://picsum.photos/id/1027/400/600',
    modelImageUrl: 'https://picsum.photos/id/1027/400/600',
    sizes: ['36', '38', '40'],
    colors: ['#FFFFFF', '#F5F5F5'],
    fabric: 'Suplex',
    category: 'Top',
    isAvailable: true,
  },
  {
    id: 3,
    name: 'Saia Tule Night',
    price: 'R$ 119,90',
    imageUrl: 'https://picsum.photos/id/103/400/600',
    modelImageUrl: 'https://picsum.photos/id/103/400/600',
    sizes: ['P', 'M'],
    colors: ['#000000'],
    fabric: 'Tule',
    category: 'Saia',
    tags: ['Últimas Peças'],
    isAvailable: true,
  },
  {
    id: 4,
    name: 'Body Confort',
    price: 'R$ 135,00',
    imageUrl: 'https://picsum.photos/id/1047/400/600',
    modelImageUrl: 'https://picsum.photos/id/1047/400/600',
    sizes: ['P', 'M', 'G'],
    colors: ['#7A7A7A', '#FFFFFF'],
    fabric: 'Poliamida Premium',
    category: 'Body',
    isAvailable: false,
  },
   {
    id: 5,
    name: 'Conjunto Moletom',
    price: 'R$ 150,00',
    imageUrl: 'https://picsum.photos/id/1054/400/600',
    modelImageUrl: 'https://picsum.photos/id/1054/400/600',
    sizes: ['36', '38', '40', '42'],
    colors: ['#F5F5F5', '#000000'],
    fabric: 'Suplex',
    category: 'Conjunto',
    tags: ['Promoção', 'Mais Vendidos'],
    isAvailable: true,
  },
  {
    id: 6,
    name: 'Cropped Gola Alta',
    price: 'R$ 75,00',
    imageUrl: 'https://picsum.photos/id/106/400/600',
    modelImageUrl: 'https://picsum.photos/id/106/400/600',
    sizes: ['P', 'M', 'G'],
    colors: ['#FF1493', '#FFFFFF'],
    fabric: 'Tule',
    category: 'Cropped',
    isAvailable: true,
  },
  {
    id: 7,
    name: 'Macacão Elegance',
    price: 'R$ 145,00',
    imageUrl: 'https://picsum.photos/id/107/400/600',
    modelImageUrl: 'https://picsum.photos/id/107/400/600',
    sizes: ['P', 'M'],
    colors: ['#000000', '#7A7A7A'],
    fabric: 'Poliamida Premium',
    category: 'Macacão',
    tags: ['Novidade'],
    isAvailable: true,
  },
];

export const categories: ClothingItem['category'][] = ['Body', 'Cropped', 'Saia', 'Top', 'Vestido', 'Macacão', 'Conjunto'];

export const foundationShades = [
  { name: 'NC10 - Porcelana', color: '#F8D7C4' },
  { name: 'NW15 - Bege Claro Rosado', color: '#F3D2B8' },
  { name: 'NC20 - Bege Claro Dourado', color: '#E9C6A9' },
  { name: 'NW25 - Bege Médio Rosado', color: '#E0B59A' },
  { name: 'NC30 - Bege Médio Dourado', color: '#D8AE8A' },
  { name: 'NW35 - Tan Rosado', color: '#C49A73' },
  { name: 'NC42 - Bronze Dourado', color: '#A57E5F' },
  { name: 'NW45 - Canela Intenso', color: '#8D674D' },
  { name: 'NC50 - Café', color: '#704F3A' },
  { name: 'NW58 - Espresso Intenso', color: '#523A28' },
];

export const fashionPlaylist = [
    { title: "7 rings", artist: "Ariana Grande" },
    { title: "Savage Remix", artist: "Megan Thee Stallion ft. Beyoncé" },
    { title: "Boss B*tch", artist: "Doja Cat" },
    { title: "Obsessed", artist: "Mariah Carey" },
    { title: "Good as Hell", artist: "Lizzo" },
    { title: "Bad Guy", artist: "Billie Eilish" },
];

export const getZodiacSign = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquário';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Peixes';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Áries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Touro';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gêmeos';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Câncer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leão';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgem';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Escorpião';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagitário';
  return 'Capricórnio'; // Default case
};

export const consultants: Consultant[] = [
  {
    id: 'graciene',
    name: 'Graciene',
    photoUrl: 'https://i.pravatar.cc/150?u=graciene',
    whatsapp: '5569999026793',
    welcomeMessage: 'Oi, gata! Eu tô aqui pra te ajudar a montar seu look perfeito.',
    hours: 'Seg-Sex: 09h - 18h',
  },
  {
    id: 'clara',
    name: 'Clara',
    photoUrl: 'https://i.pravatar.cc/150?u=clara',
    whatsapp: '5569999374137',
    welcomeMessage: 'Hey! Pronta para arrasar? Me chama que eu te ajudo a escolher.',
    hours: 'Seg-Sex: 09h - 18h',
  },
  {
    id: 'laura',
    name: 'Laura',
    photoUrl: 'https://i.pravatar.cc/150?u=laura',
    whatsapp: '5569999492949',
    welcomeMessage: 'Oie! Sou a Laura, sua personal stylist. Vamos encontrar o look ideal?',
    hours: 'Seg-Sex: 09h - 18h',
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    customerName: 'Julia P.',
    photoUrl: 'https://i.pravatar.cc/150?u=julia',
    rating: 5,
    comment: 'Amei a experiência! O provador virtual é super realista e a Graci foi uma fofa, me ajudou muito a escolher. As peças são de outro nível!',
  },
  {
    id: 2,
    customerName: 'Beatriz S.',
    photoUrl: 'https://i.pravatar.cc/150?u=beatriz',
    rating: 5,
    comment: 'Finalmente um app que entende nosso corpo! O caimento ficou perfeito. Já indiquei pra todas as minhas amigas. Atendimento da Laura é impecável.',
  },
  {
    id: 3,
    customerName: 'Mariana C.',
    photoUrl: 'https://i.pravatar.cc/150?u=mariana',
    rating: 4,
    comment: 'Muito moderno e chique. O app é lindo e fácil de usar. Só queria mais opções no catálogo de tule, mas o que tem já é maravilhoso.',
  },
  {
    id: 4,
    customerName: 'Fernanda L.',
    photoUrl: 'https://i.pravatar.cc/150?u=fernanda',
    rating: 5,
    comment: 'Patricinha e empoderada define! Me senti super confiante com o look que a Clara me ajudou a montar. Qualidade premium mesmo.',
  },
];