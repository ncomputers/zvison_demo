import { MetricDefinition, Timeframe } from './types';

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

export const generateHistory = (metric: MetricDefinition, timeframe: Timeframe): { value: number; timestamp: number }[] => {
  const points = 50;
  const now = Date.now();
  let timeStep = 1000 * 60; // 1 min default
  
  if (timeframe === '8H') timeStep = 1000 * 60 * 10; // 10 min
  if (timeframe === '24H') timeStep = 1000 * 60 * 30; // 30 min
  if (timeframe === '7D') timeStep = 1000 * 60 * 60 * 4; // 4 hours
  if (timeframe === '30D') timeStep = 1000 * 60 * 60 * 12; // 12 hours

  const history = [];
  let current = (metric.value_range.min + metric.value_range.max) / 2;

  for (let i = points; i >= 0; i--) {
    current = generateValue(metric.value_range.min, metric.value_range.max, current);
    history.push({
      value: current,
      timestamp: now - (i * timeStep)
    });
  }
  return history;
};

export const formatTimeAxis = (timestamp: number, timeframe: Timeframe): string => {
  const date = new Date(timestamp);
  if (timeframe === 'LIVE' || timeframe === '1H') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (timeframe === '8H' || timeframe === '24H') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (timeframe === '7D' || timeframe === '30D') {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};