const session = require('express-session');
const flash = require('express-flash');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const passport = require('passport');
const timeHelper = require('../helpers/time-helper');
require('../third-party/strategy/platforms');

const Settings = {
  set: (app, express) => {
    app.set('view engine', 'ejs');
    app.set('trust proxy', 1);
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('node_modules'));
    app.use(express.static('public'));
    app.use(express.json());

    app.use(session({
      cookie: { maxAge: timeHelper.day * 7 },
      secret: 'wqeoijwdfyawd',
      resave: true,
      saveUninitialized: true,
    }));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
    }));
  },
};

module.exports = Settings;
