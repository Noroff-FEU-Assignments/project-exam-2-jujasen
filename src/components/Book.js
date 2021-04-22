import { BsX, BsPeopleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Book = ({ onClick }) => {

    const [roomSelected, setRoomSelected] = useState('standard');

    const selectRoom = (type) => {
        setRoomSelected(type);
    }


    return (
        <>
            <div className="book">
                <div className="book__header flex flex--space">
                    <h2 className="book__title">Book a room</h2>
                    <div onClick={onClick}>
                        <BsX></BsX>
                    </div>   
                </div>
                <h3 className="subtitle">Hotel name</h3>
                <div className="book__rooms">
                    <p className="book__caption">Select room</p>
                    <div onClick={() => {
                        selectRoom("standard");
                    }} className={`book__room  ${roomSelected === 'standard' ? 'book__room--active' : ''}`}>
                        <h4 className="book__room-title">Standard room</h4>
                        <div className="book__room-desc flex flex--space">
                            <div className="book__room-info flex flex--space">
                                <BsPeopleFill></BsPeopleFill>
                                <p>Up to 3 people</p>
                            </div>
                            <div className="estcard__price">
                                kr 1000 <span>per night</span></div>
                            </div>
                    </div>
                    <div onClick={() => {
                        selectRoom("superior");
                    }} className={`book__room  ${roomSelected === 'superior' ? 'book__room--active' : ''}`}>
                        <h4 className="book__room-title">Superior room</h4>
                        <div className="book__room-desc flex flex--space">
                            <div className="book__room-info flex flex--space">
                                <BsPeopleFill></BsPeopleFill>
                                <p>Up to 3 people</p>
                            </div>
                            <div className="estcard__price">
                                kr 1300 <span>per night</span></div>
                        </div>
                    </div>
                    <div onClick={() => {
                        selectRoom("luxury");
                    }} className={`book__room  ${roomSelected === 'luxury' ? 'book__room--active' : ''}`}>
                        <h4 className="book__room-title">Luxury room</h4>
                        <div className="book__room-desc flex flex--space">
                            <div className="book__room-info flex flex--space">
                                <BsPeopleFill></BsPeopleFill>
                                <p>Up to 3 people</p>
                            </div>
                            <div className="estcard__price">
                                kr 1600 <span>per night</span></div>
                        </div>
                    </div>
                </div>
                <h3 className="subtitle">Your booking</h3>
                <div className="book__section">
                    <h5 className="mini-title">Triathon Kokstad</h5>
                    <p>Standard room</p>
                </div>


            </div>
        </>
    )


}

export default Book;