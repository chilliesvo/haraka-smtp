import { send } from "./common.service";

export async function sendMail({ from, to, subject, content, configs }) {
  try {
    return send(from, to, subject, content, configs);
  } catch (err) {
    throw new Error(err);
  }
}
