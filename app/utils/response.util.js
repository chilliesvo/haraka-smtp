/**
 * @description Response success of request
 * @param {Object} res response
 * @param {any} result result
 */
export const successResponse = (res, result = null) => {
  return res.status(200).json(result);
};
