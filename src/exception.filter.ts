import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    console.log("ПОКАЗЫВАЮ В ФИЛЬТРЕ" + JSON.stringify(exception))
    console.log("ПОКАЗЫВАЮ В ФИЛЬТРЕ = " + exception['response'] !== undefined)
    console.log("ПОКАЗЫВАЮ В ФИЛЬТРЕ = " + exception['response'].message)
    console.log("ПОКАЗЫВАЮ В ФИЛЬТРЕ = " + exception['response'])

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        exceptionResponse: exception['response'] !== undefined ? exception['response'] : exception.message
      });
  }
}