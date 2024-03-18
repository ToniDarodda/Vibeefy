import { Dispatch, SetStateAction } from 'react';
import { AlbumInterface, BasePlaylistInterface } from '../interfaces';
import { colorGrapper } from './colorGrap';

export const isAlbumInterface = (object: any): object is AlbumInterface => {
  return object && 'thumbnails' in object;
};

export const selectColor = async (
  selectedAlbumOrSong: AlbumInterface | BasePlaylistInterface | undefined,
  setBackgroundColor: Dispatch<SetStateAction<string>>,
) => {
  if (isAlbumInterface(selectedAlbumOrSong)) {
    const image = (selectedAlbumOrSong as AlbumInterface).thumbnails;

    colorGrapper(image)
      .then((dominantColor) => {
        const color = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        setBackgroundColor(color);
      })
      .catch((error) => {
        console.error('Error extracting color', error);
      });
  } else {
    setBackgroundColor('#191919');
  }
};
