import { AlbumInterface } from '../interfaces';

export function MakePictureLarger(album: AlbumInterface) {
  if (album && album.artist && album.artist.profilePicture) {
    return album.artist.profilePicture
      .replace('w120', 'w550')
      .replace('h120', 'h550');
  }
  return '/vinyl.png';
}

export function MakePictureLargerWithImageLink(thumbnails: string) {
  if (thumbnails && thumbnails.length > 0) {
    return thumbnails.replaceAll('120', '550');
  }
  return '/vinyl.png';
}
