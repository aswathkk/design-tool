import React from 'react';

import style from './style.module.css';
import DefaultContextTools from '../../../utils/useDefaultContextTools';
import BackgroundColorBtn from './BackgroundColorBtn';
import BorderColorBtn from './BorderColorBtn';

const CreateShapeContextMenu = ({ setToolProperties, toolProperties }) => {
  const onChange = val => {
    setToolProperties(oldState => {
      return {
        ...oldState,
        ...val
      }
    })
  }

  return (
    <div className={style.root}>
      <BackgroundColorBtn backgroundColor={toolProperties.fill} onChange={fill => onChange({fill})} />
      <BorderColorBtn borderColor={toolProperties.stroke} onChange={stroke => onChange({stroke})} />
      <DefaultContextTools onChange={onChange} {...toolProperties} />
    </div>
  );
}

export default CreateShapeContextMenu;
