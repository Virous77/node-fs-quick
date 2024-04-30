export {
  writeFile,
  readFile,
  readFilesInDirectory,
  copyFile,
  makeDirectory,
  removeDirectory,
  removeFile,
  fileExists,
  directoryExists,
  getFilesInDirectory,
  renameFile,
  statFile,
  removeManyFiles,
  readInStream,
  writeInStream,
  writeJsonFile,
  readJsonFile,
  readyManyFiles,
} from "./server";

export { uploadFilesTOS3, downloadFilesFromS3 } from "./aws";

export type {
  IReadFile,
  IReadFilesInDirectory,
  IWriteFile,
  ICopyFile,
  UploadS3,
  ReadS3,
} from "./interface";
