import moveMatrixElements from "./moveMatrixElements";

const listeners:Record<number, string> = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

export default function createListeners(context: CanvasRenderingContext2D) {
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    moveMatrixElements(listeners[(event as KeyboardEvent).keyCode], context);
  });
}