const express = require("express");
const app = express();
const cors = require("cors");
const favicon = require("express-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();

const authRouter = require("./routes/auth.js");
const eventsRouter = require("./routes/events.js");
const searchRouter = require("./routes/search.js");
const bookmarksRouter = require("./routes/bookmarks.js");

app.use(
  helmet({
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    dnsPrefetchControl: { allow: false },
    expectCt: { maxAge: 86400, enforce: true },
    frameguard: { action: "deny" },
    hidePoweredBy: true,
    hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { policy: "none" },
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true,
  })
);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(bodyParser.json());

// routes
app.get("/api/v1", (req, res) => {
  return res.json({ data: "This is a full stack app!" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/bookmarks", bookmarksRouter);

module.exports = app;
