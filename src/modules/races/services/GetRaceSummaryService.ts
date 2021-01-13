import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import CSVToJsonProvider from '../../../shared/providers/CSVtoJsonProvider/implementations/CSVToJson.provider';
import LocalStorageFileUploadProvider from '../../../shared/providers/FileUploadProvider/implementations/LocalStorageFileUpload.provider';
import { IGetRaceSummaryService } from './IGetRaceSummaryService';

const Enumerable = require('linq');

@Injectable({ scope: Scope.DEFAULT })
export default class GetRaceSummaryService implements IGetRaceSummaryService {
  constructor(
    @Inject(LocalStorageFileUploadProvider)
    private FileUpload: IFileUploadProvider,
    @Inject(CSVToJsonProvider) private csvtojson: ICSVToJsonProvider,
  ) {}
  public async execute(file: any) {
    if (file === undefined) {
      throw new BadRequestException('You should upload a log file');
    }

    const fileString = await this.uploadFile(file);
    const LogFileString = fileString.toString().replaceAll('–', ';');
    //Create and header and parse the csv to json
    const JSONRaceLog = await this.csvtojson.convert(LogFileString);
    //Start making the response object
    const ResponseObject = this.GetRaceSummary(JSONRaceLog);
    return ResponseObject;
  }

  async uploadFile(file: any) {
    return await this.FileUpload.upload(file);
  }

  private groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  private getParticipants(JSONLOG) {
    return JSONLOG.map((eachItem) => eachItem.SuperHeroi).filter(
      (val, pos, arr) => {
        return arr.indexOf(val) == pos;
      },
    );
  }

  private getFinishLineResults(Participantes: string[], TimeGroups: any) {
    let Posicoes = Participantes.map((participante) => {
      const maxVolta = TimeGroups.get(participante).reduce((prev, current) =>
        prev.NoVolta > current.NoVolta ? prev : current,
      );
      return {
        hero: participante,
        MaxVolta: maxVolta.NoVolta,
        hora: maxVolta.Hora,
      };
    });

    //Sort them using the linqjs
    Posicoes = Enumerable.from(Posicoes)
      .orderBy((x) => x.hora)
      .toArray();
    return Posicoes;
  }

  private GetRaceSummary(JSONRaceLog: string) {
    //Get the name of Heroes in the race
    const Participantes = this.getParticipants(JSONRaceLog);

    //Group them
    const TimeGroups = this.groupBy(JSONRaceLog, (heroi) => heroi.SuperHeroi);

    //Get the number of max turns the made
    const Posicoes = this.getFinishLineResults(Participantes, TimeGroups);

    return Participantes.map((participante) => {
      //Get the max of turns from the participant
      const maxVolta = TimeGroups.get(participante).reduce((prev, current) =>
        prev.NoVolta > current.NoVolta ? prev : current,
      );

      //Get the fastest of them
      const fastestVolta = TimeGroups.get(
        participante,
      ).reduce((prev, current) =>
        prev.TempoVolta < current.TempoVolta ? prev : current,
      );

      //Get the time they finished the race
      const tempoProva = maxVolta.Hora;

      //Get the position
      const position = Posicoes.findIndex((x) => x.hero === participante) + 1;

      //Create the object to return
      const HeroSummary = {
        id: maxVolta.ID,
        name: participante,
        position,
        voltas: Number(maxVolta.NoVolta),
        total_race_time: tempoProva,
        better_time: fastestVolta.TempoVolta,
        average_speed: maxVolta.VelocidadeMediaVolta,
      };
      return HeroSummary;
    });
  }
}
