import { useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import AddPinToBoard from '../Boards/AddPinToBoardModal';
import { getAllBoardsThunk } from '../../store/board';
import './LandingPage.css'

const PinCard = ({ pin }) => {
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const boards = useSelector(state => state.pinnedBoards.allPinnedBoards)
    const boardsArr = boards ? Object.values(boards) : [];
    const userBoards = boardsArr.length ? boardsArr.filter(board => board.user_id === user.id) : [];
    console.log("the user boards------->", userBoards)

    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])

    const onClick = () => {
        history.push(`/pins/${pin.id}`);
    };


    return (
        <div
            className={`single-pin-wrapper ${isHovered ? 'hovered' : ''}`}

            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative' }} // Set relative positioning
        >
            {userBoards.length && (
                <div className='button-span'>
                    <OpenModalButton
                        className='pin-overlay-button'
                        buttonText={
                            <span>
                                {userBoards[0].name}
                                <span className="material-symbols-outlined">expand_more</span>
                            </span>
                        }
                        modalComponent={<AddPinToBoard pin_id={pin.id} />}
                        style={{
                            display: isHovered ? 'flex' : 'none', // Show on hover
                            position: 'absolute', // Position it absolutely within the wrapper
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer',
                            zIndex: 1,
                        }}

                    />
                </div>
            )}
            <div onClick={onClick} className='pin-card'>
                <img className='pin-image' src={pin.images} alt="Pin" />
                <div className='pin-image-title'>{pin.title}</div>
                <div className='pin-owner-icon-container'>
                    <img
                        className="pin-owner-icon"
                        style={{ width: '27px', height: '27px' }}
                        src={pin.user.image}
                        alt={pin.user.firstName}
                    />
                    <span className='pin-owner-name'>
                        {pin.user.firstName} {pin.user.lastName}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PinCard;
