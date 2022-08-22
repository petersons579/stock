import { Router } from 'express';
import FilterProductController from '../controllers/FilterProductController';

const productFilterRouter = Router();
const filterProductController = new FilterProductController();

productFilterRouter.get('/', filterProductController.index);

export default productFilterRouter;
