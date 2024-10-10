const express = require('express');
const Product = require('../models/productModel');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Criar produto (somente autenticado)
router.post('/', protect, async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar produto' });
  }
});

// Buscar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

// Atualizar produto
router.put('/:id', protect, async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, description }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
});

// Deletar produto
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto removido' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
});

module.exports = router;
