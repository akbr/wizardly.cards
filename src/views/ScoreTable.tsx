import { ComponentChildren } from "preact";
import { rotateArray } from "../lib/array";

const convert = (scores: number[][]) => {
  let rows: number[][][] = [];

  let runningTotal = scores[0].map(() => 0);
  let thisBids: number[];
  let thisActuals: number[];

  scores.forEach((x, idx) => {
    if (idx % 2 === 0) {
      thisBids = x;
      return;
    }

    thisActuals = x;

    let columns = thisBids.map((bid, playerIndex) => {
      let actual = thisActuals[playerIndex];
      let diff = Math.abs(bid - actual);
      let score = diff === 0 ? bid * 10 + 20 : diff * -10;
      runningTotal[playerIndex] += score;
      return [runningTotal[playerIndex], bid, actual];
    });

    rows.push(columns);
  });

  return rows;
};

const PlayerHead = ({ children }: { children: ComponentChildren }) => (
  <th scope={"col"} colSpan={3}>
    {children}
  </th>
);

const PlayerCells = ([score, bid, actual]: number[]) => {
  const backgroundColor = bid === actual ? "#90EE90" : "#F08080";
  return (
    <>
      <td style={{ backgroundColor }}>{score}</td>
      <td>{bid}</td>
      <td>{actual}</td>
    </>
  );
};

const PlayerRow = ({ columns }: { columns: number[][] }) => (
  <tr>{columns.map(PlayerCells)}</tr>
);

type ScoreTableProps = {
  avatars: string[];
  scores: number[][];
  playerIndex?: number;
};

export const ScoreTable = ({
  avatars,
  scores,
  playerIndex = 0,
}: ScoreTableProps) => {
  avatars = rotateArray(avatars, -playerIndex);
  let table = convert(scores.map((row) => rotateArray(row, -playerIndex)));

  return (
    //@ts-ignore
    <table border={"1"} style={{ backgroundColor: "#fff", color: "black" }}>
      <tr>
        {avatars.map((icon) => (
          <PlayerHead>{icon}</PlayerHead>
        ))}
      </tr>
      {table.map((columns) => (
        <PlayerRow columns={columns} />
      ))}
    </table>
  );
};
