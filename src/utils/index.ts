import { AnyObject } from "@src/types/common";

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

export const pageOutPrevent = (event: Event) => {
  event.preventDefault();

  function saveContent() {
    if (confirm("내용을 저장하시겠습니까?")) {
      //TODO: SAVE
    }
  }

  setTimeout(saveContent, 0);
};

export { fontResizer } from './fontResizer'
