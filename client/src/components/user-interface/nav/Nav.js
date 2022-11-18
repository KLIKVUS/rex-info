import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import './Nav.scss';


function Nav() {
    return (
        <React.Fragment>
            <nav className="nav">
                <NavLink to={"/news"} className="nav__link">Новости</NavLink>
                <NavLink to={"/content"} className="nav__link">Контент</NavLink>
                <NavLink to={"/tournaments"} className="nav__link">Турниры</NavLink>
            </nav>

            <Outlet />
        </React.Fragment>
    );
}

export default Nav;
