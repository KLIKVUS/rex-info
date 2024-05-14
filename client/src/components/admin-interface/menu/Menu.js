import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import "./Menu.scss";


function Menu() {
    const auth = useContext(AuthContext);
    const [navState, setNavState] = useState(false);

    const logoutHandler = () => auth.logout();

    return (
        <nav className="admin-nav">
            <div className="menu-icon">
                <input className="menu-icon__cheeckbox" type="checkbox" onClick={() => setNavState(!navState)} />
                <div>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div onClick={() => setNavState(!navState)} className={navState ? "admin-nav__links-wrapper" : "admin-nav__links-wrapper--close"}>
                <NavLink to={"tools-for-news"} className="admin-nav__link">Новости</NavLink>
                <NavLink to={"tools-for-content"} className="admin-nav__link">Контент</NavLink>
                <NavLink to={"tools-for-tournaments"} className="admin-nav__link">Турниры</NavLink>
                <NavLink to={"/"} className="admin-nav__back-link">Главная</NavLink>
                <button className="admin-nav__btn" onClick={logoutHandler}>Выйти из аккаунта</button>
            </div>
        </nav>
    )
}

export default Menu;