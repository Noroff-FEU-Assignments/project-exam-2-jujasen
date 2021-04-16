import { Link } from 'react-router-dom';
import SearchResult from '../components/SearchResult';
import BackLink from '../components/BackLink';
import Heading from '../components/Heading';
import { useState } from "react";
import Select from 'react-select';
import { GrMoney } from 'react-icons/gr';
import EstCard from '../components/EstCard';
const Accommodation = () => {
    const [selectedOption, setSelectedOption] = useState('All');
    const [priceLow, setpriceLow] = useState(true);

    const changePrice = () => {
        setpriceLow(!priceLow);
    }

    const options = [
        { value: 'All', label: 'All' },
        { value: 'Hotel', label: 'Hotel' },
        { value: 'B&B', label: 'B&B' },
    ];



    return (
        <>
            <div className="accmd">
                <div className="header">
                    <BackLink/>
                    <Heading className="header__title" title="All accomodation" />
                    <div className="header__filters flex flex--start">
                        <Select
                            className="header__dropdown"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            placeholder={selectedOption}
                        />
                        <input className="header__search" placeholder="Search by name or region"></input>
                    </div>
                    <div className="header__filters flex flex--start">
                        <button 
                        onClick={changePrice}
                        className={`header__tag flex ${priceLow ? 'header__tag--active' : ''}`}>
                            <GrMoney 
                            className={`header__tag-icon ${priceLow ? 'header__tag-icon--active' : ''} `}/>
                            <p>Low to high price</p>
                        </button>
                        <button 
                        onClick={changePrice}
                            className={`header__tag flex ${!priceLow ? 'header__tag--active' : ''}`}>
                            <GrMoney className={`header__tag-icon ${!priceLow ? 'header__tag-icon--active' : ''} `} />
                            <p>High to low price</p>
                        </button>
                    </div>
                </div>
                <div className="accmd__results">
                    <EstCard/>
                </div>
            </div>
        </>
    )


}

export default Accommodation;