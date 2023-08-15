import { useHistory } from 'react-router';
import React from 'react';

const PinCard = ({ pin }) => {
    const history = useHistory()
    const onClick = () => {
        history.push(`/pins/${pin.id}`)
    }
    return (
        <div className="single-pin-wrapper" onClick={onClick}>
            <div className='single-pin-wrapper'>
                <img className='pin-image' src={pin.images} alt="Pin" />

            </div>
        </div>
    )
}
export default PinCard;
