export class ApiError extends Error {
  statusCode: number;
  url:string;
  constructor(statusCode: number,url:string ,  message: string) {
    super(message);
    this.statusCode = statusCode;
    this.url = url;
    Error.captureStackTrace(this, this.constructor);
  }
}
