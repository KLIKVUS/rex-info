import Video from "./video/Video";

import "./Content.scss";


const data = [
    {
        "id": 1,
        "title": "Название видосика",
        "description": "Описание или да.",
        "link": "https://youtu.be/JMJXvsCLu6s"
    },
    {
        "id": 2,
        "title": "Название видосика",
        "description": undefined,
        "link": "https://youtu.be/JMJXvsCLu6s"
    },
]

function Content() {
    return (
        <main className="video-wrapper">
            {data.map((item) => <Video key={item.id} {...item} />)}
        </main>
    );
}

export default Content;
