export const calculateConfidence = (sourcesCount) => {
  if (sourcesCount >= 5) return 0.95;
  if (sourcesCount >= 3) return 0.9;
  if (sourcesCount >= 2) return 0.85;
  return 0.7;
};
