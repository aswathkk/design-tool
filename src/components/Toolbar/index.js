import React, { useContext, useState } from 'react';
import { fabric } from 'fabric';

import style from './toolbar.module.css';
import { CanvasContext, useCanvas } from '../../utils/useCanvas';

const Toolbar = props => {
  const { canvas } = useContext(CanvasContext);

  useCanvas(() => {
    console.log('Loaded canvas', canvas)
    const rect1 = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 100,
      height: 100,
    });
    const rect2 = new fabric.Rect({
      left: 125,
      top: 75,
      fill: 'green',
      width: 100,
      height: 100,
    });
    const rect3 = new fabric.Rect({
      left: 150,
      top: 150,
      fill: 'blue',
      width: 100,
      height: 100,
    });
    canvas.add(rect1);
    canvas.add(rect2);
    canvas.add(rect3);
  }, [canvas]);

  return (
    <div className={style.root}>
    </div>
  )
}

export default Toolbar;
