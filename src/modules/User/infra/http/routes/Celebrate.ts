import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const validateQuery = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().required(),
    per_page: Joi.number().required(),
    filter: Joi.string().allow('', null),
    active: Joi.boolean(),
  },
});

export const validateSession = celebrate(
  {
    [Segments.BODY]: {
      login: Joi.string().required(),
      password: Joi.string().required(),
      device: Joi.string().required(),
    },
  },
  { messages },
);

export const validate = celebrate(
  {
    [Segments.BODY]: {
      login: Joi.string().required(),
      name: Joi.string().required(),
      active: Joi.boolean().required(),
      id_profile: Joi.string().required(),
    },
  },
  { messages },
);

export const validateUpdate = celebrate(
  {
    [Segments.BODY]: {
      login: Joi.string().required(),
      name: Joi.string().required(),
      active: Joi.boolean().required(),
      id_profile: Joi.string().required(),
      password: Joi.string().allow('', null),
      id: Joi.string().allow('', null),
    },
  },
  { messages },
);

export const validatePassword = celebrate(
  {
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      confirm_password: Joi.string().required(),
    },
  },
  { messages },
);
