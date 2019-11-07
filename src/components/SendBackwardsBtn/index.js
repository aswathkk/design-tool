import React, { useContext } from 'react';
import { CanvasContext } from '../../utils/useCanvas';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

const SendBackwardsBtn = (props) => {
  const { canvas } = useContext(CanvasContext);

  const sendBackwards = () => {
    if (canvas.getActiveObject()) {
      canvas.sendBackwards(canvas.getActiveObject())
    } 
  }

  return (
    <div style={{ padding: '7px', cursor: 'pointer' }} onClick={sendBackwards}>
      <ArrowDownwardOutlinedIcon />
    </div>
  );
}

export default SendBackwardsBtn;
