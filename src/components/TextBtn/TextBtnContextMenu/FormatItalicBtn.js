import React, {useState, useContext} from 'react';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';

import {useCanvas, CanvasContext} from '../../../utils/useCanvas';
import style from './style.module.css';

export default function FormatItalicBtn(props) {
  const { canvas } = useContext(CanvasContext);
  const [fontStyle, setFontStyle] = useState(props.fontStyle);

  useCanvas(() => {
    const activeObject = canvas.getActiveObject();
    props.onChange(fontStyle)
    if (activeObject) {
      canvas.getActiveObject().set('fontStyle', fontStyle)
      canvas.renderAll();
    }
  }, [fontStyle])

  return (
    <div className={fontStyle === 'italic' ? style.btnActive : style.btn}>
      <FormatItalicIcon onClick={() => {
        setFontStyle(fontStyle => {
          if(fontStyle === 'italic')
            return 'normal'
          return 'italic'
        })
      }} />
    </div>
  );
}
