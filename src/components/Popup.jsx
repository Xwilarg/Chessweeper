import { useBoardContext } from "./BoardWrapper";

export const Popup = () => {
  const { ctx } = useBoardContext();

  if (!ctx.gameover) return null;

  let text;
  if (ctx.gameover.error) {
    text = ctx.gameover.error;
  } else {
    text = ctx.gameover.isWin ? 'You won' : 'You lost';
  }

  const reload = () => {
    console.log('todo: reload');
  }

  return (
    <div id="popup">
      <h3 id="popup-content">{text}</h3>
      <button id="popup-reload" className="button" onClick={reload}>
        Replay
      </button>
    </div>
  );
};