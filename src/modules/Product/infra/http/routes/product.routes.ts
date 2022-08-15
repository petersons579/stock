import { Router } from 'express';
import { validate, validateUpdate, validateQuery } from './Celebrate';
import ProductController from '../controllers/ProductController';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', validateQuery, productController.index);
productRouter.get('/:id', productController.show);
productRouter.post('/', validate, productController.create);
productRouter.put('/:id', validateUpdate, productController.update);

export default productRouter;
