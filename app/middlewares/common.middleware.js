import {Op} from "sequelize";
import {badRequest, FIELD_ERROR} from "@peacom/model";
import db from "../db/models";

export function verifyMicroserviceMiddleware() {
  return async (req, _res, next) => {
    try {
      const where = {};
      const userId = req.headers["peacom-header-user-id"];
      const companyId = req.headers["peacom-header-company-id"];
      let aclUser = req.headers["peacom-header-acl-user"];
      let aclCompany = req.headers["peacom-header-acl-company"];
      if (aclUser) {
        aclUser = aclUser.split(",");
        where.createdById = {
          [Op.in]: aclUser
        };
        where.companyId = companyId;
      }
      if (aclCompany) {
        aclCompany = aclCompany.split(",");
        where.companyId = {
          [Op.in]: aclCompany
        };
      }

      if (!userId) {
        return next(badRequest("user", FIELD_ERROR.INVALID, `user not found`));
      }
      if (!companyId) {
        return next(badRequest("company", FIELD_ERROR.INVALID, `company not found`));
      }
      const company = await db.Company.findByPk(companyId);
      req.user = {
        id: userId,
        companyId,
        company
      };
      req.aclWhere = where;
      return next();
    } catch (e) {
      return next(e);
    }
  };
}
