import React, { useState, useContext, useEffect } from 'react';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { fabric } from 'fabric';

import style from './style.module.css';
import TextBtnContextMenu from './TextBtnContextMenu';

import { useCanvas, CanvasContext } from '../../utils/useCanvas';
import useCanvasEvent from '../../utils/useCanvasEvent';

const TextBtn = ({ setContextMenu }) => {
  const { canvas } = useContext(CanvasContext);
  const [ isSelected, setIsSelected ] = useState(false);
  const [ isContextVisible, setIsContextVisible ] = useState(false);
  const defaultTextProperties = {
    fill: '#000',
    fontWeight: 'normal',
    fontStyle: 'normal',
    underline: false,
    textAlign: 'left',
    shadow: {
      color: '#000',
      offsetX: 0,
      offsetY: 0,
      blur: 0
    }
  };
  const [ textProperties, setTextProperties ] = useState(defaultTextProperties);

  useCanvas(() => {
    const mouseDownHandler = (options) => {
      const textObj = new fabric.IText('Type Your Text', {
        ...textProperties,
        left: options.pointer.x,
        top: options.pointer.y,
      });
      canvas.add(textObj);
      canvas.setActiveObject(textObj);
      setTimeout(() => {
        setIsContextVisible(true);
      }, 100);
      setIsSelected(false);
    }
    if (isSelected) {
      canvas.defaultCursor = 'text';
      setIsContextVisible(true);
      canvas.on('mouse:down', mouseDownHandler);
      return () => {
        canvas.defaultCursor = 'default';
        canvas.off('mouse:down', mouseDownHandler);
        setIsContextVisible(false);
      }
    }
  }, [isSelected, textProperties]);

  useEffect(() => {
    if (isContextVisible)
      setContextMenu(<TextBtnContextMenu textProperties={textProperties} setTextProperties={setTextProperties} />);
    else
      setContextMenu(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContextVisible, setContextMenu]);

  const onTextSelected = (activeObject) => {
    setIsContextVisible(false);
    let shadow = defaultTextProperties.shadow;
    if (activeObject.shadow)
      shadow = {
        color: activeObject.shadow.color,
        offsetX: activeObject.shadow.offsetX,
        offsetY: activeObject.shadow.offsetY,
        blur: activeObject.shadow.blur
      };
    setTextProperties({
      fill: activeObject.fill,
      fontWeight: activeObject.fontWeight,
      fontStyle: activeObject.fontStyle,
      underline: activeObject.underline,
      textAlign: activeObject.textAlign,
      shadow: shadow
    })
    setIsContextVisible(true);
  }

  useCanvasEvent('selection:created', e => {
    if (e.target.get('type') === 'i-text')
      onTextSelected(e.target);
    else
      setIsContextVisible(false);
  });

  useCanvasEvent('selection:updated', e => {
    if (e.target.get('type') === 'i-text')
      onTextSelected(e.target);
    else
      setIsContextVisible(false);
  });

  useCanvasEvent('selection:cleared', e => {
    setIsContextVisible(false);
    setTextProperties(defaultTextProperties);
  });

  const handleBtnClick = () => {
    if (canvas.getActiveObject())
      canvas.discardActiveObject().renderAll()
    setIsSelected(isSelected => !isSelected);
  };

  return (
    <div className={style.root}>
      <div className={style.textBtn} onClick={handleBtnClick}>
        <TextFieldsIcon style={{color: isSelected ? '#000' : '#888'}} /> 
      </div>
    </div>
  );
}

export default TextBtn;
