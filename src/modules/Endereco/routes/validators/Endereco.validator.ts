import { celebrate, Joi } from 'celebrate';

export const createEnderecoMiddleware = celebrate({
  body: {
    usu_Rua: Joi.string().required(),
    usu_Numero: Joi.string().required(),
    usu_Bairro: Joi.string().required(),
    usu_CEP: Joi.string().required(),
    usu_cid_nome: Joi.string().required(),
    usu_est_UF: Joi.string().required(),
    usu_Complemento: Joi.string(),
  },
  params: {
    usu_Id: Joi.string().uuid().required(),
  },
});

export const updateEnderecoMiddleware = celebrate({
  body: {
    usu_Rua: Joi.string().required(),
    usu_Numero: Joi.string().required(),
    usu_Bairro: Joi.string().required(),
    usu_CEP: Joi.string().required(),
    usu_cid_nome: Joi.string().required(),
    usu_est_UF: Joi.string().required(),
    usu_Complemento: Joi.string(),
  },
  params: {
    usu_Id: Joi.string().uuid().required(),
  },
});

export const showEnderecoMiddleware = celebrate({
  params: {
    usu_Id: Joi.string().uuid().required(),
  },
});
