export type AdminRole = "admin" | "super admin";

export interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    role: AdminRole;
    createdAt?: Date;
    updatedAt?: Date;
}

export type AdminResponseDTO = Omit<Admin, "password">;

export type CreateAdminRequestDTO = Omit<Admin, "id" | "createdAt" | "updatedAt">;
export type CreateAdminDTO = CreateAdminRequestDTO;

export type UpdateAdminRequestDTO = Partial<Pick<Admin, "name" | "phoneNo" | "role">>;
export type UpdateAdminDTO = UpdateAdminRequestDTO;
