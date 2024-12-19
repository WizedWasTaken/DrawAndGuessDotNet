import { createContext, useRef, useState } from "react";
import { GameStateManagerType } from "@/app/game/[gameId]/Types/GameStateManagerType";

const StateContext = createContext({} as GameStateManagerType);

interface GameStateProviderProps {
    children: React.ReactNode;
}

export const GameStateProvider: React.FC<GameStateProviderProps> = ({
    children,
}) => {
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("#000000");
    const [elements, setElements] = useState([]);
    const [strokeWidth, setStrokeWidth] = useState(1);
    const [history, setHistory] = useState([]);
    const [fill, setFill] = useState(false);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    <StateContext.Provider
        value={{
            tool,
            setTool,
            color,
            setColor,
            elements,
            setElements,
            strokeWidth,
            setStrokeWidth,
            history,
            setHistory,
            fill,
            setFill,
            canvasRef,
            ctxRef,
        }}
    >
        {children}
    </StateContext.Provider>
};
