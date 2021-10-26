import { AnyObject } from "../types/common";

export const nextTick = (fn: Function) => setTimeout(fn, 16);

export const updateArray = (
  array: Array<any>,
  oldValue: AnyObject,
  newValue: AnyObject
) => {
  const index = array.indexOf(oldValue);
  if (index !== -1) {
    array[index] = newValue;
  }
};
