import { Router } from 'express';

import UserRouter from '../../../../modules/User/infra/http/routes/user.routes';
import StockRouter from '../../../../modules/Stock/infra/http/routes/stock.routes';
import SessionRouter from '../../../../modules/User/infra/http/routes/session.routes';
import SearchRouter from '../../../../modules/Product/infra/http/routes/search.routes';
import ProductRouter from '../../../../modules/Product/infra/http/routes/product.routes';
import PasswordRouter from '../../../../modules/User/infra/http/routes/password.routes';
import ProfileRouter from '../../../../modules/Profile/infra/http/routes/profile.routes';
import DashboardRouter from '../../../../modules/Dashboard/infra/http/routes/dashboard.routes';
import ProfileFilterRouter from '../../../../modules/Profile/infra/http/routes/filterProfile.routes';

import isAuthenticated from '../middlewares/isAuthenticated';

const routes = Router();

routes.use('/sessions', SessionRouter);

routes.use(isAuthenticated);

routes.use('/profiles', ProfileRouter);

routes.use('/users', UserRouter);

routes.use('/password', PasswordRouter);

routes.use('/products', ProductRouter);

routes.use('/stocks', StockRouter);

routes.use('/search', SearchRouter);

routes.use('/dashboard', DashboardRouter);

routes.use('/profile_filter', ProfileFilterRouter);

export default routes;
