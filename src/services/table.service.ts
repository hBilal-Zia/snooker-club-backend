import { CreateTableDTO, TableResponseDTO, UpdateTableDTO } from "../dtos/table.dto";
import TableRepository from "../respositories/table.repository";
import HttpError from "../utils/error.util";
import { tableToDTO } from "../utils/mappper.util";

class TableService {
    static async createTable(createData: CreateTableDTO): Promise<TableResponseDTO> {
        const newTable = await TableRepository.createTable(createData);
        if (!newTable) {
            throw new HttpError("Error Creating Table", 400)
        }
        return tableToDTO(newTable);
        }

    static async getTable(tableId: string): Promise<TableResponseDTO> {
        const table = await TableRepository.getTableById(tableId);
        if (!table) {
            throw new HttpError("Table Not Found", 404)
        }
        return tableToDTO(table);
        }

    static async getTables(): Promise<TableResponseDTO[]> {
        const tables = await TableRepository.getTables();
        return tables.map((table) => tableToDTO(table));
        }

    static async updateTable(tableId: string, updateData: UpdateTableDTO): Promise<TableResponseDTO> {
        const table = await TableRepository.getTableById(tableId);
        if (!table) {
            throw new HttpError("Table Not Found", 404)
        }
        const updatedTable = await TableRepository.updateTable(tableId, updateData);
        return tableToDTO(updatedTable);
        }
    
    static async deleteTable(tableId: string): Promise<void> {
        const table = await TableRepository.getTableById(tableId);
        if (!table) {
            throw new HttpError("Table Not Found", 404)
        }
        await TableRepository.deleteTable(tableId);
        return;
        }

    static async isTableAvailable(tableId: string) {
        const table = await this.getTable(tableId);

        if (!table.isAvailable) {
            throw new HttpError("Table is currently occupied", 400);
        }

        return table;
    }

    static async updateTableStatus(tableId: string, status: boolean): Promise<TableResponseDTO> {
        const updatedTable = await TableRepository.updateTable(tableId, {isAvailable: status});
        return tableToDTO(updatedTable);
    }
}

export default TableService;