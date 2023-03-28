const path = require("path");
const fs = require("fs");
const http = require("http");

const readDirectory = (dirPath) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = entries
    .map((entry) => {
      const entryPath = path.join(dirPath, entry.name);
      if (entry.isFile()) {
        return {
          type: "file",
          name: entry.name,
          path: entryPath,
        };
      } else if (entry.isDirectory()) {
        return {
          type: "folder",
          name: entry.name,
          path: entryPath,
        };
      }
    })
    .filter(Boolean);
  return result;
};

// console.log(dirData);

const server = http.createServer((req, res) => {
  if (req.url == "/images") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "content-Type": "application/json" });

    const directoryPath = path.relative("./script", "./assets/images");
    res.end(JSON.stringify(readDirectory(directoryPath)));
    console.log(readDirectory(directoryPath));
    // fs.writeFileSync("../imagesDB.txt", JSON.stringify(dirData));
  } else {
    res.writeHead(404, { "content-Type": "plain/text" });
    res.end("Error : No data found !");
  }
});
server.listen(8000, () => {
  console.log("Port 8080 running...");
});
