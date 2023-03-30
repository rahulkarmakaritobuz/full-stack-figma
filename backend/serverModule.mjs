// const fs = require("fs/promises");
import * as fs from "fs/promises";

export const modifyData = async (totalFormData) => {
  console.log(totalFormData);
  await fs.appendFile("./database/formData.txt", JSON.stringify(totalFormData));
};

export const updateEmail = async (emailIds) => {
  console.log(emailIds);
  await fs.appendFile("./database/emailData.txt", JSON.stringify(emailIds));
};
// module.export = { modifyData };
