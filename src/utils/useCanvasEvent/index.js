import { useContext } from 'react';

import { CanvasContext, useCanvas } from '../useCanvas';

export default function useCanvasEvent(event, eventHandler, deps) {
  const { canvas } = useContext(CanvasContext);

  useCanvas(() => {
    canvas.on(event, eventHandler);
    return () => {
      canvas.off(event, eventHandler)
    }
  }, deps);
}
