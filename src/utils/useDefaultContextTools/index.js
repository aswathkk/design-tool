import React from 'react';

import ShadowBtn from '../../components/ShadowBtn';
import OpacityBtn from '../../components/OpacityBtn';

export default function DefaultContextTools({ opacity, shadow, onChange }) {
  return (
    <>
      <OpacityBtn opacity={opacity} onChange={opacity => onChange({opacity})} />
      <ShadowBtn {...shadow} onChange={shadow => onChange({shadow})} />
    </>
  );
}
