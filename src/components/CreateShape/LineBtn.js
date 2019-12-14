import React, { useState, useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import style from './style.module.css';

import { useCanvas, CanvasContext } from '../../utils/useCanvas';
import useCanvasEvent from '../../utils/useCanvasEvent';
import BorderColorBtn from './CreateShapeContextMenu/BorderColorBtn';

const LineBtnContextMenu = ({ setToolProperties, toolProperties }) => {
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
      <BorderColorBtn borderColor={toolProperties.stroke} onChange={stroke => {
        console.log('stroke change ', stroke)
        onChange({stroke})}} />
        {/*<DefaultContextTools onChange={onChange} {...toolProperties} /> */}
    </div>
  );
}

const LineBtn = ({ setContextMenu }) => {
  const { canvas } = useContext(CanvasContext);
  const [ isSelected, setIsSelected ] = useState(false);
  const [ isContextVisible, setIsContextVisible ] = useState(false);
  const defaultProperties = {
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
      const toolObj = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        ...toolProperties,
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
          rect.set({ x1: pointer.x });
        if (orig.y > pointer.y)
          rect.set({ y1: pointer.y });
        rect.set({
          x1: pointer.x,
          y1: pointer.y
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
      setContextMenu(<LineBtnContextMenu toolProperties={toolProperties} setToolProperties={setToolProperties} />);
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
    if (e.target.get('type') === 'line')
      onObjectSelected(e.target);
    else
      setIsContextVisible(false);
  });

  useCanvasEvent('selection:updated', e => {
    if (e.target.get('type') === 'line')
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
            <g transform="translate(-809.000000, -1044.000000)" style={{fill: isSelected ? '#000' : '#888'}} fillRule="nonzero">
              <g transform="translate(809.000000, 1044.000000)">
                <path d="M2.56408654,16.9230769 L0.512836538,16.9230769 C0.229759615,16.9230769 0,17.1528365 0,17.4359135 L0,19.4872115 C0,19.7702404 0.229759615,20 0.512836538,20 L2.56413462,20 C2.84716346,20 3.07692308,19.7702404 3.07692308,19.4871635 L3.07692308,17.4358654 C3.07692308,17.1528365 2.84716346,16.9230769 2.56408654,16.9230769 Z M2.05129808,18.974375 L1.025625,18.974375 L1.025625,17.94875 L2.05125,17.94875 L2.05125,18.974375 L2.05129808,18.974375 Z" />
                <path d="M19.4871635,0 L17.4358654,0 C17.1528365,0 16.9230769,0.229759615 16.9230769,0.512836538 L16.9230769,2.56413462 C16.9230769,2.84716346 17.1528365,3.07692308 17.4359135,3.07692308 L19.4872115,3.07692308 C19.7702404,3.07692308 20,2.84716346 20,2.56408654 L20,0.512836538 C20,0.229759615 19.7702404,0 19.4871635,0 Z M18.974375,2.05129808 L17.94875,2.05129808 L17.94875,1.025625 L18.974375,1.025625 L18.974375,2.05129808 Z"/>
                <path d="M18.3377854,1.66221608 C18.1727812,1.49721002 17.9045305,1.49721002 17.7395264,1.66221608 L1.66221463,17.7397163 C1.49721051,17.9047223 1.49721051,18.1729762 1.66221463,18.3379822 C1.745153,18.420049 1.85343696,18.4615385 1.96176058,18.4615385 C2.0700842,18.4615385 2.17836816,18.4200886 2.26047358,18.3379822 L18.3377854,2.26044238 C18.5027895,2.09543632 18.5027895,1.82722214 18.3377854,1.66221608 Z" style={{stroke: isSelected ? '#000' : '#888'}} strokeWidth="0.5"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default LineBtn;
