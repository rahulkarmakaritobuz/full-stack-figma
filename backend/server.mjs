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

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  let links = req.url.split(".");
  if (req.url === "/review") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "content-Type": "application/json" });
    const data = await serverModule.readCardData("reviewDB", "reviewData.txt");
    res.end(data);
  } else if (req.url === "/header") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "content-Type": "application/json" });
    const data = await serverModule.readCardData("headerDB", "headerData.txt");
    res.end(data);
  } else if (req.url === "/suscribe") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "content-Type": "application/json" });
    const data = await serverModule.readCardData(
      "suscribeDB",
      "suscribeData.txt"
    );
    res.end(data);
  } else if (req.url === "/say-hello") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "content-Type": "application/json" });
    const data = await serverModule.readCardData("sayHelloDB", "helloData.txt");
    res.end(data);
  } else if (req.url === "/activity-data") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "content-Type": "application/json" });
    const data = await serverModule.readCardData(
      "activityDB",
      "activityData.txt"
    );
    res.end(data);
  } else if (req.url === "/welcome-data") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "content-Type": "application/json" });
    const data = await serverModule.readCardData(
      "welcomeDB",
      "welcomeData.txt"
    );
    res.end(data);
  } else if (req.url === "/room-data") {
    res.writeHead(200, { "content-Type": "application/json" });
    const data = await serverModule.readCardData("carouselDB", "roomData.txt");
    res.end(data);
  } else if (req.url === "/card-data") {
    res.writeHead(200, { "content-Type": "application/json" });
    const data = await serverModule.readCardData("cards", "cardData.txt");
    res.end(data);
  } else if (req.url === "/join-us" && req.method === "POST") {
    res.writeHead(200, { "content-Type": "application/json" });
    let chunks = "";
    req.on("data", (chunk) => {
      chunks = chunk.toString();
    });
    req.on("end", () => {
      let parsedData = querystring.parse(chunks);
      if (Object.keys(parsedData).length !== 0) {
        serverModule.modifyData("emailDB", "emailData.txt", parsedData);
      }
    });
  } else if (req.url === "/search-room" && req.method === "POST") {
    res.writeHead(200, { "Content-Type": "application/json" });
    let chunks = "";
    req.on("data", (chunk) => {
      chunks = chunk.toString();
    });

    req.on("end", () => {
      let parsedData = querystring.parse(chunks);
      if (Object.keys(parsedData).length !== 0) {
        serverModule.modifyData("formDB", "formData.txt", parsedData);
      }
    });
    res.end();
  } else if (links[0] === "/images" && links.length > 1) {
    const way = getPath(req.url);
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
