import require$$0, { useState, useRef, useEffect } from "react";
var Handle$1 = /* @__PURE__ */ (() => ".handle{position:absolute;border-radius:50%;z-index:3}\n")();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  g !== void 0 && (e = "" + g);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Handle = ({
  idx,
  updateHandles,
  draggable,
  cropCanvasRef,
  x,
  y,
  radius,
  color
}) => {
  const [center, setCenter] = useState({
    x: x - radius / 2,
    y: y - radius / 2
  });
  const calculateNewHandlePosition = (e) => {
    var _a;
    const rect = (_a = cropCanvasRef == null ? void 0 : cropCanvasRef.current) == null ? void 0 : _a.getBoundingClientRect();
    let newX = e.clientX;
    let newY = e.clientY;
    if (rect) {
      newX -= rect.left;
      newY -= rect.top;
    }
    updateHandles(idx, newX, newY);
    setCenter({
      x: newX - radius / 2,
      y: newY - radius / 2
    });
  };
  const handleDrag = (e) => {
    e.preventDefault();
    calculateNewHandlePosition(e);
  };
  const handleDragEnd = (e) => {
    e.preventDefault();
    calculateNewHandlePosition(e);
  };
  return /* @__PURE__ */ jsx("div", {
    draggable: `${draggable}`,
    onDrag: handleDrag,
    onDragStart: (e) => !draggable && e.preventDefault(),
    onDragEnd: handleDragEnd,
    className: "handle",
    style: {
      top: center.y,
      left: center.x,
      width: radius,
      height: radius,
      backgroundColor: color
    }
  });
};
var Canvas$1 = /* @__PURE__ */ (() => ".react-polygon-bounding-box{position:relative}.react-polygon-image-canvas{position:absolute;top:0;left:0;z-index:1}.react-polygon-crop-canvas{position:absolute;top:0;left:0;z-index:2}.react-polygon-final-canvas{position:absolute;top:0;left:0;z-index:1}\n")();
function drawLine(handles, idx, ctx) {
  ctx.beginPath();
  ctx.moveTo(handles[idx].x, handles[idx].y);
  if (idx === handles.length - 1) {
    ctx.lineTo(handles[0].x, handles[0].y);
  } else {
    ctx.lineTo(handles[idx + 1].x, handles[idx + 1].y);
  }
  ctx.stroke();
}
function checkProximity(handles, handle, proximity) {
  const near = handles.filter((pos) => Math.abs(pos.x - handle.x) < proximity && Math.abs(pos.y - handle.y) < proximity);
  if (near.length > 0)
    return true;
  return false;
}
function cropImage(imageCanvasRef, cropCanvasRef, handles) {
  if (cropCanvasRef.current && imageCanvasRef.current) {
    const imageCtx = imageCanvasRef.current.getContext("2d");
    const ctx = cropCanvasRef.current.getContext("2d");
    if (ctx && imageCtx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.save();
      ctx.beginPath();
      handles.forEach((_, idx) => {
        if (idx === handles.length - 1) {
          ctx.lineTo(handles[0].x, handles[0].y);
        } else {
          ctx.lineTo(handles[idx + 1].x, handles[idx + 1].y);
        }
      });
      ctx.clip();
      ctx.drawImage(imageCtx.canvas, 0, 0, imageCtx.canvas.width, imageCtx.canvas.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
    }
  }
}
function redrawCropped(handles, cropCanvasRef, finalCanvasRef) {
  if (finalCanvasRef.current && cropCanvasRef.current) {
    const maxWidth = Math.max.apply(null, handles.map((pos) => pos.x));
    const minWidth = Math.min.apply(null, handles.map((pos) => pos.x));
    const maxHeight = Math.max.apply(null, handles.map((pos) => pos.y));
    const minHeight = Math.min.apply(null, handles.map((pos) => pos.y));
    const finalWidth = maxWidth - minWidth;
    const finalHeight = maxHeight - minHeight;
    const finalCanvas = finalCanvasRef.current;
    const cropCanvas = cropCanvasRef.current;
    finalCanvas.width = finalWidth;
    finalCanvas.height = finalHeight;
    const finalCtx = finalCanvas.getContext("2d");
    finalCtx == null ? void 0 : finalCtx.drawImage(cropCanvas, minWidth, minHeight, finalWidth, finalHeight, 0, 0, finalWidth, finalHeight);
    clearCanvas(cropCanvasRef);
  }
}
function clearCanvas(canvasRef) {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext("2d");
    ctx == null ? void 0 : ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
const Canvas = ({
  width,
  height,
  source,
  radius,
  color,
  draggable = true,
  proximity,
  cropEvent,
  resetEvent,
  rescaleEvent,
  saveProps,
  styles,
  customCallback
}) => {
  const imageCanvasRef = useRef(null);
  const cropCanvasRef = useRef(null);
  const finalCanvasRef = useRef(null);
  const [handles, setHandles] = useState([]);
  const [cropped, setCropped] = useState(false);
  const [scaled, setScaled] = useState(false);
  useEffect(() => {
    if (customCallback) {
      customCallback(imageCanvasRef, cropCanvasRef, finalCanvasRef);
    }
  }, []);
  useEffect(() => {
    const handleCrop = () => {
      cropImage(imageCanvasRef, cropCanvasRef, handles);
      setCropped(true);
    };
    const cropRef = cropEvent == null ? void 0 : cropEvent.elementRef;
    if (cropRef && cropRef.current) {
      cropRef.current.addEventListener("click", handleCrop);
    }
    return () => {
      var _a;
      return (_a = cropRef == null ? void 0 : cropRef.current) == null ? void 0 : _a.removeEventListener("click", handleCrop);
    };
  }, [cropEvent, handles]);
  useEffect(() => {
    const handleReset = () => {
      clearCanvas(cropCanvasRef);
      clearCanvas(finalCanvasRef);
      setHandles([]);
      setCropped(false);
      setScaled(false);
    };
    const resetRef = resetEvent == null ? void 0 : resetEvent.elementRef;
    if (resetRef && resetRef.current) {
      resetRef.current.addEventListener("click", handleReset);
    }
    return () => {
      var _a;
      return (_a = resetRef == null ? void 0 : resetRef.current) == null ? void 0 : _a.removeEventListener("click", handleReset);
    };
  }, [resetEvent]);
  useEffect(() => {
    const handleScale = () => {
      if (!scaled) {
        redrawCropped(handles, cropCanvasRef, finalCanvasRef);
        setHandles([]);
        setScaled(true);
      }
    };
    const rescaleRef = rescaleEvent == null ? void 0 : rescaleEvent.elementRef;
    if (rescaleRef && rescaleRef.current) {
      rescaleRef.current.addEventListener("click", handleScale);
    }
    return () => {
      var _a;
      return (_a = rescaleRef == null ? void 0 : rescaleRef.current) == null ? void 0 : _a.removeEventListener("click", handleScale);
    };
  }, [rescaleEvent, handles, scaled]);
  useEffect(() => {
    if (saveProps) {
      const saveRef = saveProps.saveRef;
      const handleSave = () => {
        var _a;
        const imageUrl = (_a = finalCanvasRef.current) == null ? void 0 : _a.toDataURL("image/png");
        if (imageUrl) {
          saveProps.saveCallback(imageUrl);
        }
      };
      if (saveRef && saveRef.current) {
        saveRef.current.addEventListener("click", handleSave);
      }
      return () => {
        var _a;
        return (_a = saveRef == null ? void 0 : saveRef.current) == null ? void 0 : _a.removeEventListener("click", handleSave);
      };
    }
  }, [saveProps]);
  useEffect(() => {
    const canvas = imageCanvasRef.current;
    if (canvas) {
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      const context = canvas.getContext("2d");
      if (context) {
        const image = new Image();
        image.onload = function() {
          context.imageSmoothingEnabled = false;
          context.drawImage(image, 0, 0, image.width * window.devicePixelRatio, image.height * window.devicePixelRatio, 0, 0, canvas.width, canvas.height);
        };
        image.src = source;
      }
    }
    const handleCanvas = cropCanvasRef.current;
    if (handleCanvas) {
      handleCanvas.width = width;
      handleCanvas.height = height;
    }
  }, [source]);
  useEffect(() => {
    const cropCanvas = cropCanvasRef.current;
    if (cropCanvas) {
      const cropContext = cropCanvas.getContext("2d");
      if (cropped) {
        cropImage(imageCanvasRef, cropCanvasRef, handles);
      } else {
        cropContext == null ? void 0 : cropContext.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
        handles.forEach((_, idx) => drawLine(handles, idx, cropContext));
      }
    }
  }, [handles, cropped]);
  const handleClick = (e) => {
    e.preventDefault();
    const cropCanvas = cropCanvasRef.current;
    if (cropCanvas) {
      const rect = cropCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!checkProximity(handles, {
        x,
        y
      }, proximity || 0) && !cropped) {
        setHandles((prev) => [...prev, {
          x,
          y,
          radius,
          color
        }]);
      }
    }
  };
  const updateHandles = (idx, x, y) => {
    const handlesCopy = Array.from(handles);
    handlesCopy[idx] = {
      ...handlesCopy[idx],
      x,
      y
    };
    setHandles(handlesCopy);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "react-polygon-bounding-box",
    style: {
      height,
      width,
      ...styles
    },
    children: [/* @__PURE__ */ jsx("canvas", {
      style: {
        height,
        width
      },
      className: "react-polygon-image-canvas",
      hidden: cropped,
      ref: imageCanvasRef
    }), /* @__PURE__ */ jsx("canvas", {
      style: {
        height,
        width
      },
      className: "react-polygon-crop-canvas",
      ref: cropCanvasRef,
      onClick: handleClick
    }), /* @__PURE__ */ jsx("canvas", {
      className: "react-polygon-final-canvas",
      ref: finalCanvasRef
    }), handles.map((handle, idx) => /* @__PURE__ */ jsx(Handle, {
      idx,
      ...handle,
      updateHandles,
      draggable,
      cropCanvasRef
    }, idx))]
  });
};
export { Canvas };
