import React, { useState, useContext } from 'react';
import { CanvasContext, useCanvas } from '../../utils/useCanvas';
import useCanvasEvent from '../../utils/useCanvasEvent';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';

const UndoBtn = () => {
  const { canvas } = useContext(CanvasContext);
  const [history, setHistory] = useState([]);

  useCanvas(() => {
    setHistory([canvas.toDatalessJSON()]);
  }, [canvas])

  const saveHistory = () => {
    setHistory(history => [...history, canvas.toDatalessJSON()]);
  }

  useCanvasEvent('object:added', saveHistory, [canvas])
  useCanvasEvent('object:modified', saveHistory, [canvas])
  useCanvasEvent('object:removed', saveHistory, [canvas])

  const undo = () => {
    if(history.length > 1) {
      canvas.loadFromJSON(history[history.length - 2]).renderAll()
      setHistory(history => history.slice(0, -1))
    }
  }

  return (
    <div style={{ padding: '7px', cursor: history.length > 1 ? 'pointer' : 'not-allowed' }} onClick={undo}>
      <ReplayOutlinedIcon />
    </div>
  );
}

export default UndoBtn;
