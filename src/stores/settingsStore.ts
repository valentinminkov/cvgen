import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";
import type { SettingsStore } from "@/types";

const $settings = persistentMap<SettingsStore>(
  getStoreKey("settings"),
  {
    order: { sections: [], staticSections: [] },
    theme: "default",
    darkMode: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

const setOrderItems = (key: string, value: string[]) => {
  const settingsValue = $settings.get();
  $settings.set({
    ...settingsValue,
    order: {
      ...settingsValue.order,
      [key]: value,
    },
  });

  return true;
};

const setSectionOrderItems = (items: string[]) => {
  return setOrderItems("sections", items);
};

const setSectionUnordableItems = (items: string[]) => {
  return setOrderItems("staticSections", items);
};

const setTheme = (newTheme: string) => {
  const settingsValue = $settings.get();
  if (settingsValue.theme !== newTheme)
    $settings.set({ ...settingsValue, theme: newTheme });
};

const setDarkMode = (newDarkModeValue: boolean) => {
  const settings = $settings.get();
  if (settings?.darkMode !== newDarkModeValue)
    $settings.set({ ...settings, darkMode: newDarkModeValue });
  return newDarkModeValue;
};

export {
  $settings,
  setSectionOrderItems,
  setOrderItems,
  setTheme,
  setDarkMode,
  setSectionUnordableItems,
};
