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

export const readyManyFiles = (filePaths: string[]) => {
  if (!filePaths || !filePaths.length) {
    return Promise.resolve("File paths are required");
  }
  const readFilesPromises = filePaths.map((filePath) => {
    return readFile({ fileName: filePath });
  });
  return Promise.all(readFilesPromises);
};

export const readJsonFile = ({ fileName }: IReadFile) => {
  if (!fileName) {
    return Promise.resolve("File name is required");
  }

  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (jsonErr) {
        reject(jsonErr);
      }
    });
  });
};

export const writeJsonFile = ({ fileName, data }: IWriteFile) => {
  if (!fileName || !data) {
    return Promise.resolve("File name and data are required");
  }

  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(fileName, jsonData, "utf8", (err) => {
      if (err) {
        reject(err);
      }
      resolve("File written successfully");
    });
  });
};

export const writeInStream = ({
  fileName,
  data,
  fileType = "utf-8",
}: IWriteFile) => {
  if (!fileName || !data) {
    return Promise.resolve("File name and data are required");
  }

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(fileName);
    writeStream.write(data, fileType, (err) => {
      if (err) {
        reject(err);
      }
      resolve("Data written successfully");
    });
  });
};

export const readInStream = ({ fileName, fileType = "utf-8" }: IReadFile) => {
  return new Promise<string>((resolve, reject) => {
    if (!fileName) {
      reject(new Error("File name is required"));
      return;
    }

    const readStream = fs.createReadStream(fileName, { encoding: fileType });

    readStream.on("data", (chunk) => {
      try {
        const jsonString = JSON.stringify(chunk);
        resolve(jsonString);
      } catch (error) {
        reject(error);
      }
    });

    readStream.on("end", () => {
      resolve("Data read successfully");
    });

    readStream.on("error", (err) => {
      reject(err);
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
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
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

export const removeManyFiles = (filePaths: string[]) => {
  if (!filePaths || !filePaths.length) {
    return Promise.resolve("File paths are required");
  }
  const removeFilePromises = filePaths.map((filePath) => {
    return removeFile(filePath);
  });
  return Promise.all(removeFilePromises);
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
