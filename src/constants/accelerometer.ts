export const accelerometerIntervals = [50, 200, 1000] as const;
export type AccelerometerInterval = (typeof accelerometerIntervals)[number];

export const shakeThreshold = 1.6;
