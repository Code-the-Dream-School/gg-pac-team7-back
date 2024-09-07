const express = require("express");
const app = express();
const cors = require("cors");
const favicon = require("express-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("../utils/swaggerDocs.json");
const helmet = require("helmet");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const eventsRouter = require("./routes/events.js");
const searchRouter = require("./routes/search.js");
const bookmarksRouter = require("./routes/bookmarks.js");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
});

// middleware
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(bodyParser.json());

app.get("/api/v1", (req, res) => {
  return res.json({ data: "This is a full stack app!" });
});
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
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/bookmarks", bookmarksRouter);

module.exports = app;
