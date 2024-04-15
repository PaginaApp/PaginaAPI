import { Joi, celebrate } from 'celebrate';

export const createUserMiddleware = celebrate({
  body: {
    usu_Nome: Joi.string().required(),
    usu_Email: Joi.string().email().required(),
    usu_Senha: Joi.string().required(),
    usu_Telefone: Joi.string().required(),
    usu_CPF: Joi.string().required(),
    usu_Nasc: Joi.date().required(),
  },
});

export const findByIdMiddleware = celebrate({
  params: {
    id: Joi.string().uuid().required(),
  },
});

export const deleteUserMiddleware = celebrate({
  params: {
    id: Joi.string().uuid().required(),
  },
});

export const listUserMiddleware = celebrate({
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
    filter: Joi.object(),
  },
});

export const updateUserMiddleware = celebrate({
  params: {
    usu_Id: Joi.string().uuid().required(),
  },
  body: {
    usu_Telefone: Joi.string(),
    usu_Rua: Joi.string(),
    usu_Numero: Joi.string(),
    usu_Bairro: Joi.string(),
    usu_CEP: Joi.string(),
    usu_Complemento: Joi.string(),
    usu_est_id: Joi.string(),
    usu_cid_id: Joi.string(),
  },
});

export const changePasswordMiddleware = celebrate({
  params: {
    usu_Id: Joi.string().uuid().required(),
  },
  body: {
    usu_Senha: Joi.string().required(),
    novaSenha: Joi.string().required(),
  },
});
