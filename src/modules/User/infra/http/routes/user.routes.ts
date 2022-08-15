import { Router } from 'express';
import UserController from '../controllers/UserController';
import { validate, validateUpdate, validateQuery } from './Celebrate';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', validateQuery, userController.index);
userRouter.get('/:id', userController.show);
userRouter.post('/', validate, userController.create);
userRouter.put('/:id', validateUpdate, userController.update);

export default userRouter;
