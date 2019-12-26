import React, { useState } from 'react';
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import {GridListTileBar, IconButton, Grid} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const getImagesFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('images')) || [];
  } catch {
    return [];
  }
}

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#fff'
  },
  upload: {
    color: '#000'
  },
  input: {
    display: 'none'
  }
}));

export default function ImageUpload({onImageSelect}) {
  const classes = useStyles();
  const [ images, setImages ] = useState(getImagesFromLocalStorage());

  const reloadImages = () => {
    setImages(getImagesFromLocalStorage());
  }

  const removeImage = id => {
    localStorage.setItem('images', JSON.stringify(images.slice(0, id).concat(images.slice(id + 1))));
    reloadImages();
  }

  const loadFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileReader = new FileReader();
      fileReader.onload = e => {
        let savedImages = getImagesFromLocalStorage();
        savedImages.push(e.target.result);
        localStorage.setItem('images', JSON.stringify(savedImages))
        reloadImages();
      }
      fileReader.readAsDataURL(file);
    }
  }

  return (
    <div style={{ padding: '4px' }}>
      <GridList cellHeight={160} cols={2}>
        <GridListTile>
          <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={e => loadFiles(e.target.files)}
            />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
        </GridListTile>
        {images.map((image, i) => (
          <GridListTile key={i} cols={1} >
            <img src={image} alt={i} onClick={() => onImageSelect(image)}/>
            <GridListTileBar
              actionIcon={
                <IconButton onClick={() => removeImage(i)} className={classes.icon}>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
