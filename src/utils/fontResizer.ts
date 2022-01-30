interface FontResizerParamType {
  parentElement: HTMLElement;
  textElement: HTMLElement;
  maxFontSize?: number;
  minFontSize?: number;
}

export const fontResizer = ({
  parentElement,
  textElement,
  maxFontSize = 128,
  minFontSize = 12,
}: FontResizerParamType) => {
  if(parentElement.offsetWidth <= textElement.offsetWidth + 100) {
    // Text Overflown
    while(parentElement.offsetWidth <= textElement.offsetWidth + 100){
      const prevFontsize = parseInt(textElement.style.fontSize);

      if(prevFontsize <= minFontSize) break;
      textElement.style.fontSize = `${prevFontsize - 1}px`
    }
  }
}
