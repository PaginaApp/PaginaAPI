import { IShowUserDTO } from './IShowUserDTO';

interface IRefreshTokenResponseDTO {
  user: IShowUserDTO;
  accessToken: string;
}

export { IRefreshTokenResponseDTO };
