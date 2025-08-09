exports.register = function () {
  this.inherits("queue/smtp_forward");

  this.hook_queue = function (next, connection) {
    this.loginfo(`111ß1111111111111111111111111111111111111111111111111111111`);
    const txn = connection.transaction;
    this.loginfo("connection.ip :>> ", connection.ip);
    if (!txn) return next();

    const mail_from = txn.mail_from && txn.mail_from.address();
    const domain = mail_from && mail_from.split("@")[1];

    const config = this.config.get("smtp_forward.ini", "ini");
    const cfg = config[domain] || config.default;

    this.loginfo(`📦 Sending with config for domain=${domain}, config=`, cfg);

    // override config for smtp_forward
    connection.notes.smtp_forward = cfg;

    // call parent smtp_forward's hook_queue
    const smtp_forward = this.plugins["queue/smtp_forward"];
    smtp_forward.hook_queue.call(this, next, connection);
  };
};
