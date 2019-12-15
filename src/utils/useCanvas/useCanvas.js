import { useContext, useEffect } from 'react';
import CanvasContext from './CanvasContext';

export default function useCanvas(callback, deps) {
  const { canvas } = useContext(CanvasContext);
  useEffect(() => {
    if (canvas) {
      return callback();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
