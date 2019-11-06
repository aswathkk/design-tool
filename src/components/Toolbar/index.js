import React, { useContext, useState } from 'react';
import { fabric } from 'fabric';

import style from './toolbar.module.css';
import { CanvasContext, useCanvas } from '../../utils/useCanvas';

const Toolbar = props => {
  const { canvas } = useContext(CanvasContext);

  useCanvas(() => {
    console.log('Loaded canvas', canvas)
    const text = new fabric.IText('shit happens!', { left: 100, top: 100 });
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
    });
    canvas.add(rect);
    canvas.add(text); 
  }, [canvas]);

  return (
    <div className={style.root}>
    </div>
  )
}

export default Toolbar;
