import { useHistory } from 'react-router';
import React from 'react';
import './UserProfile.css'

const PinBoardCard = ({ board }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`boards/${board.id}`)
    }
    return (
        <div onClick={onClick}>
  <div className='pinned-board-container'>
    <div className='board-images'>
      <img className='board-image-1' src={board.boardImages[0] ? board.boardImages[0] : 'data:image/jpeg;base64,...'} alt={board.name} />
      <div className='image-stack'>
        <img className='board-image-2' src={board.boardImages[1] ? board.boardImages[1] : 'data:image/jpeg;base64,...'} alt={board.name} />
        <img className='board-image-3' src={board.boardImages[2] ? board.boardImages[2] : 'data:image/jpeg;base64,...'} alt={board.name} />
      </div>
    </div>
  </div>
</div>

    )
}
export default PinBoardCard;
