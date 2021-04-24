import { BsX, BsPeopleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import Button from './Button';
import { Formik, useFormikContext } from 'formik'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
        .required("*Phone number is required")
});


const Book = ({ onClick }) => {

    const [roomSelected, setRoomSelected] = useState('standard');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectRoom = (type) => {
        setRoomSelected(type);
    }

    const { book, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const onSubmit = async (d) => {

        // setSubmitting(true);
        // setLoginError(null);

        console.log(d);
        

        // try {
        //     const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, data);
        //     console.log('response', response.data);
        //     setAuth(response.data);
        // } catch (error) {
        //     console.log('error', error);
        //     setLoginError(error.toString());
        // } finally {
        //     setSubmitting(false);
        // }
    };

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
                <Formik initialValues={{ fromDate: {startDate}, toDate: {endDate},firstName: "", lastName: "", email: "", phoneNumber: "" }} validationSchema={validationSchema}>
                    {({ values,
                        errors,
                        handleChange,
                        setFieldValue,
                    handleBlur }) => ( 
                        <form onSubmit={handleSubmit(onSubmit)} className="form">
                            {console.log(values)}
                            <fieldset className="form__fieldset">
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
                                        setFieldValue(date);
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
                                    placeholderText="Select Start Date"
                                    selected={endDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    value={values.toDate}
                                    onChange={(date) => {
                                        setEndDate(date);
                                        setFieldValue(date);
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
                                    onBlur={handleBlur}
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
                                    onBlur={handleBlur}
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
                                    onBlur={handleBlur}
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
                                    onBlur={handleBlur}
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
                                    className="form__input"
                                    placeholder="Describe your request"
                                    type="text"
                                    rows="3">
                                </textarea>
                            </div>
                            <div className="flex flex--center">
                                <Button type="submit" text="Book room"></Button>
                            </div>
                            </fieldset>
                        </form>
                )}
                </Formik>
                



            </div>
        </>
    )


}

export default Book;