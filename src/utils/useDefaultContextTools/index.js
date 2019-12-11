import React from 'react';

import ShadowBtn from '../../components/ShadowBtn';
import OpacityBtn from '../../components/OpacityBtn';

export default function DefaultContextTools({ opacity, shadow }) {
  return (
    <>
      <OpacityBtn opacity={opacity} shit="ddd" />
      <ShadowBtn {...shadow} />
    </>
  );
}
