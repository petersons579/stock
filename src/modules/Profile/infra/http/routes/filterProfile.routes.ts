import { Router } from 'express';
import FilterProfileController from '../controllers/FilterProfileController';

const profileFilterRouter = Router();
const filterController = new FilterProfileController();

profileFilterRouter.get('/', filterController.index);

export default profileFilterRouter;
