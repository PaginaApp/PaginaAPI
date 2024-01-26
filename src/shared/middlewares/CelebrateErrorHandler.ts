import { CelebrateError } from 'celebrate';
import { Request, Response } from 'express';

async function CelebrateErrorHandler(
  err: Error,
  request: Request,
  response: Response,
): Promise<Response<any> | any> {
  if (err instanceof CelebrateError) {
    let messageString;
    const { type, context } = err.details.values().next().value.details[0];

    switch (type) {
      case 'any.required':
        messageString = `O campo ${context.label} é obrigatório.`;
        break;
      case 'string.base':
        messageString = `O campo ${context.label} deve ser do tipo texto.`;
        break;
      case 'string.empty':
        messageString = `O campo ${context.label} não pode ser um texto vazio.`;
        break;
      case 'string.min':
        messageString = `O campo ${context.label} não pode ser menor que ${context.limit} caracteres.`;
        break;
      case 'string.max':
        messageString = `O campo ${context.label} não pode ser maior que ${context.limit} caracteres.`;
        break;
      case 'string.email':
        messageString = `O campo ${context.label} deve ser um email válido.`;
        break;
      case 'number.base':
        messageString = `O campo ${context.label} deve ser do tipo número.`;
        break;
      case 'number.min':
        messageString = `O campo ${context.label} não pode ser menor que ${context.limit}.`;
        break;
      case 'number.max':
        messageString = `O campo ${context.label} não pode ser maior que ${context.limit}.`;
        break;
      case 'array.base':
        messageString = `O campo ${context.label} deve ser do tipo array.`;
        break;
      case 'array.empty':
        messageString = `O campo ${context.label} não pode ser vazio.`;
        break;
      case 'array.min':
        messageString = `O campo ${context.label} não pode ter um tamanho menor que ${context.limit}.`;
        break;
      case 'array.max':
        messageString = `O campo ${context.label} não pode ter um tamanho maior que ${context.limit}.`;
        break;
      case 'string.length':
        messageString = `O campo ${context.label} deve ter ${context.limit} caracteres.`;
        break;
      case 'document.cnpj':
        messageString = 'O CNPJ é inválido.';
        break;
      case 'document.cpf':
        messageString = 'O CPF é inválido.';
        break;
      case 'any.invalid':
        messageString = `O campo ${context.label} é inválido.`;
        break;
      case 'string.guid':
        messageString = `O campo ${context.label} não é um UUID válido.`;
        break;
      default:
        messageString = 'Aconteceu um erro tente novamente mais tarde.';
        break;
    }

    console.dir(err, { depth: 10 });
    return response.status(400).json({
      status: 'error',
      message: messageString,
    });
  }
}

export { CelebrateErrorHandler };
