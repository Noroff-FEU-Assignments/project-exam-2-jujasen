import AuthContext from '../../../utils/AuthContext';
import { useHistory } from 'react-router-dom';
import { BsX, BsPeopleFill, BsCheckCircle } from 'react-icons/bs';
import { RiHotelLine, RiHome5Line } from 'react-icons/ri';
import BackLink from '../../../components/BackLink';
import Heading from '../../../components/Heading';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, MESSAGES_PATH } from '../../../utils/constants';
import { useParams } from 'react-router-dom';
import img from '../../../img/logo-dark.svg';


const MessageDetails = () => {

    const { id } = useParams();
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const [replied, setReplied] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!auth) {
            history.push('/');
        }
    }, [auth, history]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${MESSAGES_PATH}/${id}`, {
                    headers: {
                        Authorization:
                            `Bearer ${auth.jwt}`,
                    },
                });
                console.log('response', response.data);
                setMessage(response.data);
                setReplied(response.data.replied)
            } catch (error) {
                console.log('error', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [auth])

    return (
        <div className="admin-details">
            <div className="header">
                <BackLink />
                <Heading className="header__title" title="Admin Panel" />
                <h2 className="header__subtitle">Message Details</h2>
            </div>
            {loading ? <img className="loader" src={img} alt="pulsating logo"></img>
                : message ?
                    <div className="page">
                        <div className="booking space__marg--b">
                            <div className="booking__est flex flex--start">
                                <p className="no-marg-l">{message.subject}</p>
                            </div>
                            <div className="semi-bold space__marg--b">
                                Name
                                <p>{message.name}</p>
                            </div>
                            <div className="semi-bold space__marg--b">
                                Email
                                <p>{message.email}</p>
                            </div>
                            <div className="semi-bold space__marg--b">
                                Message
                                <p>{message.message}</p>
                            </div>
                        </div>
                        {replied ? <div className=" booking__confirm flex flex--center">
                            <BsCheckCircle></BsCheckCircle>
                            <div className=" booking__confirm-text">
                                <p>This message has been replied to</p>
                            </div>
                        </div> : ''}
                        <div className="flex flex--center">
                            <a href={`mailto:${message.email}`} className="button space__marg--l no-link"
                                onClick={async () => {
                                    const data = {
                                        replied: true
                                    }

                                    try {
                                        const response = await axios.put(`${BASE_URL}${MESSAGES_PATH}/${id}`, data,
                                            {
                                                headers: {
                                                    Authorization:
                                                        `Bearer ${auth.jwt}`,
                                                },

                                            });
                                        console.log('replied', response.data);
                                        setReplied(true);
                                    } catch (error) {
                                        console.log('error', error);
                                    }
                                }}
                            >{replied ? "Reply again" : "Reply"}</a>
                        </div>
                    </div>
                    : error ? <div className="error">ERROR <br /> Whoops, someone forgot to feed the hamsters that run this page :(
                    </div>
                        :
                        ''}
        </div>
    )
}

export default MessageDetails;
