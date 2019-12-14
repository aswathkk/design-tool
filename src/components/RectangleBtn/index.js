import React, { useState, useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import style from './style.module.css';
import RectangleBtnContextMenu from './RectangleBtnContextMenu';

import { useCanvas, CanvasContext } from '../../utils/useCanvas';
import useCanvasEvent from '../../utils/useCanvasEvent';

const RectangleBtn = ({ setContextMenu }) => {
  const { canvas } = useContext(CanvasContext);
  const [ isSelected, setIsSelected ] = useState(false);
  const [ isContextVisible, setIsContextVisible ] = useState(false);
  const defaultProperties = {
    width: 0,
    height: 0,
    fill: '#fff',
    stroke: '#000',
    shadow: {
      color: '#000',
      offsetX: 0,
      offsetY: 0,
      blur: 0
    },
    opacity: 1
  };
  const [ toolProperties, setToolProperties ] = useState(defaultProperties);
  const [ isDown, setIsDown ] = useState(false);
  const [ orig, setOrig ] = useState({ x: 0, y: 0 });
  const [ activeObject, setActiveObject ] = useState(null);

  useCanvas(() => {
    const mouseDownHandler = (options) => {
      const pointer = canvas.getPointer(options.e)
      const toolObj = new fabric.Rect({
        ...toolProperties,
        left: pointer.x,
        top: pointer.y
      });
      canvas.add(toolObj);
      setIsDown(true);
      setOrig({
        x: pointer.x,
        y: pointer.y
      })
      setActiveObject(toolObj);
    }
    const mouseMoveHandler = (options) => {
      if (isDown) {
        const pointer = canvas.getPointer(options.e)
        const rect = activeObject;
        canvas.selection = false;
        if (rect == null)
          return;
        if (orig.x > pointer.x)
          rect.set({ left: Math.abs(pointer.x) });
        if (orig.y > pointer.y)
          rect.set({ top: Math.abs(pointer.y) });
        rect.set({
          width: Math.abs(orig.x - pointer.x),
          height: Math.abs(orig.y - pointer.y)
        });
        canvas.renderAll();
      }
    }
    const mouseUpHandler = () => {
      setIsDown(false);
      setIsSelected(false);
      setActiveObject(null);
      canvas.selection = true;
      setTimeout(() => {
        canvas.setActiveObject(activeObject);
      }, 100);
      canvas.getObjects().forEach(item => {
        item.setCoords();
      })
    }
    if (isSelected) {
      canvas.defaultCursor = 'arrow';
      setIsContextVisible(true);
      canvas.on('mouse:down', mouseDownHandler);
      canvas.on('mouse:move', mouseMoveHandler);
      canvas.on('mouse:up', mouseUpHandler);
      return () => {
        canvas.defaultCursor = 'default';
        canvas.off('mouse:down', mouseDownHandler);
        canvas.off('mouse:move', mouseMoveHandler);
        canvas.off('mouse:up', mouseUpHandler);
        setIsContextVisible(false);
      }
    }
  }, [isSelected, isDown, orig, activeObject, toolProperties]);

  useEffect(() => {
    if (isContextVisible)
      setContextMenu(<RectangleBtnContextMenu toolProperties={toolProperties} setToolProperties={setToolProperties} />);
    else
      setContextMenu(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContextVisible, setContextMenu]);

  const onObjectSelected = (object) => {
    setIsContextVisible(false);
    let shadow = defaultProperties.shadow;
    if (object.shadow)
      shadow = {
        color: object.shadow.color,
        offsetX: object.shadow.offsetX,
        offsetY: object.shadow.offsetY,
        blur: object.shadow.blur
      };
    setToolProperties({
      fill: object.fill,
      stroke: object.stroke,
      shadow: shadow,
      opacity: object.opacity
    })
    setIsContextVisible(true);
  }

  useCanvasEvent('selection:created', e => {
    if (e.target.get('type') === 'rect')
      onObjectSelected(e.target);
    else
      setIsContextVisible(false);
  });

  useCanvasEvent('selection:updated', e => {
    if (e.target.get('type') === 'rect')
      onObjectSelected(e.target);
    else
      setIsContextVisible(false);
  });

  useCanvasEvent('selection:cleared', e => {
    setIsContextVisible(false);
    setToolProperties(defaultProperties);
  });

  const handleBtnClick = () => {
    if (canvas.getActiveObject())
      canvas.discardActiveObject().renderAll()
    setIsSelected(isSelected => !isSelected);
  };

  return (
    <div className={style.root}>
      <div className={style.textBtn} onClick={handleBtnClick}>
        <svg width="20px" height="20px" viewBox="0 0 20 20"> 
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-401.000000, -579.000000)" style={{fill: isSelected ? '#000' : '#888'}}>
              <path d="M401,599 L421,599 L421,579 L401,579 L401,599 Z M402.443299,597.556701 L419.556701,597.556701 L419.556701,580.443299 L402.443299,580.443299 L402.443299,597.556701 Z" id="Fill-1-Copy-8"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default RectangleBtn;
