import express from 'express';
import { getAllProducts, deleteProductById } from '../controllers/product.controller.js'; // Importing the controller functions 
import { protactRoute } from './middleware/protactRoute.js';

const router = express.Router();

// Route to get all products
router.get('/', protactRoute, getAllProducts);

// Route to delete a product by ID (Admin only)
router.delete('/:id', protactRoute, deleteProductById);

export default router;