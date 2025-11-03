import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../dtos/response.dto";
import { successApiResponse } from "../utils/response.util";
import { createSessionDTO, SessionResponseDTO } from "../dtos/session.dto";
import SessionService from "../services/session.service";

class SessionController {
    async createSession(req: Request<{}, {}, createSessionDTO, {}>, res: Response<ApiResponse<{ session: SessionResponseDTO }>>, next: NextFunction) {
        try {
            const { players, tableId, branchId } = req.body;
            

            const newSession = await SessionService.createSession({ players, tableId, branchId, createdBy: req.admin.id });

            return res.status(201).json(
                successApiResponse("Session Created Successfully", { session: newSession })
            )

        } catch (error: any) {
            console.log("From Create Session Controller: ", error);
            next(error)
        }
    }

    
}

export default new SessionController();