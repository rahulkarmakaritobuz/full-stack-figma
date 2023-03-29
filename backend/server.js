const path = require("path");
const fs = require("fs");
const http = require("http");

const getPath = (requestLink) => {
  requestLink = requestLink.substring(1);
  let data = requestLink.split(".");
  data.unshift("database");
  data[3] = data[3] + ".jpeg";
  const way = path.join(data[0], data[1], data[2], data[3]);
  return way;
};

const server = http.createServer((req, res) => {
  console.log(req.url);
  way = getPath(req.url);
  console.log(req.url);
  let links = req.url.split(".");
  console.log(links);
  if (links[0] === "/images") {
    console.log(way);
    res.setHeader("Access-Control-Allow-Origin", "*");
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
