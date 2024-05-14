const { Router } = require("express");
const router = Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");


function setCookie (res, userId) {
    const token = jwt.sign(
        { userId },
        config.get("jwtSecret"),
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        path: "/admin",
        expires: new Date(Date.now() + ((24 * 60 * 60 * 1000) * 7))
    });
}


router.post(
    "/register",
    [
        check("login", "Введите логин.").exists().notEmpty(),
        check("password", "Минимальная длина пароля 6 символов.").isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации."
                })
            }

            const { login, password } = req.body;
            const candidate = await User.findOne({ login });

            if (candidate) {
                return res.status(400).json({ message: "Такой пользовател уже существует." });
            }

            const hashedPassword = await bcrypt.hash(password, config.get("bcryptSecret"));
            const user = new User({ login, password: hashedPassword });

            await user.save();

            setCookie(res, user.id);

            res.status(201).json({ message: "Пользователь создан." });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Ошибка" });
        }
    }
)

router.post(
    "/login",
    [
        check("login", "Введите логин.").exists().notEmpty(),
        check("password", "Введите пароль.").exists().notEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при авторизации."
                })
            }

            const { login, password } = req.body;
            const user = await User.findOne({ login });

            if (!user) {
                return res.status(400).json({ message: "Пользователь не найден." });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Пароль неверный." });
            }

            setCookie(res, user.id);

            res.json({ message: "Пользователь найден." });
        } catch (e) {
            res.status(500).json({ message: "Ошибка" });
        }
    }
)

module.exports = router;