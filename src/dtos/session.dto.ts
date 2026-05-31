import { AdminResponseDTO } from "./admin.dto";
import { TableResponseDTO } from "./table.dto";

export interface Session {
    id: string;
    players: string[];
    startTime: Date;
    endTime?: Date;
    playTime: number;
    amount?: number;
    isPaid: boolean;
    tableId: string;
    branchId: string;
    createdBy: string;
}

export type SessionResponseDTO = Omit<Session, "tableId" | "branchId" | "createdBy"> & {
    table: TableResponseDTO;
    createdBy: AdminResponseDTO;
};

export type CreateSessionRequestDTO = Pick<Session, "players" | "tableId" | "branchId">;
export type CreateSessionDTO = Pick<Session, "players" | "tableId" | "branchId"> &
    Partial<Pick<Session, "createdBy">>;
