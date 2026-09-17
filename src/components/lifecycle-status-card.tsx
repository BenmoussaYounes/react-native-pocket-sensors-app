import { StyleSheet, View } from 'react-native';

import { lifecycleColors, lifecycleLabels } from '@/constants/lifecycle';
import { Spacing } from '@/constants/theme';
import { useSensorStore } from '@/stores/sensor-store';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function LifecycleStatusCard() {
  const currentStatus = useSensorStore((state) => state.currentStatus);
  const isActive = currentStatus === 'active';

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View
        style={[
          styles.statusDot,
          { backgroundColor: isActive ? lifecycleColors.active : lifecycleColors.other },
        ]}
      />
      <View style={styles.copy}>
        <ThemedText type="small" themeColor="textSecondary">
          ETAT COURANT
        </ThemedText>
        <ThemedText type="subtitle" style={styles.label}>
          {lifecycleLabels[currentStatus]}
        </ThemedText>
      </View>
      <ThemedText type="code" style={styles.value}>
        {currentStatus}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.three,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  copy: {
    flex: 1,
    gap: Spacing.one,
  },
  label: {
    fontSize: 26,
    lineHeight: 30,
  },
  value: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
  },
});
