import { celebrate, Joi } from 'celebrate';

export const createEditoraMiddleware = celebrate({
  body: {
    edi_Nome: Joi.string().required(),
  },
});

export const deleteEditoraMiddleware = celebrate({
  params: {
    edi_Id: Joi.string().uuid().required(),
  },
});

export const listEditoraMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
    edi_Nome: Joi.string(),
  },
});
