import express from "express";
import mailRouter from "./mail.route";

const BASE_API_URL = "/eip/haraka";
const router = express.Router();

router.use(`${BASE_API_URL}/mail`, mailRouter);

export default router;
