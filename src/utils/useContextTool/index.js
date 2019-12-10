import {useContext} from 'react';

import {useCanvas, CanvasContext} from '../useCanvas';

export default function useTool({property, value, onChange}) {
  const { canvas } = useContext(CanvasContext);
  useCanvas(() => {
    const activeObject = canvas.getActiveObject();
    if (typeof(onChange) === 'function')
      onChange(value)
    if (activeObject) {
      canvas.getActiveObject().set(property, value)
      canvas.renderAll();
    }
  }, [value])
}
