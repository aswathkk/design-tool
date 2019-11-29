import React, {useState, useContext} from 'react';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';

import {useCanvas, CanvasContext} from '../../../utils/useCanvas';
import style from './style.module.css';

export default function FormatUnerlinedBtn(props) {
  const { canvas } = useContext(CanvasContext);
  const [underline, setUnderline] = useState(props.underline);

  useCanvas(() => {
    const activeObject = canvas.getActiveObject();
    props.onChange(underline)
    if (activeObject) {
      canvas.getActiveObject().set('underline', underline)
      canvas.renderAll();
    }
  }, [underline])

  return (
    <div className={underline ? style.btnActive : style.btn}>
      <FormatUnderlinedIcon onClick={() => {setUnderline(underline => !underline)}} />
    </div>
  );
}
