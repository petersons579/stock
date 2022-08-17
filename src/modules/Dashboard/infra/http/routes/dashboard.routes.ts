import { Router } from 'express';
import DashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();
const dashboardController = new DashboardController();

dashboardRouter.get('/', dashboardController.index);
dashboardRouter.get('/last', dashboardController.last);
dashboardRouter.get('/total', dashboardController.total);

export default dashboardRouter;
