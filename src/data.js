// Destinos que se muestran en la cinta. Un solo lugar para editarlos.
export const DEST = [
  ['Guatemala', 'Guatemala'],
  ['Perú', 'Peru'],
  ['Francia', 'France'],
  ['Brasil', 'Brazil'],
  ['Colombia', 'Colombia'],
];
export const yearsSince2008 = () => {
  const n = new Date();
  return n.getFullYear() - 2008 - (n < new Date(n.getFullYear(), 2, 12) ? 1 : 0);
};
