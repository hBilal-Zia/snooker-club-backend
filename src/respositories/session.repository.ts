import { createSessionDTO } from "../dtos/session.dto";
import { Session } from "../models/Session.model";

class SessionRepository {

    static async createSession(createData: createSessionDTO) {
        const newSession = new Session(createData);
        await newSession.save(); 
        return await newSession.populate([
            {path: "tableId"},
            {path: "branchId", select: "_id name location"},
            {path: "createdBy", select: "_id name email role phoneNo"},
        ]);
    }

    static async getSessionById(id: string) {
        return await Session.findById(id).populate([
            {path: "tableId"},
            {path: "branchId", select: "_id name location"},
            {path: "createdBy", select: "_id name email role phoneNo"},
        ]);
    }

    static async getSessions() {
        return await Session.find().populate([
            {path: "tableId"},
            {path: "branchId", select: "_id name location"},
            {path: "createdBy", select: "_id name email role phoneNo"},
        ]);
    }

    // static async updateTable(id: string, updateData: any) {
    //     return await Table.findByIdAndUpdate(id, updateData, { new: true })
    //    .populate([
    //         {path: "branchId", select: "_id name location"},
    //         {path: "addedBy", select: "_id name email role phoneNo"},
    //     ]);
    // }

    // static async deleteTable(id: string) {
    //     return await Table.findByIdAndDelete(id)
    // }
}

export default SessionRepository;