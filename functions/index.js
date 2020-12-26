const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { request, response } = require('express');
const stripe = require('stripe')('sk_test_51Hw7zyEcSacaN6BlyJ7GaGiA6HDs7aumPKuLitx1giXGSGFSOAb3pTECmZZeAW3zR3einPW57HKLMzDg4Q2j3Zai00XUfqbfYS')

//AppConfig
const app = express();


//Middlewares

app.use(cors({origin : true}));
app.use(express.json());



//API Routes
app.get('/',(request, response) =>{
    response.status(200).send("Hello World")
})

app.post('/payments/create', async (request, response) =>{
    const total =Math.round(request.query.total) ;
    console.log("Payment Request Recieved", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency : "inr"
    });
    response.status(201).send({
        clientSecret : paymentIntent.client_secret
    })
})


//Listen
exports.api = functions.https.onRequest(app);