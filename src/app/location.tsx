import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LocationCard } from '@/components/location-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function LocationScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="code" style={styles.eyebrow}>
            PERMISSION SENSIBLE
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            Position
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.intro}>
            La demande de localisation ne partira qu'après votre action explicite.
          </ThemedText>
          <LocationCard />
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
    color: '#7c3aed',
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
