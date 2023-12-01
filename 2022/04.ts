import fs from "fs/promises";

type BegEndType = {
  beginning: number;
  ending: number;
};

function contains(inside: BegEndType, outside: BegEndType): boolean {
  return (
    inside.beginning >= outside.beginning && inside.ending <= outside.ending
  );
}

function overlaps(first: BegEndType, second: BegEndType): boolean {
  const overlaps =
    first.ending >= second.beginning && first.beginning <= second.ending;
  console.log("first: ", first);
  console.log("second: ", second);
  console.log("overlaps: ", overlaps);
  return overlaps;
}

function isContained(input: [BegEndType, BegEndType]) {
  const first = input[0];
  const second = input[1];

  return contains(first, second) || contains(second, first);
}

async function main() {
  const rawData = await fs.readFile("./04_input.txt");
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
    .map((pair) => isContained(pair as [BegEndType, BegEndType]))
    .reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
  console.log(contained);

  const overlapping = pairs
    .map((pair) => {
      return overlaps(pair[0], pair[1]);
    })
    .reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
  console.log(overlapping);
}

main();
