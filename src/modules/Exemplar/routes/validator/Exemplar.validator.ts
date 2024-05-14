import { celebrate, Joi } from 'celebrate';

export const createExemplarMiddleware = celebrate({
  body: {
    exe_Descricao: Joi.string().required(),
    exe_Negociando: Joi.boolean().required(),
    exe_liv_id: Joi.string().required().uuid(),
    exe_usu_id: Joi.string().required().uuid(),
    exe_epg_id: Joi.string().required().uuid(),
    exe_ecp_id: Joi.string().required().uuid(),
    exe_Preco: Joi.number().optional(),
    exe_Prazo: Joi.number().optional(),
    exe_trs_id: Joi.array().items(Joi.string().uuid()),
  },
});

export const updateExemplarMiddleware = celebrate({
  params: {
    exe_Id: Joi.string().uuid().required().uuid(),
  },
  body: {
    exe_Descricao: Joi.string().required(),
    exe_Negociando: Joi.boolean().required(),
    exe_liv_id: Joi.string().required().uuid(),
    exe_usu_id: Joi.string().required().uuid(),
    exe_epg_id: Joi.string().required().uuid(),
    exe_ecp_id: Joi.string().required().uuid(),
  },
});

export const deleteExemplarMiddleware = celebrate({
  params: {
    exe_Id: Joi.string().uuid().required().uuid(),
  },
});

export const listExemplarByUserMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },

  params: {
    exe_usu_id: Joi.string().required().uuid(),
  },
});

export const listExemplarByLivroMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },

  params: {
    exe_liv_id: Joi.string().required().uuid(),
  },
});

export const findExemplarMiddleware = celebrate({
  params: {
    exe_Id: Joi.string().required().uuid(),
  },
});

export const listExemplarMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
});
