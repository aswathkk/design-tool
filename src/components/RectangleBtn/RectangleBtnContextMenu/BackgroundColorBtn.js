import React, {useState} from 'react';
import { SketchPicker } from 'react-color';

import useTool from '../../../utils/useContextTool';
import style from './style.module.css';

export default function BackgroundColorBtn({backgroundColor, onChange}) {
  const [isSelected, setIsSelected] = useState(false);
  const [color, setColor] = useState(backgroundColor);

  useTool({
    property: 'fill',
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
        <path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path>
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
