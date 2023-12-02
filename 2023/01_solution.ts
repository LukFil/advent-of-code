import fs from "fs/promises";

async function main() {
  const rawData = await fs.readFile("./01_input.txt");
  const data = rawData.toString();

  const splitByBreak = data.split("\n");
  const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

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

  const res = splitByBreak
    .map((line) => {
      const wordMapping = digits
        .map((digit, index) => {
          const allIndexes = findAllIndexes(line, digit);
          return allIndexes.map((i) => {
            return { location: i, number: index + 1 };
          });
        })
        .flat()
        .filter((m) => m.location !== -1);

      const numberMapping = Array.from(line)
        .map((ch, index) => {
          if (!Number.isNaN(Number(ch))) {
            return { location: index, number: Number(ch) };
          }
        })
        .filter((m) => m !== undefined);

      const mergedMapping = [...numberMapping, ...wordMapping].sort((a, b) => {
        if (!a || !b) {
          console.log("problem?");
          return 0;
        }

        if (a?.location < b?.location) return -1;
        return 1;
      });

      return mergedMapping.map((e) => {
        if (e?.number === undefined)
          console.error("we ve got a problem houston");
        return String(e?.number as number);
      });
    })
    .map((l) => {
      if (l.length === 1) return l[0] + l[0];
      return l[0] + l[l.length - 1];
    })
    .filter((e) => !Number.isNaN(e))
    .map((e) => Number(e))
    .reduce((f, s) => f + s);

  console.log(res);
}

main();
