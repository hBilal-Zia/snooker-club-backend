import { AdminResponseDTO } from "./admin.dto";

export interface Branch {
    id: string;
    name: string;
    location: string;
    createdBy: string;
}

export type BranchResponseDTO = Omit<Branch, "createdBy"> & {
    createdBy?: AdminResponseDTO;
};

export type CreateBranchRequestDTO = Pick<Branch, "name" | "location">;
export type CreateBranchDTO = Pick<Branch, "name" | "location" | "createdBy">;

export type UpdateBranchRequestDTO = Pick<Branch, "name" | "location">;
export type UpdateBranchDTO = Pick<Branch, "name" | "location" | "createdBy">;
