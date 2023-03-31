// const fs = require("fs/promises");
import * as fs from "fs/promises";
import * as path from "path";
import { json } from "stream/consumers";
// import * as card from "./database/carouselDB/roomData.mjs";

export const modifyData = async (folder, fileName, totalFormData) => {
  const filePath = path.join(path.resolve(), "database", folder, fileName);
  await fs.appendFile(filePath, JSON.stringify(totalFormData));
};

// export const onceWrite = async () => {
//   await fs.writeFile(
//     "./database/carouselDB/roomData.txt",
//     JSON.stringify(card.roomData)
//   );
// };

export const readCardData = async (folder, fileName) => {
  const filePath = path.join(path.resolve(), "database", folder, fileName);
  console.log(filePath);
  const data = await fs.readFile(filePath);
  return data.toString();
};
