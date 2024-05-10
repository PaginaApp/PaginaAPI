import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { inject, injectable } from 'tsyringe';
import { MediaPorIdadeDTO } from '../DTO/MediaPorIdadeDTO';
import { Relatorio } from '../entitie/Relatorio';

@injectable()
class MediaUserPorIdadeService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<Relatorio<MediaPorIdadeDTO>> {
    const today = new Date();

    // dia primeiro de janeiro de 30 anos atras
    const start30 = new Date(today.getFullYear() - 30, 0, 1);

    // dia primeiro de janeiro de 50 anos atras
    const start50 = new Date(today.getFullYear() - 51, 0, 1);

    const ano1000 = new Date(1000, 0, 1);

    const promisses = Promise.all([
      this.userRepository.CountByAge(start30, today),
      this.userRepository.CountByAge(start50, start30),
      this.userRepository.CountByAge(ano1000, start50),
    ]);

    const [till_30, btwn_30_50, over_50] = await promisses;

    return {
      data: {
        till_30,
        btwn_30_50,
        over_50,
      },
      generatedAt: new Date(),
    };
  }
}

export { MediaUserPorIdadeService };
