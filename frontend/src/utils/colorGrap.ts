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
        resolve(color); // Resolve the promise with the extracted color
      } catch (e) {
        reject(e); // Reject the promise if there's an error
      }
    };

    img.onerror = (e) => {
      reject(e); // Reject the promise if there's an error loading the image
    };
  });
};
