import ColorThief from 'colorthief';

export const colorGrapper = (
  pathToImage: string,
): Promise<[number, number, number]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.src = pathToImage;

    img.onload = () => {
      const colorThief = new ColorThief();
      try {
        const color = colorThief.getColor(img);
        resolve(color);
      } catch (e) {
        reject(e);
      }
    };

    img.onerror = (e) => {
      reject(e);
    };
  });
};
