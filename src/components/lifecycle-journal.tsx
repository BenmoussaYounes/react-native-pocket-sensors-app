import { StyleSheet, View } from 'react-native';

import { formatLifecycleTimestamp, lifecycleColors, lifecycleLabels } from '@/constants/lifecycle';
import { Spacing } from '@/constants/theme';
import { useSensorStore } from '@/stores/sensor-store';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function LifecycleJournal() {
  const journal = useSensorStore((state) => state.journal);
  const lifecycleJournal = journal.filter((entry) => entry.type === 'lifecycle');

  return (
    <>
      <View style={styles.header}>
        <ThemedText type="smallBold">Journal des transitions</ThemedText>
        <ThemedText type="code" themeColor="textSecondary">
          {lifecycleJournal.length} evenement{lifecycleJournal.length > 1 ? 's' : ''}
        </ThemedText>
      </View>
      <ThemedView type="backgroundElement" style={styles.card}>
        {lifecycleJournal.map((entry, index) => (
          <View key={entry.id} style={styles.row}>
            <View style={styles.timeline}>
              <View
                style={[
                  styles.logDot,
                  {
                    backgroundColor:
                      entry.status === 'active' ? lifecycleColors.active : lifecycleColors.other,
                  },
                ]}
              />
              {index < journal.length - 1 && <View style={styles.connector} />}
            </View>
            <View style={styles.copy}>
              <ThemedText type="smallBold">{lifecycleLabels[entry.status ?? 'unknown']}</ThemedText>
              <ThemedText type="code" themeColor="textSecondary">
                {formatLifecycleTimestamp(entry.timestamp)}
              </ThemedText>
            </View>
          </View>
        ))}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  card: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    minHeight: 58,
  },
  timeline: {
    width: 20,
    alignItems: 'center',
  },
  logDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  connector: {
    flex: 1,
    width: 1,
    marginVertical: 4,
    backgroundColor: '#9ca3af',
  },
  copy: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: Spacing.two,
    paddingTop: Spacing.two,
  },
});
