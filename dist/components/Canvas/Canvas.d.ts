import React from 'react';
import { HandleProps } from '../Handle/Handle';
declare type CustomCallbackProps = (imageCanvasRef: React.RefObject<HTMLCanvasElement>, cropCanvasRef: React.RefObject<HTMLCanvasElement>, finalCanvasRef: React.RefObject<HTMLCanvasElement>) => unknown;
declare type UpdateHandlesCallbackProps = (handles: Array<HandleProps>) => unknown;
interface EventListenerProps {
    elementRef: React.RefObject<HTMLElement>;
    eventType: string;
}
interface SaveProps {
    saveRef: React.RefObject<HTMLElement>;
    saveCallback: (imageUrl: string) => any;
}
interface CanvasProps {
    width: number;
    height: number;
    source: string;
    radius: number;
    color: string;
    draggable?: boolean;
    proximity?: number;
    cropEvent?: EventListenerProps;
    resetEvent?: EventListenerProps;
    rescaleEvent?: EventListenerProps;
    saveProps?: SaveProps;
    styles?: React.CSSProperties;
    customCallback?: CustomCallbackProps;
    updateHandlesCallback?: UpdateHandlesCallbackProps;
}
declare const Canvas: ({ width, height, source, radius, color, draggable, proximity, cropEvent, resetEvent, rescaleEvent, saveProps, styles, customCallback, updateHandlesCallback, }: CanvasProps) => JSX.Element;
export default Canvas;
