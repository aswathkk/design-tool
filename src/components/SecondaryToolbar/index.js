import React from 'react';
import style from './secondary-toolbar.module.css';
import ToggleLockBtn from '../ToggleLockBtn';
import BringForwardBtn from '../BringForwardBtn';
import SendBackwardsBtn from '../SendBackwardsBtn';
import DeleteBtn from '../DeleteBtn';
import UndoBtn from '../UndoBtn';
import ZoomBtn from '../ZoomBtn';

export default function SecondaryToolbar() {
  return (
    <div className={style.root}>
      <ToggleLockBtn />
      <BringForwardBtn />
      <SendBackwardsBtn />
      <DeleteBtn />
      <UndoBtn />
      <ZoomBtn />
    </div>
  );
}
