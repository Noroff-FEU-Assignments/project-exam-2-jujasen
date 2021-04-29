import BackLink from '../components/BackLink';
import Heading from '../components/Heading';
import { BsInfoSquare, BsEnvelope, BsPhone, BsCheckCircle } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { BASE_URL, MESSAGES_PATH } from '../utils/constants';

const validationSchema = yup.object().shape({
    name: yup.string()
        .required("Name is required")
        .min(2, "Name needs at least 2 characters"),
    email: yup.string()
        .email("*Email is invalid")
        .required("*Email is required"),
    subject: yup.string()
        .required("Subject is required")
        .min(2, "Subject needs at least 2 characters"),
    message: yup.string()
        .required("Message is required")
        .min(10, "Message needs at least 10 characters"),
});

const Contact = () => {

    const [submitted, setSubmitted] = useState(false);

    const { message } = useForm({
        resolver: yupResolver(validationSchema),
    });


    return (
        <>
            <div className="contact">
                <div className="header">
                    <BackLink />
                    <Heading className="header__title" title="Contact us" />
                    <div className="header__contact flex flex--start">
                        <BsInfoSquare></BsInfoSquare>
                        <p>The Holidaze team is here to help</p>
                    </div>
                </div>
                <div className="contact__content">
                    <div className="contact__content-item flex flex--start">
                        <BsEnvelope></BsEnvelope>
                        <div className="content-item__section--withicon">
                            <h4>Email</h4>
                            <p>hello@holidaze.com</p>
                        </div>
                    </div>
                    <div className="contact__content-item flex flex--start">
                        <BsPhone></BsPhone>
                        <div className="content-item__section--withicon">
                            <h4>Phone</h4>
                            <p>+47 402 39 232</p>
                        </div>
                    </div>
                    <div className="contact__content-item flex flex--space flex--align-start">
                        <div className="content-item__section">
                            <h4>Main office</h4>
                            <p>Holidaze AS<br />
                            Bergensgaten 1<br />
                            5020 Bergen</p>
                        </div>
                        <div className="content-item__section">
                            <h4>Office hours</h4>
                            <p>Mon-fri<br />
                            08.00 - 16.00</p>
                        </div>
                    </div>
                    <h2 className="contact__subtitle">Contact form</h2>
                    <Formik
                        initialValues={{ name: "", email: "", subject: "", message: "" }}
                        validationSchema={validationSchema}
                        onSubmit={async (data) => {

                            const message = {
                                name: data.name,
                                email: data.email,
                                subject: data.subject,
                                message: data.message
                            }
                            console.log(message);

                            try {
                                const response = await axios.post(`${BASE_URL}${MESSAGES_PATH}`, message);
                                setSubmitted(true);
                                console.log('response', response.data);;
                            } catch (error) {
                                console.log('error', error);
                            } 
                        }}>
                        {({ values,
                            errors, handleChange }) => (
                            <Form className="form">
                                <div className="form__item">
                                    <p
                                        className="form__label"
                                    >* Name</p>
                                    <input
                                        id="name"
                                        ref={message}
                                        className="form__input"
                                        placeholder="Type your name"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    <p className="form__error">{errors.name}</p>
                                </div>
                                <div className="form__item">
                                    <p
                                        className="form__label"
                                    >* E-mail</p>
                                    <input
                                        id="email"
                                        ref={message}
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
                                    >* Subject</p>
                                    <input
                                        id="subject"
                                        ref={message}
                                        className="form__input"
                                        placeholder="Type the subject of your message"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.subject}
                                    />
                                    <p className="form__error">{errors.subject}</p>
                                </div>
                                <div className="form__item">
                                    <p className="form__label"
                                    >* Message</p>
                                    <textarea
                                        id="message"
                                        ref={message}
                                        className="form__input"
                                        placeholder="Describe your reason for contact"
                                        type="text"
                                        rows="5"
                                        onChange={handleChange}
                                        value={values.message}>
                                    </textarea>
                                    <p className="form__error">{errors.message}</p>
                                </div>
                                {submitted ? 
                                <div className=" form__confirm flex flex--center">
                                    <BsCheckCircle></BsCheckCircle>
                                    <div className=" form__confirm-text">
                                        <p>Thank you!</p>
                                        <p>Your message is sent</p>
                                    </div>
                                    </div> : <div className="flex flex--center">
                                        <button className="button" type="submit">Send message</button>
                                    </div>}
                                
                            </Form>
                        )}
                    </Formik>
                </div>

            </div>
        </>
    )


}

export default Contact;