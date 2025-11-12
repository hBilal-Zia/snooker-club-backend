import { createSessionDTO, SessionResponseDTO } from "../dtos/session.dto";
import SessionRepository from "../respositories/session.repository";
import HttpError from "../utils/error.util";
import { sessionToDTO } from "../utils/mappper.util";
import BranchService from "./branch.service";
import TableService from "./table.service";

class SessionService {
    static async createSession(createData: createSessionDTO): Promise<SessionResponseDTO> {
        const branchExists = await BranchService.getBranch(createData.branchId);
        const isTableAvailable = await TableService.isTableAvailable(createData.tableId);
        const newSession = await SessionRepository.createSession(createData);
        if (!newSession) {
            throw new HttpError("Error Creating Session", 400)
        }
        let session = sessionToDTO(newSession)
        const updatedTable = await TableService.updateTableStatus(createData.tableId, false)
        session.table = updatedTable;
        // return sessionToDTO(newSession);
        return session;
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
        const session = await SessionRepository.getSessionById(sessionId);
        if (!session) {
            throw new HttpError("Session Not Found", 404)
        }
        if (session.endTime) {
            throw new HttpError("Session Already Ended", 409);
        }
        const endTime = new Date();
        const startTime = new Date(session.startTime);
        const playTimeMinutes = Math.floor(
            (endTime.getTime() - startTime.getTime()) / 60000
        );

        const table = await TableService.getTable(session.tableId._id.toString());

        const amount = playTimeMinutes * table.ratePerMinute;

        const endedSession = await SessionRepository.endSession(
            sessionId,
            endTime,
            playTimeMinutes,
            amount
        );

        const updatedTable = await TableService.updateTableStatus(session.tableId._id.toString(), true);
        const updatedSession =  sessionToDTO(endedSession);
        updatedSession.table = updatedTable
        return updatedSession

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