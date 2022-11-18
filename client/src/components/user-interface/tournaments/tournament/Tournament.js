import { useState } from 'react';

import '../../../../partials/card/Card.scss';


function Tournament({ title, date, winners }) {
    const [winnersWrapperTracker, setWinnersWrapperTracker] = useState(false);

    const openWinnersWrapper = () => {
        setWinnersWrapperTracker(!winnersWrapperTracker);
    }

    return (
        <div className="card card--wide card--with-underline-column">
            <h1 className="card__title">{title}</h1>

            <div className="card__info-centered">
                <p>Дата проведения: {date}</p>
                {winners && <button onClick={openWinnersWrapper}>{winnersWrapperTracker ? "Закрыть результаты" : "Открыть результаты"}</button>}
            </div>

            {winners && <ul className={winnersWrapperTracker ? "card__winners-wrapper" : "card__winners-wrapper--close"}>
                {winners.map((item) => (
                    <li key={item.id} className="card__winner-wrapper">
                        {item.place}. {item.name}
                    </li>
                ))}
            </ul>}
        </div>
    );
}

export default Tournament;
