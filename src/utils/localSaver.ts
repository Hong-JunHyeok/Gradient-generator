import { IStore } from '../store';
import { GRADIENT_KEY_NAME } from '../constants'

export const saveStoreData = (data: IStore) => {
  const convertedData = JSON.stringify(data);
  localStorage.setItem(GRADIENT_KEY_NAME, convertedData);
}

export const getStoreData = (): IStore | null => {
  const localSavedData = localStorage.getItem(GRADIENT_KEY_NAME);

  if(localSavedData) {
    return JSON.parse(localSavedData) as IStore;
  }

  return null;
}

