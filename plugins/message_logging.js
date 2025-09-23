const { MESSAGE_STATUS } = require("./db/models/message/message.model");

exports.register = function () {
  this.loginfo("message-logging plugin loaded");
};

exports.hook_queue = async function (next, connection) {
  try {
    const { Message } = server.notes.db;
    await Message.create({
      clientIP: connection.remote.ip,
      port: connection.local.port,
      username: connection.notes.auth_user,
      from: connection.transaction.mail_from.address(),
      to: connection.transaction.rcpt_to.map((r) => r.address()).join(","),
      extraData: JSON.stringify({ subject: connection.transaction.header.get("Subject") || "(No subject)" }),
      status: MESSAGE_STATUS.PENDING,
      createdDate: new Date()
    });
    this.loginfo("Saved message to DB");
  } catch (err) {
    this.logerror("Error saving message: " + err);
  }
  next();
};
