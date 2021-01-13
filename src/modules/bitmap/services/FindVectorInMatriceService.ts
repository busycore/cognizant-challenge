import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { IBitmapParserProvider } from '../../../shared/providers/BitmapParserProvider/IBitmapParserProvider';
import { JimpBitmapParserProvider } from '../../../shared/providers/BitmapParserProvider/implementations/JimpBitmapParser.provider';
import { IFindVectorInMatriceService } from './IFindVectorInMatriceService';

@Injectable({ scope: Scope.DEFAULT })
export default class FindVectorInMatriceService
  implements IFindVectorInMatriceService {
  constructor(
    @Inject(JimpBitmapParserProvider)
    private bitmapParser: IBitmapParserProvider,
  ) {}

  public async execute(vectorAn: number[]) {
    if (vectorAn.length === 0) {
      throw new BadRequestException('The vector should have at least 1 number');
    }
    //The vector An
    //let vectorAn = [0, 1, 2, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15]

    //The Matrice MxN(Yes it takes a real image and reads its pixels)
    const matrice = await this.bitmapParser.convertToMatrice('./js.png');
    //This is the array of found numbers
    const foundNumbers = this.FindNumbersInMatrice(vectorAn, matrice);

    //Now it's called the FoundNumbersToObject to return an object of numbers and occurences
    const objectOfFoundNumbers = this.FoundNumbersToObject(
      foundNumbers,
      vectorAn,
    );

    return objectOfFoundNumbers;
  }

  /**
   * Given an Array and an number, counts how many times this number appears in array
   *
   * Example : Given the array [ 4, 4, 13, 13, 4, 0 ] and the Number 4. Returns 3
   *
   * @param {Number} arrayToCount An Array filled with integers
   * @param {Number} numberToFind An number to be found
   */
  private countHowManyTimesNumberAppers(arrayToCount, numberToFind) {
    return arrayToCount.reduce((acc, value) => {
      if (value === numberToFind) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  }

  /**
   * Given an matrice(MxN) and an vector 'An' extract the numbers of the vector from the matrice
   *
   * Example : Given the matrice above
   *
   * [0,4]
   *
   * [4,1]
   *
   * and the vector [4,1]
   *
   * Returns [4,4,1]
   * @param {Number Array} vectorToParse
   * @param {Number Matrice} bitmapVector
   */
  private FindNumbersInMatrice(vectorToParse, bitmapVector) {
    const testarray = [];
    const bmpXSize = bitmapVector[0].length;
    const bmpYSize = bitmapVector.length;

    vectorToParse.forEach((eachItem) => {
      for (let x = 0; x < bmpXSize; x++) {
        for (let y = 0; y < bmpYSize; y++) {
          if (bitmapVector[x][y] === eachItem) {
            testarray.push(eachItem);
          }
        }
      }
    });
    return testarray;
  }

  /**
   * Given an number array return an object with number itself and occurences
   *
   * Example : foundNumbers [4,4,1]
   *
   * Returns :
   *
   * [
   *
   * {value:4, occurences:2},
   *
   * {value:1,occurences:1}
   *
   * ]
   *
   * @param {Array} foundNumbers
   * @returns {Array} Array Of objects
   */
  private FoundNumbersToObject(foundNumbers, vectorAn) {
    const object = [];

    //This is an version of foundNumbers without duplicates
    const uniqueFoundNumbers = foundNumbers.filter((val, pos) => {
      return foundNumbers.indexOf(val) == pos;
    });

    //This is an array of nonFound numbers based on the vector array
    const notFoundNumbers = vectorAn.filter((val) => {
      return foundNumbers.indexOf(val) === -1;
    });

    //Create an object from the numbers found with the number and how many times it shows up
    uniqueFoundNumbers.forEach((eachNumber) => {
      const times = this.countHowManyTimesNumberAppers(
        foundNumbers,
        eachNumber,
      );
      object.push({ value: eachNumber, occurences: times });
    });

    //Create an object for each non found number, and put 0 occurences of it
    notFoundNumbers.forEach((eachNumber) => {
      object.push({ value: eachNumber, occurences: 0 });
    });

    return object;
  }
}
