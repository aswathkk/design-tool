import React, {useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import useTool from '../../../utils/useContextTool';

const fonts = [
  {
    name: 'Times New Roman',
    displayName: 'Times New Roman'
  },
  {
    name: 'sans-serif',
    displayName: 'Sans Serif'
  },
  {
    name: 'Comic Sans',
    displayName: 'Comic Sans'
  },
]

export default function FontSelector(props) {
  const [fontFamily, setFontFamily] = useState(props.fontFamily);

  useTool({
    property: 'fontFamily',
    value: fontFamily,
    onChange: props.onChange
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={fontFamily}
        onChange={e => setFontFamily(e.target.value)}
      >
        {fonts.map(font =>
          <MenuItem key={font.name} value={font.name} style={{ fontFamily: font.name }}>
            {font.displayName}
          </MenuItem>
        )}
      </Select>
    </div>
  );
}
