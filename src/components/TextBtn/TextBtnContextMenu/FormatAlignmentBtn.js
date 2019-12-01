import React, {useState} from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import style from './style.module.css';
import useTool from '../../../utils/useContextTool';

export default function FormatAlignmentBtn(props) {
  const [textAlign, setTextAlign] = useState(props.textAlign);

  useTool({
    property: 'textAlign',
    value: textAlign,
    onChange: props.onChange
  })

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
