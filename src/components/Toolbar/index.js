import React, { useContext, useState } from 'react';
import { fabric } from 'fabric';

import style from './toolbar.module.css';
import { CanvasContext, useCanvas } from '../../utils/useCanvas';
import TextBtn from '../TextBtn';

const Toolbar = props => {
  const { canvas } = useContext(CanvasContext);
  const [ contextMenu, setContextMenu ] = useState(null);

  useCanvas(() => {
    const rect1 = new fabric.IText('RED', {
      left: 100,
      top: 100,
      fill: '#f00',
    });
    const rect2 = new fabric.IText('GREEN',{
      left: 125,
      top: 75,
      fill: '#0f0',
    });
    const rect3 = new fabric.IText('BLUE', {
      left: 150,
      top: 150,
      fill: '#00f',
    });
    canvas.add(rect1);
    canvas.add(rect2);
    canvas.add(rect3);
  }, [canvas]);

  return (
    <div className={style.root}>
      <div>
        <TextBtn setContextMenu={setContextMenu} />
      </div>
      <div style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
        {contextMenu}
      </div>
    </div>
  )
}

export default Toolbar;
