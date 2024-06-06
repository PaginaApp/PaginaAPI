import { celebrate, Joi } from 'celebrate';

export const createAutorMiddleware = celebrate({
  body: {
    aut_Nome: Joi.string().required(),
  },
});

export const deleteAutorMiddleware = celebrate({
  params: {
    aut_Id: Joi.string().uuid().required(),
  },
});

export const listAutorMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
    aut_Nome: Joi.string(),
  },
});
