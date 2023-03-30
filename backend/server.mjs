import * as path from "path";
import * as fs from "fs";
import * as http from "http";
import * as querystring from "querystring";
import * as serverModule from "./serverModule.mjs";

const getPath = (requestLink) => {
  requestLink = requestLink.substring(1);
  let data = requestLink.split(".");
  data.unshift("database");
  data[3] = data[3] + ".jpeg";
  const way = path.join(data[0], data[1], data[2], data[3]);
  return way;
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  let links = req.url.split(".");

  //   console.log("links : ", links);
  if (req.url === "/join-us" && req.method === "POST") {
    res.writeHead(200, { "content-Type": "application/json" });
    let chunks = "";
    req.on("data", (chunk) => {
      console.log(chunk);
      chunks = chunk.toString();
    });
    req.on("end", () => {
      let parsedData = querystring.parse(chunks);
      console.log("ParsedData : ", parsedData);
      if (Object.keys(parsedData).length !== 0) {
        serverModule.updateEmail(parsedData);
      }
    });
  } else if (req.url === "/search-room" && req.method === "POST") {
    res.writeHead(200, { "Content-Type": "application/json" });
    let chunks = "";
    req.on("data", (chunk) => {
      console.log("chunks : ", chunk.toString());
      chunks = chunk.toString();
    });

    req.on("end", () => {
      let parsedData = querystring.parse(chunks);
      console.log("parsedData : ", parsedData);
      if (Object.keys(parsedData).length !== 0) {
        serverModule.modifyData(parsedData);
      }
    });
    res.end();
  } else if (links[0] === "/images" && links.length > 1) {
    const way = getPath(req.url);
    console.log("way : ", way);
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "content-Type": "image/jpeg" });
    fs.readFile(way, function (err, content) {
      res.end(content);
    });
  } else {
    res.end("Error : No data found !");
  }
});
server.listen(8080, () => {
  console.log("Port 8080 running...");
});
