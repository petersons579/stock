import { Router } from 'express';
import FilterUserController from '../controllers/FilterUserController';

const userFilterRouter = Router();
const filterUserController = new FilterUserController();

userFilterRouter.get('/', filterUserController.index);

export default userFilterRouter;
