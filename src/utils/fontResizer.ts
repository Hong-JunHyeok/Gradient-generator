interface FontResizerParamType {
  parentElement: HTMLElement;
  textElement: HTMLElement;
}

export const fontResizer = ({
  parentElement,
  textElement
}: FontResizerParamType) => {
  if(parentElement.offsetWidth <= textElement.offsetWidth + 100) {
    // Text Overflown
    while(parentElement.offsetWidth <= textElement.offsetWidth + 100){
      const prevFontsize = parseInt(textElement.style.fontSize);
      textElement.style.fontSize = `${prevFontsize - 1}px`
    }
  }
}
