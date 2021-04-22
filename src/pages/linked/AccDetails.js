import { Link } from 'react-router-dom';
import BackLink from '../../components/BackLink';
import Heading from '../../components/Heading';
import { TiStarFullOutline } from 'react-icons/ti';
import Button from '../../components/Button';
import { GiCoffeeMug } from 'react-icons/gi';
import { MdRestaurant } from 'react-icons/md';
import { FiWind } from 'react-icons/fi';
import { FaConciergeBell } from 'react-icons/fa';
import { IoMdPaw } from 'react-icons/io';
import { CgGym } from 'react-icons/cg';
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BASE_URL, ACCOMMODATIONS_PATH } from '../../utils/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import img from '../../img/logo-dark.svg'
import Book from '../../components/Book';



const AccDetails = () => {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [bookOpen, setBookOpen] = useState(false);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ACCOMMODATIONS_PATH}/${id}`);
                if (response.status === 200) {
                    setDetail(response.data);
                    console.log(response.data)
                } else {
                    console.log(error)
                    setError('An error occurred');
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        getDetail();
    }, [id, error])

    const handleBookToggle = () => {
        setBookOpen(!bookOpen);
        console.log(bookOpen)
    };

    return (
        <>
            <div className="accdetails">
                {bookOpen? <Book onClick={handleBookToggle}></Book> : ""}
                {loading ? <img className="loader" src={img} alt="pulsating logo"></img> : error ? <div class="error">ERROR <br /> Whoops, someone forgot to feed the hamsters that run this page :(
                    </div> : <div>                <div className="header accdetails__header">
                    <div className="content">
                        <BackLink />
                    </div>
                    <img className="accdetails__img" src={detail.image} alt=""></img>
                    <div className="content">
                        <div className="accdetails__title">
                            <Heading title={detail.name} />
                        </div>
                        <div className="flex flex--space">
                            <div className="accdetails__stars flex flex--start">
                                {
                                    [...Array(detail.stars)].map(() => (
                                        <TiStarFullOutline key={uuid()} className="estcard__star"></TiStarFullOutline>
                                    )
                                    )}
                                <p className="accdetails__rating">{detail.stars} stars</p>

                            </div>
                            <div
                            onClick={handleBookToggle}
                             className="accdetails__btn">
                                    <Button text="Book room"></Button>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="content">
                        <div className="accdetails__price">
                            <p>from</p>
                        kr {detail.room_standard_price} <span>per night</span>
                        </div>
                        <h2 className="subtitle">Facilities</h2>
                        <div className="accdetails__facilities">
                            {detail.facility_breakfast ? <div className="accdetails__facility">
                                <GiCoffeeMug></GiCoffeeMug>
                                <p>Breakfast</p>
                            </div> : ''}
                            {detail.facility_restaurant ? <div className="accdetails__facility">
                                <MdRestaurant></MdRestaurant>
                                <p>Restaurant</p>
                            </div> : ''}
                            {detail.facility_roomservice ? <div className="accdetails__facility">
                                <FaConciergeBell></FaConciergeBell>
                                <p>Room Service</p>
                            </div> : ''}
                            {detail.facility_aircondition ? <div className="accdetails__facility">
                                <FiWind></FiWind>
                                <p>Air Condition</p>
                            </div> : ''}
                            {detail.facility_petsallowed ? <div className="accdetails__facility">
                                <IoMdPaw></IoMdPaw>
                                <p>Pets Allowed</p>
                            </div> : ''}
                            {detail.facility_gym ? <div className="accdetails__facility">
                                <CgGym></CgGym>
                                <p>Gym</p>
                            </div> : ''}

                        </div>
                        <h2 className="subtitle">Location</h2>
                        <div className="accdetails__location">
                            <div dangerouslySetInnerHTML={{ __html: detail.map_embed }} />

                            <div>
                                Sundts Veg 50B, 5221 Nesttun
                        </div>
                        </div>
                        <h2 className="subtitle">Activities in {detail.region} Region</h2>
                        <div className="accdetails__activities">
                            <ul>
                                <Link to="/">
                                    <li>Leos Lekeland <MdKeyboardArrowRight></MdKeyboardArrowRight></li>

                                </Link>

                                <Link to="/">
                                    <li>Leos Lekeland <MdKeyboardArrowRight></MdKeyboardArrowRight></li>
                                </Link>
                                <Link to="/">
                                    <li>Leos Lekeland <MdKeyboardArrowRight></MdKeyboardArrowRight></li>
                                </Link>
                            </ul>
                        </div>
                    </div></div>}


            </div>
        </>
    )


}

export default AccDetails;