import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { appLog } from "./config/winston";
import appConf from "./config/application";
import { handleGlobalError } from "./middlewares/global-error.middleware";
import router from "./routes";

export const app = express();

app.use((req, res, next) => {
  express.json({ limit: "50mb" })(req, res, next);
});
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_req, res) => res.send({ message: "Welcome to the default API route" }));
app.post("/", (_req, res) => res.send({ message: "Welcome to the default API route" }));

/**
 *  Solve 304 status
 *  https://stackoverflow.com/questions/18811286/nodejs-express-cache-and-304-status-code
 */
app.disable("etag");

/* Router init */
app.use(router);

handleGlobalError(app);

// setup express application
const server = http.createServer(app);

const PORT = process.env.PORT || appConf.port;
server.listen(PORT, appConf.hostname, async () => {
  appLog.info(`Server running at http://${appConf.hostname}:${PORT}/`);
});
