import { StyleSheet, View } from 'react-native';

import { batteryStateLabels, formatBatteryLevel } from '@/constants/battery';
import { Spacing } from '@/constants/theme';
import { useSensorStore } from '@/stores/sensor-store';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function BatteryPanel() {
  const battery = useSensorStore((state) => state.battery);
  const levelWidth = battery.level < 0 ? '0%' : `${Math.min(battery.level, 1) * 100}%`;

  return (
    <View style={styles.section}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <View style={styles.levelHeader}>
          <ThemedText type="small" themeColor="textSecondary">
            NIVEAU DE BATTERIE
          </ThemedText>
          <ThemedText type="subtitle" style={styles.levelText}>
            {formatBatteryLevel(battery.level)}
          </ThemedText>
        </View>
        <View style={styles.track}>
          <View style={[styles.levelBar, { width: levelWidth }]} />
        </View>
        <View style={styles.detailRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Etat
          </ThemedText>
          <ThemedText type="smallBold">{batteryStateLabels[battery.state]}</ThemedText>
        </View>
      </ThemedView>

      {battery.lowPowerMode && (
        <ThemedView style={styles.warning}>
          <ThemedText type="smallBold" style={styles.warningTitle}>
            Mode économie d'énergie actif
          </ThemedText>
          <ThemedText type="small" style={styles.warningText}>
            L'application devrait réduire la fréquence des capteurs et suspendre les mises à jour non essentielles.
          </ThemedText>
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.three,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.three,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 28,
    lineHeight: 34,
  },
  track: {
    height: 14,
    borderRadius: 7,
    backgroundColor: '#d1d5db',
    overflow: 'hidden',
  },
  levelBar: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: '#16a34a',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warning: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#fef3c7',
    gap: Spacing.one,
  },
  warningTitle: {
    color: '#92400e',
  },
  warningText: {
    color: '#78350f',
  },
});
