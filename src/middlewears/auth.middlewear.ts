import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/error.util";
import { verifyJwt } from "../utils/jwt.util";
import config from "../config/config";
import AdminRepository from "../respositories/admin.repository";
import { adminToDTO } from "../utils/mappper.util";

export async function verifyAdmin(req: Request<{},{},{},{}>, res: Response, next: NextFunction) {
    try {
        const token = req?.headers?.authorization?.split(' ')[1]
        if (!token) {
            return next(new HttpError("Unauthorized User", 403))
        }
        verifyJwt(token, config.jwtAccessKey, async (error:any, decoded: any) => {
            if (error) {
                return next(new HttpError("Invalid Token", 401))
            }

            const admin = await AdminRepository.getAdminById(decoded.id);
            if (!admin) {
                return next(new HttpError("Invalid Token", 401))
            }
            req.admin = adminToDTO(admin)
            next();
        })


    } catch (error: any) {
        console.log("From Verify Admin Middlewear: ", error)
        next(error)
    }
}

export function isAuthorize(roles: string[]){
return function(req: Request<{},{},{},{}>, res: Response, next: NextFunction) {
    try {
        if (!roles.includes(req.admin.role)) {
            next( new HttpError("Action Not Allowed", 403))
        }
        next();

    } catch (error: any) {
        console.log("From Is Authorize Middlewear: ", error)
        next(error)
    }
}
}