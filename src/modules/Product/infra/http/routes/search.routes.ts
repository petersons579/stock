import { Router } from 'express';
import SearcBarCodeController from '../controllers/SearchBarCodeController';

const searchRouter = Router();
const searchController = new SearcBarCodeController();

searchRouter.get('/:barcode', searchController.index);

export default searchRouter;
