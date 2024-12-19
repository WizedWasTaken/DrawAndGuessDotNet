type GameStateManagerType = {
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;

  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;

  elements: [];
  setElements: React.Dispatch<React.SetStateAction<[]>>;

  strokeWidth: number;
  setStrokeWidth: React.Dispatch<React.SetStateAction<number>>;

  history: [];
  setHistory: React.Dispatch<React.SetStateAction<[]>>;

  fill: boolean;
  setFill: React.Dispatch<React.SetStateAction<boolean>>;

  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  ctxRef: React.RefObject<CanvasRenderingContext2D | null>;
};

export type { GameStateManagerType };
