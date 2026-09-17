import { Pressable, StyleSheet, View } from 'react-native';

import {
    accelerometerIntervals,
    shakeThreshold,
    type AccelerometerInterval,
} from '@/constants/accelerometer';
import { Spacing } from '@/constants/theme';
import { useSensorStore } from '@/stores/sensor-store';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const axes = ['x', 'y', 'z'] as const;

export function AccelerometerPanel() {
  const accelerometer = useSensorStore((state) => state.accelerometer);
  const magnitude = useSensorStore((state) => state.magnitude);
  const sampleCount = useSensorStore((state) => state.sampleCount);
  const updateInterval = useSensorStore((state) => state.updateInterval);
  const setUpdateInterval = useSensorStore((state) => state.setUpdateInterval);
  const shaken = magnitude > shakeThreshold;

  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View>
          <ThemedText type="smallBold">Accéléromètre</ThemedText>
          <ThemedText type="code" themeColor="textSecondary">
            {sampleCount} échantillon{sampleCount > 1 ? 's' : ''}
          </ThemedText>
        </View>
        <View style={[styles.shakeBadge, shaken && styles.shakeBadgeActive]}>
          <ThemedText style={styles.shakeText}>{shaken ? 'SECOUSSE' : 'STABLE'}</ThemedText>
        </View>
      </View>

      <ThemedView type="backgroundElement" style={styles.card}>
        {axes.map((axis) => {
          const value = accelerometer[axis];
          const width = `${Math.min(Math.abs(value), 2) / 2 * 100}%` as `${number}%`;
          return (
            <View key={axis} style={styles.axisRow}>
              <ThemedText type="code" style={styles.axisLabel}>
                {axis.toUpperCase()}
              </ThemedText>
              <View style={styles.track}>
                <View style={[styles.bar, { width }]} />
              </View>
              <ThemedText type="code" style={styles.axisValue}>
                {value.toFixed(2)} g
              </ThemedText>
            </View>
          );
        })}
        <View style={styles.magnitudeRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Norme
          </ThemedText>
          <ThemedText type="smallBold">{magnitude.toFixed(2)} g</ThemedText>
        </View>
      </ThemedView>

      <View style={styles.controls}>
        {accelerometerIntervals.map((interval) => (
          <Pressable
            key={interval}
            accessibilityRole="button"
            accessibilityState={{ selected: updateInterval === interval }}
            onPress={() => setUpdateInterval(interval as AccelerometerInterval)}
            style={[styles.intervalButton, updateInterval === interval && styles.intervalButtonActive]}
          >
            <ThemedText
              type="smallBold"
              style={updateInterval === interval ? styles.activeButtonText : undefined}
            >
              {interval} ms
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.two,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shakeBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.one,
    backgroundColor: '#d1d5db',
  },
  shakeBadgeActive: {
    backgroundColor: '#dc2626',
  },
  shakeText: {
    color: '#111827',
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.three,
  },
  axisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  axisLabel: {
    width: 16,
    fontWeight: '700',
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d1d5db',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },
  axisValue: {
    width: 52,
    textAlign: 'right',
  },
  magnitudeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#9ca3af',
    paddingTop: Spacing.two,
  },
  controls: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  intervalButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.one,
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  intervalButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  activeButtonText: {
    color: '#ffffff',
  },
});
