import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { IBitmapParserProvider } from '../IBitmapParserProvider';
const Jimp = require('jimp');

@Injectable({ scope: Scope.DEFAULT })
export class JimpBitmapParserProvider implements IBitmapParserProvider {
  /**
   * Loads an image and converts it to a matrice of integers.
   *
   * Example: Load js.png and converts to
   * [ 4, 4, 13, 13, 4, 0 ]
   *
   * [ 147, 219, 62, 89, 214, 125 ]...
   *
   * @param {String} path The the path of image
   * @returns A number matrice
   * @type Number Matrice
   */
  async convertToMatrice(filepath: string): Promise<any> {
    return await Jimp.read(filepath)
      .then((bitmapFile) => {
        //Resize the image and grayscale it to make it simpler
        bitmapFile.resize(6, 6);
        bitmapFile.grayscale();
        //Adjust the brightness and contrast so it can work with the An array
        bitmapFile.brightness(-0.72);
        bitmapFile.contrast(0.11);
        //Normalize the colors
        bitmapFile.normalize();

        //Get the Height and Width
        const Height = bitmapFile.getHeight();
        const Width = bitmapFile.getWidth();

        //Create a matrice(MxN) where M = Height and N = Width
        const matrice = new Array(Height); // create an empty array of length n
        for (let i = 0; i < Height; i++) {
          matrice[i] = new Array(Width); // make each element an array
        }

        for (let x = 0; x < Height; x++) {
          for (let y = 0; y < Width; y++) {
            //Get the pixel color in HEX
            const pixel = bitmapFile.getPixelColour(x, y);
            //Convert the HEX to RGB and get the red channel
            const pixelColor = Jimp.intToRGBA(pixel).r;
            matrice[x][y] = pixelColor;
          }
        }
        return matrice;
      })
      .catch((err) => {
        throw new HttpException(
          'This is something wrong, please try again in a few minutes',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
