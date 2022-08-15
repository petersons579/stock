import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { validateSession } from './Celebrate';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post('/', validateSession, sessionController.create);

export default sessionRouter;
