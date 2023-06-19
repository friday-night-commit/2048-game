import type { RequestHandler } from 'express';
import axios from 'axios';

import dbUserController from '../db/controllers/users';

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value === Object(value) &&
    !Array.isArray(value)
  );
}

function snakeToCamelCase(s: string): string {
  return s.replace(/([_][a-z])/gi, $1 => $1.toUpperCase().replace('_', ''));
}

type TSnakeToCamelCase<TKey extends string> =
  TKey extends `${infer T}_${infer U}`
    ? `${Lowercase<T>}${Capitalize<TSnakeToCamelCase<U>>}`
    : TKey;

type TSnakeToCamelCaseNested<T> = T extends object
  ? {
      [K in keyof T as TSnakeToCamelCase<K & string>]: TSnakeToCamelCaseNested<
        T[K]
      >;
    }
  : T;

function serverToClientNaming<T>(serverResponse: T) {
  if (isObject(serverResponse)) {
    const n: Record<string, unknown> = {};
    Object.keys(serverResponse).forEach(key => {
      n[snakeToCamelCase(key)] = serverToClientNaming(serverResponse[key]);
    });
    return n as TSnakeToCamelCaseNested<T>;
  }
  return serverResponse as TSnakeToCamelCaseNested<T>;
}

const getYandexUser: RequestHandler = async (req, res, next) => {
  const cookie = Object.entries(req.cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  try {
    // @ts-ignore
    const { data: yandexUser } = await axios.get(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        withCredentials: true,
        headers: {
          cookie,
        },
      }
    );
    const { id: yandexId, ...rest } = yandexUser;
    let userFromDb = await dbUserController.getByYandexId(yandexId);
    if (!userFromDb) {
      userFromDb = await dbUserController.createUserFromYandexData({
        ...rest,
        yandexId,
      });
    } else {
      userFromDb = await userFromDb.update({ ...rest, yandexId });
    }
    // @ts-ignore
    res.locals.user = serverToClientNaming(userFromDb!.toJSON());
  } catch (error) {
    res.locals.user = null;
  } finally {
    next();
  }
};

export default getYandexUser;
