import React, {useState, useContext} from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import {useCanvas, CanvasContext} from '../../../utils/useCanvas';
import style from './style.module.css';

export default function FormatAlignmentBtn(props) {
  const { canvas } = useContext(CanvasContext);
  const [textAlign, setTextAlign] = useState(props.textAlign);

  useCanvas(() => {
    const activeObject = canvas.getActiveObject();
    props.onChange(textAlign)
    if (activeObject) {
      canvas.getActiveObject().set('textAlign', textAlign)
      canvas.renderAll();
    }
  }, [textAlign])

  return (
    <>
      <div className={textAlign === 'left' ? style.btnActive : style.btn}>
        <FormatAlignLeftIcon onClick={() => setTextAlign('left')} />
      </div>
      <div className={textAlign === 'center' ? style.btnActive : style.btn}>
        <FormatAlignCenterIcon onClick={() => setTextAlign('center')} />
      </div>
      <div className={textAlign === 'right' ? style.btnActive : style.btn}>
        <FormatAlignRightIcon onClick={() => setTextAlign('right')} />
      </div>
    </>
  );
}
