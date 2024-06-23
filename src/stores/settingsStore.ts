import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";

interface IOrder {
  sections: string[];
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

const setSectionOrderItems = (items: string[]) => {
  const settingsValue = $settings.get();
  $settings.set({
    ...settingsValue,
    order: { ...settingsValue.order, sections: items },
  });
  console.log($settings.get());
  return true;
};

export { $settings, setSectionOrderItems };
