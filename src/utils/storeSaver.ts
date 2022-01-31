import { IStore } from '../store';
import { GRADIENT_KEY_NAME } from '../constants'

const saveStoreData = (data: IStore) => {
  const convertedData = JSON.stringify(data);
  localStorage.setItem(GRADIENT_KEY_NAME, convertedData);
}

const getStoreData = (): IStore => {
  const convertedData = JSON.parse(GRADIENT_KEY_NAME) as IStore;

  return convertedData;
}

export default {
  saveStoreData,
  getStoreData
}
