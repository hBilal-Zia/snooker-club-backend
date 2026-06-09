import mongoose from "mongoose";
import { CreateSessionDTO, SessionResponseDTO } from "../dtos/session.dto";
import SessionRepository from "../respositories/session.repository";
import HttpError from "../utils/error.util";
import { sessionToDTO } from "../utils/mappper.util";
import TableService from "./table.service";

class SessionService {
    static async createSession(createData: CreateSessionDTO): Promise<SessionResponseDTO> {
        const mongoSession = await mongoose.startSession();
        try {
            mongoSession.startTransaction();
            let createdSession: SessionResponseDTO | null = null;

            const table = await TableService.getTableByIdAndBranch(createData.tableId, createData.branchId, mongoSession);
            if (!table) {
                throw new HttpError("Table Not Found", 404);
            }

            if (!table.isAvailable) {
                throw new HttpError("Table is currently occupied", 409);
            }

            const newSession = await SessionRepository.createSession(createData, mongoSession);
            if (!newSession) {
                throw new HttpError("Error Creating Session", 400);
            }

            const tableLocked = await TableService.updateTableStatus(
                createData.tableId,
                false,
                mongoSession
            );

            if (!tableLocked) {
                throw new HttpError("Error Updating Table Status", 400);
            }

            createdSession = sessionToDTO(newSession);
            createdSession.table = tableLocked;

            await mongoSession.commitTransaction();

            if (!createdSession) {
                throw new HttpError("Error Creating Session", 400);
            }

            return createdSession;
        } catch (error) {
            await mongoSession.abortTransaction();
            throw error;
        } finally {
            await mongoSession.endSession();
        }
        }

    static async getSession(sessionId: string): Promise<SessionResponseDTO> {
        const session = await SessionRepository.getSessionById(sessionId);
        if (!session) {
            throw new HttpError("Session Not Found", 404)
        }
        return sessionToDTO(session);
    }

    static async getSessions(): Promise<SessionResponseDTO[]> {
        const sessions = await SessionRepository.getSessions();
        return sessions.map((session) => {return sessionToDTO(session)});
    }

    static async endSession(sessionId: string): Promise<SessionResponseDTO> {
        const mongoSession = await mongoose.startSession();
        try {
            mongoSession.startTransaction();
            let endedSession: SessionResponseDTO | null = null;

            const sessionDoc = await SessionRepository.getSessionById(sessionId, mongoSession);
            if (!sessionDoc) {
                throw new HttpError("Session Not Found", 404);
            }

            const session = sessionToDTO(sessionDoc);

            if (session.endTime) {
                throw new HttpError("Session Already Ended", 409);
            }

            const sessionTable = session.table;

            const endTime = new Date();
            const startTime = new Date(session.startTime);
            const playTimeMinutes = Math.max(
                0,
                Math.floor((endTime.getTime() - startTime.getTime()) / 60000)
            );

            const amount = playTimeMinutes * sessionTable.ratePerMinute;

            const ended = await SessionRepository.endSession(
                sessionId,
                endTime,
                playTimeMinutes,
                amount,
                mongoSession
            );

            if (!ended) {
                throw new HttpError("Error Ending Session", 400);
            }

            const updatedTable = await TableService.updateTableStatus(
                sessionTable.id,
                true,
                mongoSession
            );

            if (!updatedTable) {
                throw new HttpError("Error Updating Table Status", 400);
            }

            endedSession = sessionToDTO(ended);
            endedSession.table = updatedTable;

            await mongoSession.commitTransaction();

            if (!endedSession) {
                throw new HttpError("Error Ending Session", 400);
            }

            return endedSession;
        } catch (error) {
            await mongoSession.abortTransaction();
            throw error;
        } finally {
            await mongoSession.endSession();
        }

    }

    static async updateSessionPaidStatus(sessionId: string): Promise<SessionResponseDTO> {
        const session = await SessionRepository.getSessionById(sessionId);
        if (!session) {
            throw new HttpError("Session Not Found", 404)
        }

        if (!session.endTime) {
            throw new HttpError("Session Not Ended", 409);
        }

        if (session.isPaid) {
            throw new HttpError("Session Already Paid", 409);
        }

        const paidSession = await SessionRepository.updateSessionPaidStatus(sessionId);
        
        return sessionToDTO(paidSession);
    }

    
}

export default SessionService;
