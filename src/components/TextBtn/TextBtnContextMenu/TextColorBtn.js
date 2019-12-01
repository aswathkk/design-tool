import React, {useState} from 'react';
import { SketchPicker } from 'react-color';

import useTool from '../../../utils/useContextTool';
import style from './style.module.css';

export default function TextColorBtn({color, onChange}) {
  const [isSelected, setIsSelected] = useState(false);
  const [fill, setFill] = useState(color);

  useTool({
    property: 'fill',
    value: fill,
    onChange: onChange
  })

  const changeColor = color => {
    const {r, g, b, a} = color.rgb;
    setFill(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  return (
    <div className={style.btn}>
      <svg onClick={() => setIsSelected(isSelected => !isSelected)} className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
        <path style={{ fill: fill }} d="M0 20h24v4H0z"></path>
        <path style={{ fill: '#000' }} d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"></path>
      </svg>
      { isSelected &&
      <div style={{ position: 'absolute', top: '55px', zIndex: 10 }}>
        <SketchPicker
          color={fill}
          onChangeComplete={changeColor}
        />
      </div>
      }
    </div>
  );
}
