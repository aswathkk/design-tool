import React, { useState, useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fabric } from 'fabric';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { CanvasContext } from '../../utils/useCanvas';
import ImageUpload from './ImageUpload';

import style from './style.module.css';
import ImageSearch from './ImageSearch';

const ImageBtn = (props) => {
  const { canvas } = useContext(CanvasContext);
  const [ isSelected, setIsSelected ] = useState(false);
  const [ currentTab, setCurrentTab ] = useState(0);

  const handleBtnClick = () => {
    if (canvas.getActiveObject())
      canvas.discardActiveObject().renderAll()
    setIsSelected(isSelected => !isSelected);
  };

  const onImageSelect = img => {
    fabric.Image.fromURL(img, function(oImg) {
      canvas.add(oImg);
      setIsSelected(false);
    });
  }

  return (
    <div className={style.root}>
      <div className={style.textBtn} onClick={handleBtnClick}>
        <ImageOutlinedIcon style={{color: isSelected ? '#000' : '#888'}} /> 
      </div>
      <Drawer anchor="right" open={isSelected} onClose={() => setIsSelected(false)}>
        <div style={{width: '400px'}}>
          <Tabs centered value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
            <Tab label="Uploads" />
            <Tab label="Images" />
          </Tabs>
          <div style={{ display: currentTab === 0 ? 'block' : 'none' }}>
            <ImageUpload onImageSelect={onImageSelect} />
          </div>
          <div style={{ display: currentTab === 1 ? 'block' : 'none' }}>
            <ImageSearch onImageSelect={onImageSelect} />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default ImageBtn;
