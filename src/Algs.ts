import { Random } from "./Random";

function isValid(
  data: Array<string | number>,
  size: number,
  x: number,
  y: number
): boolean {
  return (
    x >= 0 &&
    x < size &&
    y >= 0 &&
    y < size &&
    Number.isInteger(data[y * size + x])
  );
}

function parseMove(
  dx: number,
  dy: number,
  length: number,
  constraints: number,
  data: Array<string | number>,
  size: number,
  x: number,
  y: number
): number[] {
  const moves: number[] = [];
  const orientation: number[][] = [];
  const directions = [
    [-dx, -dy], // Forward
    [dx, dy], // Backward
    [-dy, dx], // Right
    [dy, -dx], // Left
  ];
  for (const d of [-1, 1]) {
    // For pieces like knights, we need to reverse the X for each direction
    directions.forEach((dir, i) => {
      if ((constraints & (2 ** i)) === 0) {
        return;
      }
      const nrd = [dir[0], dir[1] * d];
      if (orientation.every((x) => x[0] !== nrd[0] || x[1] !== nrd[1]))
        orientation.push(nrd);
    });
  }
  for (const [yi, xi] of orientation) {
    for (let i = 1; i <= length; i++) {
      if (isValid(data, size, x + i * xi, y + i * yi))
        moves.push((y + i * yi) * size + (x + i * xi));
      else break;
    }
  }
  return moves;
}

function parseDirection(letter: string): number[] {
  switch (letter) {
    case "W":
      return [1, 0];
    case "F":
      return [1, 1];
    case "D":
      return [2, 0];
    case "N":
      return [2, 1];
    case "A":
      return [2, 2];
    case "H":
      return [3, 0];
    case "C":
      return [3, 1];
    case "Z":
      return [3, 2];
    case "G":
      return [3, 3];
  }
  return [];
}

function parseNotation(
  notation: string,
  data: Array<string | number>,
  size: number,
  x: number,
  y: number
) {
  let str = "";
  for (let i = 0; i < notation.length; i++) {
    const s = notation[i];
    if (s === "m") {
      // For "move" only, we discard them
      i++;
    } else if (s === "c") {
      // For "capture" only, the ones we want to keep for the game
    } else {
      str += s;
    }
  }
  notation = str;

  let d: number[] = []; // Direction we are going
  let dir = null; // Letter indicating that direction
  let length = 1; // Length we are doing
  let moves: number[] = [];
  let constraints = 15;
  for (const s of notation) {
    if (s === s.toLowerCase()) {
      if (dir !== null) {
        moves = moves.concat(
          parseMove(d[0], d[1], length, constraints, data, size, x, y)
        );
        dir = null;
        length = 1;
        constraints = 15;
      }
      switch (s) {
        case "f":
          constraints = 1;
          break;
        case "b":
          constraints = 2;
          break;
        case "l":
          constraints = 8;
          break;
        case "r":
          constraints = 4;
          break;
        case "v":
          constraints = 3;
          break;
        case "s":
          constraints = 12;
          break;
      }
    } else if (dir === null) {
      d = parseDirection(s);
      dir = s;
    } else if (!isNaN(Number(s))) {
      length = parseInt(s);
    } else if (s === dir) {
      moves = moves.concat(
        parseMove(d[0], d[1], Infinity, constraints, data, size, x, y)
      );
      dir = null;
      length = 1;
      constraints = 15;
    } else {
      moves = moves.concat(
        parseMove(d[0], d[1], length, constraints, data, size, x, y)
      );
      d = parseDirection(s);
      dir = s;
      length = 1;
      constraints = 15;
    }
  }
  if (dir !== null) {
    moves = moves.concat(
      parseMove(d[0], d[1], length, constraints, data, size, x, y)
    );
  }
  return moves;
}

// https://en.wikipedia.org/wiki/Betza%27s_funny_notation
const pieceMovesCheck: Record<string, string> = {
  R: "WW",
  B: "FF",
  Q: "WWFF",
  N: "N",
  K: "WF",
  P: "fmWfcF",
  D: "bmWbcF",
  O: "WWN",
  飛: "WW",
  角: "FF",
  桂: "ffN",
  歩: "fW",
  玉: "WF",
  香: "fWW",
  銀: "FfW",
  金: "WfF",
};

export function fillPositions(
  data: Array<number | string>
): Array<number | string> {
  const size = Math.sqrt(data.length); // Boards are always squared

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const value = data[y * size + x];
      if (!Number.isInteger(value)) {
        const moves = parseNotation(
          pieceMovesCheck[String(value)],
          data,
          size,
          x,
          y
        );
        for (const move of moves) {
          // @ts-expect-error: T2322
          data[move]++;
        }
      }
    }
  }

  return data;
}

