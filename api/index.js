import mongoose from "mongoose";
import express from 'express';
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import campaignRoutes from './routes/campaign.route.js';
import Stripe from 'stripe';
import Campaign from './models/campaign.model.js';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
dotenv.config();

// Set frontend origin
const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin
  credentials: true,
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors(corsOptions));
const port = 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api', campaignRoutes);

app.post('/create-payment-session', async (req, res) => {
  const { amount, campaignId, email } = req.body;

  try {
    const product = await stripe.products.create({
      name: `Donation for Campaign ${campaignId}`,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount * 100, // Convert to smallest currency unit (e.g., paisa)
      currency: 'inr',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: `http://localhost:4000/success?campaignId=${campaignId}&amount=${amount}`,
      cancel_url: 'http://localhost:4000/cancel',
      customer_email: email,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Route to handle successful payments
app.get('/success', async (req, res) => {
  const { campaignId, amount } = req.query;

  try {
    // Find the campaign by ID and update its raised amount
    const campaign = await Campaign.findById(campaignId);
    if (campaign) {
      campaign.raisedAmount += parseFloat(amount);
      await campaign.save();
      res.redirect(`http://localhost:5173/payment-success?amount=${amount}&campaignId=${campaignId}`);
    } else {
      res.status(404).json({ error: 'Campaign not found' });
    }
  } catch (error) {
    console.error('Error updating raised amount:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle canceled payments
app.get('/cancel', (req, res) => {
  res.redirect('http://localhost:5173/payment-failure');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
