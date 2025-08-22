import { isObject, toString as _toString } from "lodash";
import { isArray } from "./func.util";

export function generateRandomCode(length) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i += 1) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const hasText = (str) => {
  const testStr = `${str || ""}`;
  return !!str && testStr.length > 0;
};

export function markKey(keyStr) {
  return `**** ${keyStr.substring(keyStr.length - 4, keyStr.length)}`;
}

export function newMarKey(keyStr = "", options = null) {
  const numFirstVisible = options?.numFirstVisible || 2;
  const numLastVisible = options?.numLastVisible || 2;
  if (numLastVisible + numFirstVisible > keyStr.length) {
    return Array(keyStr.length).fill("*", 0).join("");
  }
  const firstCharacters = keyStr.substring(0, numFirstVisible);
  const lastCharacters = keyStr.substring(keyStr.length - numLastVisible);
  return `${firstCharacters}${Array(keyStr.length - numLastVisible - numFirstVisible)
    .fill("*", 0)
    .join("")}${lastCharacters}`;
}

const htmlEntities = {
  nbsp: " ",
  cent: "¢",
  pound: "£",
  yen: "¥",
  euro: "€",
  copy: "©",
  reg: "®",
  lt: "<",
  gt: ">",
  quot: '"',
  amp: "&",
  apos: "'",
};

export function unescapeHTML(str) {
  return str.replace(/&([^;]+);/g, (entity, entityCode) => {
    let match;

    if (entityCode in htmlEntities) {
      return htmlEntities[entityCode];
    }
    // eslint-disable-next-line no-cond-assign
    if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
      return String.fromCharCode(parseInt(match[1], 16));
    }
    // eslint-disable-next-line no-cond-assign
    if ((match = entityCode.match(/^#(\d+)$/))) {
      // eslint-disable-next-line no-bitwise
      return String.fromCharCode(~~match[1]);
    }
    return entity;
  });
}

export const anyToString = (obj) => {
  if (isObject(obj)) {
    return JSON.stringify(obj);
  }
  return _toString(obj);
};

export function filterForNumberOnly(str) {
  return str.replace(/\D+/g, "");
}

export function isNumberOnly(str) {
  const pattern = /^\d+$/;
  return pattern.test(str);
}

export function filterForInvalidCharacter(str, character = "_") {
  let rs = str.replace(/[^\p{L}\s]/giu, " ");
  rs = rs.trim();
  rs = rs.replace(/ +/g, character);
  return rs;
}

export function filterNotNumberAndDivideChar(str) {
  let rs = str.replace(/\D+/g, " ");
  rs = rs.trim();
  rs = rs.replace(/ +/g, ",");
  return rs;
}

export function stringNumberToList(str) {
  return filterNotNumberAndDivideChar(str)
    .split(/[ _\-,]/)
    .filter((t) => hasText(t))
    .map((t) => Number(t));
}

export function htmlEncode(rawStr) {
  if (hasText(rawStr)) {
    return rawStr.replace(/[\u00A0-\u9999<>&]/g, (i) => {
      return `&#${i.charCodeAt(0)};`;
    });
  }
  return "";
}

export function filterNonAlphaNumeric(str) {
  return str.replace(/\W/g, "");
}

export function filterHtmlName(str) {
  return str.replaceAll(/&(quot|amp|lt|gt|acute);/g, "");
}

export function alphaNumericToString(str) {
  if (!hasText(str)) {
    return [];
  }
  return filterHtmlName(str)
    .split(/[ _\-,./;]/)
    .filter((t) => hasText(t))
    .map((t) => filterNonAlphaNumeric(t))
    .filter((t) => hasText(t));
}

export const leftString = (string, count) => {
  const str = `${string || ""}`;
  if (str.length > count) {
    return str.substring(0, count);
  }
  return str;
};

export const rightString = (string, count) => {
  const str = `${string || ""}`;
  if (str.length > count) {
    return str.substring(str.length - count);
  }
  return str;
};

export function toSnakeCase(str) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function convertToDesiredFormat(str) {
  const firstString = str.substring(0, 4);
  const lastString = str.substring(str.length - 4);
  const middle = "*".repeat(str.length - 8);
  return firstString + middle + lastString;
}

export function extractUrlExample(url, example) {
  return example.replace(url.replace("{{1}}", ""), "") || "";
}

export function isValidUrl(url) {
  if (!url) return false;
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
  return pattern.test(url);
}

export function objHasValue(obj = {}) {
  if (typeof obj !== "object") return false;
  return !!Object.keys(obj).length;
}

export function stringifySequelizeOp(obj) {
  return JSON.stringify(obj, (key, value) => {
    const symbols = Object.getOwnPropertySymbols(value);
    if (symbols.length) {
      return value[symbols[0]];
    }
    return value;
  });
}

export function removeTemplateParser(input = "") {
  return input.replace(/\{\{\{?.+?\}?\}\}/g, "");
}
