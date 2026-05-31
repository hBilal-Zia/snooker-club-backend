import { Admin, AdminResponseDTO } from "./admin.dto";

export type LoginDTO = Pick<Admin, "email" | "password">;
export type LoginRequestDTO = LoginDTO;

export type RefreshTokenDTO = { refreshToken: string };
export type RefreshTokenRequestDTO = RefreshTokenDTO;

export interface TokensDTO {
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponseDTO {
    admin: AdminResponseDTO;
    tokens: TokensDTO;
}
