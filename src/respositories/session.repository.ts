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

    static async endSession(sessionId: string, endTime: Date, playTime: number, amount: number) {
        return await Session.findByIdAndUpdate(
            sessionId,
            { endTime, playTime, amount },
            { new: true }
        ).populate([
            { path: "tableId"},
            { path: "branchId", select: "_id name location" },
            { path: "createdBy", select: "_id name email role phoneNo" },
        ]);
    }

    static async updateSessionPaidStatus(sessionId: string) {
        return await Session.findByIdAndUpdate(
            sessionId,
            { isPaid: true },
            { new: true }
        ).populate([
            { path: "tableId"},
            { path: "branchId", select: "_id name location" },
            { path: "createdBy", select: "_id name email role phoneNo" },
        ]);
    }
}

export default SessionRepository;