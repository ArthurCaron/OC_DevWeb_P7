const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ztmlhtm.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    )
    .then(() => console.log("Connexion to MongoDB Atlas => success"))
    .catch(() => console.log("Connexion to MongoDB Atlas => failure"));

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(express.json({ limit: "100mb" }));

const apiLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use("/api/auth", apiLimiter, userRoutes);
app.use("/api/posts", apiLimiter, postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
