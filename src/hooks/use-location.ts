import * as Location from 'expo-location';
import { useEffect, useRef } from 'react';
import { Linking } from 'react-native';

import { useSensorStore } from '@/stores/sensor-store';

function getPermissionState(response: { granted: boolean; canAskAgain: boolean }) {
  if (response.granted) {
    return 'granted' as const;
  }

  return response.canAskAgain ? 'denied' : 'blocked';
}

export function useLocation() {
  const appState = useSensorStore((state) => state.currentStatus);
  const permission = useSensorStore((state) => state.locationPermission);
  const setLocation = useSensorStore((state) => state.setLocation);
  const setLocationPermission = useSensorStore((state) => state.setLocationPermission);
  const permissionRequestId = useRef(0);

  useEffect(() => {
    let isMounted = true;
    const requestId = permissionRequestId.current;

    const refreshPermission = async () => {
      const response = await Location.getForegroundPermissionsAsync();
      if (isMounted && requestId === permissionRequestId.current) {
        setLocationPermission(getPermissionState(response));
      }
    };

    void refreshPermission();

    return () => {
      isMounted = false;
    };
  }, [appState, setLocationPermission]);

  useEffect(() => {
    let isMounted = true;
    let subscription: Location.LocationSubscription | undefined;

    if (appState !== 'active' || permission !== 'granted') {
      return undefined;
    }

    const startWatching = async () => {
      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced },
        (location) => {
          if (isMounted) {
            setLocation(location);
          }
        },
      );

      if (!isMounted) {
        subscription.remove();
      }
    };

    void startWatching();

    return () => {
      isMounted = false;
      subscription?.remove();
    };
  }, [appState, permission, setLocation]);

  const requestPermission = async () => {
    const requestId = ++permissionRequestId.current;
    const response = await Location.requestForegroundPermissionsAsync();

    if (requestId === permissionRequestId.current) {
      setLocationPermission(getPermissionState(response));
    }
  };

  const activateLocation = () => {
    if (permission === 'blocked') {
      void Linking.openSettings();
      return;
    }

    void requestPermission();
  };

  return { activateLocation, permission };
}
