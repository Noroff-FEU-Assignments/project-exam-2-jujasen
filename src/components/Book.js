import { BsX, BsPeopleFill } from 'react-icons/bs';
import { RiHotelLine, RiHome5Line } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { BASE_URL, ENQUIRIES_PATH } from '../utils/constants'

const validationSchema = yup.object().shape({
    fromDate: yup.date()
        .required("From date is required"),
    toDate: yup.date()
        .required("To date is required"),
    firstName: yup.string()
        .required("*First name is required"),
    lastName: yup.string()
        .required("*Last name is required"),
    email: yup.string()
        .email("*Email is invalid")
        .required("*Email is required"),
    phoneNumber: yup.number()
        .integer("*Phone number is invalid")
        .required("*Phone number is required"),
    request: yup.string()
});


const Book = (props) => {

    const { acc, onChildClick } = props;

    const [submitting, setSubmitting] = useState(false);
    const [bookID, setBookID] = useState(null);
    const [booking, setBooking] = useState(null);
    const [nights, setNights] = useState(null);
    const [roomSelected, setRoomSelected] = useState('standard');
    const [roomPrice, setRoomPrice] = useState(acc.room_standard_price);
    const [wantBreakfast, setWantBreakfast] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectRoom = (type) => {
        setRoomSelected(type);
    }

    const handleBreakfast = () => {
        setWantBreakfast(!wantBreakfast);
    };

    const { book } = useForm({
        resolver: yupResolver(validationSchema),
    });

    console.log(bookID);

    useEffect(() => {
        if(bookID) {
            console.log(bookID)
            const getDetail = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}${ENQUIRIES_PATH}/${bookID}`);
                    if (response.status === 200) {
                        setBooking(response.data);
                        console.log(response.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            getDetail();
        }

    }, [bookID])

    useEffect(() => {
        if (booking) {
            const nights = Math.ceil(Math.abs(new Date(booking.date_from) - new Date(booking.date_to)) / (1000 * 60 * 60 * 24));

            setNights(nights);
        }
    }, [booking])


    return (
        <>
            <div className="book">
                <div className="book__header flex flex--space space__marg--b">
                    <h2 className="book__title">Book a room</h2>
                    <div className="pointer" onClick={onChildClick}>
                        <BsX></BsX>
                    </div>   
                </div>
                <h3 className="subtitle">{booking ? `Your booking #${booking.id}` : acc.name}</h3>

                {booking ? 
                <div className="book__section">
                        <div className="booking">
                        <div className="booking__est flex flex--start">
                                {booking.est_type === 'Hotel' ? <RiHotelLine></RiHotelLine> : <RiHome5Line></RiHome5Line>}
                                <p>{booking.establishment}</p>
                        </div>
                        <div className="flex flex--space">
                                <div>
                                    <span className="capitalize">{booking.room_type}</span> room,&nbsp;
                                    {nights} nights
                                </div>
                                kr {booking.room_price * nights},-
                        </div>
                        {booking.breakfast ? 
                        <div className="flex flex--space">
                            <div>
                                With breakfast,&nbsp;
                                {nights} nights
                            </div>
                            kr {booking.breakfast_price*nights},-
                        </div> : ''}
                        <div className="flex flex--space space__marg--b">
                            <div className="semi-bold">
                                TOTAL
                            </div>
                                {booking.breakfast ? <div className="semi-bold">kr {(booking.room_price + booking.breakfast_price) * nights},-</div> : <div className="semi-bold">kr {(booking.room_price) * nights},-</div>}
                        </div>
                        <div className="semi-bold space__marg--b">
                                From date / To date
                            <p>{booking.date_from} - {booking.date_to}</p>
                        </div>
                        <div className="semi-bold space__marg--b">
                            Full name
                        <p>{booking.name_first} {booking.name_last}</p>
                        </div>
                        <div className="semi-bold space__marg--b">
                            Email
                            <p>{booking.email}</p>
                        </div>
                        <div className="semi-bold space__marg--b">
                            Phone number
                            <p>{booking.phone}</p>
                        </div>
                        <div className="semi-bold space__marg--b">
                            Special request
                            <p>{booking.request}</p>
                        </div>
                    </div>
                    <div className="flex flex--center">
                        <button className=" button button--stroked space__marg--r">Cancel</button>
                        <button className="button space__marg--l">CONFIRM</button>
                    </div>
                </div>
                 : 
                <div>
                    <div className="book__rooms">
                        <p className="book__caption">Select room</p>
                        <div onClick={() => {
                            selectRoom("standard");
                            setRoomPrice(acc.room_standard_price)
                        }} className={`book__room  ${roomSelected === 'standard' ? 'book__room--active' : ''}`}>
                            <h4 className="book__room-title">Standard room</h4>
                            <div className="book__room-desc flex flex--space">
                                <div className="book__room-info flex flex--space">
                                    <BsPeopleFill></BsPeopleFill>
                                    <p>Up to {acc.max_people} people</p>
                                </div>
                                <div className="estcard__price">
                                    kr {acc.room_standard_price} <span>per night</span></div>
                            </div>
                        </div>
                        {acc.room_superior ? <div onClick={() => {
                            selectRoom("superior");
                            setRoomPrice(acc.room_superior_price)
                        }} className={`book__room  ${roomSelected === 'superior' ? 'book__room--active' : ''}`}>
                            <h4 className="book__room-title">Superior room</h4>
                            <div className="book__room-desc flex flex--space">
                                <div className="book__room-info flex flex--space">
                                    <BsPeopleFill></BsPeopleFill>
                                    <p>Up to {acc.max_people} people</p>
                                </div>
                                <div className="estcard__price">
                                    kr {acc.room_superior_price} <span>per night</span></div>
                            </div>
                        </div> : ''}
                        {acc.room_luxury ? <div onClick={() => {
                            selectRoom("luxury");
                            setRoomPrice(acc.room_luxury_price)
                        }} className={`book__room  ${roomSelected === 'luxury' ? 'book__room--active' : ''}`}>
                            <h4 className="book__room-title">Luxury room</h4>
                            <div className="book__room-desc flex flex--space">
                                <div className="book__room-info flex flex--space">
                                    <BsPeopleFill></BsPeopleFill>
                                    <p>Up to {acc.max_people} people</p>
                                </div>
                                <div className="estcard__price">
                                    kr {acc.room_luxury_price} <span>per night</span></div>
                            </div>
                        </div> : ''}

                    </div>
                    <h3 className="subtitle">Your booking</h3>

                    <div className="book__section">
                        <h5 className="mini-title">{acc.name}</h5>
                        <p>{roomSelected.charAt(0).toUpperCase() + roomSelected.slice(1)} room</p>
                        {acc.facility_breakfast ? <div
                            onClick={handleBreakfast}
                            className=" book__check pretty p-icon p-round p-jelly">
                            <input type="checkbox" />
                            <div className="state p-primary">
                                <i className="icon mdi mdi-check"></i>
                                <label>Include breakfast kr {acc.breakfast_price},- per day</label>
                            </div>
                        </div> : ''}

                    </div>
                    <Formik
                        initialValues={{ fromDate: "", toDate: "", firstName: "", lastName: "", email: "", phoneNumber: "", request: "" }}
                        validationSchema={validationSchema}
                        onSubmit={async (data) => {
                            setSubmitting(true);

                            const booking = {
                                establishment: acc.name,
                                room_type: roomSelected,
                                room_price: roomPrice,
                                breakfast: wantBreakfast,
                                breakfast_price: acc.breakfast_price,
                                date_from: data.fromDate,
                                date_to: data.toDate,
                                name_first: data.firstName,
                                name_last: data.lastName,
                                email: data.email,
                                phone: data.phoneNumber,
                                request: data.request,
                                est_type: acc.type,
                                confirmed: false
                            }
                            console.log(booking);

                            try {
                                const response = await axios.post(`${BASE_URL}${ENQUIRIES_PATH}`, booking);
                                console.log('response', response.data);
                                setBookID(response.data.id);
                            } catch (error) {
                                console.log('error', error);
                            } finally {
                                setSubmitting(false);
                            }
                        }}>
                        {({ values,
                            errors, handleChange, setFieldValue }) => (
                            <Form className="form">
                                <fieldset disabled={submitting} className="form__fieldset">
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* From date</p>
                                        <DatePicker
                                            id="fromDate"
                                            ref={book}
                                            selectsStart
                                            placeholderText="Select Start Date"
                                            selected={startDate}
                                            startDate={startDate}
                                            minDate={new Date()}
                                            value={values.fromDate}
                                            onChange={(date) => {
                                                setStartDate(date);
                                                setFieldValue('fromDate', date);
                                            }}
                                        />
                                        <p className="form__error">{errors.fromDate}</p>

                                    </div>
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* To date</p>
                                        <DatePicker
                                            id="toDate"
                                            ref={book}
                                            selectsEnd
                                            placeholderText="Select End Date"
                                            selected={endDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            value={values.toDate}
                                            onChange={(date) => {
                                                setEndDate(date);
                                                setFieldValue('toDate', date);
                                            }}
                                        />
                                        <p className="form__error">{errors.toDate}</p>
                                    </div>
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* First name</p>
                                        <input
                                            id="firstName"
                                            ref={book}
                                            className="form__input"
                                            placeholder="Type your first name"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.firstName}
                                        />
                                        <p className="form__error">{errors.firstName}</p>
                                    </div>
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* Last name</p>
                                        <input
                                            id="lastName"
                                            ref={book}
                                            className="form__input"
                                            placeholder="Type your last name"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.lastName}
                                        />
                                        <p className="form__error">{errors.lastName}</p>
                                    </div>
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* E-mail</p>
                                        <input
                                            id="email"
                                            ref={book}
                                            className="form__input"
                                            placeholder="Type your email address"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        <p className="form__error">{errors.email}</p>
                                    </div>
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* Phone number</p>
                                        <input
                                            id="phoneNumber"
                                            ref={book}
                                            className="form__input"
                                            placeholder="Type your phone number"
                                            type="number"
                                            onChange={handleChange}
                                            value={values.phoneNumber}
                                        />
                                        <p className="form__error">{errors.phoneNumber}</p>
                                    </div>
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >Special request</p>
                                        <textarea
                                            id="request"
                                            ref={book}
                                            className="form__input"
                                            placeholder="Describe your request"
                                            type="text"
                                            rows="3"
                                            onChange={handleChange}
                                            value={values.request}>
                                        </textarea>
                                    </div>
                                    <div className="flex flex--center">
                                        <button className="button" type="submit">Book Room</button>
                                    </div>
                                </fieldset>
                            </Form>
                        )}
                    </Formik>
                </div>
                }     
            </div>
        </>
    )


}

export default Book;

Book.propTypes = {
    acc: PropTypes.object
};