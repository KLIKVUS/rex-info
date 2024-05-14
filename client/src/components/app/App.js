import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { createBrowserHistory } from "history";

import Nav from '../user-interface/nav/Nav';
import News from '../user-interface/news/News';
import Content from '../user-interface/content/Content';
import Tournaments from '../user-interface/tournaments/Tournaments';

import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';

import Auth from '../admin-interface/auth/Auth';
import Menu from '../admin-interface/menu/Menu';
import ToolsForNews from '../admin-interface/tools/forNews/index';
import ToolsForContent from '../admin-interface/tools/ToolsForContent';
import ToolsForTournaments from '../admin-interface/tools/ToolsForTournaments';

import './App.scss';


function App() {
    const { login, logout, token } = useAuth();
    const isAuthenticated = !!token;

    const RequireAuth = ({ isAuthenticated }) => {
        if (!isAuthenticated) return <Navigate to="./auth" />;
        return (
            <React.Fragment>
                <Menu />
                <Outlet />
            </React.Fragment>
        );
    }

    const AddContext = () => {
        return (
            <AuthContext.Provider value={{ login, logout, token, isAuthenticated }}>
                <Outlet />
            </AuthContext.Provider>
        )
    }
    const customHistory = createBrowserHistory();

    return (
        <Routes history={customHistory}>
            {/* <Route path="*" exact element={<Navigate to={"/not-found"} status={404} />} /> */}
            <Route path="/not-found" element={"Not Found Page"} />

            <Route path="/" element={<Nav />}>
                <Route index element={<Navigate to={"/news"} />} />

                <Route path="news" element={<News />} />
                <Route path="content" element={<Content />} />
                <Route path="tournaments" element={<Tournaments />} />
            </Route>

            <Route path="/admin" element={<AddContext />}>
                    <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
                        <Route index element={<Navigate to={"tools-for-news"} />} />
                        <Route path="tools-for-news" element={<ToolsForNews />} />
                        <Route path="tools-for-content" element={<ToolsForContent />} />
                        <Route path="tools-for-tournaments" element={<ToolsForTournaments />} />
                    </Route>

                    <Route path="auth" element={<Auth />} />
            </Route>
        </Routes>
    );
}

export default App;
