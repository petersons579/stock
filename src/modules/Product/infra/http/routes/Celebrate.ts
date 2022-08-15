import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const validate = celebrate(
  {
    [Segments.BODY]: {
      active: Joi.boolean().required(),
      description: Joi.string().required(),
      minimum: Joi.number().required(),
      barcode: Joi.string().allow('', null),
      unity: Joi.string().allow('', null),
    },
  },
  { messages },
);

export const validateUpdate = celebrate(
  {
    [Segments.BODY]: {
      active: Joi.boolean().required(),
      description: Joi.string().required(),
      minimum: Joi.number().required(),
      barcode: Joi.string().allow('', null),
      unity: Joi.string().allow('', null),
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
    active: Joi.boolean(),
  },
});
