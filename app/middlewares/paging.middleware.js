import {badRequest, FIELD_ERROR} from "@peacom/model";
import {isArray} from "../utils";

export function pagingParse({column, dir, orderCustom = [], maxSize = 100}) {
  return (req, _res, next) => {
    let page;
    let size;
    let order;
    if (req.query.page > 1000000) {
      throw badRequest("page", FIELD_ERROR.INVALID, "Page Invalid.");
    }
    if (req.query.size > maxSize) {
      throw badRequest("size", FIELD_ERROR.INVALID, "Size Invalid.");
    }
    try {
      page = parseInt(req.query.page, 10);
      if (Number.isNaN(page)) {
        page = 1;
      }
    } catch (_ignore) {
      page = 1;
    }

    try {
      size = parseInt(req.query.size, 10);
      if (Number.isNaN(size)) {
        size = 10;
      }
    } catch (_ignore) {
      size = 10;
    }

    if (!req.query.sorts) {
      if (column && dir) {
        order = [[column, dir]];
      } else {
        order = orderCustom;
      }
    } else {
      order = [];
      const querySorts = isArray(req.query.sorts) ? req.query.sorts : [req.query.sorts];
      order.push(...querySorts.map((t) => t.split(":")));
    }

    req.paging = {
      page,
      size,
      order,
      limit: size,
      offset: (page - 1) * size
    };
    next();
  };
}
