import { useEffect } from 'react';
import { AppState } from 'react-native';

import { useSensorStore } from '@/stores/sensor-store';

export function useAppLifecycle() {
  const recordTransition = useSensorStore((state) => state.recordTransition);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', recordTransition);
    return () => subscription.remove();
  }, [recordTransition]);
}
