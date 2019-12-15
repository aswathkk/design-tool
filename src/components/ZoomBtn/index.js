import React, { useState, useContext } from 'react';
import { CanvasContext, useCanvas } from '../../utils/useCanvas';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import style from './style.module.css';

const ZoomBtn = () => {
  const { canvas } = useContext(CanvasContext);
  const [ width, setWidth ] = useState(0)
  const [ height, setHeight ] = useState(0)
  const [ zoom, setZoom ] = useState(1);

  useCanvas(() => {
    setWidth(canvas.width);
    setHeight(canvas.height);
  }, [canvas])

  useCanvas(() => {
    canvas.setWidth(width * zoom)
    canvas.setHeight(height * zoom)
    canvas.setZoom(zoom)
  }, [zoom])

  return (
    <div className={style.root}>
      <div className={style.zoomStatus}>
        {Math.round(zoom * 100)}%
      </div>
      <div
        style={{ padding: '7px', cursor: 'pointer' }}
        onClick={() => { setZoom(zoom => zoom + .1) }}
      >
        <ZoomInIcon />
      </div>
      <div
        style={{ padding: '7px', cursor: 'pointer' }}
        onClick={() => { setZoom(zoom => zoom - .1) }}
      >
        <ZoomOutIcon />
      </div>
    </div>
  );
}

export default ZoomBtn;
