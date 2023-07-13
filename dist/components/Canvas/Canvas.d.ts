import React from 'react';
declare type CustomCallbackProps = (imageCanvasRef: React.RefObject<HTMLCanvasElement>, cropCanvasRef: React.RefObject<HTMLCanvasElement>, finalCanvasRef: React.RefObject<HTMLCanvasElement>) => unknown;
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
}
declare const Canvas: ({ width, height, source, radius, color, draggable, proximity, cropEvent, resetEvent, rescaleEvent, saveProps, styles, customCallback, }: CanvasProps) => JSX.Element;
export default Canvas;
