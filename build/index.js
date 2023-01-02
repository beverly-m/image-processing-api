"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
// create express application
var app = (0, express_1.default)();
//define port number used by application
var port = 3000;
//add application endpoints as middleware
app.use('/api', index_1.default);
try {
    // application listens for requests on specified port
    app.listen(port, function () {
        console.log("Server listening on localhost:".concat(port));
    });
}
catch (error) {
    console.log(error);
}
exports.default = app;
