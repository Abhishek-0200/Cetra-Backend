import express from 'express';
import {createPayment, completePayment } from '../controllers/payement.controller.js';
import { protactRoute } from '../middleware/protactRoute.js';

const router = express.Router();

// Route to create a payment
router.post('/', protactRoute, createPayment);

// Route to complete a payment
router.patch('/:id/complete', verifyJWT, completePayment);

export default router;