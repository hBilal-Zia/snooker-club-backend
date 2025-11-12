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

    async getSession(req: Request<{sessionId: string}, {}, {}, {}>, res: Response<ApiResponse<{ session: SessionResponseDTO }>>, next: NextFunction) {
        try {
            const { sessionId } = req.params;
            const session = await SessionService.getSession(sessionId);

            return res.status(200).json(
                successApiResponse("Session Found Successfully", { session })
            )

        } catch (error: any) {
            console.log("From Get Session Controller: ", error);
            next(error)
        }
    }

    async getSessions(req: Request<{}, {}, {}, {}>, res: Response<ApiResponse<{ sessions: SessionResponseDTO[] }>>, next: NextFunction) {
        try {
            const sessions = await SessionService.getSessions();
            return res.status(200).json(
                successApiResponse("Sessions Found Successfully", { sessions })
            )

        } catch (error: any) {
            console.log("From Get Sessions Controller: ", error);
            next(error)
        }
    }

    async endSession(req: Request<{sessionId: string}, {}, {}, {}>, res: Response<ApiResponse<{ session: SessionResponseDTO }>>, next: NextFunction) {
        try {
            const { sessionId } = req.params;
            const session = await SessionService.endSession(sessionId);

            return res.status(200).json(
                successApiResponse("Session Ended Successfully", { session })
            )

        } catch (error: any) {
            console.log("From End Session Controller: ", error);
            next(error)
        }
    }

     async updateSessionPaidStatus(req: Request<{sessionId: string}, {}, {}, {}>, res: Response<ApiResponse<{ session: SessionResponseDTO }>>, next: NextFunction) {
        try {
            const { sessionId } = req.params;
            const session = await SessionService.updateSessionPaidStatus(sessionId);

            return res.status(200).json(
                successApiResponse("Session Status Updated Successfully", { session })
            )

        } catch (error: any) {
            console.log("From End Session Controller: ", error);
            next(error)
        }
    }

    
}

export default new SessionController();