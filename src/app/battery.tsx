import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BatteryPanel } from '@/components/battery-panel';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useBattery } from '@/hooks/use-battery';

export default function BatteryScreen() {
  useBattery();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="code" style={styles.eyebrow}>
            ETAT DU TELEPHONE
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            Batterie
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.intro}>
            Le niveau et l'état de charge sont actualisés en temps réel.
          </ThemedText>
          <BatteryPanel />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  content: {
    width: '100%',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  eyebrow: {
    color: '#16a34a',
    letterSpacing: 1.5,
  },
  title: {
    marginTop: -Spacing.two,
  },
  intro: {
    marginTop: -Spacing.two,
    maxWidth: 380,
  },
});
