import fs from "fs/promises";

class Stack {
  constructor(name: number) {
    this.name = name;
  }
  private name: number;
  private data: Array<string> = [];

  public newPop(input: number) {
    let out: Array<string> = [];
    for (let i = 0; i < input; i++) {
      out.push(this.pop() as string);
    }
    out.reverse();

    return out;
  }

  public newPush(arr: Array<string>) {
    arr.forEach((e) => this.data.push(e));
  }

  public pop() {
    return this.data.pop();
  }

  public push(newElement: string) {
    return this.data.push(newElement);
  }
  public getName() {
    return this.name;
  }

  public getLast() {
    return this.data[this.data.length - 1];
  }
}

class Board {
  constructor(matrix: string) {
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
        if (!element.includes("[")) return;
        this.stacks[index].push(element.trim());
      });
    });
  }

  private stackNumbers: Array<number>;
  private stacks: Array<Stack> = [];

  processRow(row: string) {
    let index = 0;

    let outRow: Array<string> = [];
    for (let i = index + 3; i <= row.length; i = i + 4) {
      outRow.push(row.slice(index, i));
      index = i;
    }

    return outRow;
  }

  private stringToMove(input: string) {
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

  move(inMove: string) {
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

async function main() {
  const rawData = await fs.readFile("./05_input.txt");
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
}

main();
