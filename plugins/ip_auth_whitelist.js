const ALLOWED_IPS = require("./ip_whitelist");
const ipaddr = require("ipaddr.js");

const isCheckWhitelist = false;

exports.hook_connect = function (next, connection) {
  const remote_ip = connection.remote.ip;

  if (isCheckWhitelist && !ipAllowed(remote_ip)) {
    return next(DENY, `Your IP: ${remote_ip} is not allowed to send email`);
  }

  return next();
};

function ipAllowed(remote_ip) {
  try {
    const addr = ipaddr.parse(remote_ip);
    return ALLOWED_IPS.some((ip) => {
      if (ip.includes("/")) {
        const [range, bits] = ip.split("/");
        const rangeAddr = ipaddr.parse(range);
        return addr.match(rangeAddr, parseInt(bits, 10));
      } else {
        return remote_ip === ip;
      }
    });
  } catch (e) {
    console.error(e);
    return false;
  }
}
