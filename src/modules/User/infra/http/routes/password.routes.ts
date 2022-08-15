import { Router } from 'express';
import PasswordController from '../controllers/PasswordController';
import { validatePassword } from './Celebrate';

const passwordRouter = Router();
const passwordController = new PasswordController();

passwordRouter.put('/:id', validatePassword, passwordController.update);

export default passwordRouter;
