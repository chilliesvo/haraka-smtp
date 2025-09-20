import { sendMail } from "../app/services/mail.service";
const shell = require("shelljs");
const from = "khoa@peacom.co";
const to = "khoavo.sound@gmail.com";
const content = "Hello Haraka";
const user = "mshsystem";
const pass = "Lamhongquan!@#$";

describe("send.test.js", () => {
  it("sendMail", async () => {
    const subject = "support send mail API Haraka";
    const configs = { port: 2525 };
    await sendMail({ from, to, subject, content, configs });
  });

  it("send by swalk 587", async () => {
    const subject = "support send mail SWAKS Haraka 587";
    const host = "localhost";
    const port = 587;
    const script = `swaks --from ${from} --to ${to} --server ${host} --port ${port} --tls --auth-user ${user} --auth-password "${pass}" --header "Subject: ${subject}" --body "${content}"`;
    console.log("script :>> ", script);
    console.log(shell.exec(script));
  });

  it("send by swalk 2525", async () => {
    const subject = "support send mail SWAKS Haraka 2525";
    const host = "localhost";
    const port = 2525;
    const script = `swaks --from ${from} --to ${to} --server ${host} --port ${port} --header "Subject: ${subject}" --body "${content}"`;
    console.log("script :>> ", script);
    console.log(shell.exec(script));
  });
});
