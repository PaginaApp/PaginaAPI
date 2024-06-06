import { celebrate, Joi, Segments } from 'celebrate';

export const CreateImagemExemplarMidleware = celebrate({
  [Segments.BODY]: {
    imagem: Joi.string().required(),
  },
  [Segments.PARAMS]: {
    exe_Id: Joi.string().required().uuid(),
  },
});

export const DeleteImagemExemplarMidleware = celebrate({
  [Segments.PARAMS]: {
    iex_Id: Joi.string().required(),
  },
});

export const GetImagemExemplarMidleware = celebrate({
  [Segments.PARAMS]: {
    iex_Id: Joi.string().required(),
  },
});
