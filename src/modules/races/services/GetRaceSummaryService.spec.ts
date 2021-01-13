import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import CSVToJsonProvider from '../../../shared/providers/CSVtoJsonProvider/implementations/CSVToJson.provider';
import LocalStorageFileUploadProvider from '../../../shared/providers/FileUploadProvider/implementations/LocalStorageFileUpload.provider';
import GetRaceSummaryService from './GetRaceSummaryService';

describe('Race Summary', () => {
  let getRaceSummaryService: GetRaceSummaryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetRaceSummaryService,
        CSVToJsonProvider,
        LocalStorageFileUploadProvider,
      ],
    }).compile();

    getRaceSummaryService = await module.get<GetRaceSummaryService>(
      GetRaceSummaryService,
    );
  });

  it('should be able to retrive a race summary', async () => {
    const mockedFile =
      'Hora;Super-Heroi;No Volta;Tempo Volta;Velocidade média da volta\n23:49:08.277;038–Superman;1;1:02.852;44,275\n23:49:10.858;033–Flash;1;1:04.352;43,243\n';

    const result = [
      {
        average_speed: '44,275',
        better_time: '1:02.852',
        id: '038',
        name: 'Superman',
        position: 1,
        total_race_time: '23:49:08.277',
        voltas: 1,
      },
      {
        average_speed: '43,243',
        better_time: '1:04.352',
        id: '033',
        name: 'Flash',
        position: 2,
        total_race_time: '23:49:10.858',
        voltas: 1,
      },
    ];
    jest
      .spyOn(getRaceSummaryService, 'uploadFile')
      .mockResolvedValue(mockedFile);

    await expect(getRaceSummaryService.execute('log.txt')).resolves.toEqual(
      result,
    );
  });

  it('should not be able to to retrive a race summary if the the received file is empty', async () => {
    await expect(getRaceSummaryService.execute(undefined)).rejects.toThrow(
      new BadRequestException('You should upload a log file'),
    );
  });
});
