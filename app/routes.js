const { homeHandler, pageNotFoundHandler } = require("./handlers");

const Routes = {
  init: (app) => {
    app.get('/', homeHandler);
    app.use('/', pageNotFoundHandler);
  },
};

module.exports = Routes;
