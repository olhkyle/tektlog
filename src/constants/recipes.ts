const filmSimulation = ['Provia', 'Velvia', 'Astia', 'Classic Chrome', 'PRO Neg. Hi', 'PRO Neg. Std', 'Acros'] as const;

const dynamicRange = ['DR-Auto', 'DR-200', 'DR-400'] as const;

const grainEffect = ['Strong', 'Weak'] as const;

const highlight = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;
const shadow = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;
const color = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;
const sharpness = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;
const noiseReduction = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;
const sensors = ['X-Trans I', 'X-Trans II', 'X-Trans III', 'X-Trans IV', 'X-Trans V'] as const;

export { filmSimulation, dynamicRange, grainEffect, highlight, shadow, color, sharpness, noiseReduction, sensors };
