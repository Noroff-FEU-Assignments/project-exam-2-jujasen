import { RiHotelLine, RiHome5Line } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { TiStarFullOutline } from 'react-icons/ti'

const SearchResult = () => {

    return (
        <>
            <div className=" searchresult">
                <div className="searchresult__tag flex">
                    <TiStarFullOutline className="searchresult__tag-icon"></TiStarFullOutline>
                    <p className="space__marg--l">Recommended</p>
                </div>
                <ul className="searchresult__list">
                    <li className="searchresult__item flex">
                        <HiOutlineLocationMarker className="searchresult__item-icon"></HiOutlineLocationMarker>
                        <div className="searchresult__item-info space__marg--l">
                            <h4>Fana</h4>
                            <p>Region</p>
                        </div>
                    </li>
                    <li className="searchresult__item flex">
                        <RiHotelLine className="searchresult__item-icon"></RiHotelLine>
                        <div className="searchresult__item-info space__marg--l">
                            <h4>Triathon Kokstad</h4>
                            <p>Hotel - Bergenshus region</p>
                        </div>
                    </li>
                    <li className="searchresult__item flex">
                        <RiHome5Line className="searchresult__item-icon"></RiHome5Line>
                        <div className="searchresult__item-info space__marg--l">
                            <h4>Home Away</h4>
                            <p>B&B - Årstad region</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )


}

export default SearchResult;