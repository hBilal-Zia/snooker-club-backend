export interface AdminResponseDTO {
    id: string;
    name: string;
    email: string;
    phoneNo: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateAdminDTO {
    name: string;
    email: string;
    password: string;
    phoneNo: string;
    role: string;
    
}

export interface UpdateAdminDTO {
    phoneNo?: string;
    role?: string;
    name?: string;
}