var express = require('express')
const path = require("path");
var app = express()
app.use(express.static(path.join(__dirname, "/build")));
app.listen(3000, "localhost", () => {
    console.log("roulette server started listening port 3000");
})