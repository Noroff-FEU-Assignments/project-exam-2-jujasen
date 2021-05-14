import AuthContext from '../../../utils/AuthContext';
import { useHistory } from 'react-router-dom';
import { TiStarFullOutline } from 'react-icons/ti';
import { IoIosArrowForward } from 'react-icons/io';
import BackLink from '../../../components/BackLink';
import Heading from '../../../components/Heading';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, MESSAGES_PATH } from '../../../utils/constants';
import img from '../../../img/logo-dark.svg';

const Messages = () => {

    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [messages, setMessages] = useState(null);
    const [newMessages, setNewMessages] = useState(null);
    const [readMessages, setReadMessages] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!auth) {
            history.push('/');
        }
    }, [auth, history]);

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
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [auth])

    useEffect(() => {
        const filterReadMessages = () => setReadMessages(messages?.filter(item => item.replied === true))
        filterReadMessages();
        const filterNewMessages = () => setNewMessages(messages?.filter(item => item.replied !== true))
        filterNewMessages();
    }, [messages])


    console.log('replied', readMessages);
    console.log('new', newMessages);

    return (
        <div className="admin-category">
            <div className="header">
                <BackLink />
                <Heading className="header__title" title="Admin Panel" />
                <h2 className="header__subtitle">Messages</h2>
            </div>

            {loading ? <img className="loader" src={img} alt="pulsating logo"></img> : error ? <div className="error">ERROR <br /> Whoops, someone forgot to feed the hamsters that run this page :(</div>
                :
                <div className="flex-when-L media-center flex-align-start flex-center">
                    <div className="admin-category__section">
                        <h3 className="subtitle"> Unread messages</h3>
                        <div className="admin-category__elems">
                            {newMessages?.map(function (item) {
                                return (
                                    <Link className="no-link" key={item.id} to={`messages/details/${item.id}`}>
                                        <div className="admin-category__item">
                                            <div className="flex flex--space">
                                                <h4 className="admin-category__title">
                                                    {item.subject}
                                                </h4>
                                                <div className="flex flex--start admin-category__tag">
                                                    <TiStarFullOutline></TiStarFullOutline>
                                                    <p>New</p>
                                                </div>
                                            </div>
                                            <div className="flex flex--space">
                                                <div>
                                                    <p className="admin-category__subtitle">{item.email}</p>
                                                    <p className="admin-category__sup">
                                                        Received: &nbsp;
                                                        {item.created_at.substring(0,10)}</p>
                                                </div>
                                                <div className="admin-category__arrow">
                                                    <IoIosArrowForward></IoIosArrowForward>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="admin-category__section">
                        <h3 className="subtitle"> Message history</h3>
                        <div className="admin-category__elems">
                            {readMessages?.map(function (item) {
                                return (
                                    <Link className="no-link" key={item.id} to={`messages/details/${item.id}`}>
                                        <div key={item.id} className="admin-category__item">
                                            <div className="flex flex--space">
                                                <h4 className="admin-category__title">
                                                    {item.subject}
                                                </h4>
                                                <div className="flex flex--start admin-category__tag">
                                                    <p>REPLIED</p>
                                                </div>
                                            </div>
                                            <div className="flex flex--space">
                                                <div>
                                                    <p className="admin-category__subtitle">{item.email}</p>
                                                    <p className="admin-category__sup">
                                                        Received: &nbsp;
                                                        {item.created_at.substring(0, 10)}
                                                    </p>
                                                </div>
                                                <div className="admin-category__arrow">
                                                    <IoIosArrowForward></IoIosArrowForward>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Messages;
