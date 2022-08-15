import { Router } from 'express';
import StockController from '../controllers/StockController';
import { validate, validateUpdate, validateQuery } from './Celebrate';

const stockRouter = Router();
const stockController = new StockController();

stockRouter.get('/', validateQuery, stockController.index);
stockRouter.get('/:id', stockController.show);
stockRouter.post('/', validate, stockController.create);
stockRouter.put('/:id', validateUpdate, stockController.update);

export default stockRouter;
