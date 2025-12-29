const { PaymentController } = require("../Controllers");

const Routes = [
  {
    route: "/",
    method: "get",
    action: (req, res) => {
      res.status(200).json({
        service: "online",
        version: "1.0.0",
        message: "VamPay backend service.",
      });
    },
    middleware: [],
  },
  {
    route: "/payment/testVampay",
    method: "get",
    action: PaymentController.testVampay,
    middleware: [],
  },
];

module.exports = {
  Routes,
};
