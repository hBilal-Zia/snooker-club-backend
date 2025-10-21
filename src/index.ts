import express, { Request, Response } from "express";
import dotevn from "dotenv";
import { successApiResponse } from "./utils/response.util";
import { ApiResponse } from "./dtos/response.dto";
dotevn.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/health-check", (req: Request, res: Response<ApiResponse<null>>) => {
    return res.status(200).json(successApiResponse("Server is Up"));
});

app.listen(PORT, () => {
    console.log(`Server listning on Port: ${PORT}`);
});
