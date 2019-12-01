import React, {useState} from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';

import useTool from '../../../utils/useContextTool';
import style from './style.module.css';

export default function FormatBoldBtn(props) {
  const [fontWeight, setFontWeight] = useState(props.fontWeight);

  useTool({
    property: 'fontWeight',
    value: fontWeight,
    onChange: props.onChange
  })

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
