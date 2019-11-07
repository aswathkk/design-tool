import React, { useContext } from 'react';
import { CanvasContext } from '../../utils/useCanvas';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';

const BringForwardBtn = (props) => {
  const { canvas } = useContext(CanvasContext);

  const bringForward = () => {
    if (canvas.getActiveObject()) {
      canvas.bringForward(canvas.getActiveObject())
    } 
  }

  return (
    <div style={{ padding: '7px', cursor: 'pointer' }} onClick={bringForward}>
      <ArrowUpwardOutlinedIcon />
    </div>
  );
}

export default BringForwardBtn;
