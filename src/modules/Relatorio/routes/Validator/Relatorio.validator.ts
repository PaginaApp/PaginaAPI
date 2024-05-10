import { celebrate, Joi } from 'celebrate';

export const getExemplaresPorMesMiddleware = celebrate({
  params: {
    ano: Joi.number().required(),
  },
});
