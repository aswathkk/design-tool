import React, { useState, useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
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

const ImageDisplay = props => {
  return (
    <div style={{ position: 'relative' }}>
      <CancelIcon onClick={props.onRemoveImage} style={{ position: 'absolute', top: '10px', right: '2px' }} />
      <img onClick={props.onClick} src={props.src} className={style.image} alt={props.alt} />
    </div>
  )
}

const ImageSelector = props => {
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

  const removeImage = id => {
    localStorage.setItem('images', JSON.stringify(images.slice(0, id).concat(images.slice(id + 1))));
    reloadImages();
  }

  return (
    <div className={style.imageSelectorRoot}>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <CancelIcon onClick={props.onClose} />
      </div>
      <div className={style.row}>
        <div className={style.column}>
          <ImageUploadBtn onFileUpload={reloadImages} />
          {images.map((image, i) =>
            (i % 2 === 0) && <ImageDisplay onRemoveImage={() => removeImage(i)} onClick={() => onImgClick(image)} key={i} src={image} alt={`upload-$[i]`} />
          )}
        </div>
        <div className={style.column}>
          {images.map((image, i) =>
            (i % 2 === 1) && <ImageDisplay onRemoveImage={() => removeImage(i)} onClick={() => onImgClick(image)} key={i} src={image} alt={`upload-$[i]`} />
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
        <ImageSelector onClose={() => setIsSelected(false)} />
      }
    </div>
  );
}

export default ImageBtn;
