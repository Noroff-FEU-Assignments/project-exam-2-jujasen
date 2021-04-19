import { Link } from 'react-router-dom';
import BackLink from '../components/BackLink';
import Heading from '../components/Heading';
import img from '../img/home.png'

const Accommodation = () => {



    return (
        <>
            <div className="acc-details">
                <div className="header acc-details__header">
                    <BackLink />
                    <img src={img} alt=""></img>
                    <Heading className="header__title" title="All accomodation" />

                </div>
            </div>
        </>
    )


}

export default Accommodation;