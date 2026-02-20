import { AdminResponseDTO } from "./admin.dto";
import { BranchResponseDTO } from "./branch.dto";
import { TableResponseDTO } from "./table.dto";

export interface SessionResponseDTO {
    id: string;
    players: string[];
    startTime: Date;
    endTime?: Date;
    playTime: number;
    amount?: number;
    isPaid: boolean;
    table: TableResponseDTO;
    createdBy: AdminResponseDTO;
}

export interface createSessionDTO {
    players: string[];
    tableId: string;
    branchId: string;
    createdBy?: string;
}

export interface createSessionRequestDTO {
    players: string[];
    tableId: string;
    branchId: string;
}