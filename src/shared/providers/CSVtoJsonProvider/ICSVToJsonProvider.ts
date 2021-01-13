interface ICSVToJsonProvider {
  convert(csv: string): Promise<string>;
}
