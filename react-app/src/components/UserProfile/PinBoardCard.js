import { useHistory } from 'react-router';
import React from 'react';

const PinBoardCard = ({ user }) => {
    const history = useHistory()
    const onClick = () => {
        history.push(`user/${user.id}`)
    }
    return (
        <div onClick={onClick}>
            <div className='user-wrapper'>
                <img className='user-image' src={user.image} alt="User" />

            </div>
        </div>
    )
}
export default PinBoardCard;
