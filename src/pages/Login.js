import Heading from '../components/Heading';
import { useContext, useState } from 'react';
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { BASE_URL, AUTH_PATH } from '../utils/constants';
import AuthContext from '../utils/AuthContext';
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object().shape({
    identifier: yup.string()
        .required("*Username is required"),
    password: yup.string()
        .required("*Password is required")
});

const Login = () => {

    const [error, setError] = useState(null);
    const [, setAuth] = useContext(AuthContext);
    const [auth] = useContext(AuthContext);
    const history = useHistory();

    const { credentials } = useForm({
        resolver: yupResolver(validationSchema),
    });

    if (auth) {
        console.log("userpresent")
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

                            const credentials = {
                                identifier: data.identifier,
                                password: data.password
                            }
                            console.log(credentials);

                            try {
                                const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, credentials);
                                setAuth(response.data);
                                console.log('response', response.data);
                            } catch (error) {
                                console.log('error', error);
                                setError(error.toString());
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
                                {error ? <div className="flex flex--center">{error}</div>
                                    :
                                    ''
                                }
                                <div className="flex flex--center">
                                    <button className="button" type="submit">Login</button>
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