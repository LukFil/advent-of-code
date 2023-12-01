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
function toPriority(input) {
    const charCode = input.charCodeAt(0);
    if (charCode < 97) {
        return Math.abs("A".charCodeAt(0) - charCode) + 27;
    }
    return Math.abs("a".charCodeAt(0) - charCode) + 1;
}
function findRepeats(left, right) {
    const repeats = [];
    for (let i = 0; i < right.length; i++) {
        const search = left.search(right[i]);
        if (search !== -1)
            repeats.push(right[i]);
    }
    return repeats;
}
function getHalves(input) {
    const length = input.length;
    return [input.slice(0, length / 2), input.slice(length / 2, length)];
}
function getTriplets(input, index) {
    return [input[index], input[index + 1], input[index + 2]];
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = yield promises_1.default.readFile("./03_input.txt");
        const data = rawData.toString();
        const splitByBreak = data.split("\n");
        splitByBreak.pop();
        const halvesArray = splitByBreak.map((element) => getHalves(element));
        const repeats = halvesArray.map((halves) => findRepeats(halves[0], halves[1]));
        const priorities = repeats.map((repeat) => toPriority(repeat[0]));
        const sum = priorities.reduce((acc, curr) => acc + curr, 0);
        console.log(sum);
        let triplets = [];
        for (let i = 0; i < splitByBreak.length; i = i + 3) {
            triplets.push(getTriplets(splitByBreak, i));
        }
        const badges = triplets.map((triplet) => {
            const firstCompare = findRepeats(triplet[0], triplet[1]);
            const secondCompare = findRepeats(triplet[0], triplet[2]);
            return findRepeats(firstCompare.join(""), secondCompare.join(""))[0];
        });
        console.log(badges);
        console.log("triplets length: ", triplets.length);
        console.log("badges length: ", badges.length);
        const badgePriorities = badges
            .map((badge) => toPriority(badge))
            .reduce((acc, curr) => acc + curr, 0);
        console.log(badgePriorities);
    });
}
main();
