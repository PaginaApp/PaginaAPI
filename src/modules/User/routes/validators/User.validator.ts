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
