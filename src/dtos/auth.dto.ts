import { AdminResponseDTO } from "./admin.dto";

export interface LoginRequestDTO{
    email: string;
    password: string
}

export interface TokensDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseDTO{
    admin: AdminResponseDTO;
    tokens: TokensDTO;

}