const { Routes } = require('../Routes/routes');

const RoutesProvider = (app) => {
  Routes.forEach((Route, Index) => {
    const { route, method, action, middleware } = Route;
    app[method](route, middleware, action);
  });
};

module.exports = {
  RoutesProvider
};
