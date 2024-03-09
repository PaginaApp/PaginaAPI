import { IShowUserDTO } from './IShowUserDTO';

interface ICreateSessionResponseDTO {
  user: IShowUserDTO;
  accessToken: string;
  refreshToken?: string;
}

export { ICreateSessionResponseDTO };
