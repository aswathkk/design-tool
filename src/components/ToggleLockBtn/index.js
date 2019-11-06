import React, { useState, useContext } from 'react';

import { CanvasContext, useCanvas } from '../../utils/useCanvas';
import useCanvasEvent from '../../utils/useCanvasEvent';

const ToggleLockBtn = (props) => {
  const { canvas } = useContext(CanvasContext);
  const [ isLocked, setLock ] = useState(false);

  useCanvas(() => {
    const obj = canvas.getActiveObject();
    if (obj) {
      console.log('updating lock for obj')
      obj.lockMovementY = isLocked;
      obj.lockMovementX = isLocked;
      obj.lockRotation = isLocked;
      obj.lockScalingX = isLocked;
      obj.lockScalingY = isLocked;
      obj.lockSkewingX = isLocked;
      obj.lockSkewingY = isLocked;
      obj.isLocked = isLocked;
    }
  }, [isLocked]);

  useCanvasEvent('selection:created', () => {
    setLock(canvas.getActiveObject().isLocked);
  }, [canvas]);

  useCanvasEvent('selection:updated', () => {
    setLock(canvas.getActiveObject().isLocked);
  }, [canvas]);

  const lockActiveObject = () => {
    if (canvas.getActiveObject()) {
      setLock(isLocked => !isLocked)
    } 
  }

  return (
    <button onClick={lockActiveObject}>
      {isLocked ? 'unlock' : 'lock'}
    </button>
  );
}

export default ToggleLockBtn;
