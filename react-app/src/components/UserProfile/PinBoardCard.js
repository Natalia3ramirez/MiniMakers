import { useHistory } from 'react-router';
import React from 'react';
import './UserProfile.css'

const PinBoardCard = ({board}) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`boards/${board.id}`)
    }
    return (
        <div onClick={onClick}>
            <div className='pinned-board-container'>
                <img className='board-image' src={board.boardImages[0]} alt={board.name} />
                <img className='board-image' src={board.boardImages[1]} alt={board.name} />
                <img className='board-image' src={board.boardImages[2]} alt={board.name} />

            </div>
        </div>
    )
}
export default PinBoardCard;
