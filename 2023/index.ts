import fs from "fs/promises";

async function main() {
  const rawData = await fs.readFile("./02_input.txt");
  const data = rawData.toString();

  const splitByBreak = data.split("\n");
  const limit = [
    { number: 12, color: "red" },
    { number: 13, color: "green" },
    { number: 14, color: "blue" },
  ];

  const res = splitByBreak
    .map((line) => {
      if (line.length < 1) return;
      const splitLine = line.split(":");
      const gameId = splitLine[0].split(" ")[1];

      const colors = splitLine[1].split(/[,+;]/).map((c) => {
        const splitC = c.split(" ");

        return { color: splitC[2], number: Number(splitC[1]) };
      });

      return { gameId, colors };
    })
    .map((map) => {
      const res = limit
        .map((l) => {
          const exceeds = map?.colors.filter(
            (m) => m.color === l.color && m.number > l.number,
          );
          if (exceeds) return exceeds;
          return undefined;
        })
        .flat();
      if (map === undefined || map.gameId === undefined) return;
      if (res.length === 0) return { gameId: map.gameId };
      return;
    })
    .filter((p) => p !== undefined && p.gameId !== undefined)
    .map((e) => Number(e?.gameId))
    .reduce((acc, curr) => acc + curr);

  console.log(res);
}

main();
