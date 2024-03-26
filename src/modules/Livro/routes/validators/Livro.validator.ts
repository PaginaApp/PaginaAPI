import { celebrate, Joi } from 'celebrate';

export const findLivroByNameMiddleware = celebrate({
  params: {
    liv_Titulo: Joi.string().required(),
  },
});

export const findLivroByISBNMiddleware = celebrate({
  params: {
    liv_ISBN: Joi.string().required(),
  },
});

export const listLivroByNameMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  params: {
    liv_Titulo: Joi.string().required(),
  },
});

export const listLivroByISBNMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  params: {
    liv_ISBN: Joi.string().required(),
  },
});
