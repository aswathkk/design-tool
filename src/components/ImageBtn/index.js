import React, { useState, useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { CanvasContext } from '../../utils/useCanvas';

import style from './style.module.css';

const getImagesFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('images')) || [];
  } catch {
    return [];
  }
}

const ImageUploadBtn = props => {
  const loadFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileReader = new FileReader();
      fileReader.onload = e => {
        let savedImages = getImagesFromLocalStorage();
        savedImages.push(e.target.result);
        localStorage.setItem('images', JSON.stringify(savedImages))
        props.onFileUpload();
      }
      fileReader.readAsDataURL(file);
    }
  }
  return (
    <div className={style.uploadBtnWrapper}>
      <button>
        <CloudUploadOutlinedIcon style={{fontSize: '2rem'}} />
      </button>
      <input multiple type="file" onChange={e=>{loadFiles(e.target.files)}} />
    </div>
  );
}

const ImageSelector = () => {
  const { canvas } = useContext(CanvasContext);
  const [images, setImages] = useState(getImagesFromLocalStorage());

  useEffect(() => {
  }, [images]);

  const reloadImages = () => {
    setImages(getImagesFromLocalStorage());
  }

  const onImgClick = img => {
    fabric.Image.fromURL(img, function(oImg) {
      oImg.scale(0.25);
      canvas.add(oImg);
    });
  }

  return (
    <div className={style.imageSelectorRoot}>
      <h1>Select Image</h1>
      <div className={style.row}>
        <div className={style.column}>
          <ImageUploadBtn onFileUpload={reloadImages} />
          {images.map((image, i) =>
            (i % 2 === 0) && <img onClick={() => onImgClick(image)} className={style.image} key={i} src={image} alt={`upload-$[i]`} />
          )}
        </div>
        <div className={style.column}>
          {images.map((image, i) =>
            (i % 2 === 1) && <img onClick={() => onImgClick(image)} className={style.image} key={i} src={image} alt={`upload-$[i]`} />
          )}
        </div>
      </div>
    </div>
  );
}

const ImageBtn = (props) => {
  const { canvas } = useContext(CanvasContext);
  const [ isSelected, setIsSelected ] = useState(false);

  const handleBtnClick = () => {
    if (canvas.getActiveObject())
      canvas.discardActiveObject().renderAll()
    setIsSelected(isSelected => !isSelected);
  };

  return (
    <div className={style.root}>
      <div className={style.textBtn} onClick={handleBtnClick}>
        <ImageOutlinedIcon style={{color: isSelected ? '#000' : '#888'}} /> 
      </div>
      {isSelected &&
      <ImageSelector />
      }
    </div>
  );
}

export default ImageBtn;
