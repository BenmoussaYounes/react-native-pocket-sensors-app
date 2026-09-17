import type { AppStateStatus } from 'react-native';

export const lifecycleLabels: Record<AppStateStatus, string> = {
  active: 'Actif',
  background: 'Arriere-plan',
  inactive: 'Inactif',
  unknown: 'Inconnu',
  extension: 'Extension',
};

export const lifecycleColors = {
  active: '#238636',
  other: '#d97706',
} as const;

export function formatLifecycleTimestamp(timestamp: number) {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(timestamp);
}
