import React, { useContext } from 'react';
import { CanvasContext } from '../../utils/useCanvas';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const DeleteBtn = (props) => {
  const { canvas } = useContext(CanvasContext);

  const remove = () => {
    canvas.getActiveObjects().forEach(object => {
      canvas.remove(object)
    });
  }

  return (
    <div style={{ padding: '7px', cursor: 'pointer' }} onClick={remove}>
      <DeleteOutlinedIcon />
    </div>
  );
}

export default DeleteBtn;
