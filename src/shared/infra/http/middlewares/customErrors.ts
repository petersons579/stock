import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { replaceMessageError } from '../../../helpers';

export default function customErrors(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!isCelebrateError(error)) {
    return next(error);
  }

  let message = '';

  const errorBody = error.details.get('body');
  const errorHeaders = error.details.get('headers');
  const errorParams = error.details.get('params');
  const errorQuery = error.details.get('query');

  if (errorBody) {
    const { details } = errorBody;
    message = details[0].message;
  } else if (errorHeaders) {
    const { details } = errorHeaders;
    message = details[0].message;
  } else if (errorParams) {
    const { details } = errorParams;
    message = details[0].message;
  } else if (errorQuery) {
    const { details } = errorQuery;
    message = details[0].message;
  }

  const result = {
    error: 'Bad Request',
    message: replaceMessageError(message),
  };

  return response.status(400).send(result);
}
