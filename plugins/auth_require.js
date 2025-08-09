exports.register = function () {
  this.config = this.config.get("auth_require.ini", "ini");
};

exports.hook_capabilities = function (next, connection) {
  const port = connection.local.port;
  const allowNoTlsGeneral = this.config.general?.allow_no_tls === "true";
  const allowNoTlsPort = this.config.ports?.[port] === "true";

  if (connection.tls.enabled || allowNoTlsGeneral || allowNoTlsPort) {
    connection.capabilities.push("AUTH PLAIN LOGIN");
  }

  return next();
};

exports.hook_mail = function (next, connection, params) {
  const remote_ip = connection.remote.ip;
  const port = connection.local.port;
  const auth_user = connection.notes.auth_user;

  if (!auth_user) {
    this.logwarn(`Connection from ${remote_ip}:${port} rejected - AUTH required`);
    return next(DENY, "Authentication required");
  }

  return next();
};
