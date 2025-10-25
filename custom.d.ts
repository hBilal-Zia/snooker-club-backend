import { AdminResponseDTO } from "./src/dtos/admin.dto";

declare global{

namespace Express {
       export interface Request {
            admin: AdminResponseDTO;
        }
    }
}