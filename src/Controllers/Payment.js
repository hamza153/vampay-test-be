
const { HttpsProxyAgent } = require("https-proxy-agent");
const os = require("os");
const { default: axios } = require("axios");

const proxyUrl = process.env.QUOTAGUARDSTATIC_URL;
const agent = new HttpsProxyAgent(proxyUrl);

const PaymentController = {
  testVampay: async (req, res) => {
    const { merchant_id, token, callBackUrl, email, number, amount } = req.query;
    // Get server IP address (the IP that will be seen by the external API)
    let serverIp = 'Unknown';
    let requestUrl = `${process.env.VAMPAY_BASE_URL}/VampayLiveApi/Intent`;
    let postBody = {};
    let headers = {};
    try {
      try {
        // Try to get public IP from a service
        const publicIpResponse = await axios.get('https://api.ipify.org?format=json', {
          timeout: 5000,
          httpsAgent: agent,
        });
        serverIp = publicIpResponse.data.ip;
      } catch (ipError) {
        // Fallback to network interfaces
        const networkInterfaces = os.networkInterfaces();
        for (const interfaceName in networkInterfaces) {
          const addresses = networkInterfaces[interfaceName];
          for (const addr of addresses) {
            if (addr.family === 'IPv4' && !addr.internal) {
              serverIp = addr.address;
              break;
            }
          }
          if (serverIp !== 'Unknown') break;
        }
      }

      headers = {
        token: token,
        "Content-Type": "application/json",
      };

      postBody = {
        merchent_id: merchant_id,
        email_id: email,
        mobile_no: number,
        amount: amount,
        webhook_url: callBackUrl,
      };

      const response = await axios.post(
        requestUrl,
        postBody,
        {
          headers: headers,
          httpsAgent: agent,
        }
      );

      return res.status(200).json({
        message: "Vampay payment link generated successfully",
        success: true,
        data: response.data,
        requestBody: req.query,
        serverInfo: {
          serverIp: serverIp,
          requestUrl: requestUrl,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error generating payment link",
        error: err.message,
        success: false,
        data: null,
        requestBody: req.query,
        serverInfo: {
          serverIp: serverIp,
          requestUrl: requestUrl,
          requestBody: postBody,
          requestHeaders: headers,
        },
      });
    }
  },

  testVampay: async (req, res) => {
    const { merchant_id, token, order_id } = req.query;
    // Get server IP address (the IP that will be seen by the external API)
    let serverIp = 'Unknown';
    let requestUrl = `${process.env.VAMPAY_BASE_URL}/VampayLiveApi/IntentCheckTxnStatus`;
    let postBody = {};
    let headers = {};
    try {
      try {
        // Try to get public IP from a service
        const publicIpResponse = await axios.get('https://api.ipify.org?format=json', {
          timeout: 5000,
          httpsAgent: agent,
        });
        serverIp = publicIpResponse.data.ip;
      } catch (ipError) {
        // Fallback to network interfaces
        const networkInterfaces = os.networkInterfaces();
        for (const interfaceName in networkInterfaces) {
          const addresses = networkInterfaces[interfaceName];
          for (const addr of addresses) {
            if (addr.family === 'IPv4' && !addr.internal) {
              serverIp = addr.address;
              break;
            }
          }
          if (serverIp !== 'Unknown') break;
        }
      }

      headers = {
        token: token,
        "Content-Type": "application/json",
      };

      postBody = {
        merchent_id: merchant_id,
        order_id: order_id,
      };

      const response = await axios.post(
        requestUrl,
        postBody,
        {
          headers: headers,
          httpsAgent: agent,
        }
      );

      return res.status(200).json({
        message: "Vampay payment link generated successfully",
        success: true,
        data: response.data,
        requestBody: req.query,
        serverInfo: {
          serverIp: serverIp,
          requestUrl: requestUrl,
          requestBody: postBody,
          requestHeaders: headers,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error generating payment link",
        error: err.message,
        success: false,
        data: null,
        requestBody: req.query,
        serverInfo: {
          serverIp: serverIp,
          requestUrl: requestUrl,
          requestBody: postBody,
          requestHeaders: headers,
        },
      });
    }
  },
}

module.exports = {
  PaymentController,
};
