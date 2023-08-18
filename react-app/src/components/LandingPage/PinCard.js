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
                <div className='pin-owner-icon-container'>

                    <img className="pin-owner-icon" style={{ width: '27px', height: '27px' }} src={pin.user.image} alt={pin.user.firstName} />
                    <span>{pin.user.firstName} {pin.user.lastName}</span>
                </div>

            </div>
        </div>
    )
}
export default PinCard;
