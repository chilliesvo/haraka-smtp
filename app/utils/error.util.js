import {BaseError} from "sequelize";
import {hasText} from "./string.util";
import {FormError} from "@peacom/core";

export const errorToTraceText = (error) => {
  const rs = [];
  if (error instanceof BaseError) {
    rs.push(error.name);
    if (hasText(error.original?.code)) {
      rs.push(`Code: <strong>${error.original?.code}</strong>`);
    }
    if (hasText(error.original?.sqlMessage)) {
      rs.push(`Message: <strong>${error.original?.sqlMessage}</strong>`);
    }
  } else if (error instanceof FormError) {
    const {
      errors: [err]
    } = error;
    if (err) {
      rs.push(`Form Error: ${err.name}`);
      rs.push(`Message: <strong>${err.message}</strong>`);
    }
  } else {
    rs.push(`Message: <strong>${error.message}</strong>`);
  }
  rs.push(error.stack);
  return rs.join("\n");
};
