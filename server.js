const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const passport = require("./passport/setup");
const auth = require("./routes/auth");


const app = express();
const port = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/users";

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
    session({
        secret: "very secret this is",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", auth);
app.get("/", (req, res) => res.send("Good monring sunshine!"));

app.listen(port, () => console.log(
  `Example app listening on port ${port}!`
));