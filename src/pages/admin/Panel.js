import AuthContext from '../../utils/AuthContext';
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Heading from '../../components/Heading';
import axios from 'axios';
import { BASE_URL, ENQUIRIES_PATH, MESSAGES_PATH, ACCOMMODATIONS_PATH } from '../../utils/constants';
import { Link } from 'react-router-dom';

const Panel = () => {

    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [bookings, setBookings] = useState(null);
    const [confBookings, setConfBookings] = useState(null);
    const [bookingsError, setBookingsError] = useState('');
    const [messages, setMessages] = useState(null);
    const [repMessages, setRepMessages] = useState(null);
    const [messagesError, setMessagesError] = useState('');
    const [est, setEst] = useState(null);
    const [estError, setEstError] = useState('');

    useEffect(() => {
        if (!auth) {
            history.push('/');
        }
    }, [auth, history]);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ENQUIRIES_PATH}`);
                if (response.status === 200) {
                    setBookings(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
                setBookingsError(true);
            }
        };
        getBookings();
    }, [])

    useEffect(() => {
        const filterBookings = () => setConfBookings(bookings?.filter(item => item.confirmed !== true))
        filterBookings();
    }, [bookings])



    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${MESSAGES_PATH}`, {
                    headers: {
                        Authorization:
                            `Bearer ${auth.jwt}`,
                    },
                });
                console.log('response', response.data);
                setMessages(response.data);
                console.log(response.data)
            } catch (error) {
                console.log('error', error);
                setMessagesError(error);
            }
        };
        getMessages();
    }, [auth])

    useEffect(() => {
        const filterMessages = () => setRepMessages(messages?.filter(item => item.replied !== true))
        filterMessages();
    }, [messages])


    useEffect(() => {
        const getEst = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ACCOMMODATIONS_PATH}`);
                if (response.status === 200) {
                    setEst(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
                setEstError(true);
            }
        };
        getEst();
    }, [])

    return (
        <>
            <div className="panel">
                <div className="header">
                    <Heading className="header__title" title="Admin Panel" />
                </div>
                <div className="panel__section">

                    <div className="panel__content">
                        <h2 className="panel__heading">Bookings</h2>
                        {bookingsError ? <div className="panel__text">
                            <br /> Whoops, someone forgot to feed the hamsters that run this page :(
                        </div>
                            :
                            <div className="panel__text">
                                {confBookings?.length > 0 ? <p className="panel__info">There are currently {confBookings.length} unread bookings</p> : <p className="panel__info">There are no new bookings</p>}
                                <div className="flex flex--space">
                                    {bookings?.length} total bookings
                                    <Link to="panel/bookings">
                                        <button className="button button--small">See bookings</button>
                                    </Link>
                                </div>
                            </div>}
                    </div>
                    <div className="panel__content">
                        <h2 className="panel__heading">Messages</h2>
                        {messagesError ? <div className="panel__text">
                            <br /> Whoops, someone forgot to feed the hamsters that run this page :(
                        </div> 
                        :
                            <div className="panel__text">
                                {repMessages?.length > 0 ? <p className="panel__info">There are currently {repMessages.length} unread bookings</p> : <p className="panel__info">There are no new bookings</p>}
                                <div className="flex flex--space">
                                    {messages?.length} total messages
                            <button className="button button--small">See messages</button>
                                </div>
                            </div>
                        }
                        
                    </div>
                    <div className="panel__content">
                        <h2 className="panel__heading">Establishments</h2>
                        {estError ? <div className="panel__text">
                            <br /> Whoops, someone forgot to feed the hamsters that run this page :(
                        </div>
                            : <div className="panel__text">
                                <p className="panel__info">{est?.length} total establishments</p>
                                <div className="flex flex--space">
                                    <button className="button button--small">Create new</button>
                                    <button className="button button--small">See all</button>
                                </div>
                            </div>}
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Panel;
