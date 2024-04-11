import { celebrate, Joi } from 'celebrate';

export const FindEstadoCapaByIdMiddleware = celebrate({
  params: {
    ecp_Id: Joi.string().required(),
  },
});
