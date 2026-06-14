import { ClientSession } from "mongoose";
import { CreateSessionDTO } from "../dtos/session.dto";
import { Session } from "../models/Session.model";

class SessionRepository {

    static async createSession(createData: CreateSessionDTO, transaction?: ClientSession) {
        const [newSession] = await Session.create([createData], { session: transaction });
        const query = Session.findById(newSession._id);
        if (transaction) {
            query.session(transaction);
        }
        return await query.populate([
                {
                    path: "tableId",
                    populate: [
                        { path: "branchId", select: "_id name location", options: { session: transaction } },
                        { path: "addedBy", select: "_id name email role phoneNo", options: { session: transaction } },
                    ],
                },
                { path: "createdBy", select: "_id name email role phoneNo", options: { session: transaction } },
            ]);
    }

    static async getSessionById(id: string, transaction?: ClientSession) {
        const query = Session.findById(id);
        if (transaction) {
            query.session(transaction);
        }
        return await query.populate([
            {
                path: "tableId",
                populate: [
                    { path: "branchId", select: "_id name location", options: { session: transaction } },
                    { path: "addedBy", select: "_id name email role phoneNo", options: { session: transaction } }
                ],
            },
            { path: "createdBy", select: "_id name email role phoneNo", options: { session: transaction } },
        ]);
    }

    static async getSessions() {
        return await Session.find().populate([
            {
                path: "tableId",
                populate: [
                    { path: "branchId", select: "_id name location" },
                    { path: "addedBy", select: "_id name email role phoneNo" }
                ],
            },
            { path: "createdBy", select: "_id name email role phoneNo" },
        ]);
    }

    static async endSession(sessionId: string, endTime: Date, playTime: number, amount: number, transaction?: ClientSession) {
        return await Session.findByIdAndUpdate(
            sessionId,
            { endTime, playTime, amount },
            { new: true, session: transaction }
        ).populate([
            {
                path: "tableId",
                populate: [
                    { path: "branchId", select: "_id name location", options: { session: transaction } },
                    { path: "addedBy", select: "_id name email role phoneNo", options: { session: transaction } }
                ],
            },
            { path: "createdBy", select: "_id name email role phoneNo", options: { session: transaction } },
        ]);
    }

    static async updateSessionPaidStatus(sessionId: string) {
        return await Session.findByIdAndUpdate(
            sessionId,
            { isPaid: true },
            { new: true }
        ).populate([
            {
                path: "tableId",
                populate: [
                    { path: "branchId", select: "_id name location" },
                    { path: "addedBy", select: "_id name email role phoneNo" }
                ],
            },
            { path: "createdBy", select: "_id name email role phoneNo" },
        ]);
    }
}

export default SessionRepository;
