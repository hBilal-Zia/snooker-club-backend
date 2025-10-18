import express from "express";
import dotevn from "dotenv";
dotevn.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/health-check", (req: any, res: any) => {
    return res.status(200).json({
        success: true,
        message: "Server is Up",
        data: null,
    })
});

app.listen(PORT, () => {
    console.log(`Server listning on Port: ${PORT}`)
})