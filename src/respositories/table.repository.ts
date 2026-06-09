import { ClientSession } from "mongoose";
import { CreateTableDTO } from "../dtos/table.dto";
import { Table } from "../models/Table.model";

class TableRepository {

    static async getTableByIdAndBranch(tableId: string, branchId: string, transaction?: ClientSession) {
        const query = Table.findOne({ _id: tableId, branchId });
        if (transaction) {
            query.session(transaction);
        }
        return await query.populate([
            {path: "branchId", select: "_id name location", options: { session: transaction }},
            {path: "addedBy", select: "_id name email role phoneNo", options: { session: transaction }},
        ]);
    }

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

    static async getTables() {
        return await Table.find().populate([
            {path: "branchId", select: "_id name location"},
            {path: "addedBy", select: "_id name email role phoneNo"},
        ]);
    }

    static async updateTable(id: string, updateData: any, transaction?: ClientSession) {
        return await Table.findByIdAndUpdate(id, updateData, { new: true, session: transaction })
       .populate([
            {path: "branchId", select: "_id name location", options: { session: transaction }},
            {path: "addedBy", select: "_id name email role phoneNo", options: { session: transaction }},
        ]);
    }

    static async deleteTable(id: string) {
        return await Table.findByIdAndDelete(id)
    }
}

export default TableRepository;
