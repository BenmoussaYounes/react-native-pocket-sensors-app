import { Pressable, StyleSheet, View } from 'react-native';

import { locationPermissionMessages } from '@/constants/location';
import { Spacing } from '@/constants/theme';
import { useLocation } from '@/hooks/use-location';
import { useSensorStore } from '@/stores/sensor-store';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function LocationCard() {
  const { activateLocation, permission } = useLocation();
  const location = useSensorStore((state) => state.location);
  const isGranted = permission === 'granted';

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.heading}>
        <View style={[styles.dot, isGranted ? styles.dotGranted : styles.dotInactive]} />
        <ThemedText type="smallBold">Position</ThemedText>
      </View>

      <ThemedText themeColor="textSecondary" style={styles.message}>
        {locationPermissionMessages[permission]}
      </ThemedText>

      {isGranted && location ? (
        <View style={styles.coordinates}>
          <ThemedText type="code">Latitude {location.coords.latitude.toFixed(5)}</ThemedText>
          <ThemedText type="code">Longitude {location.coords.longitude.toFixed(5)}</ThemedText>
          {location.coords.accuracy !== null && (
            <ThemedText type="code" themeColor="textSecondary">
              Precision +/-{Math.round(location.coords.accuracy)} m
            </ThemedText>
          )}
        </View>
      ) : null}

      {!isGranted && (
        <Pressable
          accessibilityRole="button"
          onPress={activateLocation}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <ThemedText type="smallBold" style={styles.buttonText}>
            {permission === 'blocked' ? 'Ouvrir les Réglages' : 'Activer la position'}
          </ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.three,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotGranted: {
    backgroundColor: '#16a34a',
  },
  dotInactive: {
    backgroundColor: '#d97706',
  },
  message: {
    lineHeight: 22,
  },
  coordinates: {
    gap: Spacing.one,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.one,
    backgroundColor: '#2563eb',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#ffffff',
  },
});
