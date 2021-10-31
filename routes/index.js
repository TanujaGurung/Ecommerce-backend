var express = require('express');
var router = express.Router();
//const stripe = require("stripe")("sk_test_51JJDzRSGMn7poZZ91emL5SwJlVM1lfQ1mTjKd8uI9iZ4loUdddiemaE4HqmwylaVqi5iR8TnNx6BP2Hhqp0cjeGI00S9ls2p2R");
//const uuid = require("uuid/v4");



// // app.use(express.json());
// // app.use(cors());

// // app.get("/", (req, res) => {
// //   res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
// // });

// app.post("/checkout", async (req, res) => {
//   console.log("Request:", req.body);

//   let error;
//   let status;
//   try {
//     const { product, token } = req.body;

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id
//     });

//     const idempotency_key = uuid();
//     const charge = await stripe.charges.create(
//       {
//         amount: product.price * 100,
//         currency: "usd",
//         customer: customer.id,
//         receipt_email: token.email,
//         description: `Purchased the ${product.name}`,
//         shipping: {
//           name: token.card.name,
//           address: {
//             line1: token.card.address_line1,
//             line2: token.card.address_line2,
//             city: token.card.address_city,
//             country: token.card.address_country,
//             postal_code: token.card.address_zip
//           }
//         }
//       },
//       {
//         idempotency_key
//       }
//     );
//     console.log("Charge:", { charge });
//     status = "success";
//   } catch (error) {
//     console.error("Error:", error);
//     status = "failure";
//   }

//   res.json({ error, status });
// });



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
