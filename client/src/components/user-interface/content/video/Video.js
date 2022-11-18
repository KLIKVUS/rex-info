import "../../../../partials/card/Card.scss";


function Video({ title, description, link }) {
    const regex = new RegExp("[A-Z]\\w+")
    const image = `http://img.youtube.com/vi/${regex.exec(link)}/mqdefault.jpg`

    return (
        <div className="card card--wide">
            <a href={link} target="_blank" rel="noreferrer">
                <img className="card__image" src={image} alt="Картинка видео" />
            </a>

            <h1 className="card__title card__title--centered">{title}</h1>

            <p className="card__text card__text--centered">{description}</p>
        </div>
    );
}

export default Video;
