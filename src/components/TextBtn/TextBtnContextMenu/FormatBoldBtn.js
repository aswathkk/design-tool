import React, {useState, useContext} from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';

import {useCanvas, CanvasContext} from '../../../utils/useCanvas';
import style from './style.module.css';

export default function FormatBoldBtn(props) {
  const { canvas } = useContext(CanvasContext);
  const [fontWeight, setFontWeight] = useState(props.fontWeight);

  useCanvas(() => {
    const activeObject = canvas.getActiveObject();
    props.onChange(fontWeight)
    if (activeObject) {
      canvas.getActiveObject().set('fontWeight', fontWeight)
      canvas.renderAll();
    }
  }, [fontWeight])

  return (
    <div className={fontWeight === 'bold' ? style.btnActive : style.btn}>
      <FormatBoldIcon onClick={() => {
        setFontWeight(fontWeight => {
          if(fontWeight === 'bold')
            return 'normal'
          return 'bold'
        })
      }} />
    </div>
  );
}
