import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";

import "./Auth.scss";


function Auth() {
    const auth = useContext(AuthContext);
    const { loading, request, error } = useHttp();
    const [form, setForm] = useState({
        login: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        if (error) {
            const errorsList = <ul>{error?.errors?.map((elem, key) => <li key={key}>{elem.msg}</li>)}</ul>;
            const msg = (
                <div className="auth-wrapper__msg-box">
                    <p>Ошибка : {error.message}</p>
                    {error.errors && errorsList}
                </div>
            )
            setErrorMsg(msg);
        }
    }, [error])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async (e) => {
        try {
            e.preventDefault();
            const data = await request("/api/auth/login", "POST", { ...form });
            auth.login(data);
            navigation("/admin");
        } catch (e) { console.log(e); }
    }
    // const registerHandler = async (e) => {
    //     try {
    //         e.preventDefault();
    //         await request("/api/auth/login", "POST", { ...form });
    //     } catch (e) { console.log(e); }
    // }

    return (
        <div className="auth-wrapper">
            <h1 className="auth-wrapper__title">Авторизация</h1>

            {errorMsg}

            <form className="auth-wrapper__auth-form auth-form">
                <input
                    name="login"
                    type="text"
                    placeholder="Логин"
                    onChange={changeHandler}
                    className="auth-form__input"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    onChange={changeHandler}
                    className="auth-form__input"
                />

                <button onClick={loginHandler} disabled={loading} className="auth-form__btn">Войти</button>
            </form>
        </div>
    );
}

export default Auth;
