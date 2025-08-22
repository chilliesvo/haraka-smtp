import nodemailer from "nodemailer";

export async function send(from, to, subject, content, configs) {
  const configOptions = {
    host: configs.host ?? "localhost",
    port: configs.port ?? 25,
    secure: configs.secure ?? false,
  };
  if (configs.auth) configOptions.tls = configs.auth;
  if (configs.tls) configOptions.tls = configs.tls;

  const transporter = nodemailer.createTransport(configOptions);
  const info = await transporter.sendMail({ from, to, subject, text: content });
  return info;
}
