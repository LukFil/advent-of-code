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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = yield promises_1.default.readFile("./01_input.txt");
        const data = rawData.toString();
        const splitByBreak = data.split("\n");
        let elves = [];
        let current = 0;
        splitByBreak.forEach((value) => {
            if (elves[current] === undefined)
                elves[current] = 0;
            if (value.length === 0)
                return (current = current + 1);
            elves[current] = elves[current] + Number(value);
        });
        elves.sort((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
        // const mostCarried = Math.max(...elves);
        // const positionOfElf = elves.findIndex((value) => mostCarried === value) + 1;
        const topThree = elves[elves.length - 1] + elves[elves.length - 2] + elves[elves.length - 3];
        console.log(topThree);
    });
}
main();
