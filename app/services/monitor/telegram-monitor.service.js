import { htmlEncode, FormError, sendTelegramMessage, hasText } from "@peacom/core";
import { TELEGRAM_BOT } from "./constants";

export async function sendTelegramErrorMessage(error) {
  try {
    const message = [`<a href="${process.env.WEB_URL || ""}>">${process.env.WEB_URL || ""}</a>`];
    if (error.name) {
      message.push(error.name);
    }
    if (hasText(error.original?.code)) {
      message.push(`Code: <strong>${error.original?.code}</strong>`);
    }
    if (hasText(error.original?.sqlMessage)) {
      message.push(`Message: <strong>${error.original?.sqlMessage}</strong>`);
    }
    if (error instanceof FormError) {
      const {
        errors: [err],
      } = error;
      if (err) {
        message.push(`Form Error: ${err.name}`);
        message.push(`Message: <strong>${err.message}</strong>`);
      }
    } else {
      message.push(error.message);
    }

    return sendTelegramMessage(TELEGRAM_BOT.PEACOM_BOT, {
      chat_id: TELEGRAM_BOT.PEACOM_MONITORING_GROUP,
      text: `${message.join("\n")}${message.length ? "\n" : ""}<code>${htmlEncode(error.stack)}</code>`,
      parse_mode: "HTML",
    });
  } catch (e) {
    console.error(e);
  }
  return null;
}
