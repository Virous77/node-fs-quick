# node-fs-quick

A simple wrapper around the Node.js file system module that provides a promise-based API. This module contains some of the most common file system operations and is designed to be easy to use.

Written in TypeScript and compiled to JavaScript. This module is designed to be used with ES6 modules, but it can also be used with CommonJS. It is also designed to be used with `async/await`, but it can also be used with promises.

## Installation

```bash
npm install node-fs-quick
```

## Usage

```javascript
import fs from "node-fs-quick";
// or
import { writeFile } from "node-fs-quick";
// or
const fs = require("node-fs-quick");

async function main() {
  const response = await fs.writeFile({
    fileName: "example.txt",
    fileType: "Hello, world!",
  });
  console.log(response); // File written successfully
}
```

## API

- fs.writeFile
- fs.readFile
- fs.removeFile
- fs.readFilesInDirectory
- fs.copyFile
- fs.makeDirectory
- fs.removeDirectory
- fs.fileExists
- fs.directoryExists
- fs.getFilesInDirectory
- fs.renameFile
- fs.statFile
