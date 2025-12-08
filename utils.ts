import { MetricDefinition } from './types';

// Generate a random number between min and max with slight smoothing logic
export const generateValue = (min: number, max: number, current?: number): number => {
  if (current === undefined) {
    return Math.random() * (max - min) + min;
  }
  
  // Drift by max 5% of range
  const range = max - min;
  const drift = (Math.random() - 0.5) * range * 0.1;
  let newValue = current + drift;

  // Clamp
  if (newValue < min) newValue = min;
  if (newValue > max) newValue = max;
  
  return newValue;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const getStatusColor = (value: number, min: number, max: number): string => {
  const percent = (value - min) / (max - min);
  if (percent > 0.9) return '#ef4444'; // Red (High)
  if (percent > 0.75) return '#f97316'; // Orange (Warning)
  return '#22c55e'; // Green (Normal)
};
