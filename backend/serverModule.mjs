// const fs = require("fs/promises");
import * as fs from "fs/promises";
import * as path from "path";
import { json } from "stream/consumers";
import * as card from "./database/cards/cardData.mjs";

export const modifyData = async (folder, fileName, totalFormData) => {
  console.log(totalFormData);
  const filePath = path.join(path.resolve(), "database", folder, fileName);
  await fs.appendFile(filePath, JSON.stringify(totalFormData));
};

export const onceWrite = async () => {
  await fs.writeFile(
    "./database/cards/cardData.txt",
    JSON.stringify(card.cardData)
  );
};

// export const updateEmail = async (emailIds) => {
//   console.log(emailIds);
//   await fs.appendFile("./database/emailData.txt", JSON.stringify(emailIds));
// };
// module.export = { modifyData };
export const readCardData = async (fileName) => {
  const filePath = path.join(path.resolve(), "database", "cards", fileName);
  console.log(filePath);
  const data = await fs.readFile(filePath);
  // console.log(data);
  return data.toString();
};
