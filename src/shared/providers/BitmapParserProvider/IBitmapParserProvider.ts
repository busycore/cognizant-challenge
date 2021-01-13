export interface IBitmapParserProvider {
  convertToMatrice(filepath: string): Promise<any>;
}
