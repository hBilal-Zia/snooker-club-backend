import { AdminResponseDTO } from "./admin.dto";

export interface CreateBranchDTO {
    name: string;
    location: string;
    createdBy: string;
}

export interface UpdateBranchDTO {
    name: string;
    location: string;
    createdBy: string;
}

export interface BranchResponseDTO {
    id: string;
    name: string;
    location: string;
    createdBy?: AdminResponseDTO;
}

