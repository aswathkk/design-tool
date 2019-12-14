import React, {useState} from 'react';
import { SketchPicker } from 'react-color';

import useTool from '../../../utils/useContextTool';
import style from './style.module.css';

export default function BorderColorBtn({borderColor, onChange}) {
  const [isSelected, setIsSelected] = useState(false);
  const [color, setColor] = useState(borderColor);

  useTool({
    property: 'stroke',
    value: color,
    onChange: onChange
  })

  const changeColor = color => {
    const {r, g, b, a} = color.rgb;
    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  return (
    <div className={style.btn}>
      <svg onClick={() => setIsSelected(isSelected => !isSelected)} className="MuiSvgIcon-root jss774" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
        <path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29a.9959.9959 0 0 0-1.41 0L15 2.25 18.75 6l1.96-1.96z"></path>
        <path style={{ fill: color, stroke: '#000' }} d="M0 20h24v4H0z"></path>
      </svg>
      { isSelected &&
      <div style={{ position: 'absolute', top: '55px', zIndex: 10 }}>
        <SketchPicker
          color={color}
          onChangeComplete={changeColor}
        />
      </div>
      }
    </div>
  );
}
