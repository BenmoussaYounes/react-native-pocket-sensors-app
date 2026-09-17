import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccelerometerPanel } from '@/components/accelerometer-panel';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAccelerometer } from '@/hooks/use-accelerometer';

export default function AccelerometerScreen() {
  useAccelerometer();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="code" style={styles.eyebrow}>
            CAPTEUR DE MOUVEMENT
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            Accéléromètre
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.intro}>
            Les mesures sont suspendues automatiquement lorsque l'application quitte le premier plan.
          </ThemedText>
          <AccelerometerPanel />
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
    color: '#2563eb',
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