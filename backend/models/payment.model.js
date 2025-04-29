import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true // Ensures each transaction ID is unique
    },
    amount: {
        type: Number,
        required: true,
        min: 0 // Payment amount must be non-negative
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'], // Enum for payment status
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the timestamp for the payment
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;