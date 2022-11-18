import '../../../../partials/card/Card.scss';


function New({ title, author, date, text, image }) {
    return (
        <div className="card card--with-underline">
            <div>
                <div className="card__title-and-info-wrapper">
                    <h1 className="card__title">{title}</h1>

                    <div className="card__info">
                        <p>Автор поста: {author}</p>
                        <p>Дата поста: {date}</p>
                    </div>
                </div>

                <p className="card__text">{text}</p>
            </div>

            {image && <img className="card__image--with-margin" src={image} alt="Картинка новости" />}
        </div>
    );
}

export default New;
