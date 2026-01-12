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
  {
    route: "/payment/testVampayTxnStatus",
    method: "get",
    action: PaymentController.testVampayTxnStatus,
    middleware: [],
  },
];

module.exports = {
  Routes,
};
