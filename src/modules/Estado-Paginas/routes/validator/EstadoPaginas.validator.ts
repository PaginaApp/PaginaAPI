import { celebrate, Joi } from 'celebrate';

export const FindEstadoPaginasByIdMiddleware = celebrate({
  params: {
    epg_Id: Joi.string().required(),
  },
});
