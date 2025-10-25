import express, { NextFunction, Request, Response } from "express";
import { failureApiResponse, successApiResponse } from "./utils/response.util";
import { ApiResponse } from "./dtos/response.dto";
import config from "./config/config";
import { connectDB } from "./config/database";
import adminRouter from "./routes/route"

const app = express();
const PORT = config.port;

app.use(express.json());
app.use("/api/v1/admin", adminRouter)

app.get("/health-check", (req: Request, res: Response<ApiResponse<{}>>) => {
    return res.status(200).json(successApiResponse("Server is Up"));
});


app.use((error: any, req:Request, res:Response<ApiResponse<{}>>, next: NextFunction) => {

    return res.status(error.statusCode || 500).json(failureApiResponse(error.message || "Internal Server Error"))
})

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server listning on Port: ${PORT}`);
});
