import React, {useState, useEffect} from 'react';
import Slider from '@material-ui/core/Slider';
import OpacityIcon from '@material-ui/icons/Opacity';

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
          {...props}
          style={{ marginRight: '10px' }}
          value={value} onChange={(e, value) => setValue(value)} />
        <input
          style={{ width: '25px', border: '1px solid #ddd', textAlign: 'center' }}
          type="text" value={value} onChange={e => setValue(e.target.value)} />
      </div>
    </div>
  )
}

export default function OpacityBtn(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [opacity, setOpacity] = useState(props.opacity);
  
  useTool({
    property: 'opacity',
    value: opacity
  })

  return (
    <div className={isSelected ? style.btnActive : style.btn}>
      <div onClick={() => setIsSelected(isSelected => !isSelected)}>
        <OpacityIcon />
      </div>
      { isSelected &&
      <div style={{ position: 'absolute', top: '55px', right: '3px', zIndex: 10 }}>
        <div style={{ background: '#fff', width: '300px', padding: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px'}}>
            <ValuePicker min={0} max={1} step={0.01} label="Opacity" onChange={setOpacity} value={opacity} />
        </div>
      </div>
      }
    </div>
  );
}
