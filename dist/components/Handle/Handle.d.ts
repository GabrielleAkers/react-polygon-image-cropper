import React from 'react';
export interface HandleProps {
    x: number;
    y: number;
    radius: number;
    color: string;
}
interface ComponentProps extends HandleProps {
    idx: number;
    updateHandles: (idx: number, x: number, y: number) => void;
    draggable: boolean;
    cropCanvasRef: React.RefObject<HTMLCanvasElement>;
}
export declare const Handle: ({ idx, updateHandles, draggable, cropCanvasRef, x, y, radius, color, }: ComponentProps) => JSX.Element;
export {};
