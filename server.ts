import {
  ICopyFile,
  IReadFile,
  IReadFilesInDirectory,
  IWriteFile,
} from "./interface";

import fs from "fs";
import path from "path";

export const readFile = ({ fileName, fileType = "utf8" }: IReadFile) => {
  if (!fileName) {
    return Promise.resolve("File name is required");
  }

  return new Promise((resolve, reject) => {
    fs.readFile(fileName, fileType, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const readFilesInDirectory = ({
  directoryPath,
}: IReadFilesInDirectory) => {
  if (!directoryPath) {
    return Promise.resolve("Directory path is required");
  }

  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const fileReadPromises = files.map((file) => {
        const filePath = path.join(directoryPath, file);
        return readFile({ fileName: filePath });
      });
      Promise.all(fileReadPromises)
        .then((fileContents) => {
          resolve(fileContents);
        })
        .catch((readErr) => {
          reject(readErr);
        });
    });
  });
};

export const writeFile = ({
  fileName,
  data,
  fileType = "utf8",
}: IWriteFile) => {
  if (!fileName || !data) {
    return Promise.resolve("File name and data are required");
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, fileType, (err) => {
      if (err) {
        reject(err);
      }
      resolve("File written successfully");
    });
  });
};

export const copyFile = ({ source, destination }: ICopyFile) => {
  if (!source || !destination) {
    return Promise.resolve("Source and destination are required");
  }
  return new Promise((resolve, reject) => {
    fs.copyFile(source, destination, (err) => {
      if (err) {
        reject(err);
      }
      resolve("File copied successfully");
    });
  });
};

export const makeDirectory = (directoryPath: string) => {
  if (!directoryPath) {
    return Promise.resolve("Directory path is required");
  }
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve("Directory created successfully");
    });
  });
};

export const removeDirectory = (directoryPath: string) => {
  if (!directoryPath) {
    return Promise.resolve("Directory path is required");
  }
  return new Promise((resolve, reject) => {
    fs.rm(directoryPath, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      }
      resolve("Directory removed successfully");
    });
  });
};

export const removeFile = (filePath: string) => {
  if (!filePath) {
    return Promise.resolve("File path is required");
  }
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      }
      resolve("File removed successfully");
    });
  });
};

export const fileExists = (filePath: string) => {
  if (!filePath) {
    return Promise.resolve("File path is required");
  }
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
};

export const directoryExists = (directoryPath: string) => {
  if (!directoryPath) {
    return Promise.resolve("Directory path is required");
  }
  return new Promise((resolve) => {
    fs.access(directoryPath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
};

export const getFilesInDirectory = (directoryPath: string) => {
  if (!directoryPath) {
    return Promise.resolve("Directory path is required");
  }
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
};

export const renameFile = (oldPath: string, newPath: string) => {
  if (!oldPath || !newPath) {
    return Promise.resolve("Old and new file paths are required");
  }
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve("File renamed successfully");
    });
  });
};

export const statFile = (filePath: string) => {
  if (!filePath) {
    return Promise.resolve("File path is required");
  }
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};
