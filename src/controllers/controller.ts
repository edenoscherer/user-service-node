/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENV } from '../config/env';
import { User } from '../entities/user';

export interface Controller {
  handle: (req: HttpRequest) => Promise<HttpResponse>;
}

export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
export interface ParamsDictionary {
  [key: string]: unknown;
}

export interface HttpRequest<
  B = ParamsDictionary | any,
  Q = ParsedQs | any,
  P = ParamsDictionary | any
> {
  body: B;
  queryParams: Q;
  params: P;
  user?: Partial<User>;
  headers: { [key: string]: string | string[] | undefined };
}

export interface HttpResponse<T = unknown> {
  statusCode: number;
  body: T;
  headers?:
    | {
        [header: string]: boolean | number | string;
      }
    | undefined;
}

export type ErrorResponse = {
  error: string;
  message: string;
  stack?: string;
};

const getErrorType = (error: Error): string => {
  return error.constructor.name || 'InternalServerError';
};

export const createErrorResponse = (
  error: unknown,
  statusCode?: number
): HttpResponse<ErrorResponse> => {
  if (error instanceof Error) {
    return {
      statusCode: statusCode ?? 500,
      body: {
        error: getErrorType(error),
        message: error.message,
        stack: ENV.NODE_ENV === 'dev' ? error.stack : undefined
      }
    };
  }

  return {
    statusCode: statusCode ?? 500,
    body: {
      error: 'UnknownError',
      message: 'An unexpected error occurred'
    }
  };
};
