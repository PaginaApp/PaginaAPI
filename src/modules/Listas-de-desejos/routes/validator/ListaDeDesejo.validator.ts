import { celebrate, Joi, Segments } from 'celebrate';

export const createListaDeDesejoMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    liv_Id: Joi.string().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    usu_Id: Joi.string().required(),
  }),
});

export const deleteListaDeDesejoMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    usu_Id: Joi.string().required(),
    liv_Id: Joi.string().required(),
  }),
});

export const indexListaDeDesejoMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    usu_Id: Joi.string().required(),
  }),
});
