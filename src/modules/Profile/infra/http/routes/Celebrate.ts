import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const validate = celebrate(
  {
    [Segments.BODY]: {
      active: Joi.boolean().required(),
      description: Joi.string().required(),
      admin: Joi.boolean(),
      manager: Joi.boolean(),
      employee: Joi.boolean(),
      plataform: Joi.boolean(),
      app: Joi.boolean(),
    },
  },
  { messages },
);

export const validateUpdate = celebrate(
  {
    [Segments.BODY]: {
      active: Joi.boolean().required(),
      description: Joi.string().required(),
      admin: Joi.boolean(),
      manager: Joi.boolean(),
      employee: Joi.boolean(),
      plataform: Joi.boolean(),
      app: Joi.boolean(),
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
