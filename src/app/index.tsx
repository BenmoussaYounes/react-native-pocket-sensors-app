import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccelerometerPanel } from '@/components/accelerometer-panel';
import { LifecycleJournal } from '@/components/lifecycle-journal';
import { LifecycleStatusCard } from '@/components/lifecycle-status-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAccelerometer } from '@/hooks/use-accelerometer';
import { useAppLifecycle } from '@/hooks/use-app-lifecycle';

export default function HomeScreen() {
  useAppLifecycle();
  useAccelerometer();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="code" style={styles.eyebrow}>
            MONITEUR D'APPLICATION
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            Cycle de vie
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.intro}>
            L'etat et les mouvements de l'application sont suivis en temps reel.
          </ThemedText>

          <LifecycleStatusCard />
          <AccelerometerPanel />
          <LifecycleJournal />
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
    color: '#d97706',
    letterSpacing: 1.5,
  },
  title: {
    marginTop: -Spacing.two,
  },
  intro: {
    marginTop: -Spacing.two,
    maxWidth: 360,
  },
});
