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
var processor_1 = __importDefault(require("../../utilities/processor"));
var fs_1 = require("fs");
// Test functionality of processImage, the image resizing function
describe('2. Test image resizing utility', function () {
    describe('2.1. Test successful retrieval of image', function () {
        // remove thumbnail with these specifications before starting the tests if it exists
        // this is to facilitate efficient testing of the specs
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, fs_1.existsSync)('./src/assets/thumb/fjord_thumb(200x400).jpg')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_1.promises.rm('./src/assets/thumb/fjord_thumb(200x400).jpg')];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        // remove thumbnail with these specifications after each test
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.rm('./src/assets/thumb/fjord_thumb(200x400).jpg')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('2.1.1. Gets new resized image data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, processor_1.default)({
                            image: 'fjord',
                            width: '200',
                            height: '400',
                        })];
                    case 1:
                        data = _a.sent();
                        expect(data).toEqual({
                            format: 'jpeg',
                            width: 200,
                            height: 400,
                            channels: 3,
                            premultiplied: false,
                            size: 11905,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('2.1.2. Creates resized image in thumb folder', function () { return __awaiter(void 0, void 0, void 0, function () {
            var created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, processor_1.default)({ image: 'fjord', width: '200', height: '400' })];
                    case 1:
                        _a.sent();
                        created = (0, fs_1.existsSync)('./src/assets/thumb/fjord_thumb(200x400).jpg');
                        expect(created).toBeTrue();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('2.2. Test image retrieval failure', function () {
        it("2.2.1 Sends empty image data object when image doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, processor_1.default)({
                            image: 'testvalidity',
                            width: '200',
                            height: '400',
                        })];
                    case 1:
                        data = _a.sent();
                        expect(data).toEqual({});
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
