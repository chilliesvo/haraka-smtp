export default {
  hostname: "0.0.0.0",
  port: 3000,
  fileUploadDir: "./uploads/",
  emailFileUploadDir: "./public/uploads/",
  logFile: {
    folder: "logs/haraka",
    errorFile: "error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    handleExceptions: true,
    maxSize: "100m",
    maxFiles: "10d"
  },
  twoFA: { secretKeyLength: 10 },
  crypto: { secretKey: "ENQudMWJ6AOKyWVTI28291WisR1Cluqb" }
};
