import express from "express";
import flightRouter from "./mail.route";

const BASE_API_URL = "mail";
const router = express.Router();

router.use(`${BASE_API_URL}/mail`, flightRouter);

export default router;
