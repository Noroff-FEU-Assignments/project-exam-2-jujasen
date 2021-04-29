import Heading from '../components/Heading';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { BASE_URL, AUTH_PATH } from '../utils/constants';
import getAuth from '../utils/getAuth';
import saveAuth from '../utils/saveAuth';
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object().shape({
    identifier: yup.string()
        .required("*Username is required"),
    password: yup.string()
        .required("*Password is required")
});

const Login = () => {
    const [user, setUser] = useState([]);
    const [loginError, setLoginError] = useState(null);
    const history = useHistory();

    const { credentials } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const currentUser = getAuth();

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [])
    

    if(currentUser.length > 0) {
        console.log(user);
    } else {
        console.log(false);
    }


    return (
        <>
            <div className="login">
                <div className="header">
                    <Heading className="header__title" title="Log in" />
                </div>
                <div className="login__content">
                    <Formik
                        initialValues={{ identifier: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={async (data) => {

                            setLoginError(null);

                            try {
                                const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, data);
                                console.log('response', response.data);
                                saveAuth(response.data)
                                setUser(currentUser);
                            } catch (error) {
                                console.log('error', error);
                                setLoginError(error.toString());
                            };
                        }}>
                        {({ values,
                            errors, handleChange }) => (
                            <Form className="form">
                                <div className="form__item">
                                    <p
                                        className="form__label"
                                    >* Username</p>
                                    <input
                                        id="identifier"
                                        ref={credentials}
                                        className="form__input"
                                        placeholder="Type your identifier"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.identifier}
                                    />
                                    <p className="form__error">{errors.identifier}</p>
                                </div>
                                <div className="form__item">
                                    <p
                                        className="form__label"
                                    >* Password</p>
                                    <input
                                        id="password"
                                        ref={credentials}
                                        className="form__input"
                                        placeholder="Type your email address"
                                        type="password"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    <p className="form__error">{errors.password}</p>
                                </div>
                                <div className="flex flex--center">
                                    <button className="button" type="submit">Login</button>
                                    {loginError}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

            </div>
        </>
    )


}

export default Login;