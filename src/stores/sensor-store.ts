import * as Battery from 'expo-battery';
import * as Location from 'expo-location';
import { AppState, type AppStateStatus } from 'react-native';
import { create } from 'zustand';

export type AccelerometerData = {
  x: number;
  y: number;
  z: number;
};

export type BatteryData = {
  level: number;
  state: Battery.BatteryState;
  lowPowerMode: boolean;
};

export type LocationPermissionState = 'unknown' | 'granted' | 'denied' | 'blocked';

export type SensorJournalEntry = {
  id: string;
  timestamp: number;
  type: 'lifecycle' | 'accelerometer';
  status?: AppStateStatus;
  message?: 'actif' | 'en pause';
};

type SensorState = {
  currentStatus: AppStateStatus;
  journal: SensorJournalEntry[];
  accelerometer: AccelerometerData;
  magnitude: number;
  sampleCount: number;
  updateInterval: number;
  battery: BatteryData;
  location: Location.LocationObject | null;
  locationPermission: LocationPermissionState;
  recordTransition: (status: AppStateStatus) => void;
  recordAccelerometerData: (data: AccelerometerData) => void;
  recordAccelerometerStatus: (active: boolean) => void;
  setUpdateInterval: (interval: number) => void;
  setBatteryLevel: (level: number) => void;
  setBatteryState: (state: Battery.BatteryState) => void;
  setLowPowerMode: (enabled: boolean) => void;
  setLocation: (location: Location.LocationObject) => void;
  setLocationPermission: (permission: LocationPermissionState) => void;
};

const initialStatus = AppState.currentState ?? 'active';
const initialTimestamp = Date.now();
const defaultAccelerometer: AccelerometerData = { x: 0, y: 0, z: 0 };

export const useSensorStore = create<SensorState>((set) => ({
  currentStatus: initialStatus,
  journal: [
    {
      id: `${initialStatus}-${initialTimestamp}`,
      timestamp: initialTimestamp,
      type: 'lifecycle',
      status: initialStatus,
    },
  ],
  accelerometer: defaultAccelerometer,
  magnitude: 0,
  sampleCount: 0,
  updateInterval: 200,
  battery: {
    level: -1,
    state: Battery.BatteryState.UNKNOWN,
    lowPowerMode: false,
  },
  location: null,
  locationPermission: 'unknown',
  recordTransition: (status) =>
    set((state) => {
      if (state.currentStatus === status) {
        return state;
      }

      const timestamp = Date.now();

      return {
        currentStatus: status,
        journal: [
          ...state.journal,
          {
            id: `${status}-${timestamp}`,
            timestamp,
            type: 'lifecycle',
            status,
          },
        ],
      };
    }),
  recordAccelerometerData: (data) =>
    set((state) => ({
      accelerometer: data,
      magnitude: Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2),
      sampleCount: state.sampleCount + 1,
    })),
  recordAccelerometerStatus: (active) =>
    set((state) => {
      const message = active ? 'actif' : 'en pause';
      const lastEntry = state.journal[state.journal.length - 1];

      if (lastEntry?.type === 'accelerometer' && lastEntry.message === message) {
        return state;
      }

      const timestamp = Date.now();
      return {
        journal: [
          ...state.journal,
          {
            id: `accelerometer-${message}-${timestamp}`,
            timestamp,
            type: 'accelerometer',
            message,
          },
        ],
      };
    }),
  setUpdateInterval: (updateInterval) => set({ updateInterval }),
  setBatteryLevel: (level) =>
    set((state) => ({ battery: { ...state.battery, level } })),
  setBatteryState: (batteryState) =>
    set((state) => ({ battery: { ...state.battery, state: batteryState } })),
  setLowPowerMode: (lowPowerMode) =>
    set((state) => ({ battery: { ...state.battery, lowPowerMode } })),
  setLocation: (location) => set({ location }),
  setLocationPermission: (locationPermission) => set({ locationPermission }),
}));