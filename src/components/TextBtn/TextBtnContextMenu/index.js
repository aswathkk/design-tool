import React from 'react';

import style from './style.module.css';
import TextColorBtn from './TextColorBtn';
import FormatBoldBtn from './FormatBoldBtn';
import FormatItalicBtn from './FormatItalicBtn';
import FormatUnderlinedBtn from './FormatUnderlinedBtn';
import FormatAlignmentBtn from './FormatAlignmentBtn';
import DefaultContextTools from '../../../utils/useDefaultContextTools';
import TextBackgroundColorBtn from './TextBackgroundColorBtn';
import FontSelector from './FontSelector';

const TextBtnContextMenu = ({ setTextProperties, textProperties }) => {
  const onChange = val => {
    setTextProperties(oldState => {
      return {
        ...oldState,
        ...val
      }
    })
  }

  return (
    <div className={style.root}>
      <FontSelector
        fontFamily={textProperties.fontFamily}
        onChange={fontFamily => onChange({'fontFamily': fontFamily})}
      />
      <TextColorBtn color={textProperties.fill} onChange={fill => onChange({'fill': fill})} />
      <TextBackgroundColorBtn textBackgroundColor={textProperties.textBackgroundColor} onChange={fill => onChange({'textBackgroundColor': fill})} />

      <FormatBoldBtn
        fontWeight={textProperties.fontWeight}
        onChange={fontWeight => onChange({'fontWeight': fontWeight})}
      />
      <FormatItalicBtn
        fontStyle={textProperties.fontStyle}
        onChange={fontStyle => onChange({'fontStyle': fontStyle})}
      />
      <FormatUnderlinedBtn
        underline={textProperties.underline}
        onChange={underline => onChange({'underline': underline})}
      />

      <FormatAlignmentBtn
        textAlign={textProperties.textAlign}
        onChange={textAlign => onChange({'textAlign': textAlign})}
      />
      <DefaultContextTools onChange={onChange} {...textProperties} />
    </div>
  );
}

export default TextBtnContextMenu;
