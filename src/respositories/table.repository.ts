import { CreateTableDTO } from "../dtos/table.dto";
import { Table } from "../models/Table.model";

class TableRepository {

    static async createTable(createData: CreateTableDTO) {
        const newTable = new Table(createData);
        await newTable.save(); 
        return await newTable.populate([
            {path: "branchId", select: "_id name location"},
            {path: "addedBy", select: "_id name email role phoneNo"},
        ]);
    }

    static async getTableById(id: string) {
        return await Table.findById(id).populate([
            {path: "branchId", select: "_id name location"},
            {path: "addedBy", select: "_id name email role phoneNo"},
        ]);
    }

    static async getTablees() {
        return await Table.find().populate([
            {path: "branchId", select: "_id name location"},
            {path: "addedBy", select: "_id name email role phoneNo"},
        ]);
    }

    static async updateTable(id: string, updateData: any) {
        return await Table.findByIdAndUpdate(id, updateData, { new: true })
       .populate([
            {path: "branchId", select: "_id name location"},
            {path: "addedBy", select: "_id name email role phoneNo"},
        ]);
    }

    static async deleteTable(id: string) {
        return await Table.findByIdAndDelete(id)
    }
}

export default TableRepository;