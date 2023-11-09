const {captureOrder,createOrder} = require("../utils/paypal")


const newOrder =  async (req, res) => {
    try {
      // use the cart information passed from the front-end to calculate the order amount detals
      const { priceCart } = req.body;
      console.log(req.body, "este es el body")
      const { jsonResponse, httpStatusCode } = await createOrder(priceCart);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  }


const captureTheOrder = async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  }
  
  
module.exports = {
    captureTheOrder,
    newOrder
}  