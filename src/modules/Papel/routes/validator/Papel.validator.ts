import { Joi, celebrate } from 'celebrate';

export const createPapelMiddleware = celebrate({
  body: {
    pap_Nome: Joi.string().required(),
  },
});

export const findByIdMiddleware = celebrate({
  params: {
    pap_Id: Joi.string().uuid().required(),
  },
});

export const deletePapelMiddleware = celebrate({
  params: {
    pap_Id: Joi.string().uuid().required(),
  },
});

export const listPapelMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
});

export const updatePapelMiddleware = celebrate({
  params: {
    pap_Id: Joi.string().uuid().required(),
  },
  body: {
    pap_Nome: Joi.string().required(),
  },
});
