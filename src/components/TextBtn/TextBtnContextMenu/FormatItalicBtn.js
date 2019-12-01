import React, {useState} from 'react';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';

import useTool from '../../../utils/useContextTool';
import style from './style.module.css';

export default function FormatItalicBtn(props) {
  const [fontStyle, setFontStyle] = useState(props.fontStyle);

  useTool({
    property: 'fontStyle',
    value: fontStyle,
    onChange: props.onChange
  })

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
