import React from 'react';
import style from './secondary-toolbar.module.css';
import ToggleLockBtn from '../ToggleLockBtn';

export default function SecondaryToolbar() {
  return (
    <div className={style.root}>
      <ToggleLockBtn />
    </div>
  );
}
