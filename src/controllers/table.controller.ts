import { NextFunction, Request, Response } from "express";
import {
    CreateTableDTO,
    CreateTableRequestDTO,
    TableResponseDTO,
    UpdateTableDTO,
    UpdateTableRequestDTO,
} from "../dtos/table.dto";
import { ApiResponse } from "../dtos/response.dto";
import BranchService from "../services/branch.service";
import TableService from "../services/table.service";
import { successApiResponse } from "../utils/response.util";

class TableController {
    async createTable(req: Request<{}, {}, CreateTableRequestDTO, {}>, res: Response<ApiResponse<{ table: TableResponseDTO }>>, next: NextFunction) {
        try {
            const { name, description, ratePerMinute, branchId } = req.body;
            const branchExists = await BranchService.getBranch(branchId);
            const createData: CreateTableDTO = {
                name,
                description,
                ratePerMinute,
                branchId: branchExists.id,
                addedBy: req.admin.id,
            };
            const newTable = await TableService.createTable(createData);

            return res.status(201).json(
                successApiResponse("Table Created Successfully", { table: newTable })
            )

        } catch (error: any) {
            console.log("From Create Table Controller: ", error);
            next(error)
        }
    }

    async getTable(req: Request<{tableId: string}, {}, {}, {}>, res: Response<ApiResponse<{ table: TableResponseDTO }>>, next: NextFunction) {
        try {
            const { tableId } = req.params;
            const table = await TableService.getTable(tableId);
            return res.status(200).json(
                successApiResponse("Table Found Successfully", { table: table })
            )

        } catch (error: any) {
            console.log("From Get Table Controller: ", error);
            next(error)
        }
    }

    async getTables(req: Request<{}, {}, {}, {}>, res: Response<ApiResponse<{ tables: TableResponseDTO[] }>>, next: NextFunction) {
        try {
            const tables = await TableService.getTables();
            return res.status(200).json(
                successApiResponse("Tables Found Successfully", { tables })
            )

        } catch (error: any) {
            console.log("From Get Tables Controller: ", error);
            next(error)
        }
    }

    async upadteTable(req: Request<{tableId: string}, {}, UpdateTableRequestDTO, {}>, res: Response<ApiResponse<{ table: TableResponseDTO }>>, next: NextFunction) {
        try {
            const { tableId } = req.params;
            const updateData: UpdateTableDTO = req.body;
            const updatedTable = await TableService.updateTable(tableId, updateData);
            return res.status(200).json(
                successApiResponse("Table Updated Successfully", { table: updatedTable })
            )

        } catch (error: any) {
            console.log("From UPdate Table Controller: ", error);
            next(error)
        }
    }

    async deleteTable(req: Request<{tableId: string}, {}, {}, {}>, res: Response<ApiResponse<{}>>, next: NextFunction) {
        try {
            const { tableId } = req.params;
            await TableService.deleteTable(tableId);
            return res.status(200).json(
                successApiResponse("Table Deleted Successfully")
            )

        } catch (error: any) {
            console.log("From Delete Table Controller: ", error);
            next(error)
        }
    }
}

export default new TableController();