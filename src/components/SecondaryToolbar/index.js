import React from 'react';
import style from './secondary-toolbar.module.css';
import ToggleLockBtn from '../ToggleLockBtn';
import BringForwardBtn from '../BringForwardBtn';
import SendBackwardsBtn from '../SendBackwardsBtn';
import DeleteBtn from '../DeleteBtn';

export default function SecondaryToolbar() {
  return (
    <div className={style.root}>
      <ToggleLockBtn />
      <BringForwardBtn />
      <SendBackwardsBtn />
      <DeleteBtn />
    </div>
  );
}
