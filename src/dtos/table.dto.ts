import { AdminResponseDTO } from "./admin.dto";
import { BranchResponseDTO } from "./branch.dto";

export interface TableResponseDTO {
    id: string,
    name: string;
    description: string;
    ratePerMinute: number;
    isAvailable: boolean;
    branch: BranchResponseDTO;
    addedBy: AdminResponseDTO;
}

export interface CreateTableDTO {
    name: string;
    description: string;
    ratePerMinute: number;
    branchId: string;
    addedBy?: string;
}

export interface UpdateTableDTO {
    name: string;
    description: string;
    ratePerMinute: number;
}