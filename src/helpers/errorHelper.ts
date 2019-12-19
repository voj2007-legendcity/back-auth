export type ErrorDataType = {
  message: string,
  field?: string
}

interface IErrorHelper {
  message: string;
  code?:  number;
  data?: ErrorDataType[];
}

export class ErrorHelper extends Error implements IErrorHelper {
  constructor(public message: string, public code?: number, public data?: ErrorDataType[]) {
    super(message);
  }
}