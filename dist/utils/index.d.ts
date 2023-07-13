import { HandleProps } from '../components/Handle/Handle';
export declare function drawLine(handles: Array<HandleProps>, idx: number, ctx: any): void;
export declare function checkProximity(handles: Array<HandleProps>, handle: {
    x: number;
    y: number;
}, proximity: number): boolean;
export declare function cropImage(imageCanvasRef: React.RefObject<HTMLCanvasElement>, cropCanvasRef: React.RefObject<HTMLCanvasElement>, handles: Array<HandleProps>): void;
export declare function redrawCropped(handles: Array<HandleProps>, cropCanvasRef: React.RefObject<HTMLCanvasElement>, finalCanvasRef: React.RefObject<HTMLCanvasElement>): void;
export declare function clearCanvas(canvasRef: React.RefObject<HTMLCanvasElement>): void;
