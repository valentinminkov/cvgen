import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";
import type { Sections } from "@/types";

interface IOrder {
  sections: Sections[];
  [key: string]: string[];
}

type SettingsStore = Record<string, any> & {
  order: IOrder;
  theme: string;
};

const $settings = persistentMap<SettingsStore>(
  getStoreKey("settings"),
  { order: { sections: [] }, theme: "default" },
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

// TODO To be removed
const setSectionOrderItems = (items: string[]) => {
  return setOrderItems("sections", items);
};

const setTheme = (newTheme: string) => {
  const settingsValue = $settings.get();
  if (settingsValue.theme !== newTheme)
    $settings.set({ ...settingsValue, theme: newTheme });
};

export { $settings, setSectionOrderItems, setOrderItems, setTheme };
