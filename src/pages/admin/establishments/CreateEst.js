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
        .min(3, "Establishment name needs at least 3 characters"),
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
            <div className="pad-top" >
                <div className="header">
                    <BackLink />
                    <Heading className="header__title" title="Admin Panel" />
                    <h2 className="header__subtitle">Create establishment</h2>
                </div>
                <div className="page">
                    <Formik
                        initialValues={{ name: "", type: "", stars: "", region: "", street_adress: "", postal_adress: "", zip_code: "", image: "", map_embed: "", recommended: "", facility_breakfast: "", facility_aircondition: "", facility_roomservice: "", facility_petsallowed: "", facility_gym: "", max_people: "", room_standard_price: "", room_superior: "", room_superior_price: "", room_luxury: "", room_luxury_price: "", breakfast_price: "" }}
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
                            <Form className="form space__marg--t">
                                <h3 className="subtitle">General information</h3>
                                <div className="form__item">
                                    <p className="form__label"
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
                                <div className="form__item">
                                    <p className="form__label"
                                    >* Establishment type</p>
                                    <select 
                                    className="form__input" 
                                    name="type" 
                                    id="type"
                                    ref={establishment}
                                    value={values.type}
                                    onChange={handleChange}>
                                        <option value="" disabled>Select type</option>
                                        <option value="Hotel">Hotel</option>
                                        <option value="B&B">B&amp;B</option>
                                    </select>
                                    <p className="form__error">{errors.type}</p>
                                </div>
                                <div className="form__item">
                                    <p className="form__label"
                                    >* Stars</p>
                                    <select
                                        className="form__input"
                                        name="stars"
                                        id="stars"
                                        ref={establishment}
                                        value={values.stars}
                                        onChange={handleChange}>
                                        <option value="" disabled>Select star rating</option>
                                        <option value={1}>1 star</option>
                                        <option value={2}>2 stars</option>
                                        <option value={3}>3 stars</option>
                                        <option value={4}>4 stars</option>
                                        <option value={5}>5 stars</option>
                                    </select>
                                    <p className="form__error">{errors.stars}</p>
                                </div>
                                <div className="form__item">
                                    <p className="form__label"
                                    >* Region</p>
                                    <select
                                        className="form__input"
                                        name="stars"
                                        id="stars"
                                        ref={establishment}
                                        value={values.region}
                                        onChange={handleChange}>
                                        <option value="" disabled>Select region</option>
                                        <option value={"Bergenshus"}>Bergenshus</option>
                                        <option value={"Årstad"}>Årstad</option>
                                        <option value={"Fana"}>Fana</option>
                                        <option value={"Laksevåg"}>Laksevåg</option>
                                        <option value={"Arna"}>Arna</option>
                                        <option value={"Fyllingsdalen"}>Fyllingsdalen</option>
                                        <option value={"Ytrebygda"}>Ytrebygda</option>
                                        <option value={"Åsane"}>Åsane</option>
                                    </select>
                                    <p className="form__error">{errors.region}</p>
                                </div>
                                <div className="form__item">
                                    <p className="form__label"
                                    >* Street address</p>
                                    <input
                                        id="street_adress"
                                        ref={establishment}
                                        className="form__input"
                                        placeholder="Type the street address"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.street_adress}
                                    />
                                    <p className="form__error">{errors.street_adress}</p>
                                </div>
                                <div className="form__item">
                                    <p className="form__label"
                                    >* Zip code</p>
                                    <input
                                        id="zip_code"
                                        ref={establishment}
                                        className="form__input"
                                        placeholder="Type the zip code"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.zip_code}
                                    />
                                    <p className="form__error">{errors.zip_code}</p>
                                </div>
                                <div className="form__item">
                                    <p className="form__label"
                                    >* Postal address</p>
                                    <input
                                        id="postal_adress"
                                        ref={establishment}
                                        className="form__input"
                                        placeholder="Type the postal address"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.postal_adress}
                                    />
                                    <p className="form__error">{errors.postal_adress}</p>
                                </div>
                                <div className="form__item">
                                    <p className="form__label"
                                    >* Image URL</p>
                                    <input
                                        id="image"
                                        ref={establishment}
                                        className="form__input"
                                        placeholder="Type the image url"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.image}
                                    />
                                    <p className="form__error">{errors.image}</p>
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
                                        <button className="button" type="submit">Create</button>
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