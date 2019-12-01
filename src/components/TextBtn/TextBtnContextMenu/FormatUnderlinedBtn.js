import React, {useState} from 'react';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';

import useTool from '../../../utils/useContextTool';
import style from './style.module.css';

export default function FormatUnerlinedBtn(props) {
  const [underline, setUnderline] = useState(props.underline);

  useTool({
    property: 'underline',
    value: underline,
    onChange: props.onChange
  })

  return (
    <div className={underline ? style.btnActive : style.btn}>
      <FormatUnderlinedIcon onClick={() => {setUnderline(underline => !underline)}} />
    </div>
  );
}
