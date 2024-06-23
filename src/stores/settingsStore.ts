import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";

interface IOrder {
  sections: string[];
  [key: string]: string[];
}

type SettingsStore = Record<string, any> & {
  order: IOrder;
};

const $settings = persistentMap<SettingsStore>(
  getStoreKey("settings"),
  { order: { sections: [] } },
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

export { $settings, setSectionOrderItems, setOrderItems };
