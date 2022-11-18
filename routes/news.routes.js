const { Router } = require("express");
const router = Router();

const config = require("config");
const News = require("../models/News");
const auth = require("../middleware/auth.middleware");


router.get("/get", async (_req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Ошибка" })
    }
});

router.post("/post", auth, async (req, res) => {
    try {
        const user = req.user;

        // if(config.get("rolesThatСanСreateСontent").)

        const news = new News({ 
            title: req.body.title,
            text: req.body.text,
            imgLink: req.body.imgLink,
            author: user.userName
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Ошибка" })
    }
});

router.put("/edit", auth, async (req, res) => {
    try {
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Ошибка" })
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Ошибка" })
    }
});

module.exports = router;