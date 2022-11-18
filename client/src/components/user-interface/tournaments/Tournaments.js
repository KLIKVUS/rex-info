import Tournament from "./tournament/Tournament";


const data = [
    {
        "id": 1,
        "title": "Название турнира",
        "date": "01.08.2022",
        "winners": [
            {
                "id": 1,
                "name": "Ruslan",
                "place": 1
            },
            {
                "id": 2,
                "name": "Ярик",
                "place": 2
            }
        ]
    },
    {
        "id": 2,
        "title": "Название турнира",
        "date": "01.08.2022",
        "winners": undefined
    }
]

function Tournaments() {
    return (
        <main>
            {data.map((item) => <Tournament key={item.id} {...item} />)}
        </main>
    );
}

export default Tournaments;
