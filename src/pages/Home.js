import { Link } from 'react-router-dom';
import SearchResult from '../components/SearchResult';

const Home = () => {

    return (
        <>
            <div className="home">
                <div className="home-start">
                    <h1 className="home-start__heading">I want to stay at a...</h1>
                    <div>
                        <button 
                            className="home-start__tag space__marg--r home-start__tag--active">
                            Hotel</button>
                        <button className="home-start__tag ">
                            B&B</button>
                    </div>
                        <input className="home-start__search" placeholder="Search by name or region"></input>
                    <SearchResult></SearchResult>
                </div>
                <div className="home-info">
                    <h2 className="home-info__heading">Discover Bergen</h2>
                    <p>Explore Bergen in the way you want</p>
                    <Link className="home-info__link" to='/accommodation'>
                        See all accommodation
                    </Link>
                </div>
                <div className="home-contact">
                    <h2 className="home-contact__heading">
                        Got questions?
                    </h2>
                    <p>Our team is here to help</p>
                    <Link className="home-contact__link" to='/contact'>
                        Contact us
                    </Link>
                </div>
            </div>
        </>
    )


}

export default Home;