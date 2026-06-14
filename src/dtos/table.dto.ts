import { AdminResponseDTO } from "./admin.dto";
import { BranchResponseDTO } from "./branch.dto";

export interface Table {
    id: string;
    name: string;
    description: string;
    ratePerMinute: number;
    isAvailable: boolean;
    branchId: string;
    addedBy: string;
}

type TableWritable = Pick<Table, "name" | "description" | "ratePerMinute">;

export type TableResponseDTO = Omit<Table, "branchId" | "addedBy"> & {
    branch: BranchResponseDTO;
    addedBy: AdminResponseDTO;
};

export type CreateTableRequestDTO = TableWritable & { branchId: string };
export type CreateTableDTO = TableWritable & {
    branchId: string;
    addedBy?: string;
};

export type UpdateTableRequestDTO = TableWritable;
export type UpdateTableDTO = TableWritable;
