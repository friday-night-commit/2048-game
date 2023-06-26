import type { Request, Response, NextFunction } from 'express';

import ApiError from '../controllers/ApiError';

export type ParamValidator = (param: any) => boolean;

type ParamSchema = {
  name: string;
  type: string;
  required: boolean;
  validator_functions?: ParamValidator[];
};

const validateParams = function (paramSchemas: ParamSchema[]) {
  return function (req: Request, _res: Response, next: NextFunction) {
    for (const paramSchema of paramSchemas) {
      if (checkParamPresent(Object.keys(req.body), paramSchema)) {
        const reqParam = req.body[paramSchema.name];
        if (!checkParamType(reqParam, paramSchema)) {
          next(
            ApiError.badRequest(
              `Параметр ${paramSchema.name} имеет тип: ` +
                `${typeof reqParam} - вместо ожидаемого: ${paramSchema.type}`
            )
          );
        } else {
          if (!runValidators(reqParam, paramSchema)) {
            next(ApiError.badRequest(`Параметр ${paramSchema.name} невалиден`));
          }
        }
      } else if (paramSchema.required) {
        next(ApiError.badRequest(`Не задан параметр ${paramSchema.name}`));
      }
    }
    next();
  };
};

const checkParamPresent = function (reqParams: string[], paramObj: ParamSchema) {
  return reqParams.includes(paramObj.name);
};

const checkParamType = function (reqParam: string, paramObj: ParamSchema) {
  const reqParamType = typeof reqParam;
  return reqParamType === paramObj.type;
};

const runValidators = function (reqParam: string, paramObj: ParamSchema) {
  for (const validator of (paramObj.validator_functions || [])) {
    if (!validator(reqParam)) return false;
  }
  return true;
};

export default validateParams;
