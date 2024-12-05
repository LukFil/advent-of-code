import fs from "fs/promises";

function findAllIndexes(str: string, search: string) {
  let indexes: Array<number> = [];

  let i = 0;
  while (i < str.length) {
    const index = str.indexOf(search, i);
    if (index === -1) return indexes;

    i = i + index + search.length;
    indexes.push(index);
  }

  return indexes;
}

function findNumbersInMatrix(
  matrix: string[],
  ids: [number, number][],
): number[] {
  const res = ids.map((coords) => {
    // check for matrix edges
    console.log(matrix[coords[0]][coords[1]]);
  });

  return [];
}

async function firstApproach() {
  const rawData = await fs.readFile("./03_input.txt");
  const data = rawData.toString();

  const splitByBreak = data.split("\n");
  let ids: [number, number][] = [];

  splitByBreak.forEach((line, lineNumber) => {
    const matches = line.match(/[^a-zA-Z\d.]/g);
    const setMatches = new Set(matches);
    Array.from(setMatches).forEach((match) => {
      return findAllIndexes(line, match).forEach((i) =>
        ids.push([lineNumber, i]),
      );
    });
  });

  findNumbersInMatrix(splitByBreak, ids);
}

const checkOne = (ch:string) => {
 if (!ch) return undefined
 if (ch.match(/[^a-zA-Z\d.]/) === null) return false

 return true

}

const checkCol = (matrix: string[], coords: [number, number], debug?: string) => {
  if (!matrix[coords[0]][coords[1]]) return false;

  const ch1 = matrix[coords[0]][coords[1] - 1];
  const ch2 = matrix[coords[0]][coords[1]];
  const ch3 = matrix[coords[0]][coords[1] + 1];

 return [checkOne(ch1), checkOne(ch2), checkOne(ch3)]
};

async function main() {
  const rawData = await fs.readFile("./03_input.txt");
  const data = rawData.toString();

  const splitByBreak = data.split("\n");

  const res = splitByBreak.map((line, lineNumber) => {
    const numbers = line.match(/\d{1,}/g);
    // console.log(numbers);
    const found = numbers?.map((num) => {
      let innerFound: boolean[] = [];
      const numIndex = line.indexOf(num);

      const cols = checkCol(splitByBreak, [lineNumber, numIndex], line)
      if (cols === false) throw new Error ('we re indexing nonexistent spot')
      const isAttached  = cols.some(p => p === true)

      innerFound.push(isAttached);
      console.log(innerFound);
    });
  });

  // console.log(ids);
}

main();
