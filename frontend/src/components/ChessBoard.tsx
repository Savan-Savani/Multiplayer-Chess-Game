import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({
  board,
  socket,
  setBoard,
  chess,
}: {
  setBoard: any;
  chess: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<Square | null>(null);
  return (
    <div className="text-white-200 ">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
              "" +
              (8 - i)) as Square;
            return (
              <div
                onClick={() => {
                  if (!from) {
                    setFrom(squareRepresentation);
                  } else {
                    // setTo(square?.square ?? null);
                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: { from: from, to: squareRepresentation },
                      })
                    );
                    setFrom(null);
                    chess.move({ from: from, to: squareRepresentation });
                    setBoard(chess.board());
                  }
                }}
                key={j}
                className={`w-16 h-16 ${
                  (i + j) % 2 === 0 ? "bg-gray-400" : "bg-gray-200"
                }`}
              >
                <div className="w-full justify-center flex h-full">
                  <div className="h-full justify-center flex flex-col">
                    {square ? (
                      <img
                        className="w-14"
                        src={`/${
                          square?.color === "b"
                            ? `b${square.type}`
                            : `w${square.type}`
                        }.png`}
                      />
                    ) : null}{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
