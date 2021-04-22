import { BsX, BsPeopleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import Button from './Button';


const Book = ({ onClick }) => {

    const [roomSelected, setRoomSelected] = useState('standard');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectRoom = (type) => {
        setRoomSelected(type);
    }

    let today = new Date().toISOString().substr(0, 10);


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

                    <div className=" book__check pretty p-icon p-round p-jelly">
                        <input type="checkbox" />
                        <div className="state p-primary">
                            <i className="icon mdi mdi-check"></i>
                            <label>Include breakfast kr 200,- per day</label>
                        </div>
                    </div>
                </div>
                <form className="form">
                    <fieldset className="form__fieldset">
                        <div className="form__item">
                            <p
                            className="form__label"
                            >* From date</p>
                            <DatePicker
                                selectsStart
                                placeholderText="Select Start Date"
                                selected={startDate}
                                startDate={startDate}
                                onChange={date => setStartDate(date)}
                                minDate={new Date()} 
                            />
                            <p className="form__error">Error</p>
                        </div>
                        <div className="form__item">
                            <p
                            className="form__label"
                            >* To date</p>
                            <DatePicker
                                selectsEnd
                                placeholderText="Select Start Date"
                                selected={endDate}
                                endDate={endDate}
                                onChange={date => setEndDate(date)}
                                minDate={startDate} 
                            />
                            <p className="form__error">Error</p>
                        </div>
                        <div className="form__item">
                            <p
                                className="form__label"
                            >* First name</p>
                            <input
                                id="firstName"
                                className="form__input"
                                placeholder="Type your first name"
                                type="text"
                            />
                            <p className="form__error">Error</p>
                        </div>
                        <div className="form__item">
                            <p
                                className="form__label"
                            >* Last name</p>
                            <input
                                id="lastName"
                                className="form__input"
                                placeholder="Type your last name"
                                type="text"
                            />
                            <p className="form__error">Error</p>
                        </div>
                        <div className="form__item">
                            <p
                                className="form__label"
                            >* E-mail</p>
                            <input
                                id="email"
                                className="form__input"
                                placeholder="Type your email adress"
                                type="text"
                            />
                            <p className="form__error">Error</p>
                        </div>
                        <div className="form__item">
                            <p
                                className="form__label"
                            >* Phone number</p>
                            <input
                                id="phoneNumber"
                                className="form__input"
                                placeholder="Type your phone number"
                                type="tel"
                            />
                            <p className="form__error">Error</p>
                        </div>
                        <div className="form__item">
                            <p
                                className="form__label"
                            >Special request</p>
                            <textarea
                                id="request"
                                className="form__input"
                                placeholder="Describe your request"
                                type="text"
                                rows="3">
                            </textarea>
                        </div>
                        <div className="flex flex--center">
                            <Button text="Book room"></Button>
                        </div>
                        
                    </fieldset>
                </form>

            </div>
        </>
    )


}

export default Book;