import { Link } from 'react-router-dom';
import BackLink from '../../components/BackLink';
import Heading from '../../components/Heading';
import img from '../../img/home.png';
import { TiStarFullOutline } from 'react-icons/ti';
import Button from '../../components/Button';
import { GiCoffeeMug } from 'react-icons/gi';
import { MdRestaurant } from 'react-icons/md';
import { FiWind } from 'react-icons/fi';
import { FaConciergeBell } from 'react-icons/fa';
import { IoMdPaw } from 'react-icons/io';
import { CgGym } from 'react-icons/cg';
import { MdKeyboardArrowRight } from 'react-icons/md'

const AccDetails = () => {



    return (
        <>
            <div className="accdetails">
                <div className="header accdetails__header">
                    <div className="content">
                        <BackLink />
                    </div>
                    <img className="accdetails__img" src={img} alt=""></img>
                    <div className="content">
                        <div className="accdetails__title">
                            <Heading title="Hotel name" />
                        </div>
                        <div className="flex flex--space">
                            <div className="accdetails__stars flex flex--start">
                                {/* {
                                    [...Array(stars)].map((i) => (
                                        <TiStarFullOutline key={i} className="estcard__star"></TiStarFullOutline>
                                    )
                                    )} */}
                                <TiStarFullOutline className="accdetails__star"></TiStarFullOutline>
                                <p className="accdetails__rating">1 stars</p>

                            </div>
                            <div className="accdetails__btn">
                                <Button text="Book room"></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="accdetails__price">
                        <p>from</p>
                    kr 1200 <span>per night</span>
                    </div>
                    <h2 className="subtitle">Facilities</h2>
                    <div className="accdetails__facilities">
                        <div className="accdetails__facility">
                            <GiCoffeeMug></GiCoffeeMug>
                            <p>Breakfast</p>
                        </div>
                        <div className="accdetails__facility">
                            <MdRestaurant></MdRestaurant>
                            <p>Restaurant</p>
                        </div>
                        <div className="accdetails__facility">
                            <FaConciergeBell></FaConciergeBell>
                            <p>Room Service</p>
                        </div>
                        <div className="accdetails__facility">
                            <FiWind></FiWind>
                            <p>Air Condition</p>
                        </div>
                        <div className="accdetails__facility">
                            <IoMdPaw></IoMdPaw>
                            <p>Pets Allowed</p>
                        </div>
                        <div className="accdetails__facility">
                            <CgGym></CgGym>
                            <p>Gym</p>
                        </div>
                    </div>
                    <h2 className="subtitle">Location</h2>
                    <div className="accdetails__location">
                        <iframe title="id" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1975.8669691474672!2d5.338186616161659!3d60.31525988201465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cf995650216b5%3A0xe489d1c1a1be2d18!2sSundts%20veg%2050%2C%205221%20Nesttun!5e0!3m2!1sen!2sno!4v1618940369060!5m2!1sen!2sno"></iframe>
                        <div>
                            Sundts Veg 50B, 5221 Nesttun
                        </div>
                    </div>
                    <h2 className="subtitle">Activities in Fana Region</h2>
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
                </div>

            </div>
        </>
    )


}

export default AccDetails;