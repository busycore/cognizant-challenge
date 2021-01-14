export interface IBitmapParserProvider {
  /**
   * Loads an image and converts it to a matrice of integers.
   *
   *
   * Example: Load js.png and converts to
   * [ 4, 4, 13, 13, 4, 0 ]
   *
   * [ 147, 219, 62, 89, 214, 125 ]...
   *
   * Apart from it, it will resize the image, grayscale it and retrieve the red channel from it
   * so it can be matched up with the vector An
   *
   * @param {String} path The the path of image
   * @returns A number matrice
   * @type Number Matrice
   */
  convertToMatrice(filepath: string): Promise<any>;
}
