import { ReadS3, UploadS3 } from "./interface";

export const uploadFilesTOS3 = async ({
  s3,
  Key,
  file,
  bucket,
  params,
  contentType = "application/json",
}: UploadS3) => {
  const customParams = {
    Bucket: bucket,
    Key,
    Body: file,
    ContentType: contentType,
  };
  try {
    const data = await s3.upload(params || customParams).promise();
    return data;
  } catch (err) {
    throw err;
  }
};

export const downloadFilesFromS3 = async ({
  s3,
  Key,
  bucket,
  isJson,
}: ReadS3) => {
  const params = {
    Bucket: bucket,
    Key,
  };
  try {
    const data = await s3.getObject(params).promise();
    return isJson
      ? JSON.stringify(JSON.parse(data.Body.toString("utf-8")))
      : data;
  } catch (err) {
    throw err;
  }
};
