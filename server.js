var http = require("http");
const app = require("./app");
var server = http.createServer(app);

server.listen(8080);

console.log("Server running at http://127.0.0.1:8081/");
