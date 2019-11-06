import { useContext, useEffect } from 'react';
import CanvasContext from './CanvasContext';

export default function useCanvas(callback, deps) {
  const { canvas } = useContext(CanvasContext);
  useEffect(() => {
    if (canvas) {
      return callback();
    }
  }, deps);
}
