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

    
}

export default SessionService;