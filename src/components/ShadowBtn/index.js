import React, {useState, useEffect} from 'react';
import Slider from '@material-ui/core/Slider';
import { SketchPicker } from 'react-color';

import style from './style.module.css';
import useTool from '../../utils/useContextTool';

function ValuePicker(props) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    props.onChange(value);
  }, [value, props]);

  return (
    <div style={{ marginBottom: '5px' }}>
      <div style={{ fontSize: '14px', padding: '0 5px' }}>{props.label}</div>
      <div style={{ display: 'flex', padding: '0 5px 5px 10px' }}>
        <Slider
          style={{ marginRight: '10px' }}
          value={value} onChange={(e, value) => setValue(value)} />
        <input
          style={{ width: '25px', border: '1px solid #ddd', textAlign: 'center' }}
          type="text" value={value} onChange={e => setValue(e.target.value)} />
      </div>
    </div>
  )
}

function ColorPicker(props) {
  const [color, setColor] = useState(props.value);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    props.onChange(color);
  }, [color, props]);

  const changeColor = color => {
    const {r, g, b, a} = color.rgb;
    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  return (
    <div style={{position: 'relative'}}>
      <div style={{ fontSize: '14px', padding: '0 5px' }}>Color</div>
      <div onClick={() => setIsSelected(isSelected => !isSelected)}
        style={{ cursor: 'pointer', width: '25px', height: '25px', backgroundColor: color,
        margin: '5px'}}>
      </div>
      {isSelected &&
      <div style={{ position: 'absolute', top: '15px', left: '40px', zIndex: 10 }}>
        <SketchPicker
          color={color}
          onChangeComplete={changeColor}
        />
      </div>
      }
    </div>
  )  
}

function ShadowPicker(props) {
  const [color, setColor] = useState(props.color);
  const [offsetX, setOffsetX] = useState(props.offsetX);
  const [offsetY, setOffsetY] = useState(props.offsetY);
  const [blur, setBlur] = useState(props.blur);
  
  useTool({
    property: 'shadow',
    value: {
      offsetX: offsetX,
      offsetY: offsetY,
      color: color,
      blur: blur
    }
  })

  return (
    <div style={{ background: '#fff', width: '300px', padding: '10px',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px'}}>
      <ValuePicker label="X-Offset" onChange={setOffsetX} value={offsetX} />
      <ValuePicker label="Y-Offset" onChange={setOffsetY} value={offsetY} />
      <ValuePicker label="Blur" onChange={setBlur} value={blur} />
      <ColorPicker onChange={setColor} value={color}/>
    </div>
  );
}

export default function ShadowBtn(props) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className={isSelected ? style.btnActive : style.btn}>
      <svg onClick={() => setIsSelected(isSelected => !isSelected)} width="18px" height="18px" viewBox="0 0 14 14" >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g>
              <rect fill="#E5EAF0" x="2.33333333" y="2.33333333" width="11.6666667" height="11.6666667"/>
              <rect fill="#4D4B5B" x="0" y="0" width="10.5" height="10.5"/>
          </g>
        </g>
      </svg>
      { isSelected &&
      <div style={{ position: 'absolute', top: '55px', right: '3px', zIndex: 10 }}>
        <ShadowPicker {...props} />
      </div>
      }
    </div>
  );
}
