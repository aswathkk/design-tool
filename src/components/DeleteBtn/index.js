import React, { useContext, useEffect } from 'react';
import { CanvasContext } from '../../utils/useCanvas';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const DeleteBtn = (props) => {
  const { canvas } = useContext(CanvasContext);

  const remove = () => {
    canvas.getActiveObjects().forEach(object => {
      canvas.remove(object)
    });
  }

  const onKeyDown = e => {
    if (e.key === 'Delete')
      remove();
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  })

  return (
    <div style={{ padding: '7px', cursor: 'pointer' }} onClick={remove}>
      <DeleteOutlinedIcon />
    </div>
  );
}

export default DeleteBtn;
