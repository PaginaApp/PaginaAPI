import { Joi, Segments, celebrate } from 'celebrate';

export const CreateSessionValidator = celebrate({
  [Segments.BODY]: {
    usu_Email: Joi.string().email().required(),
    usu_Senha: Joi.string().required(),
    device_token: Joi.string(),
    remember_me: Joi.boolean(),
  },
});

export const RefreshSessionValidator = celebrate({
  [Segments.PARAMS]: {
    usu_Id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    token: Joi.string().required(),
  },
});

export const DeleteSessionValidator = celebrate({
  [Segments.PARAMS]: {
    usu_Id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    refresh_token: Joi.string().required(),
  },
});
