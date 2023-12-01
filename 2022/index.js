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
class Stack {
    constructor(name) {
        this.data = [];
        this.name = name;
    }
    newPop(input) {
        let out = [];
        for (let i = 0; i < input; i++) {
            out.push(this.pop());
        }
        out.reverse();
        return out;
    }
    newPush(arr) {
        arr.forEach((e) => this.data.push(e));
    }
    pop() {
        return this.data.pop();
    }
    push(newElement) {
        return this.data.push(newElement);
    }
    getName() {
        return this.name;
    }
    getLast() {
        return this.data[this.data.length - 1];
    }
}
class Board {
    constructor(matrix) {
        this.stacks = [];
        const splitMatrix = matrix.split("\n");
        this.stackNumbers = splitMatrix[splitMatrix.length - 1]
            .split("")
            .filter((e) => e != " ")
            .map((e) => Number(e));
        const cratesRows = splitMatrix.slice(0, splitMatrix.length - 1).reverse();
        this.stackNumbers.forEach((number) => this.stacks.push(new Stack(number)));
        cratesRows.forEach((row) => {
            const processed = this.processRow(row);
            processed.forEach((element, index) => {
                if (!element.includes("["))
                    return;
                this.stacks[index].push(element.trim());
            });
        });
    }
    processRow(row) {
        let index = 0;
        let outRow = [];
        for (let i = index + 3; i <= row.length; i = i + 4) {
            outRow.push(row.slice(index, i));
            index = i;
        }
        return outRow;
    }
    stringToMove(input) {
        const parsed = input
            .split(" ")
            .map((e) => Number(e))
            .filter((e) => !isNaN(e));
        return {
            move: parsed[0],
            from: parsed[1],
            to: parsed[2],
        };
    }
    move(inMove) {
        const move = this.stringToMove(inMove);
        // TODO: This is the 1st part of the problem
        // for (let i = 0; i < move.move; i++) {
        //   const from = this.stacks[move.from - 1].pop();
        //   this.stacks[move.to - 1].push(from as string);
        // }
        const from = this.stacks[move.from - 1].newPop(move.move);
        this.stacks[move.to - 1].newPush(from);
    }
    getLastElements() {
        return this.stacks.map((stack) => stack.getLast());
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = yield promises_1.default.readFile("./05_input.txt");
        const data = rawData.toString();
        const splitByBreak = data.split("\n");
        splitByBreak.pop();
        const index = splitByBreak.indexOf("");
        const matrix = splitByBreak.slice(0, index).join("\n");
        const moves = splitByBreak.slice(index + 1, splitByBreak.length);
        const board = new Board(matrix);
        moves.forEach((move) => board.move(move));
        const regex = /\[|\]/g;
        const lastElements = board.getLastElements().join("").replace(regex, "");
        console.log(lastElements);
    });
}
main();
