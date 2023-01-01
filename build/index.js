"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
// import apicache from "apicache";
var app = (0, express_1.default)();
var port = 3000;
// const cache = apicache.middleware
// const status200 = (req: Request, res: Response) => res.status === 200
// const cacheStatus200 = cache('60 minutes', status200)
// app.use(cacheStatus200);
app.use("/api", index_1.default);
try {
    app.listen(port, function () {
        console.log("Server listening on localhost:".concat(port));
    });
}
catch (error) {
    console.log(error);
}
exports.default = app;
