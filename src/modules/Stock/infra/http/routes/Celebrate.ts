import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const validate = celebrate(
  {
    [Segments.BODY]: {
      quantity: Joi.number().required(),
      type: Joi.string().required(),
      id_product: Joi.string().required(),
    },
  },
  { messages },
);

export const validateUpdate = celebrate(
  {
    [Segments.BODY]: {
      quantity: Joi.number().required(),
      type: Joi.string().required(),
      id_product: Joi.string().required(),
      id: Joi.string().allow('', null),
    },
  },
  { messages },
);

export const validateQuery = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().required(),
    per_page: Joi.number().required(),
    filter: Joi.string().allow('', null),
  },
});
