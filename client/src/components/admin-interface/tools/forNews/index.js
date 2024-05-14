import "./style.scss";


function ToolsForNews() {
    return (
        <main className="admin-main">
            <h3>Форма создания новости:</h3>
            <form>
                <label htmlFor="title">Название:</label>
                <input name="title" placeholder="..." required />

                <label htmlFor="text">Текст:</label>
                <textarea name="text" placeholder="..." required />
                
                <label htmlFor="imgLink">Картинка:</label>
                <input name="imgLink" placeholder="..." required />
            </form>
        </main>
    )
}

export default ToolsForNews;