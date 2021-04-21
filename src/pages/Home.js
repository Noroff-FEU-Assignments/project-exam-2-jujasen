import { Link } from 'react-router-dom';
import { TiStarFullOutline } from 'react-icons/ti'
import SearchResult from '../components/SearchResult';
import axios from 'axios';
import { useState, useEffect } from "react";
import { BASE_URL, ACCOMMODATIONS_PATH } from '../utils/constants';
import img from '../img/logo-blue.png'



const Home = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [accommodations, setAccommodations] = useState([]);
    const [filteredData, setFilteredData] = useState(accommodations);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommended, setReccomended] = useState(true);

    const handleSearch = (e) => {
        let value = e.target.value;
        let result = [];

        if (value) {
            result = filteredData.filter((data) => {
                const slicedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                return data.name.includes(slicedValue) || data.region.includes(slicedValue);
            });
            setFilteredData(result);
            setReccomended(false);
        }

        if (value === '') {
            handleOption(selectedOption);
        }

    }

    const handleOption = (acctype) => {
        let value = acctype;
        let result = [];

        result = accommodations.filter((data) => {
            if (acctype === 'All') {
                return data.type;
            } else {
                return data.type.includes(value);

            }
        });
        setReccomended(false);
        setSelectedOption(value);
        console.log('selected: ' + selectedOption);

        setFilteredData(result);
    }

    useEffect(() => {
        if(!selectedOption) {
            setReccomended(true);
        }
    }, [selectedOption])


    useEffect(() => {
        const getAccommodations = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ACCOMMODATIONS_PATH}`);
                if (response.status === 200) {
                    setAccommodations(response.data);
                    setFilteredData(response.data);
                    console.log(response.data)
                } else {
                    setError('An error occurred');
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        getAccommodations();

    }, [])

    useEffect(() => {
        const renderRecommended = () => {

            let result = [];
            result = accommodations.filter((data) => {
                return data.recommended === true;
            });

            setFilteredData(result);
        }

        renderRecommended();

    }, [accommodations])



    return (
        <> 
                <div className="home">
                    <div className="home-start">
                        <h1 className="home-start__heading">I want to stay at...</h1>
                        <div>
                            <button
                            onClick={() => {
                                handleOption('All')
                            }}
                            className={`home-start__tag space__marg--r ${selectedOption === 'All' ? 'home-start__tag--active' : ''}`}>
                            All</button>
                            <button
                            onClick={() => {
                                handleOption('Hotel')
                            }} className={`home-start__tag space__marg--r ${selectedOption === 'Hotel' ? 'home-start__tag--active' : ''}`}>
                                Hotel
                            </button>
                            <button
                            onClick={() => {
                                handleOption('B&B')
                            }}
                            className={`home-start__tag ${selectedOption === 'B&B' ? 'home-start__tag--active' : ''}`}>
                                B&B
                            </button>
                        </div>
                        <input
                        onChange={handleSearch}
                        className="home-start__search" placeholder="Search by name or region"></input>
                    {loading ? <img className="loader loader--short" src={img} alt="pulsating logo"></img> : 
                    <div className=" searchresult">
                            {error ? <div class="error">ERROR <br /> Whoops, someone forgot to feed the hamsters that run this page :(
                    </div> : <div>{recommended ? <div className="searchresult__tag flex">
                                <TiStarFullOutline className="searchresult__tag-icon"></TiStarFullOutline>
                                <p className="space__marg--l">Recommended</p>
                            </div> :
                                <div className="searchresult__tag flex"><p className="space__marg--l">Results</p></div>}
                                <ul className="searchresult__list">
                                    {filteredData?.map(function (item) {
                                        return (
                                            <div key={item.id}>
                                                <SearchResult
                                                    id={item.id}
                                                    name={item.name}
                                                    type={item.type}
                                                    region={item.region}>
                                                </SearchResult>
                                            </div>
                                        )
                                    })}
                                </ul></div>}
                        
                    </div>
                }

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