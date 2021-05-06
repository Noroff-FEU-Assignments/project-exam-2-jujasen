import BackLink from '../../../components/BackLink';
import Heading from '../../../components/Heading';
import { BsCheckCircle } from 'react-icons/bs';
import { useState } from 'react';
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { BASE_URL, ACCOMMODATIONS_PATH } from '../../../utils/constants';

const validationSchema = yup.object().shape({
    name: yup.string()
        .required("Establishment name is required")
        .min(3, "Establishment needs at least 3 characters"),
    type: yup.string()
        .required("*Establishment type is required"),
    stars: yup.number()
        .required("Stars are required"),
    region: yup.string()
        .required("Region is required"),
    street_adress: yup.string()
        .required("Street address is required")
        .min(5, "Street address needs at least 5 characters"),
    postal_adress: yup.string()
        .required("Postal adress is required"),
    zip_code: yup.string()
        .required("Zip code is required")
        .min(4, "Zip code must be 4 characters")
        .max(4, "Zip code must be 4 characters"),
    image: yup.string()
        .url("Not a valid url")
        .required("Image link is required"),
    map_embed: yup.string()
        .required("Map embed is required")
        .min(300, "Map embed needs at least 300 characters"),
    recommended: yup.boolean(),

    facility_breakfast: yup.boolean(),
    facility_aircondition: yup.boolean(),
    facility_restaurant: yup.boolean(),
    facility_roomservice: yup.boolean(),
    facility_petsallowed: yup.boolean(),
    facility_gym: yup.boolean(),

    max_people: yup.number()
        .required("Max people is required"),
    room_standard_price: yup.number()
        .required("Standard room price is required")
        .integer("Not a number"),
    room_superior: yup.boolean(),
    room_superior_price: yup.number()
        .when('room_superior', {
            is: (room_superior) => room_superior === true,
            then: yup.string()
                .required('Superior room price is required')
        }),
    room_luxury: yup.boolean(),
    room_luxury_price: yup.number()
        .when('room_luxury', {
            is: (room_luxury) => room_luxury === true,
            then: yup.string()
                .required('Luxury room price is required')
        }),
    breakfast_price: yup.number()
        .when('facility_breakfast', {
            is: (facility_breakfast) => facility_breakfast === true,
            then: yup.string()
                .required('Breakfast price is required')
        })
});

const CreateEst = () => {

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const { establishment } = useForm({
        resolver: yupResolver(validationSchema),
    });


    return (
        <>
            <div className="contact">
                <div className="header">
                    <BackLink />
                    <Heading className="header__title" title="Admin Panel" />
                    <h2 className="header__subtitle">Create establishment</h2>
                </div>
                <div className="contact__content">
                    <Formik
                        initialValues={{ name: "", type: "", stars: "", region: "", street_adress: "", postal_adress: "", zip_code: "", image: "", map_embed: "", recommended: "", facility_breakfast: "", facility_aircondition: "", facility_roomservice: "", facility_petsallowed: "", facility_gym: "", max_people: "", room_standard_price: "", room_superior: "", room_superior_price: "", room_luxury: "", room_luxury_price: "", breakfast_price:"" }}
                        validationSchema={validationSchema}
                        // onSubmit={async (data) => {

                        //     const message = {
                        //         name: data.name,
                        //         email: data.email,
                        //         subject: data.subject,
                        //         message: data.message
                        //     }
                        //     console.log(message);

                        //     try {
                        //         const response = await axios.post(`${BASE_URL}${MESSAGES_PATH}`, message);
                        //         setSubmitted(true);
                        //         console.log('response', response.data);;
                        //     } catch (error) {
                        //         console.log('error', error);
                        //         setError(error.toString());
                        //     }
                        // }}
                        >
                        {({ values,
                            errors, handleChange }) => (
                            <Form className="form">
                                <div className="form__item">
                                    <p
                                        className="form__label"
                                    >* Establishment name</p>
                                    <input
                                        id="name"
                                        ref={establishment}
                                        className="form__input"
                                        placeholder="Type your name"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    <p className="form__error">{errors.name}</p>
                                </div>
                                {submitted ?
                                    <div className=" form__confirm flex flex--center">
                                        <BsCheckCircle></BsCheckCircle>
                                        <div className=" form__confirm-text">
                                            <p>Thank you!</p>
                                            <p>Your message is sent</p>
                                        </div>
                                    </div> : <div className="flex flex--center">
                                        {error ? <div className="flex flex--center">{error}</div> : ''}
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

export default CreateEst;