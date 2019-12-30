import React, { useEffect, useContext, useRef } from 'react';
import { fabric } from 'fabric';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import toggleLock from './utils/toggleLock';
import styles from './canvas.module.css';
import { CanvasContext } from '../../utils/useCanvas';

toggleLock(fabric);

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Canvas = (props) => {
  const classes = useStyles();
  const myCanvas = useRef();
  const { setCanvas } = useContext(CanvasContext);

  useEffect(() => {
    const canvas = new fabric.Canvas(myCanvas.current);
    setCanvas(canvas);
    window.canvas = canvas;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const downloadImage = () => {
    let link = document.createElement('a');
    link.href = window.canvas.toDataURL('png');
    link.download = 'download.png';
    link.click();
  }

  const handleClickAway = () => {
    window.canvas.discardActiveObject();
    window.canvas.renderAll();
  }

  return(
    <div className={styles.root}>
      <div>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={styles.canvas}>
            <canvas
              width={props.width}
              height={props.height}
              ref={myCanvas}
              id="my-canvas"
            />
          </div>
        </ClickAwayListener>
        <div className={classes.buttonContainer}>
          <IconButton onClick={downloadImage} variant="contained"><GetAppIcon /></IconButton>
          <Button variant="contained" color="primary">Save</Button>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
