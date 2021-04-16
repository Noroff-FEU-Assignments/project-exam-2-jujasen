import img from '../img/home.png'
import { TiStarFullOutline } from 'react-icons/ti'

const EstCard= () => {


    return (
        <>
            <div className="estcard flex">
                <div className="estcard__section flex flex--col flex--space">
                    <img className="estcard__img" src={img} alt="Hotel name"/>
                    <div className="estcard__stars flex flex--start">
                        <TiStarFullOutline className="estcard__star"></TiStarFullOutline>
                        <TiStarFullOutline className="estcard__star"></TiStarFullOutline>
                        <TiStarFullOutline className="estcard__star"></TiStarFullOutline>
                    </div>
                    <p>3 stars</p>
                </div>
                <div className="flex flex--col flex--space">
                    <div>
                        <h3 className="estcard__title">Trathon Flesland</h3>
                        <p className="estcard__region">Fana region</p>
                    </div>
                    <p
                    className="estcard__price"
                    ><span>from</span>kr 1050<span>per night</span></p>
                </div>
            </div>
        </>
    )


}

export default EstCard;