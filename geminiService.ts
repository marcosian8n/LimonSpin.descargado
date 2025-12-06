import { Prize } from "../types";

// Se reemplaza la generación por IA con mensajes fijos personalizados
export const generatePartyMessage = async (prize: Prize): Promise<string> => {
  // Pequeño delay artificial para mantener la expectativa en la UI
  await new Promise(resolve => setTimeout(resolve, 600));

  if (prize.id === 'sernova') {
    return "¡INCREÍBLE! ¡Te hiciste la noche!";
  }

  if (prize.id === 'consumicion') {
    return "Vodkita o Fernet gratis para vos crack";
  }

  if (prize.id === 'shot') {
    return "Que comience el DEGENERE";
  }

  if (prize.id.includes('pico')) {
    return "Anda buscando a quien te vas a encarar";
  }

  // Cubre limon_1 y limon_2
  if (prize.id.includes('limon')) {
    return "Mal en el juego, bien en el amor dicen por ahi";
  }

  return "¡Buena esa! A festejar.";
};