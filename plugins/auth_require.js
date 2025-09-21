exports.register = function () {
  this.load_config();
};

exports.load_config = function () {
  this.auth_require_cfg = this.config.get("auth_require.ini", "ini", () => {
    this.load_config();
  });
};

exports.hook_capabilities = function (next, connection) {
  const port = connection.local.port;
  const allowNoTlsGeneral = this.auth_require_cfg.general?.allow_no_tls === "true";
  const allowNoTlsPort = this.auth_require_cfg.ports?.[port] === "true";

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
