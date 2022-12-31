"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
describe("test index utilities", function () {
    it("returns a text string", function () {
        expect((0, index_1.default)("Salibonani")).toEqual("Salibonani");
    });
});
