import React, { useState } from 'react';
import { CanvasContext } from '../useCanvas/';

const CanvasProvider = props => {
  const [canvas, setCanvas] = useState(null);

  const canvasProperties = {
    canvas,
    setCanvas: canvas => {
      setCanvas(canvas);
    }
  };

  return (
    <CanvasContext.Provider value={canvasProperties}>
      {props.children}
    </CanvasContext.Provider>
  );
}

export default CanvasProvider;
