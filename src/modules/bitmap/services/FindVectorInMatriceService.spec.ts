import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JimpBitmapParserProvider } from '../../../shared/providers/BitmapParserProvider/implementations/JimpBitmapParser.provider';
import FindVectorInMatriceService from './FindVectorInMatriceService';

describe('Find vector in Matrice', () => {
  let findVectorInMatriceService: FindVectorInMatriceService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FindVectorInMatriceService, JimpBitmapParserProvider],
    }).compile();

    findVectorInMatriceService = module.get<FindVectorInMatriceService>(
      FindVectorInMatriceService,
    );
  });

  it('it should be able to return the occurences from an vector within a matrice', async () => {
    const vectorAn = [0, 2];
    const result = [
      { value: 0, occurences: 4 },
      { value: 2, occurences: 0 },
    ];
    await expect(findVectorInMatriceService.execute(vectorAn)).resolves.toEqual(
      result,
    );
  });

  it('it should not be able to return the occurences from an vector within a matrice if the vector is empty', async () => {
    const vectorAn = [];
    await expect(findVectorInMatriceService.execute(vectorAn)).rejects.toThrow(
      new BadRequestException('The vector should have at least 1 number'),
    );
  });
});
