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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
function contains(inside, outside) {
    return (inside.beginning >= outside.beginning && inside.ending <= outside.ending);
}
function overlaps(first, second) {
    const overlaps = first.ending >= second.beginning && first.beginning <= second.ending;
    console.log("first: ", first);
    console.log("second: ", second);
    console.log("overlaps: ", overlaps);
    return overlaps;
}
function isContained(input) {
    const first = input[0];
    const second = input[1];
    return contains(first, second) || contains(second, first);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = yield promises_1.default.readFile("./04_input.txt");
        const data = rawData.toString();
        const splitByBreak = data.split("\n");
        splitByBreak.pop();
        const pairs = splitByBreak.map((result) => {
            const both = result.split(",");
            return both.map((one) => {
                const split = one.split("-");
                return { beginning: Number(split[0]), ending: Number(split[1]) };
            });
        });
        const contained = pairs
            .map((pair) => isContained(pair))
            .reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
        console.log(contained);
        const overlapping = pairs
            .map((pair) => {
            return overlaps(pair[0], pair[1]);
        })
            .reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
        console.log(overlapping);
    });
}
main();
