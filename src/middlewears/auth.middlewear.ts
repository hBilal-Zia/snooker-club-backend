import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/error.util";
import { verifyJwt } from "../utils/jwt.util";
import config from "../config/config";
import AdminRepository from "../respositories/admin.repository";
import { adminToDTO } from "../utils/mappper.util";

export async function verifyAdmin(req: Request<{},{},{},{}>, res: Response, next: NextFunction) {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            return next(new HttpError("No Token Found", 401));
        }
        const decoded = await verifyJwt<any>(token, config.jwtAccessKey);
        const admin = await AdminRepository.getAdminById(decoded.id);
        if (!admin) {
            return next(new HttpError("Invalid token", 401));
        }
        req.admin = adminToDTO(admin);
        return next();
    } catch (error: any) {
        console.log("From Verify Admin Middlewear: ", error);
        return next(error);
    }
}

export function isAuthorize(roles: string[]) {
    return function (req: Request<{},{},{},{}>, res: Response, next: NextFunction) {
        try {
            if (!roles.includes(req.admin.role)) {
                return next(new HttpError("Action not allowed", 403));
            }
            return next();
        } catch (error: any) {
            console.log("From Is Authorize Middlewear: ", error);
            return next(error);
        }
    };
}
