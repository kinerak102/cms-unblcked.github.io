export interface Game {
  id: string;
  title: string;
  category: string;
  description: string;
  embeddable: boolean;
  sourceUrl?: string;
  officialUrl: string;
  rating: number;
  plays: string;
  featured?: boolean;
}

export const GAMES: Game[] = [
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    category: 'Sports',
    description: 'Take charge of your dream American Football team, manage your roster, handle press duties, and call the plays on the field in this addictive, retro-style arcade football simulator!',
    embeddable: true,
    sourceUrl: './game/retro-bowl/index.html',
    officialUrl: 'https://poki.com/en/g/retro-bowl',
    rating: 4.9,
    plays: '12.4k',
    featured: true,
  },
  {
    id: 'bitlife',
    title: 'BitLife - Life Simulator',
    category: 'Simulation',
    description: 'How will you live your BitLife? Will you make all the right choices in an attempt to become a model citizen, or will you make decisions that terrify your parents? Text-based life simulation at its finest!',
    embeddable: false,
    officialUrl: 'https://bitlifeonline.com/',
    rating: 4.7,
    plays: '15.1k',
    featured: false,
  },
  {
    id: 'basket-bros',
    title: 'Basket Bros',
    category: 'Sports',
    description: 'Fast-paced 1v1 basketball action! Customize your player, execute monster dunks, and compete against friends or AI in high-flying arcade basketball matches.',
    embeddable: false,
    officialUrl: 'https://basketbros.io/',
    rating: 4.8,
    plays: '8.9k',
    featured: false,
  },
];
