import fs from "fs/promises";

function toPriority(input: string): number {
  const charCode = input.charCodeAt(0);
  if (charCode < 97) {
    return Math.abs("A".charCodeAt(0) - charCode) + 27;
  }

  return Math.abs("a".charCodeAt(0) - charCode) + 1;
}

function findRepeats(left: string, right: string) {
  const repeats = [];
  for (let i = 0; i < right.length; i++) {
    const search = left.search(right[i]);
    if (search !== -1) repeats.push(right[i]);
  }
  return repeats;
}

function getHalves(input: string): [string, string] {
  const length = input.length;
  return [input.slice(0, length / 2), input.slice(length / 2, length)];
}

function getTriplets(input: string[], index: number): [string, string, string] {
  return [input[index], input[index + 1], input[index + 2]];
}

async function main() {
  const rawData = await fs.readFile("./03_input.txt");
  const data = rawData.toString();
  const splitByBreak = data.split("\n");
  splitByBreak.pop();

  const halvesArray = splitByBreak.map((element) => getHalves(element));
  const repeats = halvesArray.map((halves) =>
    findRepeats(halves[0], halves[1])
  );
  const priorities = repeats.map((repeat) => toPriority(repeat[0] as string));

  const sum = priorities.reduce((acc, curr) => acc + curr, 0);

  console.log(sum);

  let triplets: [string, string, string][] = [];
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
}

main();