export function generateBoard(
  random: Random,
  id: number,
  pieces: Record<string, number>,
  size: number,
  count: number
): Array<number | string> {
  const piecesMdf: Record<string | number, number> = {};
  console.log(pieces);
  for (let i = 0; i < pieces.length; i++) {
    piecesMdf[i] = pieces[i];
  }

  const data: Array<number | string> = Array(size * size).fill(0);
  let i = count;
  while (i > 0) {
    const rand = Math.floor(random.next() * (size * size));
    if (rand !== id && Number.isInteger(data[rand])) {
      const value = Math.floor(random.next() * Object.keys(piecesMdf).length);
      const piece = Object.keys(piecesMdf)[value];

      if (piecesMdf[piece] === 0) {
        // We reached the amount of time we could spawn that piece
        continue;
      }

      if (
        (piece === "P" || piece === "桂" || piece === "歩" || piece === "香") &&
        rand < size
      ) {
        // Pawns shouldn't be able to spawn on the top line
        continue;
      }
      if (piece === "D" && rand >= size * (size - 1)) {
        // Pawns shouldn't be able to spawn on the top line
        continue;
      }

      data[rand] = piece;
      piecesMdf[piece]--;
      i--;
    }
  }
  return data;
}

function validateBoard(
  data: Array<string | number>,
  discovered: boolean[],
  pieces: Record<string, number>,
  size: number
) {
  const thinkData = Array(size * size).fill(0);

  // For each tile...
  for (let i = 0; i < data.length; i++) {
    if (discovered[i] || thinkData[i] !== 0) {
      // We only want the ones we don't know about and the one we didn't validate yet
      continue;
    }

    let str = "";
    for (const piece of Object.keys(pieces)) {
      // Check all pieces
      // List of all moves for the current piece
      const moves = parseNotation(
        pieceMovesCheck[piece],
        thinkData,
        size,
        i % size,
        Math.floor(i / size)
      );

      // If the piece have a move that is impossible, it means it can't be this one
      let isValid = true;
      for (const move of moves) {
        if (discovered[move] && data[move] === 0) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        str += piece;
      }
    }
    if (str !== "") {
      // We added a piece, need to revalidate the whole board
      thinkData[i] = str;
      i = -1;
    }
  }

  // Check if we are sure that only one position is possible
  let isSolved = true;
  for (let i = 0; i < data.length; i++) {
    if (
      !discovered[i] &&
      ((Number.isInteger(data[i]) && thinkData[i] !== 0) ||
        (!Number.isInteger(data[i]) && thinkData[i] !== data[i]))
    ) {
      isSolved = false;
      break;
    }
  }

  return {
    isSolved: isSolved,
    thinkData: thinkData,
  };
}

export function generatePuzzleBoard(
  seed: string,
  pieces: Record<string, number>,
  size: number,
  count: number,
  difficulty: number
) {
  let data: Array<number | string> = [];
  let discovered: boolean[] = [];
  let error: string | null = null;

  const random = new Random(seed);

  let c = 0;
  const maxIt = 300;
  for (; c < maxIt; c++) {
    data = fillPositions(generateBoard(random, -1, pieces, size, count));
    discovered = Array(size * size).fill(false);

    let thinkData = null;
    let isSolved = false;
    let giveup = false;
    while (!isSolved && !giveup) {
      // Get a random position that is not a piece and wasn't already taken
      const possibilities: number[] = [];
      for (let i = 0; i < data.length; i++) {
        if (
          !discovered[i] &&
          Number.isInteger(data[i]) &&
          (thinkData === null || thinkData[i] !== 0)
        ) {
          possibilities.push(i);
        }
      }
      if (possibilities.length > 0) {
        const randPos = Math.floor(random.next() * possibilities.length);
        discovered[possibilities[randPos]] = true;
      } else {
        giveup = true; // Algorithm failed with this generation, we give up
        continue;
      }

      const validation = validateBoard(data, discovered, pieces, size);
      isSolved = validation["isSolved"];
      thinkData = validation["thinkData"];
    }

    if (!isSolved) {
      console.log("Skipping unsolvabled puzzle");
    } else {
      for (let i = 0; i < data.length; i++) {
        if (!discovered[i]) {
          continue;
        }

        discovered[i] = false;
        const validation = validateBoard(data, discovered, pieces, size);
        if (!validation["isSolved"]) {
          discovered[i] = true;
        }
      }

      const emptyCasesAfter = discovered.filter((x) => x === false).length;

      if (difficulty !== -1 && difficulty > emptyCasesAfter) {
        console.log(`Skipping puzzle with ${emptyCasesAfter} empty tiles`);
      } else {
        if (difficulty !== -1) {
          // Set tiles to adjust difficulty

          const possibleTarget = [];
          for (let i = 0; i < data.length; i++) {
            if (!discovered[i] && Number.isInteger(data[i])) {
              possibleTarget.push(i);
            }
          }
          for (let i = emptyCasesAfter; i > difficulty; i--) {
            const rand = Math.floor(random.next() * possibleTarget.length);
            discovered[possibleTarget[rand]] = true;
            possibleTarget.splice(rand, 1).indexOf(rand);
          }
        }
        console.log(
          `Generated solved puzzle with ${
            discovered.filter((x) => x === false).length
          } empty tiles`
        );
        break;
      }
    }
  }

  let knownCells;
  if (c === maxIt) {
    error = "Failed to generate puzzle";
  } else {
    knownCells = Array(size * size).fill(false);
    for (const i in discovered) {
      if (discovered[i]) {
        knownCells[i] = true;
      }
    }
  }

  return { cells: data, knownCells, error };
}
