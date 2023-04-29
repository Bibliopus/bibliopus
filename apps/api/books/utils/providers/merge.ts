import type { Edition } from '~/types/book';

export const mergeProvidersData = (providersData: Partial<Edition>[]): Partial<Edition> => {
  const mergedData: Partial<Edition> = {};

  providersData.forEach((providerData) => {
    Object.keys(providerData).forEach((key) => {
      if (providerData[key] && !mergedData[key])
        mergedData[key] = providerData[key];
    });
  });

  return mergedData;
};
