var http = require("http");
const app = require("./app");
var server = http.createServer(app);

server.listen(process.env.PORT || 5000);

console.log("Server running at http://127.0.0.1:8081/");
