import React, { useState } from 'react';

import style from './toolbar.module.css';
import TextBtn from '../TextBtn';
import RectangleBtn from '../RectangleBtn';

const Toolbar = props => {
  const [ contextMenu, setContextMenu ] = useState(null);

  return (
    <div className={style.root}>
      <div style={{ display: 'flex' }}>
        <TextBtn setContextMenu={setContextMenu} />
        <RectangleBtn setContextMenu={setContextMenu} />
      </div>
      <div style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
        {contextMenu}
      </div>
    </div>
  )
}

export default Toolbar;
