import { celebrate, Joi } from 'celebrate';

export const CreateTransacaoMiddleware = celebrate({
  body: {
    trs_Data: Joi.date().required(),
    trs_Preco: Joi.number().optional(),
    trs_Prazo: Joi.number().optional(),
    // tipo da transação
    trs_ttr_id: Joi.string().required(),
    trs_usu_Leitor_id: Joi.string().required(),
    trs_usu_Anunciante_id: Joi.string().required(),
    exe_Principal_id: Joi.string().required(),
    exe_Secundario_id: Joi.string().optional(),
  },
});

export const FindTransacaoByIdMiddleware = celebrate({
  params: {
    trs_Id: Joi.string().required().uuid(),
  },
});

export const AceitarTransacaoMiddleware = celebrate({
  params: {
    trs_Id: Joi.string().required().uuid(),
  },
});

export const ListTransacaoUserAnuncianteMiddleware = celebrate({
  params: {
    trs_usu_Anunciante_id: Joi.string().required().uuid(),
  },
});

export const ListTransacaoUserLeitorMiddleware = celebrate({
  params: {
    trs_usu_Leitor_id: Joi.string().required().uuid(),
  },
});

export const ConcluirTransacaoMiddleware = celebrate({
  params: {
    trs_Id: Joi.string().required().uuid(),
  },
});
