import { useHistory } from 'react-router';
import React from 'react';
import { useSelector } from 'react-redux';

const PinCard = ({ pin }) => {
    const history = useHistory()

    const user = useSelector(state => state.session.user);
    const onClick = () => {
        history.push(`/pins/${pin.id}`)
    }
    return (
        <div className="single-pin-wrapper" onClick={onClick}>
            <div className='pin' >
                <img className='pin-image' src={pin.images} alt="Pin" />
                <img className="pin-owner-icon" style={{ width: '35px', height: '35px' }} src={user.image} alt={user.first_name}/>
                {user.first_name}

            </div>
        </div>
    )
}
export default PinCard;
