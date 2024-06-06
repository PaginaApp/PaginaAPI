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
    liv_Titulo: Joi.string(),
  },
});

export const listLivroByISBNMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
  body: {
    liv_ISBN: Joi.string().required(),
  },
});

export const crateLivroMiddleware = celebrate({
  body: {
    liv_Titulo: Joi.string().required(),
    liv_Ano: Joi.string().required(),
    liv_Sinopse: Joi.string().required(),
    liv_ISBN: Joi.string().required(),
    liv_aut_id: Joi.string().uuid().required(),
    liv_edi_id: Joi.string().uuid().required(),
    liv_cat_id: Joi.array().items(Joi.string().uuid().required()),
  },
});

export const updateLivroMiddleware = celebrate({
  body: {
    liv_Titulo: Joi.string().required(),
    liv_Ano: Joi.string().required(),
    liv_Sinopse: Joi.string().required(),
    liv_ISBN: Joi.string().required(),
    liv_aut_id: Joi.string().uuid().required(),
    liv_edi_id: Joi.string().uuid().required(),
    liv_cat_id: Joi.array().items(Joi.string().uuid().required()),
  },

  params: {
    liv_Id: Joi.string().uuid().required(),
  },
});

export const listLivroMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
});
