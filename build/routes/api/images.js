"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var url_1 = __importDefault(require("url"));
var processor_1 = __importDefault(require("../../utilities/processor"));
var path_1 = __importDefault(require("path"));
var apicache_1 = __importDefault(require("apicache"));
var images = express_1.default.Router();
var cache = apicache_1.default.middleware;
var status200 = function (req, res) { return res.status === 200; };
var cacheStatus200 = cache('60 minutes', status200);
images.get("/", cacheStatus200, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryObject, image, width, height, result, thumbImagePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryObject = url_1.default.parse(req.url, true).query;
                image = (queryObject.image);
                width = (queryObject.width);
                height = (queryObject.height);
                if (!(width === undefined || height === undefined || image === undefined)) return [3 /*break*/, 1];
                res.status(400).send("Invalid URL parameters sent");
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, (0, processor_1.default)(queryObject)];
            case 2:
                result = _a.sent();
                if (!!(JSON.stringify(result) == "{}")) return [3 /*break*/, 4];
                thumbImagePath = path_1.default.join(__dirname, "..", "..", "..", "src", "assets", "thumb", "".concat(image, "_thumb(").concat(width, "x").concat(height, ").jpg"));
                return [4 /*yield*/, res.status(200).sendFile(thumbImagePath)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                res.status(404).send("Image file name does not exist");
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = images;
