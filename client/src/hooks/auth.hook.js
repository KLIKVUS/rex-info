import { useCallback, useEffect, useState } from "react";


export const useAuth = () => {
    const getCookie = () => {
        let matches = document.cookie.match(new RegExp(
            // eslint-disable-next-line
            "(?:^|; )token=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : null;
    }

    const [token, setToken] = useState(getCookie());

    const login = useCallback((data) => {
        setToken(data);
    }, []);

    const logout = useCallback(() => {
        setToken("");
        let updatedCookie = 'token="";path="/admin";max-age=-1;';
        document.cookie = updatedCookie;
    }, []);
    
    useEffect(() => {
        const data = getCookie();
        if (data) login(data);
    }, [login])

    return { login, logout, token };
}