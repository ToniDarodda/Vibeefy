import { Dispatch, SetStateAction } from 'react';
import { AlbumInterface } from '../interfaces';
import { colorGrapper } from './colorGrap';

export const isAlbumInterface = (object: any): object is AlbumInterface => {
  return object && 'thumbnails' in object;
};

export const selectColor = async (
  image: string,
  setBackgroundColor: Dispatch<SetStateAction<string>>,
) => {
  if (image) {
    colorGrapper(image)
      .then((dominantColor) => {
        const color = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        setBackgroundColor(color);
      })
      .catch((error) => {
        console.error('Error extracting color', error);
      });
  }
};
