import Payment from '../models/payment.model.js';


// Controller to create a payment
export const createPayment = async (req, res) => {
    try {
        const { product, transactionId, amount } = req.body;

        if (!product || !transactionId || !amount) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const payment = new Payment({
            user: req.user.id,
            product,
            transactionId,
            amount,
            paymentStatus: 'Pending'
        });

        const savedPayment = await payment.save();
        res.status(201).json({ message: 'Payment created successfully.', payment: savedPayment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment.', error: error.message });
    }
};

// Controller to complete a payment
export const completePayment = async (req, res) => {
    try {
        const paymentId = req.params.id;

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        if (payment.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        if (payment.paymentStatus === 'Completed') {
            return res.status(400).json({ message: 'Payment is already completed.' });
        }

        // Simulate payment processing logic
        const isPaymentSuccessful = Math.random() > 0.2; // Simulate a 20% chance of failure

        if (!isPaymentSuccessful) {
            payment.paymentStatus = 'Failed';
            await payment.save();
            return res.status(400).json({ message: 'Payment failed. Please try again later.' });
        }

        payment.paymentStatus = 'Completed';
        const updatedPayment = await payment.save();

        res.status(200).json({ message: 'Payment completed successfully.', payment: updatedPayment });
    } catch (error) {
        res.status(500).json({ message: 'Error completing payment.', error: error.message });
    }
};

