import fs from "fs/promises";

async function main() {
  const rawData = await fs.readFile("./01_input.txt");
  const data = rawData.toString();

  const splitByBreak = data.split("\n");

  let elves: number[] = [];
  let current = 0;
  splitByBreak.forEach((value) => {
    if (elves[current] === undefined) elves[current] = 0;
    if (value.length === 0) return (current = current + 1);

    elves[current] = elves[current] + Number(value);
  });

  elves.sort((a: number, b: number) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  // const mostCarried = Math.max(...elves);
  // const positionOfElf = elves.findIndex((value) => mostCarried === value) + 1;

  const topThree =
    elves[elves.length - 1] + elves[elves.length - 2] + elves[elves.length - 3];

  console.log(topThree);
}

main();
