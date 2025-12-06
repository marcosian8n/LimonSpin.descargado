import { Prize } from './types';

export const PRIZES: Prize[] = [
  { 
    id: 'consumicion', 
    label: '1 Consumición', 
    color: '#4d7c0f', // lime-700
    textColor: '#ffffff' 
  },
  { 
    id: 'limon_1', 
    label: 'Chúpate un limón', 
    color: '#facc15', // yellow-400 (The Lemon)
    textColor: '#000000',
    isBoobyPrize: true
  },
  { 
    id: 'sernova', 
    label: '1 Combo Sernova', 
    color: '#ffffff', // White (Premium/Clean like the Logo)
    textColor: '#1a2e05',
    isGrandPrize: true 
  },
  { 
    id: 'shot', 
    label: '1 Shot', 
    color: '#10b981', // emerald-500
    textColor: '#ffffff' 
  },
  { 
    id: 'limon_2', 
    label: 'Chúpate un limón', 
    color: '#facc15', // yellow-400
    textColor: '#000000',
    isBoobyPrize: true
  },
  { 
    id: 'pico', 
    label: 'Pico con alguien', 
    color: '#84cc16', // lime-500
    textColor: '#ffffff' 
  },
];

// Configuration for probability
export const TOTAL_CHANCES = 150; // 1 in 150 for Grand Prize
export const SPIN_DURATION_MS = 4000;
export const ROTATIONS_PER_SPIN = 5;
