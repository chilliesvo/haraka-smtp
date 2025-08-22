import express from "express";
import { sendMailHandler } from "../controllers";

const mailRouter = express.Router();

mailRouter.route("/send").post(sendMailHandler);

export default mailRouter;
