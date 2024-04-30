export interface IReadFile {
  fileName: string;
  fileType?: BufferEncoding;
}

export interface IReadFilesInDirectory {
  directoryPath: string;
}

export interface IWriteFile {
  fileName: string;
  data: string;
  fileType?: BufferEncoding;
}

export interface ICopyFile {
  source: string;
  destination: string;
}

export interface UploadS3 {
  s3: any;
  Key: string;
  file: any;
  bucket: string;
  contentType?: string;
  params?: any;
}

export interface ReadS3 {
  s3: any;
  Key: string;
  bucket: string;
  isJson?: boolean;
}
