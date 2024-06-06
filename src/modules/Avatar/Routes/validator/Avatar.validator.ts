import { celebrate, Joi } from 'celebrate';

export const createAvatarMiddleware = celebrate({
  params: {
    usu_Id: Joi.string().uuid().required(),
  },
  body: {
    avatar: Joi.string().base64().required(),
  },
});

export const deleteAvatarMiddleware = celebrate({
  params: {
    usu_Id: Joi.string().uuid().required(),
  },
});

export const getAvatarMiddleware = celebrate({
  params: {
    usu_Id: Joi.string().uuid().required(),
  },
});
