import express from 'express';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import connnetMongoDb from './db/connectToDb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connnetMongoDb(process.env.MONGO_URL);
});