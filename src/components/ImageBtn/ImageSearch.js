import React, {useState, useEffect} from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {IconButton, Grid, InputBase, Paper} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const unsplash = new Unsplash({
  accessKey: "cc79b6d48d37288b93d18d7c6deffd2cb7062ecb71dd23abfc10b66a1af153c2"
});


export default function ImageSearch({onImageSelect}) {
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState('');

  const initImages = () => {
    unsplash.photos.listPhotos(2, 15, "popular")
      .then(toJson)
      .then(images => setImages(images));
  }

  const searchPhotos = () => {
    unsplash.search.photos(keyword, 1, 10)
      .then(toJson)
      .then(images => setImages(images.results));
  }

  useEffect(() => {
    initImages();
  }, [])

  return (
    <div>
      <Grid container justify="center" alignItems="center" style={{ height: '80px' }}>
        <Paper style={{ padding: '3px 4px 0 22px' }}>
          <InputBase placeholder="Search..." value={keyword} onChange={e => setKeyword(e.target.value)} />
          <IconButton onClick={searchPhotos}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <GridList cellHeight={160} cols={2} style={{ padding: '4px' }}>
        {images.map(image => (
          <GridListTile key={image.id} cols={1} >
            <img src={image.urls.thumb} alt={image.alt_description} onClick={() => onImageSelect(image.urls.full)}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
