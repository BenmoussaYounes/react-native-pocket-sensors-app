import { Accelerometer } from 'expo-sensors';
import { useEffect } from 'react';

import { useSensorStore } from '@/stores/sensor-store';

export function useAccelerometer() {
  const appState = useSensorStore((state) => state.currentStatus);
  const updateInterval = useSensorStore((state) => state.updateInterval);
  const recordData = useSensorStore((state) => state.recordAccelerometerData);
  const recordSensorStatus = useSensorStore((state) => state.recordAccelerometerStatus);

  useEffect(() => {
    let isMounted = true;
    let subscription: ReturnType<typeof Accelerometer.addListener> | undefined;

    const subscribe = async () => {
      if (appState !== 'active') {
        recordSensorStatus(false);
        return;
      }

      const available = await Accelerometer.isAvailableAsync();
      if (!available || !isMounted) {
        recordSensorStatus(false);
        return;
      }

      let permission = await Accelerometer.getPermissionsAsync();
      if (!permission.granted && permission.canAskAgain) {
        permission = await Accelerometer.requestPermissionsAsync();
      }

      if (!permission.granted || !isMounted) {
        recordSensorStatus(false);
        return;
      }

      Accelerometer.setUpdateInterval(updateInterval);
      subscription = Accelerometer.addListener(recordData);
      recordSensorStatus(true);
    };

    void subscribe();

    return () => {
      isMounted = false;
      subscription?.remove();
      recordSensorStatus(false);
    };
  }, [appState, recordData, recordSensorStatus, updateInterval]);
}
