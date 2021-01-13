import { Injectable, Scope } from '@nestjs/common';

//import csvtojson from 'csvtojson';
const csvtojson = require('csvtojson');

@Injectable({ scope: Scope.DEFAULT })
export default class CSVToJsonProvider implements ICSVToJsonProvider {
  public async convert(csv: string): Promise<string> {
    const JSONRaceLog = await csvtojson({
      delimiter: ';',
      noheader: false,
      headers: [
        'Hora',
        'ID',
        'SuperHeroi',
        'NoVolta',
        'TempoVolta',
        'VelocidadeMediaVolta',
      ],
    }).fromString(csv);
    return JSONRaceLog;
  }
}
