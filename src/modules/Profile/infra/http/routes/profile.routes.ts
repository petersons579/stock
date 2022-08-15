import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import { validate, validateUpdate, validateQuery } from './Celebrate';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/', validateQuery, profileController.index);
profileRouter.get('/:id', profileController.show);
profileRouter.post('/', validate, profileController.create);
profileRouter.put('/:id', validateUpdate, profileController.update);

export default profileRouter;
