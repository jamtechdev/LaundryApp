// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const PAYPAY = require('@paypayopa/paypayopa-sdk-node');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Configure PayPay SDK
// PAYPAY.Configure({
//     clientId:'a_uEWiVpQu74_9dku',
//     clientSecret: 'Nevmmudjtrnezf24YXfGu4lwqUPqkHfBpJ8YaYArw7Q=',
//     merchantId: '779143648334356480',
//     productionMode: false // true for production, false for sandbox
// });

// // 🟢 API Route to create a PayPay QR code for payment
// app.post('/paypay', async (req, res) => {
//     try {
//         const { amount } = req.body; // Amount in JPY & User's PayPay ID
//         const orderId = `ORDER-${Date.now()}`; // Generate unique order ID
//         console.log(amount, orderId)
//         let payload = {
//             merchantPaymentId: orderId,
//             amount: {
//               amount:parseInt(amount),
//               currency: "JPY"
//             },
//             codeType: "ORDER_QR",
//             orderDescription: "Mune's Favourite Cake",
//             isAuthorization: false
//           };

//         // Call PayPay API to generate QR code
//         PAYPAY.QRCodeCreate(payload, (response) => {
//             console.log(response)
//             if (!response || !response.BODY || !response.BODY.resultInfo) {
//                 console.error("Unexpected API response:", response);
//                 return res.status(500).json({ success: false, error: "Unexpected PayPay API response format." });
//             }

//             const { resultInfo, data } = response.BODY;

//             if (resultInfo.code === 'SUCCESS' && data && data.url) {
//                 return res.json({
//                     success: true,
//                     paymentUrl: data.url,
//                     paymentId: data.merchantPaymentId,
//                     payment: data
//                 });
//             } else {
//                 console.error("PayPay API Error:", resultInfo);
//                 return res.status(500).json({ success: false, error: resultInfo.message || "Failed to generate QR Code." });
//             }
//         });
//     } catch (error) {
//         console.error('PayPay API Error:', error);
//         res.status(500).json({ success: false, message: 'Failed to create PayPay payment' });
//     }
// });

// // 🟢 API Route to Check Payment Status
// app.get('/paypay/status/:paymentId', async (req, res) => {
//     try {
//         const { paymentId } = req.params;
//         console.log("Checking payment status for:", paymentId);  // Log to debug

//         PAYPAY.GetPaymentDetails(paymentId, (response) => {
//             console.log("API Response:", response);  // Log API response

//             if (!response || !response.BODY || !response.BODY.resultInfo) {
//                 return res.status(500).json({ success: false, error: "Unexpected PayPay API response format." });
//             }

//             const { resultInfo, data } = response.BODY;

//             if (resultInfo.code === 'SUCCESS' && data) {
//                 return res.json({
//                     success: true,
//                     paymentStatus: data.status,
//                     paymentDetails: data
//                 });
//             } else {
//                 return res.status(500).json({ success: false, error: resultInfo.message || "Failed to fetch payment status." });
//             }
//         });
//     } catch (error) {
//         console.error('PayPay API Error:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch PayPay payment status' });
//     }
// });


// // Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });
