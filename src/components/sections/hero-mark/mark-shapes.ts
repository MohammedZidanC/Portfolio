export type MarkInstance = 'splashM' | 'splashZ' | 'heroM' | 'heroZ';

export interface MarkShapeConfig {
  letter: 'M' | 'Z';
  path: string;
  /** Artwork scale inside its own square frame (0..1). */
  scale: number;
  /** Extra vector stroke in the 100-unit design grid. */
  boldness: number;
  /** Artwork center in the instance frame (0..1). */
  position: { x: number; y: number };
}

const M_SHAPE = 'M12 88V12H31L50 40L69 12H88V88H69V45L50 72L31 45V88Z';
const Z_SHAPE = 'M12 12H88V29L39 69H88V88H12V71L61 31H12Z';

/**
 * Per-instance control panel for the four logo letters.
 * Edit shape, scale, boldness, and position independently for each one.
 */
export const markShapes: Record<MarkInstance, MarkShapeConfig> = {
  splashM: {
    letter: 'M',
    path: M_SHAPE,
    scale: 0.98,
    boldness: 0.6,
    position: { x: 0.5, y: 0.574 },
  },
  splashZ: {
    letter: 'Z',
    path: Z_SHAPE,
    scale: 0.98,
    boldness: 0.6,
    position: { x: 0.5, y: 0.574 },
  },
  heroM: {
    letter: 'M',
    path: M_SHAPE,
    scale: 0.98,
    boldness: 0.6,
    position: { x: 0.5, y: 0.574 },
  },
  heroZ: {
    letter: 'Z',
    path: Z_SHAPE,
    scale: 0.98,
    boldness: 0.6,
    position: { x: 0.5, y: 0.574 },
  },
};
