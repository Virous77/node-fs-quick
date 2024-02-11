export interface IReadFile {
  fileName: string;
  fileType?: BufferEncoding | null;
}

export interface IReadFilesInDirectory {
  directoryPath: string;
}

export interface IWriteFile {
  fileName: string;
  data: string;
  fileType?: BufferEncoding | null;
}

export interface ICopyFile {
  source: string;
  destination: string;
}
