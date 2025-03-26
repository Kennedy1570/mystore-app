const express = require('express');
const Product = require('../models/Products');
const router = express.Router();

// Get all products with pagination, filtering, and sorting
router.get('/', async (req, res) => {
    try {
        // Parse pagination parameters
        const page = parseInt(req.query._page) || 1;
        const limit = parseInt(req.query._limit) || 10;
        const skip = (page - 1) * limit;
        
        // Build query filters
        const query = {};
        
        // Add brand filter if provided
        if (req.query.brand) {
            query.brand = req.query.brand;
        }
        
        // Add category filter if provided
        if (req.query.category) {
            query.category = req.query.category;
        }
        
        // Add search query if provided (q parameter)
        if (req.query.q) {
            query.$or = [
                { name: { $regex: req.query.q, $options: 'i' } },
                { description: { $regex: req.query.q, $options: 'i' } }
            ];
        }
        
        // Determine sort order
        const sortField = req.query._sort || 'createdAt';
        const sortOrder = req.query._order === 'asc' ? 1 : -1;
        const sortOptions = {};
        sortOptions[sortField] = sortOrder;
        
        // Get total count for pagination
        const totalCount = await Product.countDocuments(query);
        
        // Execute query with pagination and sorting
        const products = await Product.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);
        
        // Set pagination headers
        res.set('X-Total-Count', totalCount);
        res.set('Access-Control-Expose-Headers', 'X-Total-Count');
        
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (err) {
      console.error('Error fetching product details:', err);
      res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        // Validate that ID exists
        if (!req.params.id) {
        return res.status(400).json({ message: 'Product ID is required' });
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
