import { badRequest, FIELD_ERROR } from "@peacom/model";
import { successResponse } from "../utils/response.util";
import { sendMail } from "../services/mail.service";

export async function sendMailHandler(req, res, next) {
  try {
    const rs = await sendMail(req.body);
    return successResponse(res, rs);
  } catch (err) {
    return next(badRequest("sendMailHandler", FIELD_ERROR.BAD_REQUEST, err.message));
  }
}
