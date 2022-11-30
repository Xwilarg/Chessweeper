import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Footer = (): JSX.Element => {
  const [dailyPuzzleSeed, setDailyPuzzleSeed] = useState<string | undefined>();

  useEffect(() => {
    async function updateDailyPuzzle() {
      const url =
        window.location.hostname === "localhost"
          ? "http://localhost:5170/api/daily.php"
          : "../../api/daily.php";
      const resp = await fetch(url);
      if (resp.ok) {
        const text = await resp.text();
        if (text.length > 50) {
          // Somehow launching this in local environment returns index.html?
          console.error("Failed to fetch daily puzzle");
        } else {
          setDailyPuzzleSeed(text);
        }
      } else {
        console.error("Failed to fetch daily puzzle");
      }
    }

    updateDailyPuzzle();
  }, [setDailyPuzzleSeed]);

  return (
    <div>
      <h1>More boards</h1>
      <h2>Classic</h2>
      <p>Dig and try to find where the pieces are</p>
      <div className="flex hor">
        <Link className="gamemode button" to="?g=c&p=R2&s=6&c=2">
          <h2>Easy</h2>
          2 pieces
          <br />
          Rook only
          <br />
          6x6
        </Link>
        <br />
        <Link className="gamemode button" to="?g=c&p=R2B2Q1N2&s=8&c=3">
          <h2>Normal</h2>
          3 pieces
          <br />
          Rook, Bishop, Queen and Knight
          <br />
          8x8
        </Link>
        <br />
        <Link className="gamemode button" to="?g=c&p=R2B2Q1N2K1P2&s=10&c=5">
          <h2>Hard</h2>
          5 pieces
          <br />
          All pieces
          <br />
          10x10
        </Link>
        <br />
        <Link className="gamemode button" to="?g=c&p=R2B2Q1N2K1P2&s=10&c=8">
          <h2>Extreme</h2>
          8 pieces
          <br />
          All pieces
          <br />
          10x10
        </Link>
      </div>
      <h2>Variant</h2>
      <p>classic mode with pieces that are normally not in chess</p>
      <div className="flex hor">
        <Link className="gamemode button" to="?g=c&p=R3N3O3&s=10&c=5">
          <h2>Knook</h2>
          5 pieces
          <br />
          Knight, Rook and Knook
          <br />
          10x10
        </Link>
        <Link
          className="gamemode button"
          to="?g=c&p=飛2角2桂2歩2玉2香2銀2金2&s=10&c=5"
        >
          <h2>Shogi</h2>
          5 pieces
          <br />
          Shogi pieces, facing up
          <br />
          10x10
        </Link>
        <Link className="gamemode button" to="?g=c&p=R2B2Q1N2K1P2D2&s=10&c=8">
          <h2>Black Pawn</h2>
          8 pieces
          <br />
          All pieces + Black Pawn
          <br />
          10x10
        </Link>
      </div>
      <h2>Puzzle</h2>
      <p>You must find where the pieces are without being allowed to dig</p>
      <div className="flex hor">
        {dailyPuzzleSeed && (
          <Link
            className="gamemode button"
            to={`?g=p&p=R3B3N3K1&s=10&c=8&r=${dailyPuzzleSeed}`}
            id="daily"
          >
            <h2>Daily</h2>
            8 pieces
            <br />
            Rook, Bishop, Knight and King
            <br />
            10x10
          </Link>
        )}
        <Link className="gamemode button" to="?g=p&p=R2&s=6&c=2&d=20">
          <h2>Easy</h2>
          2 pieces
          <br />
          Rook only
          <br />
          6x6
        </Link>
        <br />
        <Link className="gamemode button" to="?g=p&p=R2B2N2&s=8&c=3&d=30">
          <h2>Normal</h2>
          3 pieces
          <br />
          Rook, Bishop and Knight
          <br />
          8x8
        </Link>
        <br />
        <Link className="gamemode button" to="?g=p&p=R3B3N3K1&s=10&c=8&d=50">
          <h2>Hard</h2>
          8 pieces
          <br />
          Rook, Bishop, Knight and King
          <br />
          10x10
        </Link>
        <Link className="gamemode button" to="?g=p&p=R4B4N4K1&s=12&c=12&d=60">
          <h2>Extreme</h2>
          12 pieces
          <br />
          Rook, Bishop, Knight and King
          <br />
          12x12
        </Link>
        <Link className="gamemode button" to="?g=p&p=飛2角2玉2銀2金2&s=8&c=5">
          <h2>Shogi</h2>
          5 pieces
          <br />
          Most shogi pieces, facing up
          <br />
          8x8
        </Link>
      </div>
      <hr />
      <div id="rules">
        <h1>How to play?</h1>
        <h2>Basic Rules</h2>
        <p>
          The goal is to find where and what the 3 chess pieces are
          <br />
          The shovel allow you to dig a tile, you&apos;ll see a number
          representing the number of pieces that have it in check
          <br />
          Once you identified a piece, click on the related button under the
          board then click on the tile, click again to remove it
          <br />
          You loose if you use your shover on a chess piece, you win if you find
          the 3 pieces correctly
          <br />
          All kind of pieces can appear many times, except the king that can
          appear only 1 time maximum
          <br />
          <br />
          For more information on how the pieces move, please click{" "}
          <a
            href="https://en.wikipedia.org/wiki/Chess#Movement"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </p>
        <h2>Special pieces</h2>
        <p>
          Knook: Have the same moves as a knight and a rook
          <br />
          Shogi pieces:{" "}
          <a
            href="https://en.wikipedia.org/wiki/Shogi#Movement"
            target="_blank"
            rel="noreferrer"
          >
            Wikipedia
          </a>
        </p>
        <h2>Other Links</h2>
        <p>
          Source code available under MIT license on{" "}
          <a
            href="https://github.com/Xwilarg/Chessweeper"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <br />A Discord server is available here:{" "}
          <a
            href="https://discord.gg/VjJ95N2mV9"
            target="_blank"
            rel="noreferrer"
          >
            https://discord.gg/VjJ95N2mV9
          </a>
        </p>
      </div>
    </div>
  );
};
