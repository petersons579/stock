import 'reflect-metadata';
import '../typeorm';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { pagination } from 'typeorm-pagination';
import cors from 'cors';
import routes from './routes';
import AppError from '../../errors/AppError';
import customErrors from './middlewares/customErrors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination);

app.use(routes);

app.use(customErrors);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  console.log(`server starterd on port ${PORT}!`);
});
