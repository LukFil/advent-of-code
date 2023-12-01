import fs from "fs/promises";

// first column: A - Rock, B - Paper, C - Scissors
// second column: X - lose, Y - draw, Z - win
//
// scores:
// 1 - Rock
// 2 - Paper
// 3 - Scissors
// 0 - Lost
// 3 - Draw
// 6 - Won
//

type ResolveReturn = {
  status: Outcome;
  points: number;
};

function resolve({
  oponent,
  i,
}: {
  oponent: AllMoves;
  i: AllMoves;
}): ResolveReturn {
  let score: number = 0;
  if (i === "Rock") score = score + 1;
  if (i === "Paper") score = score + 2;
  if (i === "Scissors") score = score + 3;

  if (oponent === i) return { status: "draw", points: score + 3 };
  if (oponent === "Rock" && i === "Paper")
    return { status: "win", points: score + 6 };
  if (oponent === "Paper" && i === "Scissors")
    return { status: "win", points: score + 6 };
  if (oponent === "Scissors" && i === "Rock")
    return { status: "win", points: score + 6 };

  return { status: "lose", points: score };
}

type TheirMoves = "A" | "B" | "C";
type MyMoves = "X" | "Y" | "Z";
type AllMoves = "Rock" | "Paper" | "Scissors";
type Outcome = "win" | "lose" | "draw";

function theirToAll(input: TheirMoves): AllMoves {
  if (input === "A") return "Rock";
  if (input === "B") return "Paper";
  return "Scissors";
}

function myToOutcome(input: MyMoves): Outcome {
  if (input === "X") return "lose";
  if (input === "Y") return "draw";
  return "win";
}

function myToAll(their: AllMoves, outcome: Outcome): AllMoves {
  if (their === "Rock") {
    if (outcome === "win") return "Paper";
    if (outcome === "lose") return "Scissors";
    return "Rock";
  }
  if (their === "Paper") {
    if (outcome === "win") return "Scissors";
    if (outcome === "lose") return "Rock";
    return "Paper";
  }

  // Scissors
  if (outcome === "win") return "Rock";
  if (outcome === "lose") return "Paper";
  return "Scissors";
}

// second column: X - lose, Y - draw, Z - win

async function main() {
  const rawData = await fs.readFile("./02_input.txt");
  const data = rawData.toString();
  const splitByBreak = data.split("\n");
  splitByBreak.pop();

  const strategy = splitByBreak.map((pair) => {
    const moves = pair.split(" ");

    const convertedTheir = theirToAll(moves[0] as TheirMoves);
    const convertedMine = myToAll(
      convertedTheir,
      myToOutcome(moves[1] as MyMoves)
    );
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
}

main();
