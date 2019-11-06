import React, { useEffect, useContext, useRef } from 'react';
import { fabric } from 'fabric';

import toggleLock from './utils/toggleLock';
import styles from './canvas.module.css';
import { CanvasContext } from '../../utils/useCanvas';

toggleLock(fabric);

const Canvas = (props) => {
  const myCanvas = useRef();
  const { setCanvas } = useContext(CanvasContext);

  useEffect(() => {
    console.log('Canvas didMount');
    const canvas = new fabric.Canvas(myCanvas.current);
    setCanvas(canvas);
    window.canvas = canvas;
  }, []);

  return(
    <div className={styles.root}>
      <canvas
        width={props.width}
        height={props.height}
        ref={myCanvas}
        id="my-canvas"
      />
    </div>
  );
}

export default Canvas;
