import * as Battery from 'expo-battery';

export const batteryStateLabels: Record<Battery.BatteryState, string> = {
  [Battery.BatteryState.UNKNOWN]: 'Inconnu',
  [Battery.BatteryState.UNPLUGGED]: 'Sur batterie',
  [Battery.BatteryState.CHARGING]: 'En charge',
  [Battery.BatteryState.FULL]: 'Pleine',
  [Battery.BatteryState.NOT_CHARGING]: 'Pas en charge',
};

export function formatBatteryLevel(level: number) {
  return level < 0 ? 'Indisponible' : `${Math.round(level * 100)} %`;
}
