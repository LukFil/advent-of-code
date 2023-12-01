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
function resolve({ oponent, i, }) {
    let score = 0;
    if (i === "Rock")
        score = score + 1;
    if (i === "Paper")
        score = score + 2;
    if (i === "Scissors")
        score = score + 3;
    if (oponent === i)
        return { status: "draw", points: score + 3 };
    if (oponent === "Rock" && i === "Paper")
        return { status: "win", points: score + 6 };
    if (oponent === "Paper" && i === "Scissors")
        return { status: "win", points: score + 6 };
    if (oponent === "Scissors" && i === "Rock")
        return { status: "win", points: score + 6 };
    return { status: "lose", points: score };
}
function theirToAll(input) {
    if (input === "A")
        return "Rock";
    if (input === "B")
        return "Paper";
    return "Scissors";
}
function myToOutcome(input) {
    if (input === "X")
        return "lose";
    if (input === "Y")
        return "draw";
    return "win";
}
function myToAll(their, outcome) {
    if (their === "Rock") {
        if (outcome === "win")
            return "Paper";
        if (outcome === "lose")
            return "Scissors";
        return "Rock";
    }
    if (their === "Paper") {
        if (outcome === "win")
            return "Scissors";
        if (outcome === "lose")
            return "Rock";
        return "Paper";
    }
    // Scissors
    if (outcome === "win")
        return "Rock";
    if (outcome === "lose")
        return "Paper";
    return "Scissors";
}
// second column: X - lose, Y - draw, Z - win
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = yield promises_1.default.readFile("./02_input.txt");
        const data = rawData.toString();
        const splitByBreak = data.split("\n");
        splitByBreak.pop();
        const strategy = splitByBreak.map((pair) => {
            const moves = pair.split(" ");
            const convertedTheir = theirToAll(moves[0]);
            const convertedMine = myToAll(convertedTheir, myToOutcome(moves[1]));
            return {
                oponent: convertedTheir,
                i: convertedMine,
            };
        });
        const results = strategy.map((s) => resolve(s));
        const points = results
            .map((r) => r.points)
            .reduce((acc, curr) => acc + curr, 0);
        console.log(points);
    });
}
main();
