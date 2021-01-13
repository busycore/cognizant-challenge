interface IFileUploadProvider {
  upload(file: any): Promise<string>;
}
