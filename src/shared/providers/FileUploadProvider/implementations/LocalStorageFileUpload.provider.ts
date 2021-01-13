import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export default class LocalStorageFileUploadProvider
  implements IFileUploadProvider {
  public async upload(file: any): Promise<string> {
    const openFile = file.buffer.toString();
    return openFile;
  }
}
