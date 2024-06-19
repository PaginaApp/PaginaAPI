import { IRepository } from '@shared/interfaces/Repository';
import { CreateTermoPrivacidade } from '../DTO/CreateTermoPrivacidade';
import { TermoPrivacidade } from '../Entitie/TermoPrivacidade';

interface ITermoPrivacidadeRepository
  extends IRepository<TermoPrivacidade, CreateTermoPrivacidade, null> {
  // encontra o termo de privacidade mais novo a partir de sua data de criação e da data passada
  findActual(date: Date): Promise<TermoPrivacidade | null>;
}

export { ITermoPrivacidadeRepository };
