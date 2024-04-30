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
} from "./src/server";

export { uploadFilesTOS3, downloadFilesFromS3 } from "./src/aws";

export type {
  IReadFile,
  IReadFilesInDirectory,
  IWriteFile,
  ICopyFile,
  UploadS3,
  ReadS3,
} from "./src/interface";
