import nodemailer from "nodemailer";
import { appLog } from "../config/winston";

export async function send(from, to, subject, content, configs) {
  const configOptions = {
    host: configs.host ?? "localhost",
    port: configs.port ?? 25,
    secure: configs.secure ?? false,
    tls: { rejectUnauthorized: false },
  };

  if (configs.auth) configOptions.tls = configs.auth;
  if (configs.tls) configOptions.tls = configs.tls;

  appLog.info(`[HARAKA] [TRANSPORT-CONFIG] ${JSON.stringify(configOptions)}`);
  const transporter = nodemailer.createTransport(configOptions);
  const info = await transporter.sendMail({ from, to, subject, text: content });
  return info;
}
