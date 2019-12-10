import React from 'react';

import ShadowBtn from '../../components/ShadowBtn';

export default function DefaultContextTools({ shadow }) {
  return (
    <ShadowBtn {...shadow} />
  );
}
