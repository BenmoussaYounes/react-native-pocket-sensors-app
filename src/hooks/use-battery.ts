import * as Battery from 'expo-battery';
import { useEffect } from 'react';

import { useSensorStore } from '@/stores/sensor-store';

export function useBattery() {
  const setBatteryLevel = useSensorStore((state) => state.setBatteryLevel);
  const setBatteryState = useSensorStore((state) => state.setBatteryState);
  const setLowPowerMode = useSensorStore((state) => state.setLowPowerMode);

  useEffect(() => {
    let isMounted = true;

    const loadBatteryState = async () => {
      const [level, state, lowPowerMode] = await Promise.all([
        Battery.getBatteryLevelAsync(),
        Battery.getBatteryStateAsync(),
        Battery.isLowPowerModeEnabledAsync(),
      ]);

      if (!isMounted) {
        return;
      }

      setBatteryLevel(level);
      setBatteryState(state);
      setLowPowerMode(lowPowerMode);
    };

    void loadBatteryState();

    const levelSubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
    });
    const stateSubscription = Battery.addBatteryStateListener(({ batteryState }) => {
      setBatteryState(batteryState);
    });
    const lowPowerSubscription = Battery.addLowPowerModeListener(({ lowPowerMode }) => {
      setLowPowerMode(lowPowerMode);
    });

    return () => {
      isMounted = false;
      levelSubscription.remove();
      stateSubscription.remove();
      lowPowerSubscription.remove();
    };
  }, [setBatteryLevel, setBatteryState, setLowPowerMode]);
}
