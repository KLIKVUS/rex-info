const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || config.get("port");

app.use(express.json({extended: true}));
app.use(cookieParser(config.get("cookieParserSecret")));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/news", require("./routes/news.routes"));
// app.use("/api/content", require("./routes/content.routes"));
// app.use("/api/tournaments", require("./routes/tournaments.routes"));

async function startApp() {
    app.listen(PORT, (e) => {
        if (e) return console.error("-- Boss we have error \n error msg:", e);
        if (process.env.PORT) return console.log("-- Server listening on yours url");
        return console.log(`-- Server listening on http://localhost:${PORT}`);
    });
}

async function connectToDB() {
    try {
        await mongoose.connect(config.get("mongoURI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        startApp();
    } catch (e) {
        console.log("-- Server Error. \n" + e.message);
        process.exit(1);
    }
}
connectToDB();