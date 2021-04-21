import { BsX, BsPeopleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Book = ({ onClick }) => {



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
                    <div className="book__room">
                        <h4 className="book__room-title">Room name</h4>
                        <div className="book__room-desc flex flex--space">
                            <div className="book__room-info flex flex--space">
                                <BsPeopleFill></BsPeopleFill>
                                <p>Up to 3 people</p>
                            </div>
                            <div className="estcard__price">
                                kr 1000 <span>per night</span></div>
                            </div>
                    </div>
                </div>
                <h3 className="subtitle">Your booking</h3>

            </div>
        </>
    )


}

export default Book;