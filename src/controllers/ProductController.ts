import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';

export const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  try {
    const productRepository = getRepository(Product);
    const newProduct = productRepository.create(productData);
    await productRepository.save(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Could not create product' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

  try {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id: parsedId }});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
  const productData = req.body;

  try {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id: parsedId }});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    productRepository.merge(product, productData);
    await productRepository.save(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

  try {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id: parsedId }});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await productRepository.remove(product);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete product' });
  }
};
