import { CreateTableDTO, TableResponseDTO } from "../dtos/table.dto";
import { Table } from "../models/Table.model";
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
}

export default TableService;