import * as fs from "fs/promises";
import * as path from "path";
import { json } from "stream/consumers";

export const modifyData = async (folder, fileName, totalFormData) => {
  const filePath = path.join(path.resolve(), "database", folder, fileName);
  await fs.appendFile(filePath, JSON.stringify(totalFormData));
};

export const readCardData = async (folder, fileName) => {
  const filePath = path.join(path.resolve(), "database", folder, fileName);
  console.log(filePath);
  const data = await fs.readFile(filePath);
  return data.toString();
};
