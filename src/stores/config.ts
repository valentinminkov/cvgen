const storeVersion = "0.01";
const storeName = "cvgen";

export const getStoreKey = (section: string) =>
  `${storeName}_${storeVersion}_${section}_`;
